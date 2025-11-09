# 🎨 Guida all'Uso della Palette CSS

## Introduzione

La palette CSS di SgamApp è stata creata per garantire **coerenza visiva** in tutta l'applicazione. Tutti i colori, gradienti, ombre e spaziature sono centralizzati nel file `src/Palette.css`.

---

## Come Usare le Variabili CSS

### Nei tuoi file CSS

Usa `var(--nome-variabile)` per applicare i colori:

```css
.mio-componente {
  background-color: var(--colore-primario);
  color: var(--testo-bianco);
  border-radius: var(--border-radius-medio);
  box-shadow: var(--ombra-card);
}
```

### Direttamente nell'HTML

Puoi usare le classi helper già pronte:

```html
<div class="sfondo-bianco ombra-card bordo-medio">
  <h2 class="testo-primario">Titolo Blu</h2>
  <p class="testo-grigio-scuro">Testo normale</p>
  <button class="gradiente-blu testo-bianco">Bottone</button>
</div>
```

---

## Categorie di Variabili

### 1️⃣ Colori Brand

```css
--colore-primario: #1565D6       /* Blu principale */
--colore-secondario: #64B5F6     /* Blu chiaro */
--colore-intermedio: #1976D2     /* Blu medio */
```

**Esempio:**
```css
.bottone-principale {
  background-color: var(--colore-primario);
  color: var(--testo-bianco);
}
```

---

### 2️⃣ Colori di Background

```css
--sfondo-principale: #F4F4FA     /* Sfondo pagina principale */
--sfondo-bianco: #FFFFFF         /* Card, modali */
--sfondo-grigio-chiaro: #F8F9FA  /* Background secondari */
--sfondo-grigio-medio: #E2E8F0   /* Bordi, separatori */
--sfondo-grigio-scuro: #333333   /* Hover scuri */
```

**Esempio:**
```css
.card {
  background-color: var(--sfondo-bianco);
  border: 2px solid var(--sfondo-grigio-medio);
}
```

---

### 3️⃣ Colori di Testo

```css
--testo-nero: #000000            /* Testo principale */
--testo-grigio-scuro: #224466    /* Testo secondario */
--testo-bianco: #FFFFFF          /* Testo su sfondo scuro */
```

**Esempio:**
```css
h1 {
  color: var(--testo-nero);
}

p {
  color: var(--testo-grigio-scuro);
}
```

---

### 4️⃣ Colori di Stato

#### ✅ Successo
```css
--colore-successo: #10B981
--colore-successo-scuro: #059669
```

#### ⚠️ Avvertimento
```css
--colore-warning: #F59E0B
--colore-warning-chiaro: #FBBF24
--colore-warning-scuro: #D97706
```

#### ❌ Errore
```css
--colore-errore: #EF4444
--colore-errore-medio: #DC2626
--colore-errore-scuro: #B91C1C
```

**Esempio:**
```css
.messaggio-successo {
  background-color: var(--colore-successo);
  color: var(--testo-bianco);
}

.bottone-elimina {
  background: var(--gradiente-rosso-errore);
}

.avviso {
  border-left: 4px solid var(--colore-warning);
}
```

---

### 5️⃣ Gradienti

```css
--gradiente-blu-principale       /* Per bottoni, chatbot */
--gradiente-blu-alternativo       /* Elementi secondari */
--gradiente-verde-successo        /* Conferme */
--gradiente-rosso-errore          /* Azioni pericolose */
--gradiente-grigio-chiaro         /* Background subtili */
--gradiente-verticale-bianco      /* Modali */
```

**Esempio:**
```css
.bottone-chatbot {
  background: var(--gradiente-blu-principale);
  color: var(--testo-bianco);
  box-shadow: var(--ombra-chatbot);
  transition: var(--transizione-all);
}

.bottone-chatbot:hover {
  box-shadow: var(--ombra-chatbot-hover);
  transform: translateY(-2px);
}
```

---

### 6️⃣ Ombre (Box Shadow)

