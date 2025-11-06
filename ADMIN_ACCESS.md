# 🔐 Accesso Area Amministratore - SgamApp

## Accesso all'area admin

L'area amministratore è nascosta e accessibile solo tramite URL specifico.

### URL di accesso
```
http://localhost:5173/sgam-admin-login
```

### Credenziali
- **Password**: `SgamAdmin2024!`

> ⚠️ **Nota**: In produzione, la password dovrebbe essere gestita tramite backend con autenticazione sicura.

## Funzionalità disponibili

Una volta effettuato il login, avrai accesso a:

### Dashboard Admin
- Panoramica delle sezioni disponibili
- Accesso rapido a Glossario e Traduttore

### Gestione Glossario
- ✅ Visualizza tutti i termini del glossario antifrode
- ➕ Aggiungi nuovi termini
- ✏️ Modifica termini esistenti
- 🗑️ Elimina termini
- Campi: Termine, Definizione, Categoria

### Gestione Traduttore Generazionale
- ✅ Visualizza tutte le traduzioni boomer ↔ slang
- ➕ Aggiungi nuove traduzioni
- ✏️ Modifica traduzioni esistenti
- 🗑️ Elimina traduzioni
- Campi: Parola Boomer, Parola Slang

## Struttura delle rotte

```
/sgam-admin-login                    → Pagina di login (pubblica)
/admin-dashboard                     → Dashboard principale (protetta)
/admin-dashboard/glossario           → Gestione Glossario (protetta)
/admin-dashboard/traduttore          → Gestione Traduttore (protetta)
```

## Sicurezza

- Le rotte admin sono protette dal componente `ProtectedRoute`
- L'autenticazione è gestita tramite `AuthContext`
- Lo stato di autenticazione è salvato in `sessionStorage`
- Il logout elimina la sessione e reindirizza alla home
- Le pagine admin non mostrano navbar, header e footer

## Logout

Per uscire dall'area admin:
1. Clicca sul pulsante "Logout" nella dashboard
2. Oppure chiudi il browser (la sessione si chiuderà automaticamente)

## Connessione al Backend

Assicurati che il backend sia in esecuzione su:
```
http://localhost:5147
```

### API utilizzate

**Glossario**
- GET `/api/Glossary/GetAll` - Ottieni tutti i termini
- POST `/api/Glossary/Add` - Aggiungi termine
- PUT `/api/Glossary/Update/{id}` - Aggiorna termine
- DELETE `/api/Glossary/Delete/{id}` - Elimina termine

**Traduttore**
- GET `/api/Translator/GetAll` - Ottieni tutte le traduzioni
- POST `/api/Translator/Add` - Aggiungi traduzione
- PUT `/api/Translator/Update/{id}` - Aggiorna traduzione
- DELETE `/api/Translator/Delete/{id}` - Elimina traduzione

## Miglioramenti futuri

Per una versione di produzione, si consiglia di:

1. **Autenticazione Backend**: Implementare un sistema di login con JWT
2. **Password Hash**: Non salvare password in chiaro nel frontend
3. **Ruoli e Permessi**: Differenziare livelli di accesso (admin, editor, viewer)
4. **Audit Log**: Tracciare tutte le modifiche effettuate
5. **Validazione**: Aggiungere validazione avanzata dei dati
6. **Conferme**: Aggiungere modal di conferma per operazioni critiche
7. **Paginazione**: Per gestire grandi quantità di dati
8. **Ricerca e Filtri**: Nell'interfaccia admin

## Supporto

Per problemi o domande sull'area admin, contatta il team di sviluppo.

