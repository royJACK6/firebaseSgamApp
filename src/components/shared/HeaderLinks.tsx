import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, faShield, faBook, faChevronDown, faChevronUp, 
  faIdBadge, faEnvelopeOpenText, faAddressCard, faShieldAlt,
  faSignInAlt, faUnlockAlt, faFileAlt, faCreditCard, faUsers,
  faCalendarCheck, faBookReader, faLanguage, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import "./HeaderLinks.css";
import { useState, useRef, useEffect } from "react";

function HeaderLinks() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileGuideOpen, setIsMobileGuideOpen] = useState(false);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDropdownToggle = () => setOpenDropdown(!openDropdown);

  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleDropdownMenuKeyDown = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    const items = menuItemsRef.current.filter((i) => i !== null);
    const total = items.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % total]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + total) % total]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpenDropdown(false);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav
        className="header-links blue-bar"
        aria-label="Navigazione principale"
      >
        {/* HAMBURGER */}
        <button
          type="button"
          className="mobile-hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label="Apri o chiudi menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}></span>
        </button>

        {/* MOBILE MENU */}
        <nav
          className={`mobile-links-menu ${isMobileMenuOpen ? "open" : ""}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <Link to="/" className="mobile-link-item" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faHouse} aria-hidden="true" />
            <span>Home</span>
          </Link>

          <Link
            to="/servizio-antifrode"
            className="mobile-link-item"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faShield} aria-hidden="true" />
            <span>Servizio Anti-Frode</span>
          </Link>

          {/* MOBILE GUIDE DROPDOWN */}
          <div className="mobile-guide-section">
            <button
              className="mobile-link-item mobile-guide-toggle"
              onClick={() => setIsMobileGuideOpen(!isMobileGuideOpen)}
              aria-expanded={isMobileGuideOpen}
            >
              <FontAwesomeIcon icon={faBook} aria-hidden="true" />
              <span>Guide</span>
              <FontAwesomeIcon 
                icon={isMobileGuideOpen ? faChevronUp : faChevronDown} 
                className="mobile-chevron"
                aria-hidden="true"
              />
            </button>

            <div
              className={`mobile-guide-dropdown ${
                isMobileGuideOpen ? "open" : ""
              }`}
            >
              <Link
                to="/guide"
                className="mobile-guide-item mobile-guide-main"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faBook} aria-hidden="true" />
                <span>Tutte le Guide</span>
              </Link>

              <h2 className="mobile-guide-section-title">
                Identità Digitale
              </h2>

              <Link
                to="/guide/spid"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faIdBadge} aria-hidden="true" />
                <span>SPID</span>
              </Link>

              <Link
                to="/guide/pec"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faEnvelopeOpenText} aria-hidden="true" />
                <span>PEC</span>
              </Link>

              <Link
                to="/guide/cie"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faAddressCard} aria-hidden="true" />
                <span>CIE</span>
              </Link>

              <Link
                to="/guide/sicurezza"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faShieldAlt} aria-hidden="true" />
                <span>Sicurezza</span>
              </Link>

              <h2 className="mobile-guide-section-title">Servizi</h2>

              <Link
                to="/guide/primo-accesso"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" />
                <span>Primo Accesso</span>
              </Link>

              <Link
                to="/guide/recupero-password"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faUnlockAlt} aria-hidden="true" />
                <span>Recupero Password</span>
              </Link>

              <Link
                to="/guide/certificati-online"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faFileAlt} aria-hidden="true" />
                <span>Certificati Online</span>
              </Link>

              <Link
                to="/guide/pagamenti-dm-sanitari"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faCreditCard} aria-hidden="true" />
                <span>Pagamenti DM Sanitari</span>
              </Link>

              <Link
                to="/guide/anagrafe-digitale"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faUsers} aria-hidden="true" />
                <span>Anagrafe Digitale</span>
              </Link>

              <Link
                to="/guide/prenotazioni-asl-puglia"
                className="mobile-guide-item"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faCalendarCheck} aria-hidden="true" />
                <span>Prenotazioni ASL Puglia</span>
              </Link>
            </div>
          </div>

          <Link to="/glossario" className="mobile-link-item" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBookReader} aria-hidden="true" />
            <span>Glossario</span>
          </Link>

          <Link
            to="/traduttore-generazionale"
            className="mobile-link-item"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faLanguage} aria-hidden="true" />
            <span>Traduttore Generazionale</span>
          </Link>

          <Link to="/info" className="mobile-link-item" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" />
            <span>Info</span>
          </Link>
        </nav>

        {/* DESKTOP LINKS */}
        <Link to="/" className="header-link animate-stagger-item animate-stagger-1">
          <FontAwesomeIcon icon={faHouse} className="me-1" aria-hidden="true" />
          Home
        </Link>

        <Link to="/servizio-antifrode" className="header-link animate-stagger-item animate-stagger-2">
          <FontAwesomeIcon icon={faShield} className="me-1" aria-hidden="true" />
          Servizio Anti-Frode
        </Link>

        {/* DROPDOWN DESKTOP */}
        <div className="dropdown animate-stagger-item animate-stagger-3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link
            to="/guide"
            className="header-link dropdown-toggle"
            onMouseEnter={handleMouseEnter}
            aria-expanded={openDropdown}
            aria-haspopup="menu"
            aria-controls="guide-dropdown-menu"
          >
            <FontAwesomeIcon icon={faBook} className="me-1" aria-hidden="true" />
            Guide
          </Link>

          <button
            type="button"
            className="dropdown-arrow"
            onClick={handleDropdownToggle}
            aria-label="Apri o chiudi menu guide"
            aria-expanded={openDropdown}
          >
            <FontAwesomeIcon
              icon={openDropdown ? faChevronUp : faChevronDown}
              className="ms-1"
              style={{ fontSize: "0.8em" }}
              aria-hidden="true"
            />
          </button>

          {/* MENU DROPDOWN DESKTOP */}
          <div
            className={`dropdown-menu ${openDropdown ? "show" : ""}`}
            onMouseEnter={handleMouseEnter}
            id="guide-dropdown-menu"
            role="menu"
          >
            <div className="dropdown-section" role="group" aria-labelledby="dropdown-section-identity">
              <h2 id="dropdown-section-identity" className="dropdown-section-title">Identità Digitale</h2>
            </div>

            <Link
              to="/guide/spid"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[0] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 0)}
            >
              <FontAwesomeIcon icon={faIdBadge} className="me-1" aria-hidden="true" />
              SPID
            </Link>

            <Link
              to="/guide/pec"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[1] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 1)}
            >
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-1" aria-hidden="true" />
              PEC
            </Link>

            <Link
              to="/guide/cie"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[2] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 2)}
            >
              <FontAwesomeIcon icon={faAddressCard} className="me-1" aria-hidden="true" />
              CIE
            </Link>

            <Link
              to="/guide/sicurezza"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[3] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 3)}
            >
              <FontAwesomeIcon icon={faShieldAlt} className="me-1" aria-hidden="true" />
              Sicurezza
            </Link>

            <div className="dropdown-section" role="group" aria-labelledby="dropdown-section-services">
              <h2 id="dropdown-section-services" className="dropdown-section-title">Servizi</h2>
            </div>

            <Link
              to="/guide/primo-accesso"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[4] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 4)}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="me-1" aria-hidden="true" />
              Primo Accesso
            </Link>

            <Link
              to="/guide/recupero-password"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[5] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 5)}
            >
              <FontAwesomeIcon icon={faUnlockAlt} className="me-1" aria-hidden="true" />
              Recupero Password
            </Link>

            <Link
              to="/guide/certificati-online"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[6] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 6)}
            >
              <FontAwesomeIcon icon={faFileAlt} className="me-1" aria-hidden="true" />
              Certificati Online
            </Link>

            <Link
              to="/guide/pagamenti-dm-sanitari"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[7] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 7)}
            >
              <FontAwesomeIcon icon={faCreditCard} className="me-1" aria-hidden="true" />
              Pagamenti DM Sanitari
            </Link>

            <Link
              to="/guide/anagrafe-digitale"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[8] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 8)}
            >
              <FontAwesomeIcon icon={faUsers} className="me-1" aria-hidden="true" />
              Anagrafe Digitale
            </Link>

            <Link
              to="/guide/prenotazioni-asl-puglia"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => {
                menuItemsRef.current[9] = el;
              }}
              onClick={() => setOpenDropdown(false)}
              onKeyDown={(e) => handleDropdownMenuKeyDown(e, 9)}
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="me-1" aria-hidden="true" />
              Prenotazioni ASL Puglia
            </Link>
          </div>
        </div>

        <Link to="/glossario" className="header-link animate-stagger-item animate-stagger-4">
          <FontAwesomeIcon icon={faBookReader} className="me-1" aria-hidden="true" />
          Glossario
        </Link>

        <Link to="/traduttore-generazionale" className="header-link animate-stagger-item animate-stagger-5">
          <FontAwesomeIcon icon={faLanguage} className="me-1" aria-hidden="true" />
          Traduttore Generazionale
        </Link>

        <Link to="/info" className="header-link animate-stagger-item animate-stagger-6">
          <FontAwesomeIcon icon={faInfoCircle} className="me-1" aria-hidden="true" />
          Info
        </Link>
      </nav>
    </>
  );
}

export default HeaderLinks;
