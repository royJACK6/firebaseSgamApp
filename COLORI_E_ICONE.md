# 🎨 Guida ai Colori e Icone - SgamApp

## 📋 Indice

1. [Palette Colori Principale](#palette-colori-principale)
2. [Colori per Stati e Feedback](#colori-per-stati-e-feedback)
3. [Gradienti](#gradienti)
4. [Icone FontAwesome](#icone-fontawesome)
5. [Asset Immagini](#asset-immagini)

---

## 🎨 Palette Colori Principale

### Colori Brand

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Blu Primario** | `#1565D6` | `rgb(21, 101, 214)` | Colore principale brand, bottoni, link, focus |
| **Blu Secondario** | `#64B5F6` | `rgb(100, 181, 246)` | Accenti, gradienti, hover states |
| **Blu Intermedio** | `#1976D2` | `rgb(25, 118, 210)` | Variante intermedia per gradienti |

### Colori di Background

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Sfondo Principale** | `#F4F4FA` | `rgb(244, 244, 250)` | Background principale del sito |
| **Bianco** | `#FFFFFF` | `rgb(255, 255, 255)` | Card, modali, contenuti |
| **Grigio Chiaro** | `#F8F9FA` | `rgb(248, 249, 250)` | Background secondari |
| **Grigio Medio** | `#E2E8F0` | `rgb(226, 232, 240)` | Bordi, separatori |
| **Grigio Scuro** | `#333333` | `rgb(51, 51, 51)` | Testi secondari, hover states |

### Colori di Testo

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Nero** | `#000000` | `rgb(0, 0, 0)` | Testi principali, high contrast mode |
| **Grigio Scuro Testo** | `#224466` | `rgb(34, 68, 102)` | Testi alternativi |

---

## ✅ Colori per Stati e Feedback

### Stati di Successo

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Verde Successo** | `#10B981` | `rgb(16, 185, 129)` | Messaggi di successo, conferme |
| **Verde Successo Scuro** | `#059669` | `rgb(5, 150, 105)` | Hover/active su elementi verdi |

### Stati di Avvertimento

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Giallo/Ambra** | `#F59E0B` | `rgb(245, 158, 11)` | Avvertimenti, status checking |
| **Giallo Chiaro** | `#FBBF24` | `rgb(251, 191, 36)` | LED status "dormendo", "verifica" |
| **Giallo Scuro** | `#D97706` | `rgb(217, 119, 6)` | Hover/active su elementi gialli |

### Stati di Errore

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Rosso Errore** | `#EF4444` | `rgb(239, 68, 68)` | Errori, cancellazioni |
| **Rosso Medio** | `#DC2626` | `rgb(220, 38, 38)` | Hover su elementi rossi |
| **Rosso Scuro** | `#B91C1C` | `rgb(185, 28, 28)` | Active su elementi rossi |

### Colori per Accessibilità

| Colore | Codice HEX | RGB | Utilizzo |
|--------|-----------|-----|----------|
| **Focus Rosso** | `#FF0000` | `rgb(255, 0, 0)` | Enhanced focus mode |
| **Link Blu** | `#0000FF` | `rgb(0, 0, 255)` | Link in high contrast mode |
| **Visited Viola** | `#551A8B` | `rgb(85, 26, 139)` | Link visitati in high contrast |

---

## 🌈 Gradienti

### Gradienti Principali

```css
/* Gradiente Blu Principale */
linear-gradient(135deg, #1565D6 0%, #64B5F6 100%)
```
**Utilizzo**: Bottoni principali, chatbot, elementi interattivi

```css
/* Gradiente Blu Alternativo */
linear-gradient(135deg, #1976D2, #1565D6)
```
**Utilizzo**: Variazioni su elementi secondari

```css
/* Gradiente Rosso Errore */
linear-gradient(135deg, #EF4444 0%, #DC2626 100%)
```
**Utilizzo**: Bottoni di eliminazione, azioni pericolose

```css
/* Gradiente Verde Successo */
linear-gradient(135deg, #10B981 0%, #059669 100%)
```
**Utilizzo**: Conferme, azioni positive

```css
/* Gradiente Grigio Chiaro */
linear-gradient(135deg, #F0F4F8 0%, #E2E8F0 100%)
```
**Utilizzo**: Background subtili, elementi disabilitati

```css
/* Gradiente Verticale Bianco */
linear-gradient(to bottom, #F8F9FA 0%, #FFFFFF 100%)
```
**Utilizzo**: Background modali, transizioni verticali

---

## 🎯 Icone FontAwesome

### Icone Principali (Solid)

#### Navigazione e UI

| Icona | Codice | Utilizzo |
|-------|--------|----------|
| ❌ | `faTimes` | Chiusura modali, rimozione elementi |
| 🔽 | `faChevronDown` | Dropdown, accordion (chiusi) |
| 🔼 | `faChevronUp` | Dropdown, accordion (aperti) |
| 📚 | `faBook` | Icona guide, documentazione |

#### Accessibilità

| Icona | Codice | Utilizzo |
|-------|--------|----------|
| ♿ | `faUniversalAccess` | Accessibilità principale |
| 🔤 | `faFont` | Dimensioni carattere |
| 🎨 | `faPalette` | Contrasto e colori |
| 🔗 | `faLink` | Sottolineatura link |
| ⏹️ | `faStop` | Stop animazioni |
| ⚫ | `faCircle` | Indicatori di stato |

#### Funzionalità

| Icona | Codice | Utilizzo |
|-------|--------|----------|
| 🤖 | `faRobot` | Chatbot, assistente virtuale |
| 🛡️ | `faShieldAlt` | Sicurezza, protezione |
| 👁️ | `faEye` | Visualizzazione, privacy |
| ✅ | `faCheckCircle` | Conferme, successi |
| ⚠️ | `faExclamationTriangle` | Avvertimenti |
| 📋 | `faClipboardCheck` | Verifiche, checklist |
| 👤 | `faUserShield` | Sicurezza utente |
| 💡 | `faLightbulb` | Suggerimenti, idee |
| 📖 | `faBookOpen` | Guide aperte, lettura |
| 🔊 | `faVolumeUp` | Text-to-Speech, audio |

#### Chatbot Specifiche

| Icona | Codice | Utilizzo |
|-------|--------|----------|
| 📷 | `faCamera` | Upload immagini |
| 📎 | `faPaperclip` | Allegati |
| 📤 | `faPaperPlane` | Invio messaggi |

---

## 🖼️ Asset Immagini

### Loghi Principali

| File | Descrizione |
|------|-------------|
| `logo.svg` | Logo principale SGAMAPP |
| `sgamy-logo.png` | Logo Sgamy (chatbot) |
| `logos.png` | Loghi istituzionali e partner |

### Icone Sgamy (Tematiche)

| File | Descrizione | Utilizzo |
|------|-------------|----------|
| `SGAMY_SPID.png` | Sgamy per SPID | Guida SPID |
| `SGAMY_PEC.png` | Sgamy per PEC | Guida PEC |
| `SGAMY_CIE.png` | Sgamy per CIE | Guida CIE |
| `SGAMY_POLLICE.png` | Sgamy pollice su | Pagamenti, Primo Accesso |
| `SGAMY_PASSWORD.png` | Sgamy password | Recupero Password |
| `SGAMY_PASSWORD_VARIANT.png` | Sgamy password variante | Anagrafe Digitale |
| `SGAMY_CERTFICATI.png` | Sgamy certificati | Certificati Online |
| `SGAMY_ANAGRAFE.png` | Sgamy anagrafe | Servizi anagrafici |
| `SGAMY_SCUDO.png` | Sgamy scudo | Sicurezza |
| `SGAMY_OCCHIOLINO.png` | Sgamy occhiolino | Elementi amichevoli |
| `SGAMY_NONNINA.png` | Sgamy con nonnina | Target anziani |

---

## 🎨 Palette RGBA (con trasparenza)

### Blu con Trasparenza

```css
rgba(21, 101, 214, 0.2)   /* Focus outline shadow */
rgba(21, 101, 214, 0.15)  /* Input focus shadow */
rgba(21, 101, 214, 0.25)  /* Hover states */
rgba(21, 101, 214, 0.4)   /* Shadow bottoni chatbot */
rgba(21, 101, 214, 0.5)   /* Shadow bottoni hover */
```

### Stati con Trasparenza

```css
/* Checking/Warning (Giallo) */
rgba(251, 191, 36, 0.25)  /* Background status */
rgba(251, 191, 36, 0.4)   /* Border status */
rgba(251, 191, 36, 0.6)   /* LED shadow */

/* Online (Verde) */
rgba(16, 185, 129, 0.25)  /* Background status */
rgba(16, 185, 129, 0.4)   /* Border status */

/* Offline (ex-Rosso, ora Giallo) */
rgba(251, 191, 36, 0.25)  /* Background status */
rgba(251, 191, 36, 0.4)   /* Border status */

/* Focus Avanzato (Rosso) */
rgba(255, 0, 0, 0.5)      /* Focus shadow enhanced */
```

### Grigi e Ombre

```css
rgba(0, 0, 0, 0.05)       /* Ombre leggere */
rgba(0, 0, 0, 0.1)        /* Ombre medie */
rgba(0, 0, 0, 0.15)       /* Ombre pronunciate */
rgba(0, 0, 0, 0.2)        /* Ombre scure */

rgba(255, 255, 255, 0.4)  /* Bordi bianchi semi-trasparenti */
rgba(255, 255, 255, 0.1)  /* Background overlay chiari */
```

---

## 📐 Box Shadow Standards

```css
/* Bottoni Chatbot */
box-shadow: 0 4px 12px rgba(21, 101, 214, 0.4);

/* Bottoni Chatbot Hover */
box-shadow: 0 6px 20px rgba(21, 101, 214, 0.5);

/* Card ed Elementi */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

/* Focus Enhanced */
box-shadow: 0 0 0 2px #ffffff, 0 0 0 6px #ff0000, 0 0 0 10px rgba(255, 0, 0, 0.5);

/* LED Status Indicators */
box-shadow: 0 0 10px rgba(251, 191, 36, 0.6);  /* Giallo */
box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);  /* Verde */
```

---

## 🔤 Font Family

```css
font-family: 'Montserrat', sans-serif !important;
```

**Pesi disponibili**: 300, 400, 500, 600, 700

---

## 📱 Breakpoints Responsive

```css
@media (max-width: 768px)  /* Tablet */
@media (max-width: 480px)  /* Mobile */
```

---

## 🎯 Note di Utilizzo

### Convenzioni

1. **Colori Primari**: Usare `#1565D6` per tutti gli elementi interattivi principali
2. **Gradienti**: Preferire gradienti 135deg per coerenza visiva
3. **Focus States**: Sempre outline blu `#1565D6` da 3px, offset 2px
4. **Accessibilità**: Mantenere contrasto WCAG AA (4.5:1 per testo normale)
5. **Stati Server**: 
   - Giallo (`#FBBF24`) per "checking" e "dormendo"
   - Verde (`#10B981`) per "online/operativo"
   - Rosso (`#EF4444`) solo per errori critici

### Icone

1. **FontAwesome Solid**: Libreria principale per icone UI
2. **Asset Sgamy**: Utilizzare per elementi brand-specific e guide
3. **Lazy Loading**: Sempre `loading="lazy"` per immagini non critiche
4. **Alt Text**: Descrizioni dettagliate per accessibilità

---

**Ultima modifica**: 7 Novembre 2025  
**Versione**: 1.0  
**Progetto**: SgamApp - Frontend

