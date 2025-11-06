import React from "react";
import GuidaTemplate from "../shared/GuidaTemplate";
import certificatiOnlineImg from '../../assets/SGAMY_CERTFICATI.png';

const GuidaCertificatiOnline: React.FC = () => {
  const steps = [
    { title: "Accedi al portale", description: "Effettua il login con SPID o CIE." },
    { title: "Seleziona il certificato", description: "Scegli tra certificati disponibili online." },
    { title: "Scarica il documento", description: "Salva il certificato in PDF sul tuo dispositivo." },
  ];

  const info = {
    difficulty: "Media",
    duration: "15 minuti",
    stepsCount: steps.length,
  };

  return (
    <GuidaTemplate
      title="Certificati Online"
      subtitle="Come richiedere e scaricare i certificati online"
      image={certificatiOnlineImg}
      steps={steps}
      info={info}
      previousLink="/guide/recupero-password"
      previousTitle="Recupero Password"
      nextLink="/guide/pagamenti-dm-sanitari"
      nextTitle="Pagamenti DM Sanitari"
    />
  );
};

export default GuidaCertificatiOnline;
