import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Glossario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { glossaryApi } from '../../utils/api';
import type { GlossaryTerm } from '../../utils/api';

const Glossario: React.FC = () => {
  const [allTerms, setAllTerms] = useState<GlossaryTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchTimeoutRef = useRef<number | null>(null);
  const suggestionsTimeoutRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Carica i dati dal backend
  useEffect(() => {
    const loadGlossary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const terms = await glossaryApi.getAll();
        
        console.log('📦 Termini ricevuti dal backend:', terms);
        console.log('📦 Tipo:', Array.isArray(terms) ? 'Array' : typeof terms);
        console.log('📦 Lunghezza:', Array.isArray(terms) ? terms.length : 'N/A');
        if (Array.isArray(terms) && terms.length > 0) {
          console.log('📦 Primo termine:', terms[0]);
        }
        
        if (terms && Array.isArray(terms) && terms.length > 0) {
          // Verifica se i dati hanno la struttura corretta
          const firstTerm = terms[0];
          console.log('📦 Struttura primo termine:', {
            hasTerm: 'term' in firstTerm,
            hasDefinition: 'definition' in firstTerm,
            hasCategory: 'category' in firstTerm,
            hasBoomerWord: 'boomerWord' in firstTerm,
            hasSlangWord: 'slangWord' in firstTerm,
            keys: Object.keys(firstTerm)
          });
          
          // Mappa i dati dal backend al formato corretto
          const mappedTerms = terms.map((item: Partial<GlossaryTerm> & { 
            boomerWord?: string; 
            name?: string; 
            description?: string; 
            slangWord?: string;
          }) => {
            return {
              id: item.id || 0,
              term: item.term || item.boomerWord || item.name || '',
              definition: item.definition || item.description || item.slangWord || '',
              category: item.category || 'Generale',
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
            };
          });
          
          setAllTerms(mappedTerms);
          
          // Estrai le categorie uniche
          const uniqueCategories = Array.from(new Set(mappedTerms.map(term => term.category)));
          setCategories(uniqueCategories);
          
          setFilteredTerms(mappedTerms);
        } else {
          setError('Nessun termine disponibile nel glossario.');
        }
      } catch (err) {
        console.error('Errore nel caricamento del glossario:', err);
        const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
        
        // Se è un errore di rete, mostra un messaggio più specifico
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed to fetch')) {
          setError('Impossibile connettersi al server. Verifica che il backend sia in esecuzione.');
        } else {
          setError('Impossibile caricare il glossario. Riprova più tardi.');
        }
        
        // Inizializza comunque con array vuoto per evitare errori di rendering
        setAllTerms([]);
        setFilteredTerms([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadGlossary();
  }, []);

  // Funzione per filtrare i termini (memoizzata con useCallback)
  const filterTerms = useCallback(() => {
    let results: GlossaryTerm[] = [...allTerms];

    // Filtra per categoria
    if (selectedCategory !== 'all') {
      results = results.filter(term => term.category === selectedCategory);
    }

    // Filtra per query di ricerca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
      );
    }

    setFilteredTerms(results);
  }, [allTerms, selectedCategory, searchQuery]);

  // Applica il filtro immediatamente quando cambia categoria o vengono caricati i dati
  useEffect(() => {
    // Cancella eventuale timeout di ricerca attivo per forzare l'applicazione immediata
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    // Applica il filtro immediatamente (usando i valori correnti di searchQuery)
    filterTerms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, allTerms]);

  // Debounce per la ricerca: aspetta 500ms prima di filtrare
  useEffect(() => {
    // Cancella il timeout precedente se esiste
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Se la ricerca è vuota, applica il filtro immediatamente
    if (!searchQuery.trim()) {
      filterTerms();
      return;
    }

    // Altrimenti, applica il debounce
    searchTimeoutRef.current = setTimeout(() => {
      filterTerms();
      searchTimeoutRef.current = null;
    }, 500); // Debounce di 500ms

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, [searchQuery, filterTerms]);

  // Carica suggerimenti con debounce
  useEffect(() => {
    const loadSuggestions = async () => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        console.log('🔍 Suggerimenti: query troppo corta o vuota');
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      console.log('🔍 Caricamento suggerimenti per:', searchQuery.trim());

      try {
        const suggestionsList = await glossaryApi.getSuggestions(searchQuery.trim(), 5);
        console.log('✅ Suggerimenti ricevuti:', suggestionsList);
        console.log('✅ Numero suggerimenti:', suggestionsList.length);
        setSuggestions(suggestionsList);
        setShowSuggestions(suggestionsList.length > 0);
        setSelectedSuggestionIndex(-1);
      } catch (error) {
        console.error('❌ Errore nel caricamento dei suggerimenti:', error);
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
  }, [searchQuery]);

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
    setSearchQuery(suggestion);
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

  const getCategoryIcon = (): typeof faShieldAlt => {
    return faShieldAlt;
  };

  return (
    <section className="glossario">
      <header className="glossario__intro">
        <h1>
          <FontAwesomeIcon icon={faShieldAlt} /> Glossario Antifrode
        </h1>
        <p>
          Scopri i termini più importanti per difenderti dalle truffe online. 
          Cerca per nome o categoria e scopri definizioni chiare e comprensibili.
        </p>
      </header>

      <div className="glossario__filters">
        <div className="glossario__search">
          <label htmlFor="glossario-search-input" className="sr-only">
            Cerca un termine nel glossario
          </label>
          <FontAwesomeIcon icon={faSearch} className="search-icon" aria-hidden="true" />
          <input
            ref={searchInputRef}
            id="glossario-search-input"
            type="text"
            placeholder="Cerca un termine..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={handleKeyDown}
            className="glossario__search-input"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls="glossario-suggestions"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              id="glossario-suggestions"
              className="glossario__suggestions"
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`glossario__suggestion ${
                    index === selectedSuggestionIndex ? 'glossario__suggestion--selected' : ''
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
        <div className="glossario__category-filter">
          <label htmlFor="glossario-category-select" className="sr-only">
            Filtra per categoria
          </label>
          <FontAwesomeIcon icon={faFilter} className="filter-icon" aria-hidden="true" />
          <select
            id="glossario-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="glossario__category-select"
          >
            <option value="all">Tutte le categorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="glossario__loading" role="status" aria-live="polite">
          <p>Caricamento del glossario...</p>
        </div>
      ) : error ? (
        <div className="glossario__error" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>
      ) : filteredTerms.length === 0 ? (
        <div className="glossario__no-results" role="status" aria-live="polite" aria-atomic="true">
          <p>Nessun termine trovato. Prova a modificare la ricerca o il filtro categoria.</p>
        </div>
      ) : (
        <>
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {filteredTerms.length === 1 
              ? `Trovato 1 termine` 
              : `Trovati ${filteredTerms.length} termini`}
          </div>
          <div className="glossario__lista">
            {filteredTerms.map((term) => (
              <article key={term.id} className="glossario-card card card--hover card--medium" tabIndex={0}>
                <div className="glossario-card__header">
                  <div className="glossario-card__icon-circle">
                    <FontAwesomeIcon icon={getCategoryIcon()} aria-hidden="true" />
                  </div>
                  <div className="glossario-card__title-section">
                    <h2 className="glossario-card__term">{term.term}</h2>
                    <span className="glossario-card__category">{term.category}</span>
                  </div>
                </div>
                <p className="glossario-card__definition">
                  {term.definition || '(Descrizione non disponibile)'}
                </p>
              </article>
            ))}
          </div>
        </>
      )}

      {filteredTerms.length > 0 && !isLoading && (
        <div className="glossario__count" role="status" aria-live="polite" aria-atomic="true">
          <p>Mostrando {filteredTerms.length} di {allTerms.length} termini</p>
        </div>
      )}
    </section>
  );
};

export default Glossario;
