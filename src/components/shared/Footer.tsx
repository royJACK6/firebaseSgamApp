import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShieldAlt, faBook, faBookOpen, faLanguage, faInfoCircle, faFileContract, faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
              <Link to="/" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faHome} className="footer-icon" aria-hidden="true" />
                Home
              </Link>
              <Link to="/servizio-antifrode" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faShieldAlt} className="footer-icon" aria-hidden="true" />
                Servizio Antifrode
              </Link>
              <Link to="/guide" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faBook} className="footer-icon" aria-hidden="true" />
                Guide
              </Link>
              <Link to="/glossario" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faBookOpen} className="footer-icon" aria-hidden="true" />
                Glossario
              </Link>
              <Link to="/traduttore-generazionale" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faLanguage} className="footer-icon" aria-hidden="true" />
                Traduttore Generazionale
              </Link>
              <Link to="/info" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faInfoCircle} className="footer-icon" aria-hidden="true" />
                Info
              </Link>
            </nav>
          </div>

          <div className="footer-column">
            <h3>CONTATTI</h3>
            <address>
              <p className="footer-contact">
                <FontAwesomeIcon icon={faPhone} className="footer-icon" aria-hidden="true" />
                xxx-xxx-xxx-xx
              </p>
              <p className="footer-contact">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" aria-hidden="true" />
                via xx-xxx-xx
              </p>
              <p className="footer-contact">
                <FontAwesomeIcon icon={faEnvelope} className="footer-icon" aria-hidden="true" />
                info@sgamapp.it
              </p>
            </address>
          </div>

          <div className="footer-column">
            <h3>INFO</h3>
            <nav aria-label="Informazioni legali">
              <Link to="/privacy" className="footer-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faFileContract} className="footer-icon" aria-hidden="true" />
                Privacy e Policy
              </Link>
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
