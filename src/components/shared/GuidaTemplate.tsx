import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useChatbot } from '../../contexts/ChatbotContext';
import '../pages/Guida-Spid.css';

interface Step {
  title: string;
  description: string;
  list?: string[];
}

interface GuidaInfo {
  difficulty: string;
  duration: string;
  stepsCount?: number;
}

interface GuidaTemplateProps {
  title: string;
  subtitle: string;
  image: string;
  steps: Step[];
  info: GuidaInfo;
  helpText?: string;
  nextLink?: string;
  nextTitle?: string;
  previousLink?: string;
  previousTitle?: string;
}

const GuidaTemplate: React.FC<GuidaTemplateProps> = ({
  title,
  subtitle,
  image,
  steps,
  info,
  helpText,
  nextLink,
  nextTitle,
  previousLink,
  previousTitle,
}) => {
  const location = useLocation();
  const { openChatbot } = useChatbot();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <article>
      <header className="guida-hero">
        <div className="guida-hero-content">
          <div className="guida-hero-image">
            <img src={image} alt={`Immagine illustrativa della guida: ${title} - ${subtitle}`} />
          </div>
          <div className="guida-hero-text">
            <h1>{title}</h1>
            <p className="guida-subtitle">{subtitle}</p>
            <div className="guida-meta">
              <span className={`difficulty ${info.difficulty.toLowerCase()}`}>{info.difficulty}</span>
              <span className="duration">{info.duration}</span>
              <span className="steps">{info.stepsCount || steps.length} passi</span>
            </div>
          </div>
        </div>
      </header>

      <section className="guida-content">
        <div className="guida-container">
          <div className="guida-steps">
            <h2>{`Passaggi per ${title}`}</h2>
            {steps.map((step, index) => (
              <article className="step" key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.list && (
                    <ul>
                      {step.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>

          {helpText && (
            <div className="guida-help-card">
              <h3>Hai bisogno di aiuto?</h3>
              <p>{helpText}</p>
              <button 
                type="button" 
                className="help-button"
                onClick={openChatbot}
                aria-label="Apri chatbot Sgamy per ricevere aiuto"
              >
                <i className="fas fa-robot" aria-hidden="true"></i> Parla con Sgamy
              </button>
            </div>
          )}
        </div>
      </section>

      <nav className="guida-navigation" aria-label="Navigazione tra le guide">
        {previousLink && (
          <Link 
            to={previousLink} 
            className="nav-button"
            aria-label={`Vai alla guida precedente: ${previousTitle}`}
          >
            <i className="fas fa-arrow-left" aria-hidden="true"></i> {previousTitle}
          </Link>
        )}
        {nextLink && (
          <Link 
            to={nextLink} 
            className="nav-button next"
            aria-label={`Vai alla guida successiva: ${nextTitle}`}
          >
            {nextTitle} <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        )}
      </nav>
    </article>
  );
};

export default GuidaTemplate;
