# 🔒 Guida alla Sicurezza per Produzione - SGAMAPP

## 📋 Indice
1. [Problemi Critici Identificati](#problemi-critici-identificati)
2. [Configurazione Vercel](#configurazione-vercel)
3. [Variabili d'Ambiente](#variabili-dambiente)
4. [Autenticazione e Autorizzazione](#autenticazione-e-autorizzazione)
5. [Sicurezza Frontend](#sicurezza-frontend)
6. [Sicurezza API e Backend](#sicurezza-api-e-backend)
7. [Headers di Sicurezza](#headers-di-sicurezza)
8. [Validazione e Sanitizzazione](#validazione-e-sanitizzazione)
9. [Monitoraggio e Logging](#monitoraggio-e-logging)
10. [Checklist Pre-Deploy](#checklist-pre-deploy)

---

## 🚨 Problemi Critici Identificati

### 1. **Password Admin Hardcoded nel Frontend** ⚠️ CRITICO
**File**: `src/contexts/AuthContext.tsx`
- **Problema**: Password `'SgamAdmin2024!'` è hardcoded nel codice frontend
- **Rischio**: Chiunque può vedere il codice sorgente e accedere all'area admin
- **Soluzione**: Spostare autenticazione completamente sul backend con JWT

### 2. **URL API Hardcoded** ⚠️ ALTO
**File**: `src/utils/api.ts`, `vite.config.ts`
- **Problema**: URL backend hardcoded (`https://sgamapp.onrender.com/api`, ngrok URL)
- **Rischio**: Difficile gestire ambienti diversi, URL esposti
- **Soluzione**: Usare variabili d'ambiente

### 3. **Console.log in Produzione** ⚠️ MEDIO
**File**: Vari file con 121+ console.log
- **Problema**: Espone informazioni sensibili, rallenta performance
- **Rischio**: Informazioni debug visibili agli utenti
- **Soluzione**: Rimuovere o usare sistema di logging condizionale

### 4. **Autenticazione basata su SessionStorage** ⚠️ ALTO
**File**: `src/contexts/AuthContext.tsx`
- **Problema**: Autenticazione solo lato client, facilmente bypassabile
- **Rischio**: Accesso non autorizzato all'area admin
- **Soluzione**: Implementare JWT con refresh token

### 5. **Nessuna Validazione Input Avanzata** ⚠️ MEDIO
**File**: Componenti admin e form
- **Problema**: Validazione minima, nessuna sanitizzazione
- **Rischio**: XSS, SQL Injection (se backend non protegge)
- **Soluzione**: Validazione lato client e sanitizzazione

### 6. **Nessun Header di Sicurezza** ⚠️ ALTO
- **Problema**: Mancano CSP, HSTS, X-Frame-Options, etc.
- **Rischio**: Vulnerabilità a vari attacchi
- **Soluzione**: Configurare headers in Vercel

### 7. **Proxy Ngrok Hardcoded** ⚠️ MEDIO
**File**: `vite.config.ts`
- **Problema**: URL ngrok hardcoded per sviluppo
- **Rischio**: Non funzionerà in produzione
- **Soluzione**: Usare variabili d'ambiente

---

## ⚙️ Configurazione Vercel

### 1. Crea `vercel.json` aggiornato

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://kit.fontawesome.com; style-src 'self' 'unsafe-inline' https://kit.fontawesome.com; font-src 'self' https://kit.fontawesome.com data:; img-src 'self' data: https:; connect-src 'self' https://sgamapp.onrender.com https://*.ngrok-free.dev; frame-ancestors 'none';"
        }
      ]
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2. Configurazione Build

Assicurati che `package.json` abbia:
```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

---

## 🔐 Variabili d'Ambiente

### 1. Crea `.env.production` (NON committare!)

```env
# Backend API
VITE_API_BASE_URL=https://sgamapp.onrender.com/api
VITE_ANALYZE_API_URL=https://your-analyze-api.com/api

# Ambiente
VITE_ENV=production
VITE_NODE_ENV=production

# Feature Flags
VITE_ENABLE_DEBUG=false
VITE_ENABLE_CONSOLE_LOGS=false
```

### 2. Crea `.env.example` (da committare)

```env
# Backend API
VITE_API_BASE_URL=https://sgamapp.onrender.com/api
VITE_ANALYZE_API_URL=https://your-analyze-api.com/api

# Ambiente
VITE_ENV=development
VITE_NODE_ENV=development

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_ENABLE_CONSOLE_LOGS=true
```

### 3. Configura Variabili in Vercel Dashboard

1. Vai su Vercel Dashboard → Il tuo progetto → Settings → Environment Variables
2. Aggiungi tutte le variabili d'ambiente necessarie
3. Configura valori diversi per Production, Preview, Development

### 4. Aggiorna `vite.config.ts`

```typescript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: mode === 'development' ? {
        '/api/analyze': {
          target: env.VITE_ANALYZE_API_URL || 'https://cunicular-spotlike-jacinda.ngrok-free.dev',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
        '/api/analyze-image': {
          target: env.VITE_ANALYZE_API_URL || 'https://cunicular-spotlike-jacinda.ngrok-free.dev',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
        '/api': {
          target: env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5147',
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    },
    define: {
      __DEV__: JSON.stringify(mode === 'development'),
    },
  }
})
```

### 5. Aggiorna `src/utils/api.ts`

```typescript
// Usa variabile d'ambiente, fallback a valore di default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sgamapp.onrender.com/api';

// In produzione, non usare localhost
if (import.meta.env.PROD && API_BASE_URL.includes('localhost')) {
  console.error('⚠️ API_BASE_URL non configurata correttamente per produzione!');
}
```

---

## 🔑 Autenticazione e Autorizzazione

### 1. **RIMUOVI Password Hardcoded**

**File**: `src/contexts/AuthContext.tsx`

```typescript
// ❌ RIMUOVI QUESTO:
const ADMIN_PASSWORD = 'SgamAdmin2024!';

// ✅ SOSTITUISCI CON:
const login = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
      credentials: 'include', // Per cookie HttpOnly
    });

    if (response.ok) {
      const data = await response.json();
      // Salva token in httpOnly cookie (gestito dal backend)
      // O salva in memory (non in localStorage/sessionStorage)
      setIsAuthenticated(true);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Errore login:', error);
    return false;
  }
};
```

### 2. **Implementa JWT con Refresh Token**

**Backend deve:**
- Generare JWT con scadenza breve (15 min)
- Generare refresh token con scadenza lunga (7 giorni)
- Salvare refresh token in httpOnly cookie
- Validare token su ogni richiesta admin

**Frontend deve:**
- Inviare token in header Authorization
- Gestire refresh automatico del token
- Logout automatico se token scaduto

### 3. **Proteggi Route Admin**

**File**: `src/components/shared/ProtectedRoute.tsx`

```typescript
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth(); // Verifica token con backend
      setIsChecking(false);
    };
    verifyAuth();
  }, []);

  if (isChecking) {
    return <div>Verifica autenticazione...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sgam-admin-login" replace />;
  }

  return <>{children}</>;
};
```

### 4. **Rate Limiting**

Implementa rate limiting sul backend:
- Max 5 tentativi login per IP ogni 15 minuti
- Blocco temporaneo dopo tentativi falliti
- Log degli accessi falliti

---

## 🛡️ Sicurezza Frontend

### 1. **Rimuovi Console.log in Produzione**

Crea `src/utils/logger.ts`:

```typescript
const isDev = import.meta.env.DEV;
const enableLogs = import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true';

export const logger = {
  log: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.warn(...args);
    }
  },
  debug: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.debug(...args);
    }
  },
};
```

Sostituisci tutti i `console.log` con `logger.log`.

### 2. **Sanitizzazione Input**

Installa DOMPurify:
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

Crea `src/utils/sanitize.ts`:

```typescript
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
  });
};
```

Usa in tutti i form admin.

### 3. **Validazione Input Avanzata**

Crea `src/utils/validation.ts`:

```typescript
export const validateTerm = (term: string): { valid: boolean; error?: string } => {
  if (!term || term.trim().length === 0) {
    return { valid: false, error: 'Il termine è obbligatorio' };
  }
  if (term.length > 200) {
    return { valid: false, error: 'Il termine non può superare 200 caratteri' };
  }
  if (!/^[a-zA-Z0-9\s\-_.,àèéìòù]+$/i.test(term)) {
    return { valid: false, error: 'Il termine contiene caratteri non validi' };
  }
  return { valid: true };
};

