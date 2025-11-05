import { Link } from "react-router-dom";
import './HeaderLinks.css';
import { useState, useRef, useEffect } from 'react';

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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDropdownToggle = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDropdownToggle();
    } else if (e.key === 'Escape') {
      setOpenDropdown(false);
    } else if (e.key === 'ArrowDown' && !openDropdown) {
      e.preventDefault();
      setOpenDropdown(true);
    }
  };

  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleDropdownMenuKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const menuItems = menuItemsRef.current.filter(item => item !== null);
    const totalItems = menuItems.length;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % totalItems;
      menuItems[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
      menuItems[prevIndex]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(false);
      const toggle = document.querySelector('[aria-controls="guide-dropdown-menu"]') as HTMLElement;
      toggle?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      menuItems[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      menuItems[totalItems - 1]?.focus();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="header-links blue-bar" aria-label="Navigazione principale">
        {/* Hamburger menu button - visible only on mobile */}
        <button 
          type="button"
          className="mobile-hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label="Apri o chiudi menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>

        {/* Mobile menu collapsibile - dentro il nav per posizionamento corretto */}
        <nav 
          className={`mobile-links-menu ${isMobileMenuOpen ? 'open' : ''}`} 
          aria-hidden={!isMobileMenuOpen}
        >
          <Link to="/" className="mobile-link-item" onClick={toggleMobileMenu}>
            <i className="fas fa-house"></i>
            <span>Home</span>
          </Link>

          <Link to="/servizio-antifrode" className="mobile-link-item" onClick={toggleMobileMenu}>
            <i className="fas fa-shield"></i>
            <span>Servizio Anti-Frode</span>
          </Link>

          {/* Guide con dropdown nel mobile */}
          <div className="mobile-guide-section">
            <button 
              className="mobile-link-item mobile-guide-toggle"
              onClick={() => setIsMobileGuideOpen(!isMobileGuideOpen)}
              aria-expanded={isMobileGuideOpen}
            >
              <i className="fas fa-book"></i>
              <span>Guide</span>
              <i className={`fas fa-chevron-${isMobileGuideOpen ? 'up' : 'down'} mobile-chevron`}></i>
            </button>
            <div className={`mobile-guide-dropdown ${isMobileGuideOpen ? 'open' : ''}`}>
              <Link 
                to="/guide" 
                className="mobile-guide-item mobile-guide-main" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-book"></i>
                <span>Tutte le Guide</span>
              </Link>
              <div className="mobile-guide-section-title">Identità Digitale</div>
              <Link 
                to="/guide/spid" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-id-badge"></i>
                <span>SPID</span>
              </Link>
              <Link 
                to="/guide/pec" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-envelope-open-text"></i>
                <span>PEC</span>
              </Link>
              <Link 
                to="/guide/cie" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-address-card"></i>
                <span>CIE</span>
              </Link>
              <div className="mobile-guide-section-title">Servizi</div>
              <Link 
                to="/guide/primo-accesso" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Primo Accesso</span>
              </Link>
              <Link 
                to="/guide/recupero-password" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-unlock-alt"></i>
                <span>Recupero Password</span>
              </Link>
              <Link 
                to="/guide/certificati-online" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-file-alt"></i>
                <span>Certificati Online</span>
              </Link>
              <Link 
                to="/guide/pagamenti-dm-sanitari" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-credit-card"></i>
                <span>Pagamenti DM Sanitari</span>
              </Link>
              <Link 
                to="/guide/anagrafe-digitale" 
                className="mobile-guide-item" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-users"></i>
                <span>Anagrafe Digitale</span>
              </Link>
            </div>
          </div>

          <Link to="/glossario" className="mobile-link-item" onClick={toggleMobileMenu}>
            <i className="fas fa-book-reader"></i>
            <span>Glossario</span>
          </Link>

          <Link to="/traduttore-generazionale" className="mobile-link-item" onClick={toggleMobileMenu}>
            <i className="fas fa-language"></i>
            <span>Traduttore Generazionale</span>
          </Link>

          <Link to="/info" className="mobile-link-item" onClick={toggleMobileMenu}>
            <i className="fas fa-info-circle"></i>
            <span>Info</span>
          </Link>
        </nav>
      <Link to="/" className="header-link">
        <i className="fas fa-house me-1" aria-hidden="true"></i>Home
      </Link>

      <Link to="/servizio-antifrode" className="header-link">
        <i className="fas fa-shield me-1" aria-hidden="true"></i>Servizio Anti-Frode
      </Link>

      <div 
        className="dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Link principale che porta a /guide */}
        <Link 
          to="/guide"
          className="header-link dropdown-toggle"
          onMouseEnter={handleMouseEnter}
          onKeyDown={(e) => {
            handleDropdownKeyDown(e);
            if ((e.key === 'ArrowDown' || (e.key === 'Enter' || e.key === ' ') && openDropdown)) {
              e.preventDefault();
              menuItemsRef.current[0]?.focus();
            }
          }}
          onFocus={() => {
            if (openDropdown && menuItemsRef.current[0]) {
              menuItemsRef.current[0].focus();
            }
          }}
          aria-expanded={openDropdown}
          aria-haspopup="menu"
          aria-controls="guide-dropdown-menu"
        >
          <i className="fas fa-book me-1" aria-hidden="true"></i>Guide
        </Link>

        {/* Freccetta separata per aprire/chiudere il menu */}
        <span
          className="dropdown-arrow"
          onClick={handleDropdownToggle}
          role="button"
          tabIndex={0}
          onKeyDown={handleDropdownKeyDown}
          aria-label="Apri o chiudi menu guide"
        >
          <i className={`fas fa-chevron-${openDropdown ? 'up' : 'down'} ms-1`} style={{ fontSize: '0.8em' }} aria-hidden="true"></i>
        </span>

        {/* Menu a tendina */}
        <div 
          className={`dropdown-menu ${openDropdown ? 'show' : ''}`}
          onMouseEnter={handleMouseEnter}
          role="menu"
          id="guide-dropdown-menu"
        >
          <div className="dropdown-section">
            <span className="dropdown-section-title">Identità Digitale</span>
          </div>
          <Link 
            to="/guide/spid" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[0] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 0)}
          >
            <i className="fas fa-id-badge me-1" aria-hidden="true"></i>SPID
          </Link>
          <Link 
            to="/guide/pec" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[1] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 1)}
          >
            <i className="fas fa-envelope-open-text me-1" aria-hidden="true"></i>PEC
          </Link>
          <Link 
            to="/guide/cie" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[2] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 2)}
          >
            <i className="fas fa-address-card me-1" aria-hidden="true"></i>CIE
          </Link>
          <div className="dropdown-section">
            <span className="dropdown-section-title">Servizi</span>
          </div>
          <Link 
            to="/guide/primo-accesso" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[3] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 3)}
          >
            <i className="fas fa-sign-in-alt me-1" aria-hidden="true"></i>Primo Accesso
          </Link>
          <Link 
            to="/guide/recupero-password" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[4] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 4)}
          >
            <i className="fas fa-unlock-alt me-1" aria-hidden="true"></i>Recupero Password
          </Link>
          <Link 
            to="/guide/certificati-online" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[5] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 5)}
          >
            <i className="fas fa-file-alt me-1" aria-hidden="true"></i>Certificati Online
          </Link>
          <Link 
            to="/guide/pagamenti-dm-sanitari" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[6] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 6)}
          >
            <i className="fas fa-credit-card me-1" aria-hidden="true"></i>Pagamenti DM Sanitari
          </Link>
          <Link 
            to="/guide/anagrafe-digitale" 
            className="dropdown-item" 
            role="menuitem" 
            ref={(el) => menuItemsRef.current[7] = el}
            onClick={() => setOpenDropdown(false)}
            onKeyDown={(e) => handleDropdownMenuKeyDown(e, 7)}
          >
            <i className="fas fa-users me-1" aria-hidden="true"></i>Anagrafe Digitale
          </Link>
        </div>
      </div>

      <Link to="/glossario" className="header-link">
        <i className="fas fa-book-reader me-1" aria-hidden="true"></i>Glossario
      </Link>

      <Link to="/traduttore-generazionale" className="header-link">
        <i className="fas fa-language me-1" aria-hidden="true"></i>Traduttore Generazionale
      </Link>

      <Link to="/info" className="header-link">
        <i className="fas fa-info-circle me-1" aria-hidden="true"></i>Info
      </Link>
    </nav>
  </>
  );
}

export default HeaderLinks;
