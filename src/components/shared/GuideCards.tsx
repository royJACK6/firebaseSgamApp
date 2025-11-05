import React, { useState } from 'react';
import './Card.css';
import './GuideCards.css';

type GuideType = { title: string; description: string; icon: string; link: string };

const Card: React.FC<React.PropsWithChildren<{ className?: string; onClick?: () => void }>> = ({ className = '', onClick, children }) => (
  <article className={`sg-card ${className}`} onClick={onClick} role="button" tabIndex={0}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}>
    {children}
  </article>
);

const GuideCard: React.FC<GuideType> = ({ title, description, icon, link }) => {
  const go = () => (window.location.href = link);
  return (
    <Card className="sg-guide-card" onClick={go}>
      <div className="sg-guide-card__media">
        <img
          src={icon}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>'; }}
          alt={`Immagine illustrativa della guida ${title}`}
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

interface GuideCardsProps {
  guides: GuideType[];
}

const GuideCards: React.FC<GuideCardsProps> = ({ guides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get responsive cards per page
  const getCardsPerPage = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  };

  const [cardsPerPage] = useState(getCardsPerPage());
  const totalPages = Math.ceil(guides.length / cardsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(totalPages - 1);
    }
  };

  const getSlideWidth = () => {
    if (cardsPerPage === 1) return 100;
    if (cardsPerPage === 2) return 50;
    if (cardsPerPage === 3) return 33.333;
    return 25;
  };

  return (
    <section className="guide-carousel-wrapper">
      <h2 className="sg-section-title">Tutte le Guide</h2>
      <div 
        className="guide-carousel-container"
        onKeyDown={handleCarouselKeyDown}
        tabIndex={0}
        role="group"
        aria-label="Carosello guide"
      >
        <button type="button" className="carousel-button prev" onClick={prevSlide} aria-label="Guida precedente">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="guide-carousel">
          <div className="guide-carousel-track" style={{ transform: `translateX(-${currentIndex * getSlideWidth()}%)` }}>
            {guides.map((guide, i) => (
              <div key={i} className="guide-carousel-slide">
                <GuideCard {...guide} />
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="carousel-button next" onClick={nextSlide} aria-label="Guida successiva">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      {totalPages > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Vai alla slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default GuideCards;