export const validateDefinition = (definition: string): { valid: boolean; error?: string } => {
  if (!definition || definition.trim().length === 0) {
    return { valid: false, error: 'La definizione è obbligatoria' };
  }
  if (definition.length > 2000) {
    return { valid: false, error: 'La definizione non può superare 2000 caratteri' };
  }
  return { valid: true };
};
```

### 4. **Gestione Errori Sicura**

Non esporre dettagli errori agli utenti:

```typescript
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    // In produzione, non mostrare stack trace
    if (import.meta.env.PROD) {
      return 'Si è verificato un errore. Riprova più tardi.';
    }
    return error.message;
  }
  return 'Errore sconosciuto';
};
```

---

## 🌐 Sicurezza API e Backend

### 1. **CORS Configuration**

Backend deve configurare CORS correttamente:

```csharp
// Backend .NET
builder.Services.AddCors(options =>
{
    options.AddPolicy("Production", policy =>
    {
        policy.WithOrigins("https://your-vercel-app.vercel.app")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // Solo se usi cookie
    });
});
```

### 2. **API Rate Limiting**

Implementa rate limiting sul backend:
- Max 100 richieste per minuto per IP
- Max 10 richieste per secondo per endpoint critici

### 3. **Validazione Backend**

**IMPORTANTE**: Non fidarti mai della validazione frontend!
- Valida TUTTO sul backend
- Sanitizza tutti gli input
- Usa prepared statements per database
- Valida file upload (tipo, dimensione)

---

## 🔒 Headers di Sicurezza

### Content Security Policy (CSP)

Aggiorna CSP in `vercel.json` basandoti sulle tue esigenze:

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://kit.fontawesome.com; style-src 'self' 'unsafe-inline' https://kit.fontawesome.com; font-src 'self' https://kit.fontawesome.com data:; img-src 'self' data: https:; connect-src 'self' https://sgamapp.onrender.com https://*.ngrok-free.dev; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
}
```

