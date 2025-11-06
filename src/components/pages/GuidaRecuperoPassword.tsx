import React from "react";
import GuidaTemplate from "../shared/GuidaTemplate";
import recuperoPasswordImg from "../../assets/SGAMY_PASSWORD.png";

const GuidaRecuperoPassword: React.FC = () => {
  const steps = [
    { title: "Vai alla pagina login", description: "Clicca su 'Password dimenticata'." },
    { title: "Inserisci email", description: "Scrivi l'email associata al tuo account." },
    { title: "Segui istruzioni", description: "Riceverai un link via email per reimpostare la password." },
  ];

  const info = {
    difficulty: "Facile",
    duration: "5 minuti",
    stepsCount: steps.length,
  };

  return (
    <GuidaTemplate
      title="Recupero Password"
      subtitle="Procedura guidata per recuperare la password dimenticata"
      image={recuperoPasswordImg}
      steps={steps}
      info={info}
      previousLink="/guide/primo-accesso"
      previousTitle="Primo Accesso ai Servizi"
      nextLink="/guide/certificati-online"
      nextTitle="Certificati Online"
    />
  );
};

export default GuidaRecuperoPassword;
