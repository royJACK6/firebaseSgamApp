# 🎨 Sistema di Design - Palette CSS

## Introduzione

La **Palette CSS di SgamApp** è un sistema centralizzato che gestisce tutti i colori, gradienti, ombre, spaziature e stili dell'applicazione. Questo garantisce coerenza visiva e facilita la manutenzione del codice.

---

## 📁 File Principali

| File | Descrizione |
|------|-------------|
| `src/Palette.css` | **File principale** con tutte le variabili CSS |
| `src/GUIDA_PALETTE.md` | **Guida completa** all'uso della palette |
| `src/components/shared/PaletteShowcase.tsx` | **Componente demo** per visualizzare la palette |
| `COLORI_E_ICONE.md` | Documentazione design originale |

---

## 🚀 Quick Start

### 1. La Palette è Già Attiva

La palette è già importata automaticamente in `src/index.css`:

```css
@import './Palette.css';
```

Questo significa che puoi usare le variabili in **qualsiasi file CSS** del progetto!

### 2. Usa le Variabili CSS

Nel tuo file CSS, usa `var(--nome-variabile)`:

```css
.mio-bottone {
  background: var(--gradiente-blu-principale);
  color: var(--testo-bianco);
  border-radius: var(--border-radius-medio);
  padding: var(--spaziatura-md);
  box-shadow: var(--ombra-chatbot);
  transition: var(--transizione-all);
}

.mio-bottone:hover {
  box-shadow: var(--ombra-chatbot-hover);
  transform: translateY(-2px);
}
```

### 3. Usa le Classi Helper

Direttamente nell'HTML/JSX:

```jsx
<div className="sfondo-bianco ombra-card bordo-medio">
  <h2 className="testo-primario">Titolo</h2>
  <p className="testo-grigio-scuro">Contenuto</p>
  <button className="gradiente-blu testo-bianco">
    Clicca qui
  </button>
</div>
```

---

## 🎯 Variabili Più Comuni

### Colori

```css
--colore-primario          /* Blu #1565D6 */
--colore-secondario        /* Blu chiaro #64B5F6 */
--colore-successo          /* Verde #10B981 */
--colore-warning           /* Giallo #F59E0B */
--colore-errore            /* Rosso #EF4444 */
```

### Gradienti

```css
--gradiente-blu-principale
--gradiente-verde-successo
--gradiente-rosso-errore
```

### Ombre

```css
--ombra-card
--ombra-chatbot
--ombra-chatbot-hover
```

### Spaziature

```css
--spaziatura-xs    /* 4px */
--spaziatura-sm    /* 8px */
--spaziatura-md    /* 16px */
--spaziatura-lg    /* 24px */
--spaziatura-xl    /* 32px */
```

### Bordi

```css
--border-radius-piccolo    /* 4px */
--border-radius-medio      /* 8px */
--border-radius-grande     /* 12px */
```

---

## 👀 Visualizza la Palette

Per vedere tutti i colori e stili in azione, usa il componente **PaletteShowcase**:

### Opzione A: Route Temporanea

Nel tuo router (es. `App.tsx`):

```tsx
import PaletteShowcase from './components/shared/PaletteShowcase';

// Aggiungi una route:
<Route path="/palette" element={<PaletteShowcase />} />
```

Poi visita: `http://localhost:5173/palette`

### Opzione B: Rendering Diretto

In qualsiasi componente durante lo sviluppo:

```tsx
import PaletteShowcase from './components/shared/PaletteShowcase';

function TestPage() {
  return <PaletteShowcase />;
}
```

---

## 📖 Documentazione Completa

Per una guida dettagliata con esempi e best practices, consulta:

👉 **[src/GUIDA_PALETTE.md](./src/GUIDA_PALETTE.md)**

La guida include:
- Tutte le variabili disponibili
- Esempi di utilizzo completi
- Best practices
- Come usare le trasparenze RGBA
- Classi helper disponibili
- Esempi di componenti completi (bottoni, card, alert)

---

## 🛠️ Best Practices

### ✅ FARE

```css
/* ✅ Usa le variabili */
.elemento {
  background: var(--colore-primario);
  padding: var(--spaziatura-md);
  border-radius: var(--border-radius-medio);
}

/* ✅ Usa le classi helper */
<div className="sfondo-bianco ombra-card">...</div>

/* ✅ Usa le trasparenze con RGB */
.overlay {
  background-color: rgba(var(--colore-primario-rgb), 0.2);
}
```

### ❌ EVITARE

