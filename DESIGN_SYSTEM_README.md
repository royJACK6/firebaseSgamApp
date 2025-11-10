# 🎨 SGAMAPP - Design System Completo

## 📋 Panoramica

Questo progetto utilizza un **Design System centralizzato** in un unico file: `DesignSystem.css`.

**IMPORTANTE**: Questo è l'**UNICO file CSS** che devi modificare per cambiare lo stile di tutto il sito!

## 🎯 Vantaggi di questo Approccio

✅ **Manutenzione Centralizzata**: Tutti gli stili in un solo posto  
✅ **Facile da Vendere**: Chi acquista può modificare il design da un solo file  
✅ **Coerenza Garantita**: Stili uniformi in tutto il sito  
✅ **Performance**: Un solo file CSS da caricare  
✅ **Documentazione Inclusa**: Commenti chiari per ogni sezione  

## 📁 Struttura del Design System

Il file `DesignSystem.css` è organizzato in 16 sezioni principali:

### 1. **Variabili CSS** (Linee 1-237)
Tutte le variabili CSS fondamentali:
- Colori brand (primario, secondario, intermedio)
- Colori di background e testo
- Gradienti
- Ombre (box-shadow)
- Bordi e raggi
- Spaziature
- Transizioni e animazioni
- Z-index

**Per modificare i colori del sito**, cerca la sezione `COLORI BRAND PRINCIPALI` e modifica i valori.

### 2. **Helper Classes** (Linee 238-285)
Classi utility per applicare rapidamente colori, ombre e bordi:
```html
<div class="sfondo-bianco ombra-card bordo-medio">
  <h2 class="testo-primario">Titolo</h2>
</div>
```

### 3. **Typography System** (Linee 286-320)
Sistema tipografico completo:
- `.heading-1`, `.heading-2`, `.heading-3`, `.heading-4`
- `.text-large`, `.text-normal`, `.text-small`, `.text-tiny`
- Utility per allineamento e peso

### 4. **Button System** (Linee 321-500)
Sistema completo di bottoni:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, `.btn-warning`
- `.btn-outline-primary`, `.btn-outline-secondary`
- `.btn-sm`, `.btn-lg`, `.btn-block`
- `.btn-icon` per icone
- `.sg-btn` per bottoni specifici SGAMAPP

### 5. **Card System** (Linee 501-600)
Sistema di cards:
- `.card` base
- `.card--hover`, `.card--bordered`
- `.card--small`, `.card--medium`, `.card--large`
- `.card-primary`, `.card-success`, `.card-warning`, `.card-danger`
- `.sg-card`, `.sg-guide-card`, `.sg-info-card` per componenti SGAMAPP

### 6. **Form Elements** (Linee 601-700)
Componenti form:
- `.input`, `.textarea`, `.select`
- `.input-sm`, `.input-lg`
- `.form-group`, `.form-label`, `.form-helper`, `.form-error`
- `.checkbox`, `.radio`

### 7. **Layout Utilities** (Linee 701-850)
Utility per layout:
- Flexbox: `.flex`, `.flex-row`, `.flex-column`, `.justify-center`, etc.
- Grid: `.grid`, `.grid-cols-1`, `.grid-cols-2`, etc.
- Display: `.block`, `.inline-block`, `.hidden`
- Position: `.relative`, `.absolute`, `.fixed`
- Spacing: `.p-md`, `.mt-lg`, `.mb-sm`, etc.

### 8. **Navigation Components** (Linee 851-950)
Componenti di navigazione:
- `.tabs`, `.tab`, `.tab-active`
- `.breadcrumb`, `.breadcrumb-item`

### 9. **Modal & Overlay** (Linee 951-1050)
Sistema modale:
- `.modal-overlay`
- `.modal`, `.modal-header`, `.modal-body`, `.modal-footer`
- `.modal-title`, `.modal-close`

### 10. **Animations** (Linee 1051-1300)
Tutte le animazioni:
- `@keyframes`: fadeIn, fadeInUp, slideInLeft, bounceIn, etc.
- Utility classes: `.animate-fade-in`, `.animate-bounce-in`, etc.
- Staggered animations: `.animate-stagger-1` fino a `.animate-stagger-8`

### 11. **Alerts & Notifications** (Linee 1301-1350)
Sistema di alert:
- `.alert`, `.alert-success`, `.alert-warning`, `.alert-danger`, `.alert-info`

### 12. **Badge & Pills** (Linee 1351-1400)
Badge e pill:
- `.badge`, `.badge-primary`, `.badge-success`, etc.
- `.badge-pill`

### 13. **Loading Spinner** (Linee 1401-1450)
Spinner di caricamento:
- `.spinner`, `.spinner-sm`, `.spinner-lg`

### 14. **Divider** (Linee 1451-1500)
Divisori:
- `.divider`, `.divider-vertical`

### 15. **Responsive Utilities** (Linee 1501-1550)
Utility responsive:
- `.hide-mobile`, `.hide-tablet`, `.hide-desktop`
- `.show-mobile-only`

