import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import logosImage from '../../assets/logos.png'
import sgamyLogo from '../../assets/sgamy-logo.png'
import sgamyGif from '../../assets/SGAMY-GIF2.gif'
import mainLogo from '../../assets/logo.svg'
import { useChatbot } from '../../contexts/ChatbotContext'
import { AccessibilityButton } from './AccessibilityModal'
import AccessibilityModal from './AccessibilityModal'
import SearchBar from './SearchBar'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { openChatbot } = useChatbot()
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false)
  const [showResponsiveModal, setShowResponsiveModal] = useState(false)
  const [shouldPulse, setShouldPulse] = useState(false)
  
  // Verifica se è la prima visita nella sessione e se siamo sulla home
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem('sgamapp-chatbot-tooltip-seen')
    const isHomePage = location.pathname === '/'
    
    if (!hasSeenTooltip && isHomePage) {
      // Mostra il modale sia in desktop che in mobile/tablet
      const showTimer = setTimeout(() => {
        setShowResponsiveModal(true)
        setShouldPulse(true) // Inizia la pulsazione
      }, 1500)
      
      // Nascondi automaticamente dopo 8 secondi
      const hideTimer = setTimeout(() => {
        setShowResponsiveModal(false)
        // Continua la pulsazione per altri 2.5 secondi dopo la chiusura del modale
        setTimeout(() => {
          setShouldPulse(false)
          sessionStorage.setItem('sgamapp-chatbot-tooltip-seen', 'true')
        }, 2500) // 2.5 secondi dopo la chiusura del modale
      }, 9500) // 1.5s delay + 8s display = 9.5s total
      
      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [location.pathname])
  
  const handleChatbotClick = () => {
    // Nascondi il modale quando si clicca sul chatbot
    if (showResponsiveModal) {
      setShowResponsiveModal(false)
      // Continua la pulsazione per altri 2.5 secondi dopo la chiusura del modale
      setTimeout(() => {
        setShouldPulse(false)
        sessionStorage.setItem('sgamapp-chatbot-tooltip-seen', 'true')
      }, 2500)
    }
    openChatbot()
  }
  
  const handleResponsiveModalClose = () => {
    setShowResponsiveModal(false)
    // Continua la pulsazione per altri 2.5 secondi dopo la chiusura del modale
    setTimeout(() => {
      setShouldPulse(false)
      sessionStorage.setItem('sgamapp-chatbot-tooltip-seen', 'true')
    }, 2500)
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleAccessibilityClick = () => {
    setIsAccessibilityOpen(true)
  }

  return (
    <>
      <header className="navbar-simple">
        <nav>
          <button 
            type="button"
            className="logo-button" 
            onClick={handleLogoClick}
            title="Torna alla home"
          >
            <img src={mainLogo} alt="Logo SGAMAPP - Sicurezza digitale e identità digitale" className="logo-img me-2" loading="lazy" />
            <img src={logosImage} alt="Loghi istituzionali e partner di SGAMAPP" className="logos-img me-2" loading="lazy" />
          </button>

          <div className="navbar-center">
            <SearchBar />
          </div>

          <div className="navbar-right">
            <AccessibilityButton onClick={handleAccessibilityClick} />
            <div className="chatbot-button-wrapper">
              <button
                type="button"
                className={`btn-icon btn-icon--shadow chatbot-btn ${shouldPulse ? 'chatbot-btn-pulse' : ''}`}
                onClick={handleChatbotClick}
                title="Parla con Sgamy"
              >
                <img src={sgamyLogo} alt="Icona di Sgamy, assistente virtuale per la sicurezza digitale" className="sgamy-nav-icon" loading="lazy" />
              </button>
            </div>
          </div>
        </nav>
      </header>
      {isAccessibilityOpen && (
        <AccessibilityModal onClose={() => setIsAccessibilityOpen(false)} />
      )}
      
      {/* Modale responsive con immagine Sgamy */}
      {showResponsiveModal && (
        <div className="chatbot-responsive-modal">
          <div className="chatbot-responsive-modal-overlay" onClick={handleResponsiveModalClose}></div>
          <div className="chatbot-responsive-modal-content">
            <div className="chatbot-responsive-modal-image">
              <img src={sgamyGif} alt="Sgamy, assistente virtuale per la sicurezza digitale" />
            </div>
            <div className="chatbot-responsive-modal-tooltip">
              <div className="chatbot-responsive-modal-tooltip-content">
                <p>Ciao! Se hai bisogno di una mano per messaggi truffa/frode, cliccami!</p>
                <button
                  type="button"
                  className="chatbot-responsive-modal-close"
                  onClick={handleResponsiveModalClose}
                  aria-label="Chiudi modale"
                >
                  ×
                </button>
              </div>
              <div className="chatbot-responsive-modal-tooltip-arrow"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
