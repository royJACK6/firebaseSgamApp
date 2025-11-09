import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook } from '@fortawesome/free-solid-svg-icons';
import './Error404.css';

function Error404() {
  return (
    <main className="error404-page">
      {/* Background decorativo con gradiente */}
      <div className="error404-background"></div>
      
      <div className="error404-content">
        {/* Grande numero 404 animato */}
        <div className="error404-number-container">
          <span className="error404-number animate-bounce-in">4</span>
          <span className="error404-number animate-bounce-in">0</span>
          <span className="error404-number animate-bounce-in">4</span>
        </div>
        
        {/* Contenuto testuale */}
        <header className="error404-header animate-fade-in-up">
          <h1 className="error404-title">Pagina non trovata</h1>
          <div role="alert" aria-live="polite" aria-atomic="true">
            <p className="error404-description">
              Oops! La pagina che stai cercando non esiste o potrebbe essere stata spostata.
            </p>
          </div>
        </header>
        
        {/* Pulsanti di navigazione */}
        <nav className="error404-actions animate-fade-in-up">
          <Link to="/" className="btn btn-primary btn-lg error404-btn">
            <FontAwesomeIcon icon={faHome} className="btn-icon-left" aria-hidden="true" />
            Torna alla Home
          </Link>
          <Link to="/guide" className="btn btn-secondary btn-lg error404-btn">
            <FontAwesomeIcon icon={faBook} className="btn-icon-left" aria-hidden="true" />
            Vai alle Guide
          </Link>
        </nav>
        
        {/* Suggerimenti utili */}
        <div className="error404-suggestions animate-fade-in">
          <p className="error404-suggestions-title">Forse stavi cercando:</p>
          <ul className="error404-suggestions-list">
            <li><Link to="/servizio-antifrode" className="error404-suggestion-link">Servizio Anti-Frode</Link></li>
            <li><Link to="/glossario" className="error404-suggestion-link">Glossario</Link></li>
            <li><Link to="/info" className="error404-suggestion-link">Info e Contatti</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Error404;