### 16. **SGAMAPP Specific Components** (Linee 1551-2000+)
Componenti specifici per SGAMAPP:
- `.sg-section-title` - Titoli delle sezioni con animazione
- `.sg-card` - Cards specifiche del sito
- `.sg-guide-card` - Cards per le guide
- `.sg-info-card` - Card informativa grande
- `.sg-btn` - Bottoni specifici SGAMAPP
- `.sg-assistant-card` - Card per Sgamy
- `.sg-cards-wrap`, `.sg-card-grid` - Wrapper e grid per cards

## 🔧 Come Modificare il Design

### Cambiare i Colori del Sito

1. Apri `src/DesignSystem.css`
2. Cerca la sezione `COLORI BRAND PRINCIPALI` (circa linea 20)
3. Modifica i valori:

```css
--colore-primario: #1565D6;  /* Cambia questo colore */
--colore-secondario: #64B5F6;  /* E questo */
--colore-intermedio: #1976D2;  /* E questo */
```

**Tutti i componenti useranno automaticamente i nuovi colori!**

### Cambiare le Spaziature

1. Cerca la sezione `SPAZIATURE` (circa linea 180)
2. Modifica i valori:

```css
--spaziatura-xs: 4px;
--spaziatura-sm: 8px;
--spaziatura-md: 16px;  /* Modifica questo per cambiare spaziature medie */
--spaziatura-lg: 24px;
--spaziatura-xl: 32px;
--spaziatura-xxl: 48px;
```

### Cambiare le Ombre

1. Cerca la sezione `OMBRE (BOX SHADOW)` (circa linea 130)
2. Modifica i valori delle ombre

### Cambiare i Bordi Arrotondati

1. Cerca la sezione `BORDI E RAGGI` (circa linea 165)
2. Modifica i valori:

```css
--border-radius-piccolo: 4px;
--border-radius-medio: 8px;  /* Modifica questo */
--border-radius-grande: 12px;
```

## 📝 Esempi di Utilizzo

### Usare Variabili CSS

```css
/* Nel tuo componente CSS */
.mio-componente {
  background-color: var(--colore-primario);
  padding: var(--spaziatura-md);
  border-radius: var(--border-radius-medio);
  box-shadow: var(--ombra-card);
}
```

### Usare Classi Utility

```html
<div class="card card--hover">
  <h2 class="heading-2 testo-primario">Titolo</h2>
  <p class="text-normal">Contenuto</p>
  <button class="btn btn-primary btn-lg">Azione</button>
</div>
```

### Usare Componenti SGAMAPP

```html
<section class="sg-cards-wrap">
  <h2 class="sg-section-title">Tutte le Guide</h2>
  <div class="sg-card-grid">
    <div class="sg-card sg-guide-card">
      <!-- Contenuto card -->
    </div>
  </div>
</section>
```

## 🎨 Personalizzazione Rapida

### Tema Blu (Default)
I colori sono già impostati per un tema blu. Non serve modificare nulla.

### Tema Verde
Per cambiare a un tema verde, modifica nella sezione `COLORI BRAND PRINCIPALI`:

```css
--colore-primario: #10B981;  /* Verde */
--colore-primario-rgb: 16, 185, 129;
--colore-secondario: #34D399;
--colore-secondario-rgb: 52, 211, 153;
--colore-intermedio: #059669;
--colore-intermedio-rgb: 5, 150, 105;
```

### Tema Rosso
Per un tema rosso:

```css
--colore-primario: #EF4444;  /* Rosso */
--colore-primario-rgb: 239, 68, 68;
--colore-secondario: #F87171;
--colore-secondario-rgb: 248, 113, 113;
--colore-intermedio: #DC2626;
--colore-intermedio-rgb: 220, 38, 38;
```

## 📚 File CSS dei Componenti

I componenti individuali (es. `Navbar.css`, `SearchBar.css`, etc.) contengono **SOLO** stili specifici per quel componente che non possono essere generalizzati.

**Regola d'oro**: Se uno stile è usato in più di un componente, deve essere nel `DesignSystem.css`!

## 🚀 Per Chi Acquista il Sito

Se stai acquistando questo sito e vuoi personalizzarlo:

1. **Apri** `SgamAppFrontEnd/src/DesignSystem.css`
2. **Cerca** la sezione che vuoi modificare usando i commenti (es. `/* COLORI BRAND PRINCIPALI */`)
3. **Modifica** i valori
4. **Salva** e ricarica il sito

Tutto il sito si aggiornerà automaticamente!

## 📖 Documentazione Completa

Per una documentazione più dettagliata, consulta:
- `GUIDA_PALETTE.md` - Guida completa alle variabili CSS
- `DESIGN_SYSTEM_GUIDE.md` - Guida ai componenti

## ⚠️ Note Importanti

- **NON eliminare** le variabili CSS, solo modifica i loro valori
- **NON modificare** i nomi delle variabili (es. `--colore-primario`)
- Se aggiungi nuovi componenti, usa sempre le variabili CSS del Design System
- Per stili veramente specifici di un componente, puoi aggiungerli nel CSS del componente stesso

## 🎯 Best Practices

1. **Usa sempre le variabili CSS** invece di valori hardcoded
2. **Riutilizza i componenti** del Design System quando possibile
3. **Mantieni la coerenza** usando le classi utility
4. **Documenta** eventuali nuovi componenti aggiunti

---

**Creato per SGAMAPP - Design System Centralizzato**  
*Un solo file per controllare tutto il design del sito*

