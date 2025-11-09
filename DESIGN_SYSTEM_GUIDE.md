# 🎨 SGAMAPP - Design System Guide

## 📝 Panoramica

Il file `Palette.css` è stato espanso per includere un **Design System completo** con componenti riutilizzabili, utility classes e animazioni. 

Questo approccio centralizzato permette di:
- ✅ Cambiare colori/stili da un unico punto
- ✅ Mantenere consistenza visiva in tutto il progetto
- ✅ Ridurre duplicazione di codice
- ✅ Facilitare la manutenzione futura

## 📚 Contenuto del Design System

### 1. **Variabili CSS** (`:root`)
- Colori brand (primario, secondario, intermedio)
- Colori di background
- Colori di testo
- Colori per stati (successo, warning, errore)
- Gradienti
- Ombre
- Border radius
- Spaziature
- Transizioni
- Z-index

### 2. **Typography System**
```html
<h1 class="heading-1">Titolo Principale</h1>
<h2 class="heading-2">Sottotitolo</h2>
<p class="text-large">Testo grande</p>
<p class="text-normal">Testo normale</p>
<span class="text-small text-bold">Piccolo e grassetto</span>
```

**Classi disponibili:**
- `.heading-1`, `.heading-2`, `.heading-3`, `.heading-4`
- `.text-large`, `.text-normal`, `.text-small`, `.text-tiny`
- `.text-center`, `.text-left`, `.text-right`
- `.text-bold`, `.text-semibold`, `.text-medium`
- `.text-uppercase`, `.text-capitalize`

### 3. **Button System**
```html
<!-- Bottoni primari -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secondario</button>
<button class="btn btn-success">Successo</button>
<button class="btn btn-danger">Pericolo</button>
<button class="btn btn-warning">Avvertimento</button>

<!-- Bottoni outline -->
<button class="btn btn-outline-primary">Outline</button>

<!-- Dimensioni -->
<button class="btn btn-primary btn-sm">Piccolo</button>
<button class="btn btn-primary">Normale</button>
<button class="btn btn-primary btn-lg">Grande</button>
<button class="btn btn-primary btn-block">Full Width</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabilitato</button>
```

### 4. **Card System**
```html
<!-- Card base -->
<div class="card">
  <h3>Titolo Card</h3>
  <p>Contenuto della card</p>
</div>

<!-- Card con hover effect -->
<div class="card card--hover">
  Contenuto
</div>

<!-- Card con header e footer -->
<div class="card card-primary">
  <div class="card-header">Header</div>
  <div class="card-body">Body</div>
  <div class="card-footer">Footer</div>
</div>

<!-- Card dimensioni -->
<div class="card card--small">Piccola</div>
<div class="card card--medium">Media</div>
<div class="card card--large">Grande</div>

<!-- Card speciali -->
<div class="card card-success">Card Successo</div>
<div class="card card-warning">Card Warning</div>
<div class="card card-danger">Card Pericolo</div>
```

### 5. **Form Elements**
```html
<div class="form-group">
  <label class="form-label">Nome</label>
  <input type="text" class="input" placeholder="Inserisci nome" />
  <span class="form-helper">Questo è un testo di aiuto</span>
</div>

<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="input input-lg" />
  <span class="form-error">Email non valida</span>
</div>

<div class="form-group">
  <label class="form-label">Messaggio</label>
  <textarea class="textarea"></textarea>
</div>

<div class="form-group">
  <label class="checkbox">
    <input type="checkbox" />
    Accetto i termini
  </label>
</div>
```

### 6. **Layout Utilities**
```html
<!-- Flexbox -->
<div class="flex justify-between items-center gap-md">
  <div>Sinistra</div>
  <div>Destra</div>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-lg">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>

<!-- Spacing -->
<div class="mt-lg mb-md px-lg py-md">
  Contenuto con spaziature
</div>

<!-- Width & Max-width -->
<div class="w-full max-w-lg m-auto">
  Contenitore centrato
</div>
```

**Utility classes disponibili:**
- **Flexbox**: `.flex`, `.flex-column`, `.justify-center`, `.items-center`, `.gap-md`
- **Grid**: `.grid`, `.grid-cols-2`, `.grid-cols-3`, `.grid-cols-4`
- **Display**: `.block`, `.inline-block`, `.hidden`
- **Position**: `.relative`, `.absolute`, `.fixed`, `.sticky`
- **Margins**: `.mt-sm`, `.mb-lg`, `.m-auto`, etc.
- **Paddings**: `.p-md`, `.px-lg`, `.py-sm`, etc.

