// Usa il proxy configurato in vite.config.ts per evitare problemi CORS
// In sviluppo: /api viene reindirizzato a http://localhost:5147
// In produzione: cambiare questo valore con l'URL del backend
const API_BASE_URL = 'https://sgamapp.onrender.com/api';

export interface GlossaryModel {
  id?: number;
  term: string;
  definition: string;
  category: string;
}

export interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchPage {
  id: number;
  title: string;
  keywords: string[];
  route: string;
  category: string;
}

export const glossaryApi = {
  getAll: async (): Promise<GlossaryTerm[]> => {
    try {
      const url = `${API_BASE_URL}/Glossary/GetAll`;
      console.log('🔍 Chiamata API getAll (Glossario):', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Risposta status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Risposta errore:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const backendData = await response.json();
      console.log('✅ Dati grezzi dal backend:', backendData);
      console.log('📦 Primo elemento:', backendData[0]);
      
      if (!Array.isArray(backendData)) {
        return [];
      }
      
      // Mappa i campi del backend al formato del frontend
      const mappedData: GlossaryTerm[] = backendData.map((item: Partial<GlossaryTerm> & { 
        Term?: string; 
        description?: string;
        Description?: string; 
        Definition?: string; 
        Category?: string;
        CreatedAt?: string;
        UpdatedAt?: string;
      }) => ({
        id: item.id || 0,
        term: item.term || item.Term || '',
        definition: item.definition || item.description || item.Description || item.Definition || '',
        category: item.category || item.Category || 'Generale',
        createdAt: item.createdAt || item.CreatedAt,
        updatedAt: item.updatedAt || item.UpdatedAt
      }));
      
      console.log('✅ Dati mappati:', mappedData);
      console.log('📦 Primo elemento mappato:', mappedData[0]);
      
      return mappedData;
    } catch (error) {
      console.error('Errore nel caricamento del glossario:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<GlossaryTerm> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Glossary/GetById/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Errore nel recupero del termine:', error);
      throw error;
    }
  },

  getByWord: async (word: string): Promise<GlossaryTerm[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Glossary/GetByWord/${encodeURIComponent(word)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Errore nella ricerca per parola:', error);
      throw error;
    }
  },

  getSuggestions: async (query: string, limit: number = 5): Promise<string[]> => {
    try {
      if (!query.trim() || query.length < 2) {
        return [];
      }
      
      const url = `${API_BASE_URL}/Glossary/GetByWord/${encodeURIComponent(query)}`;
      console.log('🔍 Chiamata API getSuggestions (Glossario):', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Risposta getSuggestions status:', response.status);
      
      if (!response.ok) {
        // Se è 404 o 400, non ci sono suggerimenti (non è un errore)
        if (response.status === 404 || response.status === 400) {
          console.log('ℹ️ Nessun suggerimento trovato per:', query);
          return [];
        }
        console.warn('⚠️ Errore HTTP nei suggerimenti:', response.status);
        return [];
      }
      
      const data = await response.json();
      console.log('📦 Dati ricevuti per suggerimenti:', data);
      
      const terms = Array.isArray(data) ? data : [];
      console.log('📦 Numero di termini trovati:', terms.length);
      
      // Mappa i dati come nel componente Glossario per gestire formati diversi
      const mappedTerms = terms.map((item: Partial<GlossaryTerm> & { boomerWord?: string; name?: string }) => ({
        term: item.term || item.boomerWord || item.name || '',
      }));
      
      // Estrai solo i termini unici e limitati, filtrando quelli vuoti
      const suggestions = Array.from(
        new Set(
          mappedTerms
            .map((term) => term.term)
            .filter((term) => term && term.trim().length > 0)
        )
      ).slice(0, limit);
      
      console.log('✅ Suggerimenti estratti:', suggestions);
      return suggestions;
    } catch (error) {
      console.error('❌ Errore nel recupero dei suggerimenti:', error);
      return [];
    }
  },

  add: async (glossary: GlossaryModel): Promise<GlossaryTerm> => {
    try {
      // Mappa i campi del frontend a quelli del backend
      const backendData = {
        term: glossary.term,
        description: glossary.definition, // Backend usa 'description', frontend usa 'definition'
        category: glossary.category
      };
      
      console.log('📤 Glossario Add - Dati inviati al backend:', backendData);
      
      const response = await fetch(`${API_BASE_URL}/Glossary/Add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      // Mappa la risposta del backend al formato frontend
      return {
        ...result,
        definition: result.description || result.Description || result.definition
      };
    } catch (error) {
      console.error('Errore nell\'aggiunta del termine:', error);
      throw error;
    }
  },

  update: async (id: number, glossary: GlossaryModel): Promise<GlossaryTerm> => {
    try {
      // Mappa i campi del frontend a quelli del backend
      const backendData = {
        term: glossary.term,
        description: glossary.definition, // Backend usa 'description', frontend usa 'definition'
        category: glossary.category
      };
      
      console.log('📤 Glossario Update - Dati inviati al backend:', backendData);
      
      const response = await fetch(`${API_BASE_URL}/Glossary/Update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      // Mappa la risposta del backend al formato frontend
      return {
        ...result,
        definition: result.description || result.Description || result.definition
      };
    } catch (error) {
      console.error('Errore nell\'aggiornamento del termine:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Glossary/Delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Errore nell\'eliminazione del termine:', error);
      throw error;
    }
  }
};

export interface TranslatorModel {
  id?: number;
  boomerWord: string;
  slangWord: string;
  description?: string;
}

// Interfaccia per i dati che arrivano dal backend
export interface TranslatorBackendModel {
  id: number;
  oldWord: string;
  newWord: string;
  descriptionWord?: string;
}

// Interfaccia per l'uso nel frontend
export interface TranslationResult {
  id?: number;
  boomerWord: string;
  slangWord: string;
  description?: string;
}

export const translatorApi = {
  getAll: async (): Promise<TranslationResult[]> => {
    try {
      const url = `${API_BASE_URL}/Translator/GetAll`;
      console.log('🔍 Chiamata API getAll:', url);
      console.log('🔍 API_BASE_URL:', API_BASE_URL);
      console.log('🔍 URL completo:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Risposta status:', response.status, response.statusText);
      console.log('📊 Response URL:', response.url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('ℹ️ Risposta backend:', errorText);
        console.log('ℹ️ Status:', response.status);
        
        // Se è un 404, potrebbe essere database vuoto o endpoint non trovato
        if (response.status === 404) {
          // Se il messaggio è "No Words found", il database è vuoto
          if (errorText.includes('No Words found')) {
            console.log('ℹ️ Nessuna traduzione trovata nel database, restituisco array vuoto');
            return [];
          }
          // Altrimenti l'endpoint non esiste o il backend non è raggiungibile
          // Restituisci array vuoto senza sollevare errore - è una funzionalità opzionale
          console.warn('⚠️ Endpoint GetAll non trovato (404). Verifica che il backend sia in esecuzione su http://localhost:5147');
          console.warn('⚠️ Verifica anche che il controller Translator sia registrato correttamente');
          console.warn('⚠️ La ricerca per parola (GetByWord) funzionerà comunque');
          return [];
        }
        
        // Per altri errori HTTP, solleva l'errore solo se non è un problema di rete
        // Se è un errore server (500, etc), prova comunque a restituire array vuoto
        if (response.status >= 500) {
          console.error('❌ Errore server:', errorText);
          return [];
        }
        
        // Per altri errori client (400, 403, etc), solleva l'errore
        console.error('❌ Risposta errore:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const backendData: TranslatorBackendModel[] = await response.json();
      console.log('✅ Dati grezzi ricevuti:', backendData);
      
      // Mappa tutti i risultati dal formato backend al formato frontend
      const mappedData: TranslationResult[] = backendData.map(item => ({
        id: item.id,
        boomerWord: item.oldWord,
        slangWord: item.newWord,
        description: item.descriptionWord
      }));
      
      console.log('✅ Dati mappati:', mappedData);
      return mappedData;
    } catch (error) {
      // Se è un errore di rete, gestiscilo
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('❌ Errore di rete nel caricamento delle traduzioni:', error);
        console.error('❌ Verifica che il backend sia in esecuzione su http://localhost:5147');
        throw error;
      }
      console.error('Errore nel caricamento delle traduzioni:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<TranslationResult> => {
    try {
      const url = `${API_BASE_URL}/Translator/GetById/${id}`;
      console.log('🔍 Chiamata API getById:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 404) {
          throw new Error(`Traduzione non trovata: ${errorText}`);
        }
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Errore nel recupero della traduzione:', error);
      throw error;
    }
  },

  getSuggestions: async (query: string, allTranslations: TranslationResult[] = [], limit: number = 5): Promise<string[]> => {
    try {
      if (!query.trim() || query.length < 2) {
        return [];
      }
      
      const queryLower = query.toLowerCase().trim();
      
      // Se abbiamo già i dati caricati, usali; altrimenti carica dal backend
      let translations = allTranslations;
      if (translations.length === 0) {
        translations = await translatorApi.getAll();
      }
      
      // Estrai tutti i termini (boomer e slang) che corrispondono
      const suggestions = new Set<string>();
      
      translations.forEach(translation => {
        if (translation.boomerWord.toLowerCase().includes(queryLower)) {
          suggestions.add(translation.boomerWord);
        }
        if (translation.slangWord.toLowerCase().includes(queryLower)) {
          suggestions.add(translation.slangWord);
        }
      });
      
      return Array.from(suggestions).slice(0, limit);
    } catch (error) {
      console.error('Errore nel recupero dei suggerimenti:', error);
      return [];
    }
  },

  getByWord: async (word: string): Promise<TranslationResult | null> => {
    try {
      const url = `${API_BASE_URL}/Translator/GetByWord/${encodeURIComponent(word)}`;
      console.log('🔍 Chiamata API getByWord:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        // Il backend può restituire 404 o 400 quando il termine non viene trovato
        if (response.status === 404 || response.status === 400) {
          // Parola non trovata, non è un errore critico
          console.log('ℹ️ Parola non trovata:', word, '(status:', response.status + ')');
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const backendData: TranslatorBackendModel = await response.json();
      console.log('📦 Dati grezzi dal backend:', backendData);
      
      // Mappa i nomi dei campi del backend ai nomi usati nel frontend
      const mappedResult: TranslationResult = {
        id: backendData.id,
        boomerWord: backendData.oldWord,
        slangWord: backendData.newWord,
        description: backendData.descriptionWord
      };
      
      console.log('✅ Dati mappati per il frontend:', mappedResult);
      return mappedResult;
    } catch (error) {
      console.error('Errore nella ricerca per parola:', error);
      throw error;
    }
  },

  add: async (translator: TranslatorModel): Promise<string> => {
    try {
      const url = `${API_BASE_URL}/Translator/Add`;
      console.log('🔍 Chiamata API add:', url);
      
      // Mappa i campi del frontend a quelli del backend
      const backendData = {
        oldWord: translator.boomerWord,
        newWord: translator.slangWord,
        descriptionWord: translator.description || ''
      };
      
      console.log('📤 Dati inviati al backend:', backendData);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Errore nell\'aggiunta della traduzione:', error);
      throw error;
    }
  },

  update: async (id: number, translator: TranslatorModel): Promise<string> => {
    try {
      const url = `${API_BASE_URL}/Translator/Update/${id}`;
      console.log('🔍 Chiamata API update:', url);
      
      // Mappa i campi del frontend a quelli del backend
      const backendData = {
        oldWord: translator.boomerWord,
        newWord: translator.slangWord,
        descriptionWord: translator.description || ''
      };
      
      console.log('📤 Dati inviati al backend:', backendData);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 404) {
          throw new Error(`Traduzione non trovata: ${errorText}`);
        }
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Errore nell\'aggiornamento della traduzione:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<string> => {
    try {
      const url = `${API_BASE_URL}/Translator/Delete/${id}`;
      console.log('🔍 Chiamata API delete:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 404) {
          throw new Error(`Traduzione non trovata: ${errorText}`);
        }
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Errore nell\'eliminazione della traduzione:', error);
      throw error;
    }
  }
};

// Database locale con tutte le pagine del sito
const localSearchPages: SearchPage[] = [
  {
    id: 1,
    title: 'Home',
    keywords: ['home', 'principale', 'inizio', 'sgam', 'servizi', 'digitali'],
    route: '/',
    category: 'Pagine Principali'
  },
  {
    id: 2,
    title: 'Servizio Anti-Frode',
    keywords: ['antifrode', 'frode', 'truffa', 'sicurezza', 'protezione', 'segnalazione', 'truffe online'],
    route: '/servizio-antifrode',
    category: 'Sicurezza'
  },
  {
    id: 3,
    title: 'Guide',
    keywords: ['guide', 'tutorial', 'aiuto', 'istruzioni', 'come fare'],
    route: '/guide',
    category: 'Guide'
  },
  {
    id: 4,
    title: 'Guida SPID',
    keywords: ['spid', 'identità digitale', 'accesso', 'login', 'registrazione', 'come ottenere spid', 'identità'],
    route: '/guide/spid',
    category: 'Guide'
  },
  {
    id: 5,
    title: 'Guida PEC',
    keywords: ['pec', 'posta elettronica certificata', 'email', 'casella pec', 'attivazione pec'],
    route: '/guide/pec',
    category: 'Guide'
  },
  {
    id: 6,
    title: 'Guida CIE',
    keywords: ['cie', 'carta identità elettronica', 'documento', 'identità', 'carta'],
    route: '/guide/cie',
    category: 'Guide'
  },
  {
    id: 7,
    title: 'Guida Sicurezza',
    keywords: ['sicurezza', 'password', 'protezione', 'privacy', 'dati', 'truffe', 'phishing'],
    route: '/guide/sicurezza',
    category: 'Guide'
  },
  {
    id: 8,
    title: 'Guida Primo Accesso',
    keywords: ['primo accesso', 'registrazione', 'iscrizione', 'nuovo utente', 'iniziare'],
    route: '/guide/primo-accesso',
    category: 'Guide'
  },
  {
    id: 9,
    title: 'Guida Recupero Password',
    keywords: ['recupero password', 'password dimenticata', 'reset password', 'cambio password', 'reimpostare'],
    route: '/guide/recupero-password',
    category: 'Guide'
  },
  {
    id: 10,
    title: 'Guida Certificati Online',
    keywords: ['certificati', 'certificato anagrafico', 'documenti', 'online', 'richiedere certificato'],
    route: '/guide/certificati-online',
    category: 'Guide'
  },
  {
    id: 11,
    title: 'Guida Pagamenti DM Sanitari',
    keywords: ['pagamenti', 'dm sanitari', 'dispositivi medici', 'ticket', 'sanità', 'salute'],
    route: '/guide/pagamenti-dm-sanitari',
    category: 'Guide'
  },
  {
    id: 12,
    title: 'Guida Anagrafe Digitale',
    keywords: ['anagrafe', 'anagrafe digitale', 'dati anagrafici', 'residenza', 'cambio residenza'],
    route: '/guide/anagrafe-digitale',
    category: 'Guide'
  },
  {
    id: 13,
    title: 'Glossario',
    keywords: ['glossario', 'termini', 'definizioni', 'dizionario', 'significato', 'parole'],
    route: '/glossario',
    category: 'Strumenti'
  },
  {
    id: 14,
    title: 'Traduttore Generazionale',
    keywords: ['traduttore', 'generazionale', 'slang', 'linguaggio', 'giovani', 'boomer', 'traduzione'],
    route: '/traduttore-generazionale',
    category: 'Strumenti'
  },
  {
    id: 15,
    title: 'Info',
    keywords: ['info', 'informazioni', 'contatti', 'chi siamo', 'about'],
    route: '/info',
    category: 'Informazioni'
  },
  {
    id: 16,
    title: 'Mission',
    keywords: ['mission', 'missione', 'obiettivi', 'scopo', 'valori', 'chi siamo'],
    route: '/mission',
    category: 'Informazioni'
  },
  {
    id: 17,
    title: 'Privacy Policy',
    keywords: ['privacy', 'policy', 'gdpr', 'dati personali', 'trattamento dati', 'cookie'],
    route: '/privacy',
    category: 'Informazioni'
  }
];

export const searchApi = {
  // Ricerca locale che funziona sempre (non dipende dal backend)
  searchLocal: (query: string): SearchPage[] => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return localSearchPages.filter(page => {
      // Cerca nel titolo
      if (page.title.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Cerca nelle keywords
      return page.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
    }).sort((a, b) => {
      // Priorità: match nel titolo > match nelle keywords
      const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
      const bTitleMatch = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });
  },

  // Ricerca che prova prima il backend, poi fallback locale
  search: async (query: string): Promise<SearchPage[]> => {
    try {
      // Prova prima con il backend
      const response = await fetch(`${API_BASE_URL}/Search/Search/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Se il backend non è disponibile, usa la ricerca locale
      console.log('Backend non disponibile, uso ricerca locale:', error);
      return searchApi.searchLocal(query);
    }
  },

  getAllPages: async (): Promise<SearchPage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Search/GetAllPages`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Fallback locale
      console.log('Backend non disponibile, restituisco pagine locali:', error);
      return localSearchPages;
    }
  }
};