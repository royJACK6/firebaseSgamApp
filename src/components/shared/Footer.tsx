import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <footer className="footer has-background-light">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>LINK UTILI</h3>
            <nav aria-label="Link utili principali">
              <Link to="/" className="footer-link" onClick={scrollToTop}>Home</Link>
              <Link to="/servizio-antifrode" className="footer-link" onClick={scrollToTop}>Servizio Antifrode</Link>
              <Link to="/guide" className="footer-link" onClick={scrollToTop}>Guide</Link>
              <Link to="/glossario" className="footer-link" onClick={scrollToTop}>Glossario</Link>
              <Link to="/traduttore-generazionale" className="footer-link" onClick={scrollToTop}>Traduttore Generazionale</Link>
              <Link to="/info" className="footer-link" onClick={scrollToTop}>Info</Link>
            </nav>
          </div>

          <div className="footer-column">
            <h3>CONTATTI</h3>
            <address>
              <p className="footer-contact">xxx-xxx-xxx-xx</p>
              <p className="footer-contact">via xx-xxx-xx</p>
            </address>
          </div>

          <div className="footer-column">
            <h3>INFO</h3>
            <nav aria-label="Informazioni legali">
              <Link to="/privacy" className="footer-link" onClick={scrollToTop}>Privacy e Policy</Link>
            </nav>
          </div>
        </div>

        <div className="content has-text-centered mt-5">
          <p>© {new Date().getFullYear()} SgamApp - Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
