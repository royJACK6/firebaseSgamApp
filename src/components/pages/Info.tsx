import React, { useEffect, useRef } from 'react';
import './Info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faBookOpen, faClipboardCheck, faUserShield, faUniversalAccess, faLightbulb } from '@fortawesome/free-solid-svg-icons';

interface Service {
  icon: any;
  title: string;
  description: string;
}

const servizi: Service[] = [
  {
    icon: faRobot,
    title: "Chatbot Educativo",
    description:
      "Un assistente virtuale intelligente che risponde a tutte le tue domande su truffe online, phishing e sicurezza digitale. Disponibile 24/7, chiaro e semplice da capire."
  },
  {
    icon: faBookOpen,
    title: "Guide Pratiche",
    description:
      "Guide passo passo per usare strumenti online in sicurezza, riconoscere link sospetti e proteggere dati personali. Testi chiari, esempi concreti e screenshot intuitivi."
  },
  {
    icon: faClipboardCheck,
    title: "Metodologia Sicura",
    description:
      "Approccio basato su spiegazioni semplici, esempi pratici e attività guidate, seguendo principi didattici per adulti e anziani. Ogni passo è verificabile e facilmente replicabile."
  },
  {
    icon: faUserShield,
    title: "UX/UI Inclusiva",
    description:
      "Design pensato per utenti anziani: font grandi, contrasto elevato, colori chiari, pulsanti grandi e leggibili. Riduce errori e stress visivo durante l’uso dell’app."
  },
  {
    icon: faUniversalAccess,
    title: "Accessibilità & WACG",
    description:
      "Rispettiamo gli standard WACG 2.1: navigazione da tastiera, lettori di schermo compatibili, testi leggibili e etichette chiare. Nessun utente è escluso dall’esperienza digitale."
  },
  {
    icon: faLightbulb,
    title: "Consapevolezza Digitale",
    description:
      "Promuoviamo l’alfabetizzazione digitale per anziani: capire i rischi, riconoscere phishing e truffe telefoniche, sapere come reagire e proteggere i propri dati."
  }
];

const Info: React.FC = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Scroll automatico alla card centrale su mobile/tablet
  useEffect(() => {
    const scrollToCenterCard = () => {
      if (cardsContainerRef.current && window.innerWidth <= 768) {
        const container = cardsContainerRef.current;
        const cards = container.querySelectorAll('.info-card');
        if (cards.length > 0) {
          const centerIndex = Math.floor(servizi.length / 2); // Card centrale (per 6 cards = index 2-3)
          const centerCard = cards[centerIndex] as HTMLElement;
          const scrollPosition = centerCard.offsetLeft - (container.offsetWidth / 2) + (centerCard.offsetWidth / 2);
          container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
      }
    };

    // Attendi un piccolo delay per il rendering
    const timer = setTimeout(scrollToCenterCard, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="info">
      <header className="info__intro">
        <h1>Scopri i Nostri Servizi</h1>
        <p>
          La nostra missione è proteggere gli utenti dalle truffe online. Offriamo strumenti, guide, supporto personalizzato e un design inclusivo pensato per tutti.
        </p>
      </header>

      <div className="info__cards" ref={cardsContainerRef}>
        {servizi.map((item, index) => (
          <article 
            key={index} 
            className="info-card card card--hover card--medium"
          >
            <div className="info-card__icon" aria-hidden="true">
              <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
            </div>
            <h2 className="info-card__title">{item.title}</h2>
            <p className="info-card__description">{item.description}</p>
          </article>
        ))}
      </div>

      <section className="info__methodology">
        <h2>La Nostra Metodologia</h2>
        <p>
          Seguiamo un approccio step-by-step basato su:
        </p>
        <ul>
          <li><strong>Educazione progressiva:</strong> introduciamo i concetti di sicurezza digitale gradualmente.</li>
          <li><strong>Pratica guidata:</strong> esercizi concreti per riconoscere phishing, link sospetti e truffe telefoniche.</li>
          <li><strong>Accessibilità totale:</strong> testi leggibili, contrasti elevati, compatibilità con lettori di schermo e navigazione da tastiera.</li>
          <li><strong>Supporto continuo:</strong> chatbot sempre disponibile e aggiornato con le ultime minacce digitali.</li>
          <li><strong>Feedback e miglioramento:</strong> ogni utente può segnalare difficoltà, migliorando l'esperienza complessiva.</li>
        </ul>
      </section>

      
    </section>
  );
};

export default Info;
