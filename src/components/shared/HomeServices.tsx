import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatbot } from '../../contexts/ChatbotContext';
import './Card.css';
import antifrodeImage from '../../assets/SGAMY_SCUDO.png';
import glossarioImage from '../../assets/SGAMY_NONNINA.png';
import sgamyImage from '../../assets/SGAMY_OCCHIOLINO.png';

type Service = { title: string; description: string; icon: string; link: string };

const Card: React.FC<React.PropsWithChildren<{ className?: string; onClick?: () => void; 'aria-label'?: string }>> = ({ className = '', onClick, children, 'aria-label': ariaLabel }) => (
  <article className={`sg-card ${className}`} onClick={onClick} role="button" tabIndex={0} aria-label={ariaLabel}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}>
    {children}
  </article>
);

const ServiceCard: React.FC<Service> = ({ title, description, icon, link }) => {
  const go = () => (window.location.href = link);
  return (
    <Card className="sg-guide-card" onClick={go} aria-label={title}>
      <div className="sg-guide-card__media">
        <img
          src={icon}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>'; }}
          alt={`Immagine illustrativa del servizio ${title}`}
          className="sg-guide-card__img"
        />
      </div>
      <div className="sg-guide-card__body">
        <h3 className="sg-guide-card__title">{title}</h3>
        <p className="sg-guide-card__desc">{description}</p>
        <div className="sg-guide-card__cta">
          <button type="button" className="sg-btn">Scopri di più</button>
        </div>
      </div>
    </Card>
  );
};

const SgamyAssistantCard: React.FC<{ onOpenChatbot: () => void }> = ({ onOpenChatbot }) => {
  return (
    <Card className="sg-guide-card sg-assistant-card" aria-label="Sgamy: il tuo assistente digitale">
      <div className="sg-guide-card__media">
        <img
          src={sgamyImage}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>'; }}
          alt="Immagine di Sgamy, l'assistente virtuale digitale di SGAMAPP, sempre disponibile per aiutarti"
          className="sg-guide-card__img"
        />
      </div>
      <div className="sg-guide-card__body">
        <h3 className="sg-guide-card__title">Sgamy: il tuo assistente digitale!</h3>
        <p className="sg-guide-card__desc">Chiedi qualsiasi cosa a Sgamy, il tuo assistente virtuale sempre disponibile per aiutarti.</p>
        <div className="sg-guide-card__cta">
          <button 
            type="button" 
            className="sg-btn sg-btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onOpenChatbot();
            }}
          >
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
      <article className="sg-info-card" onClick={handleClick} role="button" tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}>
        <div className="sg-info-card__content">
          <h2 className="sg-info-card__title">Cosa fa il nostro sito?</h2>
          <p className="sg-info-card__description">
            SGAMAPP è la tua soluzione completa per la sicurezza digitale. Offriamo guide pratiche passo-passo, 
            un chatbot educativo sempre disponibile, strumenti per riconoscere truffe online e proteggere i tuoi dati personali. 
            Il nostro obiettivo è aiutarti a navigare in sicurezza nel mondo digitale con un approccio semplice e accessibile per tutti.
          </p>
          <div className="sg-info-card__cta">
            <button type="button" className="sg-btn sg-btn-info" onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}>
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
  
  const handleOpenChatbot = () => {
    openChatbot();
  };

  const services: Service[] = [
    { title: 'Servizio Anti-Frode', description: 'Proteggi i tuoi dati online con il nostro chatbot educativo e sistema semaforo per valutare i rischi.', icon: antifrodeImage, link: '/servizio-antifrode' },
    { title: 'Glossario Antifrode', description: 'Scopri i termini più importanti per difenderti dalle truffe online con esempi pratici.', icon: glossarioImage, link: '/glossario' },
  ];
  
  return (
    <>
      <InfoCard />
      <section className="sg-cards-wrap">
        <h2 className="sg-section-title">Servizi Principali</h2>
        <div className="sg-card-grid">
          <ServiceCard {...services[0]} />
          <SgamyAssistantCard onOpenChatbot={handleOpenChatbot} />
          <ServiceCard {...services[1]} />
        </div>
      </section>
    </>
  );
};

export default HomeServices;

