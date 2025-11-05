// Usa il proxy configurato in vite.config.ts per evitare problemi CORS
// In sviluppo: /api viene reindirizzato a http://localhost:5147
// In produzione: cambiare questo valore con l'URL del backend
const API_BASE_URL = 'http://localhost:5147/api';

export interface GlossaryModel {
  id?: number;
  boomerWord: string;
  slangWord: string;
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
      console.log('🔍 Chiamata API getAll:', url);
      
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
      
      const data = await response.json();
      console.log('✅ Dati ricevuti:', data);
      return Array.isArray(data) ? data : [];
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

  add: async (glossary: GlossaryModel): Promise<GlossaryTerm> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Glossary/Add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(glossary)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Errore nell\'aggiunta del termine:', error);
      throw error;
    }
  },

  update: async (id: number, glossary: GlossaryModel): Promise<GlossaryTerm> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Glossary/Update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(glossary)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
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
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translator)
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
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translator)
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

export const searchApi = {
  search: async (query: string): Promise<SearchPage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Search/Search/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Errore nella ricerca:', error);
      return [];
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
      console.error('Errore nel recupero delle pagine:', error);
      return [];
    }
  }
};