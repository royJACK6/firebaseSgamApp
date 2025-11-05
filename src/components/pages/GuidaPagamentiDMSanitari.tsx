import React from "react";
import GuidaTemplate from "../shared/GuidaTemplate";
import pagamentiDMSanitariImg from "../../assets/SGAMY_CERTFICATI.png";

const GuidaPagamentiDMSanitari: React.FC = () => {
  const steps = [
    { title: "Accedi al portale", description: "Effettua il login con SPID o CIE." },
    { title: "Seleziona il pagamento", description: "Scegli la pratica o il servizio da pagare." },
    { title: "Completa transazione", description: "Effettua il pagamento tramite PagoPA o carta di credito." },
  ];

  const info = {
    difficulty: "Media",
    duration: "10 minuti",
    stepsCount: steps.length,
    cost: "Variabile",
    validity: "Una tantum",
  };

  return (
    <GuidaTemplate
      title="Pagamenti DM Sanitari"
      subtitle="Guida per effettuare pagamenti digitali dei DM Sanitari"
      image={pagamentiDMSanitariImg}
      steps={steps}
      info={info}
      previousLink="/guide/certificati-online"
      previousTitle="Certificati Online"
      nextLink="/guide/anagrafe-digitale"
      nextTitle="Anagrafe Digitale"
    />
  );
};

export default GuidaPagamentiDMSanitari;