```css
/* ❌ NO: Valori hard-coded */
.elemento {
  background: #1565D6;
  padding: 17px;
  border-radius: 9px;
}

/* ❌ NO: Colori custom non documentati */
.elemento {
  background: #FF1234;
}

/* ❌ NO: Ombre inventate */
.elemento {
  box-shadow: 2px 3px 7px rgba(0,0,0,0.17);
}
```

---

## 🎨 Aggiungere Nuovi Colori

Se hai bisogno di un nuovo colore:

1. Apri `src/Palette.css`
2. Aggiungi nella sezione appropriata
3. Documenta l'uso con un commento
4. Aggiungi la versione RGB se serve trasparenza
5. Crea una classe helper se verrà usato spesso

**Esempio:**

```css
:root {
  /* Nuovo colore viola */
  --colore-viola: #8B5CF6;
  --colore-viola-rgb: 139, 92, 246;
}

/* Classe helper */
.testo-viola {
  color: var(--colore-viola) !important;
}

.sfondo-viola {
  background-color: var(--colore-viola) !important;
}
```

---

## 🎯 Struttura delle Variabili

La palette è organizzata in categorie:

1. **Colori Brand** - Colori principali dell'identità visiva
2. **Colori di Background** - Sfondi per sezioni e contenitori
3. **Colori di Testo** - Per testi di vario tipo
4. **Colori di Stato** - Successo, warning, errore
5. **Colori di Accessibilità** - Focus enhanced, high contrast
6. **Gradienti** - Gradienti pre-configurati
7. **Ombre** - Box shadow per vari elementi
8. **Bordi e Raggi** - Border radius standardizzati
9. **Spaziature** - Padding e margin consistenti
10. **Transizioni** - Durate e timing predefiniti
11. **Z-Index** - Livelli di stratificazione

---

## 🔄 Versioni RGB per Trasparenze

Ogni colore principale ha anche la versione RGB:

```css
--colore-primario: #1565D6;
--colore-primario-rgb: 21, 101, 214;
```

Questo permette di usare trasparenze facilmente:

```css
/* Sfondo blu semi-trasparente */
.elemento {
  background-color: rgba(var(--colore-primario-rgb), 0.2);
}

/* Bordo con opacità */
.elemento {
  border: 2px solid rgba(var(--colore-successo-rgb), 0.5);
}
```

---

## 💡 Esempi Pronti all'Uso

### Bottone Primario

```css
.btn-primario {
  background: var(--gradiente-blu-principale);
  color: var(--testo-bianco);
  padding: var(--spaziatura-sm) var(--spaziatura-lg);
  border: none;
  border-radius: var(--border-radius-medio);
  box-shadow: var(--ombra-chatbot);
  transition: var(--transizione-all);
  cursor: pointer;
}

.btn-primario:hover {
  box-shadow: var(--ombra-chatbot-hover);
  transform: translateY(-2px);
}
```

### Card Standard

```css
.card {
  background-color: var(--sfondo-bianco);
  border: 2px solid var(--sfondo-grigio-medio);
  border-radius: var(--border-radius-grande);
  padding: var(--spaziatura-lg);
  box-shadow: var(--ombra-card);
}
```

### Alert di Successo

```css
.alert-successo {
  background-color: rgba(var(--colore-successo-rgb), 0.1);
  border-left: 4px solid var(--colore-successo);
  color: var(--colore-successo-scuro);
  padding: var(--spaziatura-md);
  border-radius: var(--border-radius-medio);
}
```

---

## 🎓 Risorse Utili

- **Guida Completa**: `src/GUIDA_PALETTE.md`
- **Design System**: `COLORI_E_ICONE.md`
- **Componente Demo**: `src/components/shared/PaletteShowcase.tsx`
- **File Palette**: `src/Palette.css`

---

## 🤝 Contribuire

Se aggiungi nuovi colori o stili:

1. Mantieni la struttura esistente
2. Documenta l'uso con commenti chiari
3. Aggiungi esempi nella guida se appropriato
4. Aggiorna il componente PaletteShowcase se rilevante
5. Testa su tutti i breakpoint responsive

---

## 📞 Supporto

Per domande o problemi:

1. Consulta `src/GUIDA_PALETTE.md` per esempi dettagliati
2. Visualizza la palette in azione con PaletteShowcase
3. Controlla `COLORI_E_ICONE.md` per il design system completo

---

**Versione**: 1.0  
**Ultima modifica**: Novembre 2025  
**Progetto**: SgamApp - Frontend

---

<div align="center">

**🎨 Mantieni tutto coerente e bellissimo! 🎨**

</div>

