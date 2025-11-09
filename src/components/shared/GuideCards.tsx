import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Card.css';
import './GuideCards.css';

type GuideType = { title: string; description: string; icon: string; link: string };

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <article className={`sg-card ${className}`}>
    {children}
  </article>
);

const GuideCard: React.FC<GuideType> = ({ title, description, icon, link }) => {
  return (
    <Card className="sg-guide-card">
      <div className="sg-guide-card__media">
        <img
          src={icon}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>'; }}
          alt={`Immagine illustrativa della guida ${title}`}
          className="sg-guide-card__img"
          loading="lazy"
        />
      </div>
      <div className="sg-guide-card__body">
        <h3 className="sg-guide-card__title">{title}</h3>
        <p className="sg-guide-card__desc">{description}</p>
        <div className="sg-guide-card__cta">
          <a href={link} className="sg-btn" aria-label={`Scopri di più sulla guida ${title}`}>
            Scopri di più
          </a>
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
  const [isInitialized, setIsInitialized] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcola quante cards sono visibili per volta
  const getCardsPerPage = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  };

  const cardsPerPage = getCardsPerPage();
  const totalPages = Math.ceil(guides.length / cardsPerPage);

  // Aggiorna l'indice corrente in base allo scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateCurrentIndex = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.querySelector('.guide-carousel-slide')?.clientWidth || 320;
      const gap = 16;
      const cardWidthWithGap = cardWidth + gap;
      const newIndex = Math.round(scrollLeft / cardWidthWithGap);
      const pageIndex = Math.floor(newIndex / cardsPerPage);
      setCurrentIndex(Math.min(pageIndex, totalPages - 1));
    };

    carousel.addEventListener('scroll', updateCurrentIndex);
    updateCurrentIndex(); // Inizializza

    return () => carousel.removeEventListener('scroll', updateCurrentIndex);
  }, [guides.length, cardsPerPage, totalPages]);

  // Animazione di entrata e scroll automatico alla card centrale
  useEffect(() => {
    const scrollToCenterCard = () => {
      if (carouselRef.current && !isInitialized) {
        const carousel = carouselRef.current;
        const cards = carousel.querySelectorAll('.guide-carousel-slide');
        if (cards.length > 0) {
          // Calcola l'indice della card centrale
          const centerIndex = Math.floor(guides.length / 2);
          const centerCard = cards[centerIndex] as HTMLElement;
          
          if (centerCard) {
            // Calcola la posizione di scroll per centrare la card
            const cardWidth = centerCard.offsetWidth;
            const scrollPosition = centerCard.offsetLeft - (carousel.offsetWidth / 2) + (cardWidth / 2);
            
            // Scroll iniziale senza animazione per posizionare correttamente
            carousel.scrollLeft = scrollPosition;
            
            // Poi anima con un leggero delay per un effetto più piacevole
            setTimeout(() => {
              setIsInitialized(true);
              // Piccolo aggiustamento con animazione smooth
              carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }, 300);
          }
        }
      }
    };

    const timer = setTimeout(scrollToCenterCard, 100);
    return () => clearTimeout(timer);
  }, [guides.length, isInitialized]);

  const scrollToPage = (pageIndex: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.guide-carousel-slide')?.clientWidth || 280;
      const gap = 16;
      const scrollPosition = pageIndex * cardsPerPage * (cardWidth + gap);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const cardWidth = carousel.querySelector('.guide-carousel-slide')?.clientWidth || 320;
      const gap = 16;
      const scrollAmount = cardsPerPage * (cardWidth + gap);
      const currentScroll = carousel.scrollLeft;
      const threshold = 5; // Soglia per considerare "all'inizio"
      
      // Se siamo all'inizio, vai alla fine
      if (currentScroll <= threshold) {
        carousel.scrollTo({ left: carousel.scrollWidth - carousel.clientWidth, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const cardWidth = carousel.querySelector('.guide-carousel-slide')?.clientWidth || 320;
      const gap = 16;
      const scrollAmount = cardsPerPage * (cardWidth + gap);
      const currentScroll = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const threshold = 5; // Soglia per considerare "alla fine"
      
      // Se siamo alla fine, vai all'inizio
      if (currentScroll >= maxScroll - threshold) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="guide-carousel-wrapper">
      <h2 className="sg-section-title">Tutte le Guide</h2>
      <div className="guide-carousel-container" ref={containerRef}>
        <button type="button" className="carousel-button prev" onClick={scrollLeft} aria-label="Guida precedente">
          <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
        </button>
        <div className="guide-carousel" ref={carouselRef}>
          <div className="guide-carousel-track">
            {guides.map((guide, i) => (
              <div key={i} className="guide-carousel-slide">
                <GuideCard {...guide} />
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="carousel-button next" onClick={scrollRight} aria-label="Guida successiva">
          <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
        </button>
      </div>
      {totalPages > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => scrollToPage(index)}
              aria-label={`Vai alla pagina ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default GuideCards;

