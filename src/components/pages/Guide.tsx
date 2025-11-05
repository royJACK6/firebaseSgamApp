import GuideCards from '../shared/GuideCards';
import spidImg from '../../assets/SGAMY_SPID.png';
import pecImg from '../../assets/SGAMY_PEC.png';
import cieImg from '../../assets/SGAMY_CIE.png';
import scudoImg from '../../assets/SGAMY_SCUDO.png';
import passwordImg from '../../assets/SGAMY_PASSWORD_VARIANT.png';
import passwordRecoveryImg from '../../assets/SGAMY_PASSWORD.png';
import certificatiImg from '../../assets/SGAMY_CERTFICATI.png';
import polliceImg from '../../assets/SGAMY_POLLICE.png';
import anagrafeImg from '../../assets/SGAMY_ANAGRAFE.png';

const GuidePage = () => {
  const guides = [
    { icon: spidImg, title: "SPID", description: "Ottieni la tua identità digitale", link: "/guide/spid" },
    { icon: pecImg, title: "PEC", description: "Configura la tua Posta Elettronica Certificata", link: "/guide/pec" },
    { icon: cieImg, title: "CIE", description: "Carta d'Identità Elettronica", link: "/guide/cie" },
    { icon: scudoImg, title: "Sicurezza", description: "Tecniche avanzate per proteggere i tuoi dati", link: "/guide/sicurezza" },
    { icon: passwordImg, title: "Primo Accesso", description: "Primo accesso ai servizi digitali", link: "/guide/primo-accesso" },
    { icon: passwordRecoveryImg, title: "Recupero Password", description: "Come recuperare la password dimenticata", link: "/guide/recupero-password" },
    { icon: certificatiImg, title: "Certificati Online", description: "Come richiedere certificati online", link: "/guide/certificati-online" },
    { icon: polliceImg, title: "Pagamenti DM", description: "Pagamenti DM Sanitari digitali", link: "/guide/pagamenti-dm-sanitari" },
    { icon: anagrafeImg, title: "Anagrafe Digitale", description: "Servizi di anagrafe digitale", link: "/guide/anagrafe-digitale" },
  ];

  return <GuideCards guides={guides} />;
};

export default GuidePage;