**Rimuovi `'unsafe-inline'` quando possibile** (richiede refactoring).

---

## ✅ Validazione e Sanitizzazione

### Checklist Validazione:

- [ ] Tutti gli input sono validati lato client
- [ ] Tutti gli input sono validati lato server
- [ ] Input sanitizzati prima di salvare in DB
- [ ] Output sanitizzato prima di renderizzare HTML
- [ ] File upload validati (tipo, dimensione, contenuto)
- [ ] URL validati e sanitizzati
- [ ] Email validate con regex robusto
- [ ] Password con requisiti minimi (8+ caratteri, maiuscole, numeri)

---

## 📊 Monitoraggio e Logging

### 1. **Error Tracking**

Installa Sentry o simile:

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: "production",
    tracesSampleRate: 0.1,
  });
}
```

### 2. **Analytics**

Considera Google Analytics o Plausible per:
- Traffico
- Errori
- Performance
- User behavior

---

## 📝 Checklist Pre-Deploy

### Sicurezza Critica
- [ ] **RIMOSSO** password hardcoded dal frontend
- [ ] **IMPLEMENTATO** autenticazione backend con JWT
- [ ] **CONFIGURATE** variabili d'ambiente in Vercel
- [ ] **RIMOSSI** tutti i console.log o sostituiti con logger
- [ ] **AGGIUNTI** headers di sicurezza in vercel.json
- [ ] **VALIDATI** tutti gli input lato client e server
- [ ] **SANITIZZATI** tutti gli output HTML
- [ ] **CONFIGURATO** CORS correttamente sul backend
- [ ] **TESTATO** autenticazione in produzione
- [ ] **VERIFICATO** che URL API siano corretti

### Configurazione
- [ ] `.env.production` creato (NON committato)
- [ ] `.env.example` creato e committato
- [ ] Variabili d'ambiente configurate in Vercel
- [ ] `vercel.json` aggiornato con headers
- [ ] Build funziona correttamente
- [ ] Preview deployment testato

### Backend
- [ ] Rate limiting implementato
- [ ] Validazione input backend
- [ ] Sanitizzazione database
- [ ] Logging errori configurato
- [ ] CORS configurato per dominio Vercel
- [ ] HTTPS abilitato

### Testing
- [ ] Test autenticazione admin
- [ ] Test validazione form
- [ ] Test error handling
- [ ] Test responsive design
- [ ] Test performance
- [ ] Test accessibilità

### Documentazione
- [ ] README aggiornato
- [ ] Credenziali documentate (solo per team)
- [ ] Processo deploy documentato
- [ ] Rollback plan documentato

---

## 🚀 Deploy Steps

1. **Preparazione**:
   ```bash
   # Rimuovi file di sviluppo
   rm -rf node_modules/.cache
   
   # Build locale per test
   npm run build
   npm run preview
   ```

2. **Vercel Deploy**:
   ```bash
   # Installa Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel --prod
   ```

3. **Post-Deploy**:
   - Verifica che il sito funzioni
   - Testa autenticazione admin
   - Verifica headers di sicurezza (usa https://securityheaders.com)
   - Testa su dispositivi diversi
   - Monitora errori per 24-48h

---

## 🔄 Manutenzione Continua

### Ogni Settimana:
- [ ] Review error logs
- [ ] Verifica performance
- [ ] Aggiorna dipendenze (se necessario)

### Ogni Mese:
- [ ] Security audit
- [ ] Backup database
- [ ] Review accessi admin
- [ ] Aggiorna documentazione

### Ogni Trimestre:
- [ ] Penetration testing
- [ ] Review codice sicurezza
- [ ] Aggiorna dipendenze critiche
- [ ] Training team su sicurezza

---

## 📞 Supporto

Per problemi di sicurezza, contatta immediatamente il team di sviluppo.

**NON committare mai:**
- Password
- API keys
- Token
- Credenziali
- File `.env` con valori reali

---

## 📚 Risorse Aggiuntive

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security Best Practices](https://vercel.com/docs/security)
- [React Security](https://reactjs.org/docs/dom-elements.html#security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**Ultimo aggiornamento**: Gennaio 2025
**Versione**: 1.0