```css
--ombra-leggera         /* Ombre molto sottili */
--ombra-media           /* Ombre standard */
--ombra-card            /* Per card */
--ombra-pronunciata     /* Ombre più evidenti */
--ombra-scura           /* Ombre molto scure */
--ombra-chatbot         /* Per bottoni chatbot */
--ombra-chatbot-hover   /* Hover bottoni chatbot */
--ombra-led-giallo      /* LED status gialli */
--ombra-led-verde       /* LED status verdi */
```

**Esempio:**
```css
.card {
  box-shadow: var(--ombra-card);
}

.card:hover {
  box-shadow: var(--ombra-pronunciata);
  transform: translateY(-4px);
  transition: var(--transizione-all);
}
```

---

### 7️⃣ Bordi e Raggi

```css
--border-radius-piccolo: 4px
--border-radius-medio: 8px
--border-radius-grande: 12px
--border-radius-xl: 16px
--border-radius-rotondo: 50%

--border-sottile: 1px
--border-normale: 2px
--border-spesso: 3px
```

**Esempio:**
```css
.bottone {
  border-radius: var(--border-radius-medio);
  border: var(--border-normale) solid var(--colore-primario);
}

.avatar {
  border-radius: var(--border-radius-rotondo);
}
```

---

### 8️⃣ Spaziature

```css
--spaziatura-xs: 4px
--spaziatura-sm: 8px
--spaziatura-md: 16px
--spaziatura-lg: 24px
--spaziatura-xl: 32px
--spaziatura-xxl: 48px
```

**Esempio:**
```css
.contenitore {
  padding: var(--spaziatura-lg);
  margin-bottom: var(--spaziatura-xl);
}

.testo {
  margin: var(--spaziatura-sm) 0;
}
```

---

### 9️⃣ Transizioni

```css
--transizione-rapida: 0.15s ease
--transizione-normale: 0.3s ease
--transizione-lenta: 0.5s ease
--transizione-all: all 0.3s ease
--transizione-colore: color 0.3s ease, background-color 0.3s ease
--transizione-transform: transform 0.3s ease
```

**Esempio:**
```css
.bottone {
  transition: var(--transizione-all);
}

.bottone:hover {
  transform: scale(1.05);
}

.link {
  transition: var(--transizione-colore);
}
```

---

### 🔟 Z-Index (Livelli)

```css
--z-index-base: 1
--z-index-dropdown: 100
--z-index-navbar: 500
--z-index-modal-backdrop: 999
--z-index-modal: 1000
--z-index-tooltip: 1500
--z-index-focus-enhanced: 9999
```

**Esempio:**
```css
.navbar {
  z-index: var(--z-index-navbar);
}

.modal {
  z-index: var(--z-index-modal);
}
```

---

## Usare Trasparenze (Alpha)

Ogni colore ha anche la versione RGB disponibile. Per usare le trasparenze:

```css
/* Sfondo blu semi-trasparente */
.overlay {
  background-color: rgba(var(--colore-primario-rgb), 0.2);
}

/* Bordo verde con trasparenza */
.elemento {
  border: 2px solid rgba(var(--colore-successo-rgb), 0.4);
}

/* Testo nero con opacità ridotta */
.testo-leggero {
  color: rgba(var(--testo-nero-rgb), 0.6);
}
```

---

## Classi Helper Pronte

### Colori di Testo
```html
<p class="testo-primario">Testo blu primario</p>
<p class="testo-successo">Testo verde successo</p>
<p class="testo-errore">Testo rosso errore</p>
<p class="testo-warning">Testo giallo warning</p>
```

### Colori di Sfondo
```html
<div class="sfondo-primario">Sfondo blu</div>
<div class="sfondo-bianco">Sfondo bianco</div>
<div class="sfondo-grigio-chiaro">Sfondo grigio</div>
```

### Gradienti
```html
<button class="gradiente-blu testo-bianco">Bottone con gradiente</button>
<div class="gradiente-verde">Successo con gradiente</div>
```

### Ombre
```html
<div class="ombra-card">Card con ombra</div>
<div class="ombra-pronunciata">Elemento sollevato</div>
```

### Bordi
```html
<div class="bordo-medio">Bordo arrotondato medio</div>
<img class="bordo-rotondo" src="avatar.jpg" />
```

---

## Esempi Completi

