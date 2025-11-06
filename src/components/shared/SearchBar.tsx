import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { searchApi, type SearchPage } from '../../utils/api';

const SearchBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchPage[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 576;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length > 2) {
        try {
          setLoading(true);
          setError(null);
          console.log('🔍 Cercando:', searchQuery);
          const searchResults = await searchApi.search(searchQuery);
          console.log('📊 Risultati ricevuti:', searchResults.length);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('❌ Errore nella ricerca:', error);
          setResults([]);
          setError('Impossibile completare la ricerca. Verifica che il server sia avviato.');
          setShowResults(true);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
        setError(null);
      }
    };

    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const toggleSearch = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleResultClick = (route: string) => {
    navigate(route);
    setSearchQuery('');
    setShowResults(false);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0].route);
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const showInput = !isMobile || isOpen;

  return (
    <div className="searchbar-wrapper" role="search" aria-label="Ricerca nel sito" ref={searchRef}>
      {showInput && (
        <>
          <label htmlFor="search-input" className="sr-only">
            Cerca servizi, guide e informazioni
          </label>
          <input
            id="search-input"
            className={`searchbar ${isOpen && isMobile ? 'open' : ''}`}
            type="text"
            placeholder="Cerca servizi, guide e informazioni..."
            aria-describedby="search-help"
            autoComplete="off"
            spellCheck="false"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim().length > 2 && setShowResults(true)}
            onKeyDown={handleKeyDown}
          />
          {showResults && (
            <div className="search-results" role="region" aria-live="polite" aria-atomic="false">
              {loading ? (
                <div className="search-loading" role="status" aria-live="polite" aria-atomic="true">
                  <span className="sr-only">Ricerca in corso, attendere prego</span>
                  Caricamento...
                </div>
              ) : error ? (
                <div className="search-error" role="alert" aria-live="assertive" aria-atomic="true">
                  {error}
                  <br />
                  <small>Avvia il server: cd src/components/server && npm start</small>
                </div>
              ) : results.length > 0 ? (
                <>
                  <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    Trovati {results.length} risultati per "{searchQuery}"
                  </div>
                  {results.slice(0, 5).map((result) => (
                    <div
                      key={result.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(result.route)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleResultClick(result.route);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-category">{result.category}</div>
                    </div>
                  ))}
                </>
              ) : searchQuery.trim().length > 2 ? (
                <div className="search-no-results" role="status" aria-live="polite" aria-atomic="true">
                  Nessun risultato trovato per "{searchQuery}"
                </div>
              ) : null}
            </div>
          )}
        </>
      )}
      <div id="search-help" className="sr-only">
        Digita per cercare servizi, guide e informazioni su SPID, PEC, CIE e sicurezza digitale
      </div>
      <button 
        className={`search-icon-btn ${isOpen && isMobile ? 'active' : ''}`}
        onClick={toggleSearch}
        type="button"
        title="Apri ricerca"
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