### 7. **Navigation**
```html
<!-- Tabs -->
<div class="tabs">
  <button class="tab tab-active">Tab 1</button>
  <button class="tab">Tab 2</button>
  <button class="tab">Tab 3</button>
</div>

<!-- Breadcrumb -->
<nav class="breadcrumb">
  <span class="breadcrumb-item">
    <a href="/">Home</a>
  </span>
  <span class="breadcrumb-separator"></span>
  <span class="breadcrumb-item">
    <a href="/guide">Guide</a>
  </span>
  <span class="breadcrumb-separator"></span>
  <span class="breadcrumb-item">SPID</span>
</nav>
```

### 8. **Modals**
```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Titolo Modale</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Contenuto del modale</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Annulla</button>
      <button class="btn btn-primary">Conferma</button>
    </div>
  </div>
</div>
```

### 9. **Alerts & Notifications**
```html
<div class="alert alert-success">
  Operazione completata con successo!
</div>

<div class="alert alert-warning">
  Attenzione: controlla i dati inseriti
</div>

<div class="alert alert-danger">
  Errore: impossibile salvare
</div>

<div class="alert alert-info">
  Informazione utile per l'utente
</div>
```

### 10. **Badges**
```html
<span class="badge badge-primary">Primario</span>
<span class="badge badge-success">Successo</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Errore</span>
<span class="badge badge-primary badge-pill">Pill</span>
```

### 11. **Loading Spinner**
```html
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>
<div class="spinner spinner-lg"></div>
```

### 12. **Animations**
```html
<div class="animate-fade-in">Fade In</div>
<div class="animate-fade-in-up">Fade In Up</div>
<div class="animate-slide-left">Slide Left</div>
<div class="animate-pulse">Pulse</div>
<div class="animate-spin">Spin (per loading)</div>
```

### 13. **Responsive Utilities**
```html
<div class="hide-mobile">Nascosto su mobile</div>
<div class="hide-tablet">Nascosto su tablet</div>
<div class="hide-desktop">Nascosto su desktop</div>
<div class="show-mobile-only">Visibile solo su mobile</div>
```

## 🎯 Come Usare il Design System

### Esempio Completo: Form di Login
```html
<div class="card max-w-md m-auto mt-xl">
  <div class="card-header">
    <h2 class="heading-3 m-0">Accedi</h2>
  </div>
  <div class="card-body">
    <form>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="input" placeholder="tua@email.com" />
      </div>
      
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" class="input" />
      </div>
      
      <div class="form-group">
        <label class="checkbox">
          <input type="checkbox" />
          Ricordami
        </label>
      </div>
      
      <button type="submit" class="btn btn-primary btn-block">
        Accedi
      </button>
    </form>
  </div>
</div>
```

### Esempio: Grid di Cards
```html
<div class="grid grid-cols-3 gap-lg p-lg">
  <div class="card card--hover animate-fade-in-up">
    <h3 class="heading-4">Servizio 1</h3>
    <p class="text-normal">Descrizione del servizio</p>
    <button class="btn btn-primary btn-sm mt-md">Scopri di più</button>
  </div>
  
  <div class="card card--hover animate-fade-in-up">
    <h3 class="heading-4">Servizio 2</h3>
    <p class="text-normal">Descrizione del servizio</p>
    <button class="btn btn-primary btn-sm mt-md">Scopri di più</button>
  </div>
  
  <div class="card card--hover animate-fade-in-up">
    <h3 class="heading-4">Servizio 3</h3>
    <p class="text-normal">Descrizione del servizio</p>
    <button class="btn btn-primary btn-sm mt-md">Scopri di più</button>
  </div>
</div>
```

## 🔧 Prossimi Passi

### Opzione 1: **Uso Graduale** (Consigliato)
Inizia ad usare le classi del design system nei nuovi componenti e aggiorna gradualmente quelli esistenti.

### Opzione 2: **Migrazione Completa**
Sostituisci progressivamente gli stili custom nei singoli file CSS con le classi del design system.

## 💡 Vantaggi

1. **Consistenza**: Tutti i componenti usano gli stessi colori, spaziature e stili
2. **Manutenibilità**: Cambio un valore in `Palette.css` e si aggiorna ovunque
3. **Velocità**: Sviluppo più rapido usando classi pre-costruite
4. **Scalabilità**: Facile aggiungere nuovi componenti seguendo il pattern
5. **Accessibilità**: Tutti i componenti sono pensati per essere accessibili

## 📖 Naming Convention

- **Variabili CSS**: `--nome-descrittivo` (es: `--colore-primario`)
- **Classi utility**: `proprietà-valore` (es: `.mt-lg`, `.flex`)
- **Componenti**: `nome-componente` (es: `.btn`, `.card`)
- **Modificatori**: `nome-componente--modificatore` (es: `.card--hover`)
- **Sottoelementi**: `nome-componente-parte` (es: `.card-header`)

Vuoi che proceda con l'espansione effettiva del file `Palette.css`? 🚀

