# 🚀 Setup Database Server

## Avvio Rapido

Per far funzionare il database con il tuo sito, devi avviare il server Express.

### Metodo 1: Avvio Manuale (Consigliato)

1. **Apri un nuovo terminale** e naviga nella cartella server:
```bash
cd src/components/server
```

2. **Installa le dipendenze** (solo la prima volta):
```bash
npm install
```

3. **Avvia il server**:
```bash
npm start
```

Il server partirà su **http://localhost:3000**

4. **In un altro terminale**, avvia il frontend:
```bash
npm run dev
```

### Metodo 2: Avvio Automatico

1. **Installa concurrently** (solo la prima volta):
```bash
npm install --save-dev concurrently
```

2. **Avvia tutto insieme**:
```bash
npm run dev:all
```

Questo comando avvierà automaticamente sia il server che il frontend.

## ⚙️ Configurazione

Il server è configurato per girare sulla porta **3000** di default.

Il frontend è configurato tramite Vite proxy per reindirizzare tutte le chiamate `/api/*` al server su `http://localhost:3000`.

## 🔍 Verifica che tutto funzioni

1. Avvia il server (porta 3000)
2. Avvia il frontend (porta 5173 o quella configurata da Vite)
3. Vai alla pagina **Glossario** - i termini dovrebbero caricarsi dal database
4. Prova la **ricerca** nella SearchBar - dovrebbe mostrare risultati dal database

## 🐛 Risoluzione Problemi

**Errore "Network request failed":**
- Verifica che il server sia in esecuzione su porta 3000
- Controlla la console del browser per errori CORS
- Assicurati che il proxy in vite.config.ts sia configurato correttamente

**I dati non si caricano:**
- Controlla che il file `src/components/server/database/glossary.json` esista
- Verifica che il server sia attivo: apri `http://localhost:3000` nel browser
- Controlla la console del server per eventuali errori

**Porta 3000 già in uso:**
- Cambia la porta nel file `src/components/server/index.js` modificando `PORT`
- Oppure modifica la variabile d'ambiente: `PORT=3001 npm start`

## 📝 Note

- Il server deve essere sempre in esecuzione durante lo sviluppo
- I dati sono salvati nel file JSON nella cartella `database`
- Per produzione, considera di usare un database reale (MongoDB, PostgreSQL, etc.)

