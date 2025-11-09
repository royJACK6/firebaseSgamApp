import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatbot } from '../../contexts/ChatbotContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComments, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Card.css';
import './HomeServices.css';
import antifrodeImage from '../../assets/SGAMY_SCUDO.png';
import glossarioImage from '../../assets/SGAMY_NONNINA.png';
import sgamyImage from '../../assets/SGAMY_OCCHIOLINO.png';

type Service = { title: string; description: string; icon: string; link: string };

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <article className={`sg-card ${className}`}>
    {children}
  </article>
);

const ServiceCard: React.FC<Service> = ({ title, description, icon, link }) => {
  return (
    <Card className="sg-guide-card">
      <div className="sg-guide-card__media">
        <img
          src={icon}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>'; }}
          alt={`Immagine illustrativa del servizio ${title}`}
          className="sg-guide-card__img"
          loading="lazy"
        />
      </div>
      <div className="sg-guide-card__body">
        <h3 className="sg-guide-card__title">{title}</h3>
        <p className="sg-guide-card__desc">{description}</p>
        <div className="sg-guide-card__cta">
          <a href={link} className="sg-btn" aria-label={`Scopri di più su ${title}`}>
            Scopri di più
            <FontAwesomeIcon icon={faArrowRight} className="btn-icon-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Card>
  );
};

const SgamyAssistantCard: React.FC<{ onOpenChatbot: () => void }> = ({ onOpenChatbot }) => {
  return (
    <Card className="sg-guide-card sg-assistant-card">
      <div className="sg-guide-card__media">
        <img
          src={sgamyImage}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>'; }}
          alt="Immagine di Sgamy, l'assistente virtuale digitale di SGAMAPP, sempre disponibile per aiutarti"
          className="sg-guide-card__img"
          loading="lazy"
        />
      </div>
      <div className="sg-guide-card__body">
        <h3 className="sg-guide-card__title">Sgamy: il tuo assistente digitale!</h3>
        <p className="sg-guide-card__desc">Chiedi qualsiasi cosa a Sgamy, il tuo assistente virtuale sempre disponibile per aiutarti.</p>
        <div className="sg-guide-card__cta">
          <button 
            type="button" 
            className="sg-btn sg-btn-primary"
            onClick={onOpenChatbot}
            aria-label="Apri chatbot Sgamy per ricevere assistenza"
          >
            <FontAwesomeIcon icon={faComments} className="btn-icon-left" aria-hidden="true" />
            Parla con Sgamy
          </button>
        </div>
      </div>
    </Card>
  );
};

const InfoCard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/mission');
    }, 100);
  };

  return (
    <section className="sg-cards-wrap">
      <article className="sg-info-card animate-fade-in-up">
        <div className="sg-info-card__content">
          <h2 className="sg-info-card__title">Cosa fa il nostro sito?</h2>
          <p className="sg-info-card__description">
            SGAMAPP è la tua soluzione completa per la sicurezza digitale. Offriamo guide pratiche passo-passo, 
            un chatbot educativo sempre disponibile, strumenti per riconoscere truffe online e proteggere i tuoi dati personali. 
            Il nostro obiettivo è aiutarti a navigare in sicurezza nel mondo digitale con un approccio semplice e accessibile per tutti.
          </p>
          <div className="sg-info-card__cta">
            <button type="button" className="sg-btn sg-btn-info" onClick={handleClick} aria-label="Scopri la missione di SGAMAPP">
              <FontAwesomeIcon icon={faInfoCircle} className="btn-icon-left" aria-hidden="true" />
              Scopri la nostra missione
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

const HomeServices: React.FC = () => {
  const { openChatbot } = useChatbot();
  const cardGridWrapperRef = useRef<HTMLDivElement>(null);
  
  const handleOpenChatbot = () => {
    openChatbot();
  };

  const services: Service[] = [
    { title: 'Servizio Anti-Frode', description: 'Proteggi i tuoi dati online con il nostro chatbot educativo e sistema semaforo per valutare i rischi.', icon: antifrodeImage, link: '/servizio-antifrode' },
    { title: 'Glossario Antifrode', description: 'Scopri i termini più importanti per difenderti dalle truffe online con esempi pratici.', icon: glossarioImage, link: '/glossario' },
  ];
  
  // Scroll automatico alla card centrale (Sgamy) su mobile/tablet
  useEffect(() => {
    const scrollToCenterCard = () => {
      if (cardGridWrapperRef.current && window.innerWidth <= 768) {
        const wrapper = cardGridWrapperRef.current;
        const cards = wrapper.querySelectorAll('.sg-card');
        if (cards.length >= 2) {
          const centerCard = cards[1] as HTMLElement; // Sgamy è la seconda card
          const scrollPosition = centerCard.offsetLeft - (wrapper.offsetWidth / 2) + (centerCard.offsetWidth / 2);
          wrapper.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
      }
    };

    // Attendi un piccolo delay per il rendering
    const timer = setTimeout(scrollToCenterCard, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <InfoCard />
      <section className="sg-cards-wrap">
        <h2 className="sg-section-title">Servizi Principali</h2>
        <div className="sg-card-grid-wrapper" ref={cardGridWrapperRef}>
          <div className="sg-card-grid">
            <ServiceCard {...services[0]} />
            <SgamyAssistantCard onOpenChatbot={handleOpenChatbot} />
            <ServiceCard {...services[1]} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeServices;

