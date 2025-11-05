import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Tabs.css';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface CollapsibleProps {
  title: string;
  content: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="tabs-faq-collapsible">
      <button 
        type="button" 
        className="tabs-faq-collapsible__header" 
        onClick={() => setOpen(!open)} 
        aria-expanded={open}
        aria-controls={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        id={`collapsible-header-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span>{title}</span>
        <FontAwesomeIcon 
          icon={open ? faChevronUp : faChevronDown} 
          className="tabs-faq-collapsible__icon" 
          aria-hidden="true"
        />
      </button>
      {open && (
        <div 
          className="tabs-faq-collapsible__content" 
          role="region"
          id={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
          aria-labelledby={`collapsible-header-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {content}
        </div>
      )}
    </article>
  );
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const faqs = [
    {
      title: 'Come posso proteggermi dalle truffe online?',
      content: 'Puoi proteggerti seguendo alcune semplici regole: verifica sempre l\'autenticità dei siti web, non fornire mai password o dati sensibili via email o telefono, usa password forti e diverse per ogni account, mantieni aggiornati i tuoi dispositivi e software, e verifica sempre i link prima di cliccarci. Il nostro chatbot Sgamy può aiutarti a valutare i rischi in tempo reale.'
    },
    {
      title: 'Il servizio è gratuito?',
      content: 'Sì, SGAMAPP è completamente gratuito. Tutti i servizi, incluse le guide, il chatbot educativo e gli strumenti di protezione, sono disponibili senza costi. Il nostro obiettivo è rendere la sicurezza digitale accessibile a tutti.'
    },
    {
      title: 'Come funziona il chatbot Sgamy?',
      content: 'Sgamy è il nostro assistente virtuale disponibile 24/7. Puoi chiedergli qualsiasi domanda sulla sicurezza digitale, sulle truffe online, sul phishing e molto altro. Basta cliccare sul pulsante "Parla con Sgamy" presente nella home page e iniziare una conversazione. Sgamy è progettato per essere chiaro, paziente e sempre aggiornato sulle ultime minacce digitali.'
    },
    {
      title: 'Le guide sono adatte anche per chi non è esperto?',
      content: 'Assolutamente sì! Le nostre guide sono pensate proprio per chi non ha molta esperienza con il digitale. Ogni procedura è spiegata passo-passo con linguaggio semplice, esempi concreti e screenshot intuitivi. Inoltre, il nostro design è pensato per essere accessibile a tutti, con font grandi e interfaccia chiara.'
    }
  ];

  const tabs: Tab[] = [
    {
      id: 'tab1',
      label: 'Sicurezza',
      content: (
        <div className="tabs-panel-content">
          <h3>Proteggi i tuoi dati</h3>
          <p>
            La sicurezza dei tuoi dati personali è fondamentale. Impara a riconoscere le minacce online,
            a creare password sicure e a proteggere le tue informazioni sensibili. Usa sempre connessioni
            sicure e verifica l'autenticità dei siti prima di inserire dati personali.
          </p>
          <ul className="tabs-feature-list">
            <li>Usa password uniche e complesse per ogni account</li>
            <li>Attiva l'autenticazione a due fattori quando possibile</li>
            <li>Mantieni aggiornati software e sistema operativo</li>
            <li>Verifica sempre i certificati SSL dei siti web</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'Guide',
      content: (
        <div className="tabs-panel-content">
          <h3>Le nostre guide pratiche</h3>
          <p>
            Esplora le nostre guide passo-passo per utilizzare strumenti digitali in sicurezza.
            Ogni guida è pensata per essere chiara e accessibile, anche per chi non ha molta esperienza.
          </p>
          <ul className="tabs-feature-list">
            <li>Guide su SPID, CIE, PEC e servizi digitali</li>
            <li>Istruzioni chiare con screenshot e esempi</li>
            <li>Supporto per ogni livello di esperienza</li>
            <li>Aggiornamenti costanti con le ultime novità</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tab3',
      label: 'Supporto',
      content: (
        <div className="tabs-panel-content">
          <h3>Ricevi aiuto quando ne hai bisogno</h3>
          <p>
            Non sei solo! Il nostro chatbot Sgamy è sempre disponibile per rispondere alle tue domande
            e aiutarti a navigare in sicurezza online. Puoi contattarci anche per segnalare problemi
            o per suggerimenti.
          </p>
          <ul className="tabs-feature-list">
            <li>Chatbot disponibile 24/7 per le tue domande</li>
            <li>Risposte immediate e chiare</li>
            <li>Supporto multilingua</li>
            <li>Contatti per assistenza personalizzata</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tab4',
      label: 'FAQ',
      content: (
        <div className="tabs-panel-content">
          <h3>Domande Frequenti</h3>
          <p className="tabs-faq-intro">
            Qui trovi le risposte alle domande più comuni su SGAMAPP, i nostri servizi e la sicurezza digitale.
          </p>
          <div className="tabs-faq-list">
            {faqs.map((faq, index) => (
              <Collapsible key={index} title={faq.title} content={faq.content} />
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="tabs-section">
      <div className="tabs-container">
        <h2 className="tabs-title">Scopri di più</h2>
        <div className="tabs-wrapper">
          <div className="tabs-header">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                id={`tab-${tab.id}`}
                className={`tabs-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                role="tab"
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tabs-content">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tabs-panel ${activeTab === tab.id ? 'active' : ''}`}
                role="tabpanel"
                id={`tabpanel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tabs;

