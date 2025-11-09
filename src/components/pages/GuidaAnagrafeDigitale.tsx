import React from "react";
import GuidaTemplate from "../shared/GuidaTemplate";
import anagrafeDigitaleImg from "../../assets/SGAMY_ANAGRAFE.png";

const GuidaAnagrafeDigitale: React.FC = () => {
  const steps = [
    { title: "Accedi al portale", description: "Effettua il login con SPID o CIE." },
    { title: "Verifica i tuoi dati", description: "Controlla i dati personali registrati." },
    { title: "Usa i servizi online", description: "Richiedi certificati, consultazioni e aggiornamenti online." },
  ];

  const info = {
    difficulty: "Facile",
    duration: "10 minuti",
    stepsCount: steps.length,
  };

  return (
    <GuidaTemplate
      title="Anagrafe Digitale"
      subtitle="Accesso e utilizzo dei servizi di anagrafe digitale"
      image={anagrafeDigitaleImg}
      steps={steps}
      info={info}
      previousLink="/guide/pagamenti-dm-sanitari"
      previousTitle="Guida precedente: Pagamenti DM Sanitari"
      nextLink="/guide/prenotazioni-asl-puglia"
      nextTitle="Prossima guida: Prenotazioni ASL Puglia"
    />
  );
};

export default GuidaAnagrafeDigitale;
