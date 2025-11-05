import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './FAQ.css';

interface CollapsibleProps {
  title: string;
  content: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  const headerId = `faq-header-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const contentId = `faq-content-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <article className="faq-collapsible">
      <button 
        type="button" 
        className="faq-collapsible__header" 
        onClick={() => setOpen(!open)} 
        aria-expanded={open}
        aria-controls={contentId}
        id={headerId}
      >
        <span>{title}</span>
        <FontAwesomeIcon 
          icon={open ? faChevronUp : faChevronDown} 
          className="faq-collapsible__icon"
          aria-hidden="true"
        />
      </button>
      {open && (
        <div 
          className="faq-collapsible__content" 
          role="region"
          id={contentId}
          aria-labelledby={headerId}
        >
          {content}
        </div>
      )}
    </article>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      title: 'Come posso proteggermi dalle truffe online?',
      content: 'Puoi proteggerti seguendo alcune semplici regole: verifica sempre l\'autenticità dei siti web, non fornire mai password o dati sensibili via email o telefono, usa password forti e diverse per ogni account, mantieni aggiornati i tuoi dispositivi e software, e verifica sempre i link prima di cliccarci. Il nostro chatbot Sgamy può aiutarti a valutare i rischi in tempo reale.'
    },
    {
      title: 'Il servizio è gratuito?',
      content: 'Sì, SGAMAPP è completamente gratuito. Tutti i servizi, incluse le guide, il chatbot educativo e gli strumenti di protezione, sono disponibili senza costi. Il nostro obiettivo è rendere la sicurezza digitale accessibile a tutti.'
    }
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Domande Frequenti</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <Collapsible key={index} title={faq.title} content={faq.content} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

