import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import logosImage from '../../assets/logos.png'
import sgamyLogo from '../../assets/sgamy-logo.png'
import mainLogo from '../../assets/logo.svg'
import { useChatbot } from '../../contexts/ChatbotContext'
import { AccessibilityButton } from './AccessibilityModal'
import AccessibilityModal from './AccessibilityModal'
import SearchBar from './SearchBar'

function Navbar() {
  const navigate = useNavigate()
  const { openChatbot } = useChatbot()
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false)

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
            <button
              type="button"
              className="btn-icon btn-icon--shadow chatbot-btn"
              onClick={openChatbot}
              title="Parla con Sgamy"
            >
              <img src={sgamyLogo} alt="Icona di Sgamy, assistente virtuale per la sicurezza digitale" className="sgamy-nav-icon" loading="lazy" />
            </button>
          </div>
        </nav>
      </header>
      {isAccessibilityOpen && (
        <AccessibilityModal onClose={() => setIsAccessibilityOpen(false)} />
      )}
    </>
  )
}

export default Navbar
