import React from 'react';
import GuidaTemplate from '../shared/GuidaTemplate';
import spidImage from '../../assets/SGAMY_SPID.png';

const GuidaSpid: React.FC = () => {
  const steps = [
    { title: "Scegli il tuo provider", description: "Visita il sito spid.gov.it e scegli il provider." },
    { title: "Accedi al sito del provider", description: "Clicca su 'Richiedi SPID'." },
    { title: "Inserisci i tuoi dati", description: "Compila il form con i tuoi dati personali." },
    { title: "Verifica la tua identità", description: "Puoi farlo tramite CIE, patente, passaporto o videochiamata." },
    { title: "Ricevi il codice di attivazione", description: "Ricevi il codice via SMS o email." },
    { title: "Attiva il tuo SPID", description: "Inserisci il codice e crea username e password." },
    { title: "Imposta secondo fattore di autenticazione", description: "Scegli SMS, app mobile o token hardware." },
    { title: "Testa il tuo SPID", description: "Prova ad accedere a un servizio pubblico." },
  ];

  const info = {
    difficulty: "Facile",
    duration: "15 minuti",
    stepsCount: steps.length,
  };

  return (
    <GuidaTemplate
      title="Come creare un SPID"
      subtitle="Guida completa per ottenere la tua identità digitale SPID"
      image={spidImage}
      steps={steps}
      info={info}
      helpText="Il nostro assistente Sgamy è sempre disponibile per aiutarti con qualsiasi dubbio!"
      nextLink="/guide/pec"
      nextTitle="Prossima guida: PEC"
      // Rimuoviamo prevLink e prevTitle se non esistono
    />
  );
};

export default GuidaSpid;