### Bottone Primario
```css
.bottone-primario {
  background: var(--gradiente-blu-principale);
  color: var(--testo-bianco);
  border: none;
  border-radius: var(--border-radius-medio);
  padding: var(--spaziatura-sm) var(--spaziatura-lg);
  box-shadow: var(--ombra-chatbot);
  transition: var(--transizione-all);
  cursor: pointer;
}

.bottone-primario:hover {
  box-shadow: var(--ombra-chatbot-hover);
  transform: translateY(-2px);
}

.bottone-primario:focus-visible {
  outline: 3px solid var(--colore-primario);
  outline-offset: 2px;
}
```

### Card Standard
```css
.card {
  background-color: var(--sfondo-bianco);
  border: var(--border-normale) solid var(--sfondo-grigio-medio);
  border-radius: var(--border-radius-grande);
  padding: var(--spaziatura-lg);
  box-shadow: var(--ombra-card);
  transition: var(--transizione-all);
}

.card:hover {
  box-shadow: var(--ombra-pronunciata);
  transform: translateY(-4px);
}

.card-titolo {
  color: var(--colore-primario);
  margin-bottom: var(--spaziatura-md);
}

.card-testo {
  color: var(--testo-grigio-scuro);
  line-height: 1.6;
}
```

### Alert di Successo
```css
.alert-successo {
  background-color: rgba(var(--colore-successo-rgb), 0.1);
  border-left: 4px solid var(--colore-successo);
  border-radius: var(--border-radius-medio);
  padding: var(--spaziatura-md);
  color: var(--colore-successo-scuro);
}
```

### Alert di Errore
```css
.alert-errore {
  background-color: rgba(var(--colore-errore-rgb), 0.1);
  border-left: 4px solid var(--colore-errore);
  border-radius: var(--border-radius-medio);
  padding: var(--spaziatura-md);
  color: var(--colore-errore-scuro);
}
```

### Indicatore LED Status
```css
.led-status {
  width: 12px;
  height: 12px;
  border-radius: var(--border-radius-rotondo);
  display: inline-block;
}

.led-online {
  background-color: var(--colore-successo);
  box-shadow: var(--ombra-led-verde);
}

.led-warning {
  background-color: var(--colore-warning-chiaro);
  box-shadow: var(--ombra-led-giallo);
}
```

---

## Best Practices

### ✅ FARE

- Usa sempre le variabili della palette invece di valori hard-coded
- Combina le classi helper per risultati rapidi
- Usa le trasparenze RGBA per overlay e stati hover
- Mantieni coerenza usando sempre gli stessi bordi e spaziature

**Esempio buono:**
```css
.bottone {
  background: var(--gradiente-blu-principale);
  padding: var(--spaziatura-md);
  border-radius: var(--border-radius-medio);
}
```

### ❌ EVITARE

- Non usare colori hard-coded come `#1565D6` direttamente
- Non creare valori di spaziatura casuali (usa le variabili)
- Non inventare nuove ombre o gradienti senza aggiornare la palette

**Esempio da evitare:**
```css
.bottone {
  background: #1565D6;  /* ❌ NO! */
  padding: 13px;        /* ❌ NO! Usa var(--spaziatura-md) */
  border-radius: 9px;   /* ❌ NO! Usa var(--border-radius-medio) */
}
```

---

## Aggiungere Nuovi Colori

Se hai bisogno di un nuovo colore:

1. Aprì `src/Palette.css`
2. Aggiungi la variabile nella sezione appropriata
3. Aggiungi anche la versione RGB se serve trasparenza
4. Documenta l'uso nella sezione commenti
5. Considera di creare una classe helper se il colore sarà usato spesso

**Esempio:**
```css
:root {
  /* Nuovo colore arancione */
  --colore-arancione: #FF6B35;
  --colore-arancione-rgb: 255, 107, 53;
}

/* Classe helper */
.testo-arancione { 
  color: var(--colore-arancione) !important; 
}
```

---

## Supporto e Domande

Se hai dubbi sull'uso della palette o hai bisogno di aiuto, consulta:

- `src/Palette.css` - File principale con tutte le variabili
- `COLORI_E_ICONE.md` - Documentazione completa dei colori del progetto

---

**Buon lavoro e mantieni tutto coerente! 🎨**

