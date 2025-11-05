import React from "react";
import "./BottomNav.css";
import spidIcon from "../../assets/SGAMY_SPID.png";
import pecIcon from "../../assets/SGAMY_PEC.png";
import cieIcon from "../../assets/SGAMY_CIE.png";
import pagoPaIcon from "../../assets/SGAMY_POLLICE.png";
import primoAccessoIcon from "../../assets/SGAMY_POLLICE.png";
import recuperoPwdIcon from "../../assets/SGAMY_PASSWORD.png";
import certificatiIcon from "../../assets/SGAMY_CERTFICATI.png";
import anagrafeIcon from "../../assets/SGAMY_PASSWORD_VARIANT.png";

const BottomNav: React.FC = () => {
  const navItems = [
    { icon: spidIcon, label: "SPID", link: "/guide/spid" },
    { icon: pecIcon, label: "PEC", link: "/guide/pec" },
    { icon: cieIcon, label: "CIE", link: "/guide/cie" },
    { icon: primoAccessoIcon, label: "Primo Accesso", link: "/guide/primo-accesso" },
    { icon: recuperoPwdIcon, label: "Recupero Password", link: "/guide/recupero-password" },
    { icon: certificatiIcon, label: "Certificati Online", link: "/guide/certificati-online" },
    { icon: pagoPaIcon, label: "Pagamenti DM", link: "/guide/pagamenti-dm-sanitari" },
    { icon: anagrafeIcon, label: "Anagrafe Digitale", link: "/guide/anagrafe-digitale" },
  ];

  return (
    <nav className="bottom-nav" aria-label="Navigazione rapida alle guide principali">
      {navItems.map((item, index) => (
        <a 
          key={index} 
          href={item.link} 
          className="nav-item"
          aria-label={`Vai alla guida su ${item.label}`}
        >
          <img src={item.icon} alt={`Icona ${item.label}`} className="nav-icon" aria-hidden="true" />
          <span className="nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;
