import React, { useEffect } from 'react';
import './Mission.css';

const Mission: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="mission">
      <header className="mission__intro">
        <h1>La Nostra Missione</h1>
        <p className="mission__subtitle">
          SGAMAPP nasce con l'obiettivo di rendere la sicurezza digitale accessibile a tutti, 
          con particolare attenzione alle esigenze degli utenti meno esperti.
        </p>
      </header>

      <section className="mission__section">
        <h2>Il Nostro Scopo</h2>
        <p>
          Crediamo fermamente che navigare in sicurezza nel mondo digitale sia un diritto di tutti, 
          non un privilegio riservato ai tecnici. La nostra missione è fornire strumenti, conoscenze 
          e supporto per proteggere i dati personali e riconoscere le truffe online, rendendo 
          l'esperienza digitale sicura e accessibile per chiunque.
        </p>
      </section>

      <section className="mission__section">
        <h2>Cosa Offriamo</h2>
        <div className="mission__features">
          <div className="mission__feature">
            <h3>Guide Pratiche e Semplici</h3>
            <p>
              Guide passo-passo scritte in linguaggio chiaro e comprensibile, con esempi concreti 
              e screenshot intuitivi. Ogni procedura è spiegata in modo che anche chi non ha esperienza 
              tecnica possa seguirla senza difficoltà.
            </p>
          </div>
          
          <div className="mission__feature">
            <h3>Chatbot Educativo 24/7</h3>
            <p>
              Sgamy, il nostro assistente virtuale, è sempre disponibile per rispondere alle tue domande 
              su sicurezza digitale, truffe online, phishing e molto altro. Chiaro, paziente e sempre aggiornato 
              sulle ultime minacce digitali.
            </p>
          </div>
          
          <div className="mission__feature">
            <h3>Strumenti di Protezione</h3>
            <p>
              Forniamo strumenti pratici per valutare la sicurezza dei link, riconoscere email sospette 
              e proteggere i tuoi dati personali. Il nostro sistema semaforo ti aiuta a capire immediatamente 
              il livello di rischio.
            </p>
          </div>
          
          <div className="mission__feature">
            <h3>Design Inclusivo</h3>
            <p>
              Il nostro design è pensato per essere accessibile a tutti: font grandi, contrasti elevati, 
              colori chiari e leggibili, navigazione semplice. Rispettiamo gli standard di accessibilità 
              per garantire che nessuno sia escluso.
            </p>
          </div>
        </div>
      </section>

      <section className="mission__section">
        <h2>I Nostri Valori</h2>
        <ul className="mission__values">
          <li>
            <strong>Semplicità:</strong> Crediamo che la sicurezza digitale possa e debba essere spiegata 
            in modo semplice e comprensibile per tutti.
          </li>
          <li>
            <strong>Accessibilità:</strong> Nessuno dovrebbe essere escluso dalla possibilità di navigare 
            in sicurezza online. Progettiamo pensando a tutti gli utenti.
          </li>
          <li>
            <strong>Educazione:</strong> Non vogliamo solo proteggere, ma anche educare. Forniamo le conoscenze 
            necessarie per riconoscere e prevenire le minacce digitali.
          </li>
          <li>
            <strong>Empatia:</strong> Capiamo che il mondo digitale può essere intimidatorio. Offriamo supporto 
            paziente e comprensivo per ogni livello di esperienza.
          </li>
          <li>
            <strong>Aggiornamento Continuo:</strong> Il panorama delle minacce digitali cambia continuamente. 
            Ci impegniamo a rimanere aggiornati e a comunicare le novità in modo tempestivo.
          </li>
        </ul>
      </section>

      <section className="mission__section">
        <h2>Chi Siamo</h2>
        <p>
          Siamo un team di esperti in sicurezza digitale, designer e sviluppatori che condividono 
          la passione per rendere il web un luogo più sicuro e accessibile. Il nostro obiettivo è 
          mettere le conoscenze e gli strumenti di sicurezza nelle mani di tutti, senza barriere 
          tecniche o linguistiche.
        </p>
        <p>
          SGAMAPP è nata dall'osservazione che troppe persone, specialmente tra gli utenti meno esperti, 
          cadono vittime di truffe online semplicemente perché non hanno accesso a informazioni chiare 
          e strumenti facili da usare. La nostra risposta è questa piattaforma, pensata per tutti.
        </p>
      </section>

      <section className="mission__section mission__cta">
        <h2>Inizia a Proteggerti Oggi</h2>
        <p>
          Esplora le nostre guide, prova il nostro chatbot Sgamy e scopri come navigare in sicurezza 
          nel mondo digitale. La tua sicurezza è la nostra priorità.
        </p>
      </section>
    </main>
  );
};

export default Mission;

