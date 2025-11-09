import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faVolumeUp, faStop } from '@fortawesome/free-solid-svg-icons';
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
  nextLink,
  nextTitle,
  previousLink,
  previousTitle,
}) => {
  const location = useLocation();
  const [speakingStepIndex, setSpeakingStepIndex] = useState<number | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Ferma il parlato quando si cambia pagina
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      setSpeakingStepIndex(null);
    };
  }, [location.pathname]);

  // Carica le voci quando il componente si monta
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const italianVoices = voices.filter(voice => voice.lang.startsWith('it'));
      
      // Seleziona automaticamente la prima voce italiana se non ne è stata scelta una
      if (italianVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(italianVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  // Funzione per leggere uno step
  const speakStep = (step: Step, stepIndex: number) => {
    // Se questo step sta già parlando, fermalo
    if (speakingStepIndex === stepIndex) {
      window.speechSynthesis.cancel();
      setSpeakingStepIndex(null);
      return;
    }

    // Ferma qualsiasi altro parlato in corso
    window.speechSynthesis.cancel();

    // Costruisci il testo completo dello step
    let textToSpeak = `${step.title}. ${step.description}`;
    if (step.list && step.list.length > 0) {
      textToSpeak += '. ' + step.list.map((item, i) => `${i + 1}. ${item}`).join('. ');
    }

    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'it-IT';
    utterance.rate = 0.95; // Velocità naturale e rilassata
    utterance.pitch = 0.9; // Pitch leggermente basso per voce maschile naturale
    utterance.volume = 1;

    // Usa la voce selezionata dall'utente
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setSpeakingStepIndex(stepIndex);
    utterance.onend = () => setSpeakingStepIndex(null);
    utterance.onerror = () => setSpeakingStepIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <article>
      <header className="guida-hero">
        <div className="guida-hero-content">
          <div className="guida-hero-image">
            <img src={image} alt={`Immagine illustrativa della guida: ${title} - ${subtitle}`} loading="lazy" />
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
                  <button
                    type="button"
                    className={`step-speak-btn ${speakingStepIndex === index ? 'speaking' : ''}`}
                    onClick={() => speakStep(step, index)}
                    aria-label={speakingStepIndex === index ? 'Ferma lettura' : 'Ascolta questo step'}
                    title={speakingStepIndex === index ? 'Ferma lettura' : 'Ascolta step'}
                  >
                    <FontAwesomeIcon icon={speakingStepIndex === index ? faStop : faVolumeUp} aria-hidden="true" />
                    <span>{speakingStepIndex === index ? 'Ferma' : 'Ascolta'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <nav className="guida-navigation" aria-label="Navigazione tra le guide">
        {previousLink && (
          <Link 
            to={previousLink} 
            className="nav-button"
            aria-label={`Vai alla guida precedente: ${previousTitle}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="nav-icon-left" aria-hidden="true" />
            {previousTitle}
          </Link>
        )}
        {nextLink && (
          <Link 
            to={nextLink} 
            className="nav-button next"
            aria-label={`Vai alla guida successiva: ${nextTitle}`}
          >
            {nextTitle}
            <FontAwesomeIcon icon={faArrowRight} className="nav-icon-right" aria-hidden="true" />
          </Link>
        )}
      </nav>
    </article>
  );
};

export default GuidaTemplate;
