import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./BottomNav.css";
import spidIcon from "../../assets/SGAMY_SPID.png";
import pecIcon from "../../assets/SGAMY_PEC.png";
import cieIcon from "../../assets/SGAMY_CIE.png";
import scudoIcon from "../../assets/SGAMY_SCUDO.png";
import pagoPaIcon from "../../assets/SGAMY_PAGAMENTO.png";
import primoAccessoIcon from "../../assets/SGAMY_POLLICE.png";
import recuperoPwdIcon from "../../assets/SGAMY_PASSWORD.png";
import certificatiIcon from "../../assets/SGAMY_CERTFICATI.png";
import anagrafeIcon from "../../assets/SGAMY_PASSWORD_VARIANT.png";
import prenotazioniIcon from "../../assets/SGAMY_DOTTORE.png";

const BottomNav: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  
  // Calcola quante icone sono visibili per volta (stessa logica del carosello guide)
  const getIconsPerPage = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  };

  const scrollLeft = () => {
    if (navRef.current) {
      const nav = navRef.current;
      const firstItem = nav.querySelector('.nav-item') as HTMLElement;
      if (!firstItem) return;
      
      const itemWidth = firstItem.offsetWidth;
      const gap = window.innerWidth <= 480 
        ? 16 // var(--spaziatura-md)
        : window.innerWidth <= 768 
        ? 24 // var(--spaziatura-lg)
        : 60; // gap desktop
      const iconsPerPage = getIconsPerPage();
      const scrollAmount = iconsPerPage * (itemWidth + gap);
      const currentScroll = nav.scrollLeft;
      const threshold = 5; // Soglia per considerare "all'inizio"
      
      // Se siamo all'inizio, vai alla fine
      if (currentScroll <= threshold) {
        nav.scrollTo({ left: nav.scrollWidth - nav.clientWidth, behavior: 'smooth' });
      } else {
        nav.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      const nav = navRef.current;
      const firstItem = nav.querySelector('.nav-item') as HTMLElement;
      if (!firstItem) return;
      
      const itemWidth = firstItem.offsetWidth;
      const gap = window.innerWidth <= 480 
        ? 16 // var(--spaziatura-md)
        : window.innerWidth <= 768 
        ? 24 // var(--spaziatura-lg)
        : 60; // gap desktop
      const iconsPerPage = getIconsPerPage();
      const scrollAmount = iconsPerPage * (itemWidth + gap);
      const currentScroll = nav.scrollLeft;
      const maxScroll = nav.scrollWidth - nav.clientWidth;
      const threshold = 5; // Soglia per considerare "alla fine"
      
      // Se siamo alla fine, vai all'inizio
      if (currentScroll >= maxScroll - threshold) {
        nav.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        nav.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { icon: spidIcon, label: "SPID", link: "/guide/spid" },
    { icon: pecIcon, label: "PEC", link: "/guide/pec" },
    { icon: cieIcon, label: "CIE", link: "/guide/cie" },
    { icon: scudoIcon, label: "Sicurezza", link: "/guide/sicurezza" },
    { icon: primoAccessoIcon, label: "Primo Accesso", link: "/guide/primo-accesso" },
    { icon: prenotazioniIcon, label: "Prenotazioni ASL", link: "/guide/prenotazioni-asl-puglia" },
    { icon: recuperoPwdIcon, label: "Recupero Password", link: "/guide/recupero-password" },
    { icon: certificatiIcon, label: "Certificati Online", link: "/guide/certificati-online" },
    { icon: pagoPaIcon, label: "Pagamenti DM", link: "/guide/pagamenti-dm-sanitari" },
    { icon: anagrafeIcon, label: "Anagrafe Digitale", link: "/guide/anagrafe-digitale" },
  ];

  // Scroll automatico all'icona centrale e gestione effetto dinamico
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || window.innerWidth > 768) return;

    // Scroll iniziale all'icona centrale
    const scrollToCenterIcon = () => {
      const items = nav.querySelectorAll('.nav-item');
      if (items.length > 0) {
        const centerIndex = Math.floor(navItems.length / 2); // Index 3-4 per 8 items
        const centerItem = items[centerIndex] as HTMLElement;
        const scrollPosition = centerItem.offsetLeft - (nav.offsetWidth / 2) + (centerItem.offsetWidth / 2);
        nav.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    };

    // Aggiorna la classe "is-centered" durante lo scroll
    const updateCenteredItem = () => {
      const items = nav.querySelectorAll('.nav-item');
      const navRect = nav.getBoundingClientRect();
      const centerX = navRect.left + navRect.width / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(centerX - itemCenterX);

        // Se l'icona è vicina al centro (entro 60px), aggiunge la classe
        if (distance < 60) {
          item.classList.add('is-centered');
        } else {
          item.classList.remove('is-centered');
        }
      });
    };

    // Attendi un piccolo delay per il rendering
    const timer = setTimeout(() => {
      scrollToCenterIcon();
      updateCenteredItem();
    }, 100);

    // Aggiungi listener per aggiornare durante lo scroll
    nav.addEventListener('scroll', updateCenteredItem);

    return () => {
      clearTimeout(timer);
      nav.removeEventListener('scroll', updateCenteredItem);
    };
  }, [navItems.length]);

  return (
    <div className="bottom-nav-container">
      <button 
        type="button"
        className="bottom-nav-arrow bottom-nav-arrow-left" 
        onClick={scrollLeft}
        aria-label="Scorri a sinistra"
      >
        <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
      </button>
      <nav ref={navRef} className="bottom-nav" aria-label="Navigazione rapida alle guide principali">
        {navItems.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            className="nav-item"
            aria-label={`Vai alla guida su ${item.label}`}
          >
            <img src={item.icon} alt={`Icona ${item.label}`} className="nav-icon" aria-hidden="true" loading="lazy" />
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </nav>
      <button 
        type="button"
        className="bottom-nav-arrow bottom-nav-arrow-right" 
        onClick={scrollRight}
        aria-label="Scorri a destra"
      >
        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
      </button>
    </div>
  );
};

export default BottomNav;
