import React from 'react';
import './Card.css';

import antifrodeImage from '../../assets/SGAMY_SCUDO.png';
import glossarioImage from '../../assets/SGAMY_NONNINA.png';

type Guide = { title: string; description: string; icon: string; link: string };

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <article className={`sg-card ${className}`}>
    {children}
  </article>
);

const GuideCard: React.FC<Guide> = ({ title, description, icon, link }) => {
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
          <a href={link} className="sg-btn" aria-label={`Leggi la guida su ${title}`}>
            Leggi la guida
          </a>
        </div>
      </div>
    </Card>
  );
};

const Cards: React.FC = () => {
  const services: Guide[] = [
    { title: 'Servizio Anti-Frode', description: 'Proteggi i tuoi dati online con il nostro chatbot educativo e sistema semaforo per valutare i rischi.', icon: antifrodeImage, link: '/servizio-antifrode' },
    { title: 'Glossario Antifrode', description: 'Scopri i termini più importanti per difenderti dalle truffe online con esempi pratici.', icon: glossarioImage, link: '/glossario' },
  ];
  return (
    <section className="sg-cards-wrap">
      <h2 className="sg-section-title">Servizi Principali</h2>
      <div className="sg-card-grid">
        {services.map((g, i) => (<GuideCard key={i} {...g} />))}
      </div>
    </section>
  );
};

export default Cards;
