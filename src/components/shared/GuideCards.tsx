import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Card.css';
import './GuideCards.css';

type GuideType = { title: string; description: string; icon: string; link: string };

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <article className={`sg-card ${className}`}>
    {children}
  </article>
);

// Memoizza GuideCard per evitare re-render inutili quando le props non cambiano
const GuideCard: React.FC<GuideType> = memo(({ title, description, icon, link }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%25" height="100%25" fill="%23cfe8ff"/><text x="50%25" y="55%25" font-family="Arial" font-size="14" text-anchor="middle" fill="%23224466">no image</text></svg>';
  };

  return (
    <Card className="sg-guide-card">
      <div className="sg-guide-card__media">
        <img
          src={icon}
          onError={handleImageError}
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
            <FontAwesomeIcon icon={faArrowRight} className="btn-icon-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Card>
  );
});
GuideCard.displayName = 'GuideCard';

interface GuideCardsProps {
  guides: GuideType[];
}

const GuideCards: React.FC<GuideCardsProps> = ({ guides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoizza il calcolo delle cards per pagina (calcolato solo al mount, aggiornato tramite resize listener)
  const cardsPerPage = useMemo(() => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  }, []);

  // Memoizza il calcolo del totale delle pagine
  const totalPages = useMemo(() => Math.ceil(guides.length / cardsPerPage), [guides.length, cardsPerPage]);

  // Aggiorna l'indice corrente in base allo scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateCurrentIndex = () => {
      const scrollLeft = carousel.scrollLeft;
      const firstCard = carousel.querySelector('.guide-carousel-slide') as HTMLElement;
      if (!firstCard) return;
      
      const track = carousel.querySelector('.guide-carousel-track') as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = track ? parseInt(getComputedStyle(track).gap) || 16 : 16;
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
    let isMounted = true;
    let rafId1: number | null = null;
    let rafId2: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    const scrollToCenterCard = () => {
      if (!isMounted || !carouselRef.current || isInitialized) return;
      
      const carousel = carouselRef.current;
      const cards = carousel.querySelectorAll('.guide-carousel-slide');
      if (cards.length > 0) {
        // Calcola l'indice della card centrale
        const centerIndex = Math.floor(guides.length / 2);
        const centerCard = cards[centerIndex] as HTMLElement;
        
        if (centerCard) {
          // Attendi che il layout sia completamente renderizzato (importante su mobile/tablet)
          rafId1 = requestAnimationFrame(() => {
            rafId2 = requestAnimationFrame(() => {
              if (!isMounted || !carouselRef.current) return;
              
              // Ricalcola le dimensioni dopo il rendering completo
              const cardWidth = centerCard.offsetWidth;
              const carouselWidth = carousel.offsetWidth;
              const cardLeft = centerCard.offsetLeft;
              
              // Calcola la posizione per centrare perfettamente la card
              const scrollPosition = cardLeft - (carouselWidth / 2) + (cardWidth / 2);
              
              // Scroll iniziale senza animazione per posizionare correttamente
              carousel.scrollLeft = scrollPosition;
              
              // Poi anima con un leggero delay per un effetto più piacevole
              timeoutId = setTimeout(() => {
                if (!isMounted || !carouselRef.current) return;
                
                setIsInitialized(true);
                // Ricalcola per perfezionare il centraggio dopo eventuali resize
                const finalCardWidth = centerCard.offsetWidth;
                const finalCarouselWidth = carousel.offsetWidth;
                const finalCardLeft = centerCard.offsetLeft;
                const finalScrollPosition = finalCardLeft - (finalCarouselWidth / 2) + (finalCardWidth / 2);
                carousel.scrollTo({ left: finalScrollPosition, behavior: 'smooth' });
              }, 300);
            });
          });
        }
      }
    };

    // Aumentato il delay per dare tempo al layout di stabilizzarsi, specialmente su mobile
    const timer = setTimeout(scrollToCenterCard, 200);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId1) cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
    };
  }, [guides.length, isInitialized]);

  const scrollToPage = (pageIndex: number) => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const firstCard = carousel.querySelector('.guide-carousel-slide') as HTMLElement;
      if (!firstCard) return;
      
      const track = carousel.querySelector('.guide-carousel-track') as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = track ? parseInt(getComputedStyle(track).gap) || 16 : 16;
      const scrollPosition = pageIndex * cardsPerPage * (cardWidth + gap);
      carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const firstCard = carousel.querySelector('.guide-carousel-slide') as HTMLElement;
      if (!firstCard) return;
      
      const track = carousel.querySelector('.guide-carousel-track') as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = track ? parseInt(getComputedStyle(track).gap) || 16 : 16;
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
      const firstCard = carousel.querySelector('.guide-carousel-slide') as HTMLElement;
      if (!firstCard) return;
      
      const track = carousel.querySelector('.guide-carousel-track') as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = track ? parseInt(getComputedStyle(track).gap) || 16 : 16;
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

