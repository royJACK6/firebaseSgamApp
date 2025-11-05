import { Link } from 'react-router-dom';
import './Error404.css';

function Error404() {
  return (
    <main className="error404">
      <header>
        <h1>Oops! Pagina non trovata</h1>
      </header>
      <div role="alert" aria-live="polite" aria-atomic="true">
        <p>La pagina che cerchi non esiste o potrebbe essere stata spostata.</p>
      </div>
      <nav>
        <Link to="/" className="error404-link">
          Torna alla pagina principale
        </Link>
      </nav>
    </main>
  );
}

export default Error404;
