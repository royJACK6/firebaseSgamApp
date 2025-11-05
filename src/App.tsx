import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatbotProvider } from './contexts/ChatbotContext';

import Navbar from './components/shared/Navbar';
import HeaderLinks from './components/shared/HeaderLinks';
import SearchBar from './components/shared/SearchBar';
import Footer from './components/shared/Footer';
import ChatbotModal from './components/shared/ChatbotModal';

import Home from './components/pages/Home';
import Glossario from './components/pages/Glossario';
import TraduttoreGenerazionale from './components/pages/TraduttoreGenerazionale';
import Info from './components/pages/Info';
import AntiFrode from './components/pages/AntiFrode';
import Guide from './components/pages/Guide';
import GuidaSpid from './components/pages/Guida-Spid';
import GuidaPec from './components/pages/Guida-PEC';
import GuidaCie from './components/pages/Guida-CIE';
import GuidaSicurezza from './components/pages/Guida-Sicurezza';
import GuidaPrimoAccesso from './components/pages/Guida-PrimoAccesso';
import GuidaRecuperoPassword from './components/pages/GuidaRecuperoPassword';
import GuidaCertificatiOnline from './components/pages/GuidaCertificatiOnline';
import GuidaPagamentiDMSanitari from './components/pages/GuidaPagamentiDMSanitari';
import GuidaAnagrafeDigitale from './components/pages/GuidaAnagrafeDigitale';
import PrivacyPolicy from './components/pages/Privacy';
import Mission from './components/pages/Mission';
import Error404 from './components/pages/Error404';

function App() {
  return (
    <ChatbotProvider>
      <Router>
        <SearchBar />
        <Navbar />
        <HeaderLinks />
        <main className="main-content" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servizio-antifrode" element={<AntiFrode />} />

            {/* Mostra i card delle guide */}
            <Route path="/guide" element={<Guide />} />

            {/* Guide singole */}
            <Route path="/guide/spid" element={<GuidaSpid />} />
            <Route path="/guide/pec" element={<GuidaPec />} />
            <Route path="/guide/cie" element={<GuidaCie />} />
            <Route path="/guide/sicurezza" element={<GuidaSicurezza />} />
            <Route path="/guide/primo-accesso" element={<GuidaPrimoAccesso />} />
            <Route path="/guide/recupero-password" element={<GuidaRecuperoPassword />} />
            <Route path="/guide/certificati-online" element={<GuidaCertificatiOnline />} />
            <Route path="/guide/pagamenti-dm-sanitari" element={<GuidaPagamentiDMSanitari />} />
            <Route path="/guide/anagrafe-digitale" element={<GuidaAnagrafeDigitale />} />

            <Route path="/glossario" element={<Glossario />} />
            <Route path="/traduttore-generazionale" element={<TraduttoreGenerazionale />} />
            <Route path="/info" element={<Info />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
        <ChatbotModal />
      </Router>
    </ChatbotProvider>
  );
}

export default App;
