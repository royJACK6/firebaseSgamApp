import { useState, useEffect, useRef } from "react";
import "./TraduttoreGenerazionale.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { translatorApi } from "../../utils/api";
import type { TranslationResult } from "../../utils/api";

const TraduttoreGenerazionale: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");
  const [allTranslations, setAllTranslations] = useState<TranslationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // ✅ FIX: NodeJS.Timeout → ReturnType<typeof setTimeout>
  const suggestionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Carica tutte le traduzioni
  useEffect(() => {
    const loadAllTranslations = async () => {
      try {
        setError(null);
        const data = await translatorApi.getAll();
        setAllTranslations(Array.isArray(data) ? data : []);
      } catch {
        setAllTranslations([]);
      }
    };
    loadAllTranslations();
  }, []);

  // Non serve più la ricerca separata, usiamo il filtro diretto su allTranslations

  // Suggerimenti
  useEffect(() => {
    const loadSuggestions = async () => {
      if (!searchWord.trim() || searchWord.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const s = await translatorApi.getSuggestions(searchWord.trim(), allTranslations, 5);
        setSuggestions(s);
        setShowSuggestions(s.length > 0);
        setSelectedSuggestionIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    if (suggestionsTimeoutRef.current) {
      clearTimeout(suggestionsTimeoutRef.current);
    }

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

  // Click fuori
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSuggestionClick = (s: string) => {
    setSearchWord(s);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((i) => (i < suggestions.length - 1 ? i + 1 : i));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((i) => (i > 0 ? i - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const getDisplayTranslations = () => {
    // Mostra sempre tutti i dati, filtrati se c'è una ricerca
    if (searchWord.trim()) {
      const q = searchWord.toLowerCase().trim();
      return allTranslations.filter(
        (t) =>
          t.boomerWord.toLowerCase().includes(q) ||
          t.slangWord.toLowerCase().includes(q)
      );
    }
    return allTranslations;
  };

  const displayTranslations = getDisplayTranslations();

  return (
    <section className="traduttore">
      <header className="traduttore__intro">
        <h1>
          <FontAwesomeIcon icon={faLanguage} aria-hidden="true" /> Traduttore Generazionale
        </h1>
        <p>
          Traduci parole tra linguaggio boomer e slang moderno. Inserisci una parola e scopri la sua
          traduzione.
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
            placeholder="Inserisci una parola..."
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
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
                <button
                  key={suggestion}
                  type="button"
                  className={`traduttore__suggestion ${
                    index === selectedSuggestionIndex
                      ? "traduttore__suggestion--selected"
                      : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  role="option"
                  aria-selected={index === selectedSuggestionIndex}
                >
                  <FontAwesomeIcon icon={faSearch} className="suggestion-icon" aria-hidden="true" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {error ? (
        <div className="traduttore__error">
          <p>{error}</p>
        </div>
      ) : displayTranslations.length === 0 && searchWord.trim() ? (
        <div className="traduttore__no-results">
          <p>Nessuna traduzione trovata per "{searchWord}"</p>
        </div>
      ) : (
        <div className="traduttore__lista">
          {displayTranslations.map((translation, index) => (
            <article
              key={translation.id || index}
              className="traduttore-card card card--hover card--medium"
            >
              <div className="traduttore-card__header">
                <div className="traduttore-card__icon-circle" aria-hidden="true">
                  <FontAwesomeIcon icon={faLanguage} aria-hidden="true" />
                </div>
                <div className="traduttore-card__content">
                  <div className="traduttore-card__from">
                    <span className="traduttore-card__label">Boomer</span>
                    <h2 className="traduttore-card__word">{translation.boomerWord}</h2>
                  </div>

                  <div className="traduttore-card__arrow" aria-hidden="true">
                    <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                  </div>

                  <div className="traduttore-card__to">
                    <span className="traduttore-card__label">Slang</span>
                    <h2 className="traduttore-card__word">{translation.slangWord}</h2>
                  </div>
                </div>
              </div>

              {translation.description && (
                <div className="traduttore-card__description">
                  <strong>Descrizione:</strong> {translation.description}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TraduttoreGenerazionale;
