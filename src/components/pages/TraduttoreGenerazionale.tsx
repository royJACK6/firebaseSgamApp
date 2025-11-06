import React, { useState, useEffect, useRef } from 'react';
import './TraduttoreGenerazionale.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { translatorApi } from '../../utils/api';
import type { TranslationResult } from '../../utils/api';

const TraduttoreGenerazionale: React.FC = () => {
  const [searchWord, setSearchWord] = useState('');
  const [translations, setTranslations] = useState<TranslationResult[]>([]);
  const [allTranslations, setAllTranslations] = useState<TranslationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Carica tutte le traduzioni all'avvio (opzionale - serve solo per "Mostra tutto")
  useEffect(() => {
    const loadAllTranslations = async () => {
      try {
        // Non impostare isLoading per questa chiamata perché non blocca l'uso dell'app
        setError(null);
        
        const data = await translatorApi.getAll();
        
        console.log('📦 Traduzioni ricevute dal backend:', data);
        
        if (data && Array.isArray(data)) {
          setAllTranslations(data);
          // Se il database è vuoto, non è un errore, è normale
          if (data.length === 0) {
            console.log('ℹ️ Nessuna traduzione disponibile nel database');
          }
        } else {
          setAllTranslations([]);
        }
      } catch (err) {
        // Non mostrare errore all'utente per GetAll - è una funzionalità opzionale
        const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
        
        // Solo log per debug, non impostare error state
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed to fetch')) {
          console.warn('⚠️ Impossibile connettersi al server per GetAll. La ricerca funzionerà comunque.');
        } else if (errorMessage.includes('404')) {
          // 404 significa che l'endpoint non esiste o il database è vuoto - non è un errore critico
          console.log('ℹ️ Endpoint GetAll non disponibile o database vuoto. La ricerca per parola funzionerà comunque.');
        } else {
          console.warn('⚠️ Impossibile caricare tutte le traduzioni:', errorMessage);
        }
        
        // Imposta array vuoto senza mostrare errore all'utente
        setAllTranslations([]);
      }
    };

    // Carica in background senza bloccare l'app
    loadAllTranslations();
  }, []);

  // Cerca traduzione quando cambia la parola
  useEffect(() => {
    const searchTranslation = async () => {
      if (!searchWord.trim()) {
        setTranslations([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔍 Cerco la parola:', searchWord.trim());
        const result = await translatorApi.getByWord(searchWord.trim());
        
        console.log('📦 Risultato ricerca dal backend:', result);
        console.log('📦 Tipo risultato:', typeof result);
        console.log('📦 Risultato è null?', result === null);
        console.log('📦 Chiavi oggetto:', result ? Object.keys(result) : 'nessuna');
        console.log('📦 Valori:', result ? Object.values(result) : 'nessuno');
        
        // Converti il risultato singolo in array per compatibilità con il componente
        if (result) {
          console.log('✅ Traduzione trovata!');
          console.log('  - boomerWord:', result.boomerWord);
          console.log('  - slangWord:', result.slangWord);
          console.log('  - id:', result.id);
          setTranslations([result]);
        } else {
          console.log('ℹ️ Nessuna traduzione trovata per:', searchWord.trim());
          setTranslations([]);
        }
      } catch (err) {
        console.error('Errore nella ricerca:', err);
        console.error('Tipo errore:', err instanceof TypeError ? 'TypeError (rete)' : err instanceof Error ? 'Error' : typeof err);
        
        // Verifica se è un errore di rete/connessione
        const isNetworkError = 
          err instanceof TypeError || // TypeError = errore di rete quando fetch fallisce
          (err instanceof Error && (
            err.message.includes('fetch') || 
            err.message.includes('network') || 
            err.message.includes('Failed to fetch') ||
            err.message.includes('ERR_CONNECTION') ||
            err.message.includes('ERR_NETWORK') ||
            err.message.includes('NetworkError') ||
            err.message.includes('Network request failed')
          ));
        
        if (isNetworkError) {
          setError('Impossibile connettersi al server. Verifica che il backend sia in esecuzione su http://localhost:5147');
        } else {
          const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
          // Se è un errore HTTP, mostra il codice di stato
          if (errorMessage.includes('HTTP error! status:')) {
            const statusMatch = errorMessage.match(/status: (\d+)/);
            const statusCode = statusMatch ? statusMatch[1] : '';
            setError(`Errore del backend (${statusCode}). Verifica i log del server.`);
          } else {
            setError(`Errore nella ricerca: ${errorMessage}`);
          }
        }
        
        setTranslations([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchTranslation();
    }, 500); // Debounce di 500ms

    return () => clearTimeout(timeoutId);
  }, [searchWord]);

  // Carica suggerimenti con debounce
  useEffect(() => {
    const loadSuggestions = async () => {
      if (!searchWord.trim() || searchWord.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const suggestionsList = await translatorApi.getSuggestions(searchWord.trim(), allTranslations, 5);
        setSuggestions(suggestionsList);
        setShowSuggestions(suggestionsList.length > 0);
        setSelectedSuggestionIndex(-1);
      } catch (error) {
        console.error('Errore nel caricamento dei suggerimenti:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    // Cancella il timeout precedente
    if (suggestionsTimeoutRef.current) {
      clearTimeout(suggestionsTimeoutRef.current);
    }

    // Debounce di 300ms per i suggerimenti (più veloce del filtro)
    suggestionsTimeoutRef.current = setTimeout(() => {
      loadSuggestions();
      suggestionsTimeoutRef.current = null;
    }, 300);

    return () => {
      if (suggestionsTimeoutRef.current) {
        clearTimeout(suggestionsTimeoutRef.current);
        suggestionsTimeoutRef.current = null;
      }
    };
  }, [searchWord, allTranslations]);

  // Gestione click fuori dal dropdown per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchWord(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  // Filtra le traduzioni in base alla ricerca
  const getDisplayTranslations = () => {
    if (showAll) {
      // Quando mostra tutto, applica il filtro di ricerca se presente
      if (searchWord.trim()) {
        const query = searchWord.toLowerCase().trim();
        return allTranslations.filter(t => 
          t.boomerWord.toLowerCase().includes(query) ||
          t.slangWord.toLowerCase().includes(query)
        );
      }
      return allTranslations;
    }
    // Quando mostra solo risultati ricerca
    return translations;
  };

  const displayTranslations = getDisplayTranslations();

  return (
    <section className="traduttore">
      <header className="traduttore__intro">
        <h1>
          <FontAwesomeIcon icon={faLanguage} /> Traduttore Generazionale
        </h1>
        <p>
          Traduci le parole tra il linguaggio delle generazioni più mature e lo slang moderno. 
          Inserisci una parola e scopri la sua traduzione!
        </p>
      </header>

      <div className="traduttore__controls">
        <div className="traduttore__search">
          <label htmlFor="traduttore-search-input" className="sr-only">
            Inserisci una parola da tradurre
          </label>
          <FontAwesomeIcon icon={faSearch} className="search-icon" aria-hidden="true" />
          <input
            ref={searchInputRef}
            id="traduttore-search-input"
            type="text"
            placeholder="Inserisci una parola da tradurre..."
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={handleKeyDown}
            className="traduttore__search-input"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls="traduttore-suggestions"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              id="traduttore-suggestions"
              className="traduttore__suggestions"
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`traduttore__suggestion ${
                    index === selectedSuggestionIndex ? 'traduttore__suggestion--selected' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  role="option"
                  aria-selected={index === selectedSuggestionIndex}
                >
                  <FontAwesomeIcon icon={faSearch} className="suggestion-icon" aria-hidden="true" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="traduttore__toggle-btn"
          onClick={handleToggleView}
          aria-label={showAll ? 'Mostra solo risultati ricerca' : 'Mostra tutte le traduzioni'}
        >
          {showAll ? 'Mostra solo ricerca' : 'Mostra tutto'}
        </button>
      </div>

      {isLoading ? (
        <div className="traduttore__loading" role="status" aria-live="polite">
          <p>Ricerca in corso per "{searchWord}"...</p>
        </div>
      ) : error ? (
        <div className="traduttore__error" role="alert" aria-live="assertive">
          <p>{error}</p>
          {error.includes('connettersi al server') && (
            <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>
              Assicurati che il backend sia in esecuzione su <code>http://localhost:5147</code>
            </p>
          )}
        </div>
      ) : displayTranslations.length === 0 && showAll && allTranslations.length === 0 ? (
        <div className="traduttore__no-results" role="status" aria-live="polite" aria-atomic="true">
          <p>Nessuna traduzione disponibile nel database al momento.</p>
          <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>
            Popola il database tramite il backend per vedere le traduzioni.
          </p>
        </div>
      ) : displayTranslations.length === 0 && searchWord.trim() ? (
        <div className="traduttore__no-results" role="status" aria-live="polite" aria-atomic="true">
          <p><strong>Termine non trovato</strong></p>
          <p style={{ marginTop: '12px', fontSize: '1rem' }}>
            Non è stata trovata nessuna traduzione per "{searchWord}" nel database.
          </p>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#64748b' }}>
            Prova con un altro termine o verifica che il database contenga questa parola.
          </p>
        </div>
      ) : !showAll && !searchWord.trim() ? (
        <div className="traduttore__welcome" role="status" aria-live="polite" aria-atomic="true">
          <p>Inserisci una parola nel campo di ricerca per iniziare la traduzione.</p>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#64748b' }}>
            Esempio: cerca "telefono" per trovare la traduzione in slang
          </p>
        </div>
      ) : (
        <>
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {displayTranslations.length === 1 
              ? `Trovata 1 traduzione` 
              : `Trovate ${displayTranslations.length} traduzioni`}
          </div>
          <div className="traduttore__lista">
            {displayTranslations.map((translation, index) => {
              // Sempre visualizza Boomer → Slang
              
              // Debug: mostra cosa c'è nell'oggetto traduzione
              console.log('🎨 Rendering card per traduzione:', translation);
              console.log('  - boomerWord:', translation.boomerWord, 'Type:', typeof translation.boomerWord);
              console.log('  - slangWord:', translation.slangWord, 'Type:', typeof translation.slangWord);
              
              // Fallback per gestire dati mancanti
              const boomerText = translation.boomerWord || '[Mancante]';
              const slangText = translation.slangWord || '[Mancante]';
              
              return (
                <article key={translation.id || index} className="traduttore-card card card--hover card--medium" tabIndex={0}>
                  <div className="traduttore-card__header">
                    <div className="traduttore-card__icon-circle">
                      <FontAwesomeIcon icon={faLanguage} aria-hidden="true" />
                    </div>
                    <div className="traduttore-card__content">
                      <div className="traduttore-card__from">
                        <span className="traduttore-card__label">Boomer</span>
                        <h2 className="traduttore-card__word">{boomerText}</h2>
                      </div>
                      <div className="traduttore-card__arrow">
                        <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                      </div>
                      <div className="traduttore-card__to">
                        <span className="traduttore-card__label">Slang</span>
                        <h2 className="traduttore-card__word">{slangText}</h2>
                      </div>
                    </div>
                  </div>
                  {/* Descrizione opzionale se presente */}
                  {translation.description && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '12px', 
                      background: '#e3f2fd', 
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: '#1565D6',
                      borderLeft: '4px solid #1565D6'
                    }}>
                      <strong>ℹ️ Descrizione:</strong> {translation.description}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}

      {displayTranslations.length > 0 && !isLoading && (
        <div className="traduttore__count" role="status" aria-live="polite" aria-atomic="true">
          <p>
            {showAll 
              ? `Mostrando tutte le ${displayTranslations.length} traduzioni disponibili`
              : `Mostrando ${displayTranslations.length} ${displayTranslations.length === 1 ? 'traduzione' : 'traduzioni'} per "${searchWord}"`}
          </p>
        </div>
      )}
    </section>
  );
};

export default TraduttoreGenerazionale;


