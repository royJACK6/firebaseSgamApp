import './HeroSection.css'
import heroImage from '../../assets/SGAMY_NONNINA.png'

function HeroSection() {
  return (
    <section className="hero-section">
      <img 
        src={heroImage} 
        alt="Immagine di Sgamy, l'assistente virtuale di SGAMAPP, con aspetto accogliente e rassicurante" 
        className="hero-image" 
      />
      <div className="hero-content">
        <h1>Benvenuto in SGAMAPP</h1>
        <p>La tua soluzione completa per la sicurezza digitale</p>
      </div>
    </section>
  )
}

export default HeroSection
