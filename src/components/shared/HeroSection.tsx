import './HeroSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../../assets/SGAMY_NONNINA.png'

function HeroSection() {
  return (
    <section className="hero-section">
      <img 
        src={heroImage} 
        alt="Immagine di Sgamy, l'assistente virtuale di SGAMAPP, con aspetto accogliente e rassicurante" 
        className="hero-image" 
        loading="lazy"
      />
      <div className="hero-content">
        <h1>
          <FontAwesomeIcon icon={faShieldAlt} className="hero-title-icon" aria-hidden="true" />
          Benvenuto in SGAMAPP
        </h1>
        <p>La tua soluzione completa per la sicurezza digitale</p>
      </div>
    </section>
  )
}

export default HeroSection
