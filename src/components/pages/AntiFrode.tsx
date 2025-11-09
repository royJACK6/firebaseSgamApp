import React, { useState } from 'react';
import './AntiFrode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faShieldAlt, faRobot, faEye, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface CollapsibleProps {
  title: string;
  content: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  const id = `collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <article className="collapsible">
      <button 
        type="button" 
        id={`${id}-header`}
        className="collapsible__header" 
        onClick={() => setOpen(!open)} 
        aria-expanded={open}
        aria-controls={id}
      >
        {title} <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} aria-hidden="true" />
      </button>
      {open && <div id={id} className="collapsible__content" role="region" aria-labelledby={`${id}-header`}>{content}</div>}
    </article>
  );
};

const AntiFrode: React.FC = () => {
  const [semaforoColor, setSemaforoColor] = useState<'verde' | 'giallo' | 'rosso'>('verde');

  const handleTestLink = (color: 'verde' | 'giallo' | 'rosso') => {
    setSemaforoColor(color);
  };

  return (
    <section className="antifrode">

      <header className="antifrode__intro">
        <h1>Servizio Anti-Frode</h1>
        <p>Proteggiti dalle truffe online! Il nostro chatbot educativo e il sistema semaforo ti aiutano a valutare i rischi in modo rapido e sicuro.</p>
      </header>

      <section className="antifrode__practices">
        <h2>Pratiche di Sicurezza</h2>
        <ul>
          <li><FontAwesomeIcon icon={faEye} aria-hidden="true" /> <strong>Controlla il mittente:</strong> verifica sempre chi invia messaggi o email.</li>
          <li><FontAwesomeIcon icon={faExclamationTriangle} aria-hidden="true" /> <strong>Evita link sospetti:</strong> passa il mouse e verifica URL.</li>
          <li><FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" /> <strong>Password sicure:</strong> lunghe, uniche e aggiornate regolarmente.</li>
          <li><FontAwesomeIcon icon={faShieldAlt} aria-hidden="true" /> <strong>Protezione dati:</strong> non condividere info personali su siti non sicuri.</li>
          <li><FontAwesomeIcon icon={faRobot} aria-hidden="true" /> <strong>Chatbot educativo:</strong> guida passo passo nella valutazione dei rischi.</li>
        </ul>
      </section>

      <section className="antifrode__chatbot">
        <h2>Chatbot Semaforo Dinamico</h2>
        <p>Simula la valutazione di un link sospetto con il nostro semaforo:</p>
        <div className="semaforo-container">
          <div className="semaforo-visual">
            <div className={`semaforo-light rosso ${semaforoColor === 'rosso' ? 'active' : ''}`}></div>
            <div className={`semaforo-light giallo ${semaforoColor === 'giallo' ? 'active' : ''}`}></div>
            <div className={`semaforo-light verde ${semaforoColor === 'verde' ? 'active' : ''}`}></div>
          </div>
          <div className="semaforo-status">
            {semaforoColor === 'verde' && (
              <div className="status-message verde" role="status" aria-live="polite">
                <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
                <span>Sicuro - Nessun rischio rilevato</span>
              </div>
            )}
            {semaforoColor === 'giallo' && (
              <div className="status-message giallo" role="status" aria-live="polite">
                <FontAwesomeIcon icon={faExclamationTriangle} aria-hidden="true" />
                <span>Attenzione - Rischio Moderato</span>
              </div>
            )}
            {semaforoColor === 'rosso' && (
              <div className="status-message rosso" role="status" aria-live="polite">
                <FontAwesomeIcon icon={faShieldAlt} aria-hidden="true" />
                <span>Pericolo - Possibile Rischio</span>
              </div>
            )}
          </div>
        </div>

        <div className="antifrode__buttons" role="group" aria-label="Test semaforo di sicurezza">
          <button 
            type="button" 
            onClick={() => handleTestLink('verde')}
            aria-label="Testa link sicuro - semaforo verde"
          >
            Test Verde
          </button>
          <button 
            type="button" 
            onClick={() => handleTestLink('giallo')}
            aria-label="Testa link con rischio moderato - semaforo giallo"
          >
            Test Giallo
          </button>
          <button 
            type="button" 
            onClick={() => handleTestLink('rosso')}
            aria-label="Testa link con possibile rischio - semaforo rosso"
          >
            Test Rosso
          </button>
        </div>

        <p className="disclaimer">⚠️ Informativo. Nessuna responsabilità per danni o perdite.</p>
      </section>

      <section className="antifrode__collapsibles">
        <h2>Approfondimenti</h2>
        <Collapsible
          title="Cos'è un Phishing?"
          content="Il phishing è un tentativo di truffa online in cui i malintenzionati cercano di ottenere informazioni sensibili fingendosi enti affidabili."
        />
        <Collapsible
          title="Come riconoscere un link sospetto"
          content="Controlla sempre l’URL, verifica certificati SSL, cerca errori di ortografia o domini strani."
        />
        <Collapsible
          title="Password sicure"
          content="Usa combinazioni lunghe, includi numeri, simboli, lettere maiuscole e minuscole. Cambiale spesso e non riciclarle."
        />
      </section>

      
    </section>
  );
};

export default AntiFrode;
