import React from "react";
import GuidaTemplate from "../shared/GuidaTemplate";
import primoAccessoImg from "../../assets/SGAMY_PASSWORD_VARIANT.png";

const GuidaPrimoAccesso: React.FC = () => {
  const steps = [
    { title: "Registrazione iniziale", description: "Crea il tuo account sui portali dei servizi." },
    { title: "Verifica email", description: "Controlla la tua casella di posta e conferma l'email." },
    { title: "Accesso al portale", description: "Effettua il login e completa il profilo." },
  ];

  const info = {
    difficulty: "Facile",
    duration: "10 minuti",
    stepsCount: steps.length,
  };

  return (
    <GuidaTemplate
      title="Primo Accesso ai Servizi"
      subtitle="Guida passo passo per accedere per la prima volta ai servizi digitali"
      image={primoAccessoImg}
      steps={steps}
      info={info}
      previousLink="/guide/sicurezza"
      previousTitle="Guida precedente: Sicurezza"
      nextLink="/guide/recupero-password"
      nextTitle="Prossima guida: Recupero Password"
    />
  );
};

export default GuidaPrimoAccesso;
