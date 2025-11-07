// src/components/ChatbotModal/ChatbotModal.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useChatbot } from '../../contexts/ChatbotContext';
import { analyzeText, checkServerStatus } from '../../apiServices/apiService';
import './ChatbotModal.css';
import sgamyLogo from '../../assets/sgamy-logo.png';

interface Message {
  type: 'user' | 'bot';
  text: string;
  imageUrl?: string;
  score?: string;
}

const ChatbotModal: React.FC = () => {
  const { isOpen, closeChatbot } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: 'Ciao! Sono Sgamy, il chatbot di SGAMAPP. Come posso aiutarti oggi? Puoi inviare immagini, testi e messaggi per ricevere una valutazione della sicurezza.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Funzione per leggere un messaggio specifico
  const speakMessage = (text: string, messageIndex: number) => {
    if (!text) return;

    // Se questo messaggio sta già parlando, fermalo
    if (speakingMessageIndex === messageIndex) {
      window.speechSynthesis.cancel();
      setSpeakingMessageIndex(null);
      return;
    }

    // Ferma qualsiasi altro parlato in corso
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.95; // Velocità naturale e rilassata
    utterance.pitch = 0.9; // Pitch leggermente basso per voce maschile naturale
    utterance.volume = 1;

    // Usa la voce selezionata dall'utente
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setSpeakingMessageIndex(messageIndex);
    utterance.onend = () => setSpeakingMessageIndex(null);
    utterance.onerror = () => setSpeakingMessageIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  // Ferma il parlato quando si chiude il modal
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis.cancel();
      setSpeakingMessageIndex(null);
    }
  }, [isOpen]);

  // Carica le voci quando il componente si monta
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const italianVoices = voices.filter(voice => voice.lang.startsWith('it'));
      
      // Seleziona automaticamente la prima voce italiana se non ne è stata scelta una
      if (italianVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(italianVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  // Controlla lo stato del server quando il chatbot si apre
  useEffect(() => {
    if (isOpen) {
      const checkServer = async () => {
        console.log('🔍 Chatbot: Verifico se Sgamy è sveglio...');
        setServerStatus('checking');
        const isOnline = await checkServerStatus();
        console.log(`📡 Chatbot: Server ${isOnline ? 'ONLINE ✅' : 'OFFLINE (dormendo) 💤'}`);
        setServerStatus(isOnline ? 'online' : 'offline');
      };
      checkServer();
    }
  }, [isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verifica che sia un'immagine
    if (!file.type.startsWith('image/')) {
      alert('Per favore seleziona un file immagine valido');
      return;
    }

    // Limita la dimensione a 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('L\'immagine è troppo grande. Massimo 10MB consentiti.');
      return;
    }

    setSelectedImage(file);

    // Crea preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getScoreColor = (score: string): 'green' | 'yellow' | 'red' => {
    const scoreLower = score.toLowerCase().trim();
    
    // Verifica colori diretti
    if (scoreLower === 'green' || scoreLower === 'verde' || scoreLower === 'safe' || scoreLower === 'sicuro') {
      return 'green';
    }
    if (scoreLower === 'yellow' || scoreLower === 'giallo' || scoreLower === 'warning' || scoreLower === 'attenzione') {
      return 'yellow';
    }
    if (scoreLower === 'red' || scoreLower === 'rosso' || scoreLower === 'danger' || scoreLower === 'pericolo' || scoreLower === 'rischioso') {
      return 'red';
    }
    
    // Se è un numero, usa una logica basata sul valore
    const numScore = parseFloat(scoreLower);
    if (!isNaN(numScore)) {
      if (numScore >= 0 && numScore < 0.4) return 'green';
      if (numScore >= 0.4 && numScore < 0.7) return 'yellow';
      if (numScore >= 0.7) return 'red';
    }
    
    // Default: giallo se non riconosciuto
    return 'yellow';
  };

  const getScoreLabel = (score: string): string => {
    const color = getScoreColor(score);
    
    if (color === 'green') return '✓ SICURO';
    if (color === 'yellow') return '⚠ ATTENZIONE';
    if (color === 'red') return '✗ RISCHIOSO';
    
    return `Score: ${score}`;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputMessage.trim() && !selectedImage) || isLoading) return;

    const userText = inputMessage.trim();
    const userImageUrl = imagePreview;

    // Aggiungi messaggio utente con eventuale immagine
    setMessages(prev => [...prev, { 
      type: 'user', 
      text: userText || 'Immagine caricata', 
      imageUrl: userImageUrl || undefined 
    }]);
    
    setInputMessage('');
    const imageToSend = selectedImage;
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsLoading(true);

    try {
      const botResponse = await analyzeText(userText || 'Analizza questa immagine', imageToSend);
      console.log('📨 Risposta chatbot:', botResponse);

      if (botResponse && botResponse.text && botResponse.text.trim().length > 0) {
        // Server ha risposto correttamente
        setServerStatus('online');
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: botResponse.text.trim(),
          score: botResponse.score
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Mi dispiace, non ho ricevuto una risposta valida dal server.'
        }]);
      }
    } catch (error) {
      console.error('❌ Errore nella chiamata API:', error);
      // Solo ora segna il server come offline
      setServerStatus('offline');
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Si è verificato un errore durante la comunicazione con il server. Riprova più tardi.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-modal-overlay" onClick={closeChatbot}>
      <div
        className="chatbot-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="chatbot-title"
        aria-modal="true"
      >
        <div className="chatbot-modal-header">
          <div className="chatbot-header-content">
            <img src={sgamyLogo} alt="Logo di Sgamy" className="chatbot-logo" loading="lazy" />
            <div>
              <h2 id="chatbot-title" className="chatbot-title">Sgamy</h2>
              <p className="chatbot-subtitle">Il tuo assistente digitale</p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            {serverStatus === 'checking' && (
              <div className="server-status server-status-checking">
                <span className="status-indicator"></span>
                <span className="status-text">Verifica connessione...</span>
              </div>
            )}
            {serverStatus === 'online' && (
              <div className="server-status server-status-online">
                <span className="status-indicator"></span>
                <span className="status-text">Sgamy è operativo!</span>
              </div>
            )}
            {serverStatus === 'offline' && (
              <div className="server-status server-status-offline">
                <span className="status-indicator"></span>
                <span className="status-text">Sgamy sta dormendo... zzz...</span>
              </div>
            )}
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={closeChatbot}
              aria-label="Chiudi chatbot"
            >
              ×
            </button>
          </div>
        </div>

        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`chatbot-message ${m.type === 'user' ? 'user-message' : 'bot-message'}`}>
              {m.type === 'bot' && <img src={sgamyLogo} alt="Avatar di Sgamy" className="message-avatar" loading="lazy" />}
              <div className="message-content">
                {m.imageUrl && (
                  <div className="message-image-container">
                    <img src={m.imageUrl} alt="Immagine inviata" className="message-image" loading="lazy" />
                  </div>
                )}
                {m.type === 'bot' && m.score && (
                  <div className={`score-alert score-alert-${getScoreColor(m.score)}`}>
                    {getScoreLabel(m.score)}
                  </div>
                )}
                <p>{m.text}</p>
                {m.type === 'bot' && (
                  <button
                    type="button"
                    className={`message-speak-btn ${speakingMessageIndex === i ? 'speaking' : ''}`}
                    onClick={() => speakMessage(m.text, i)}
                    aria-label={speakingMessageIndex === i ? 'Ferma lettura' : 'Ascolta questo messaggio'}
                    title={speakingMessageIndex === i ? 'Ferma lettura' : 'Ascolta messaggio'}
                  >
                    <i className={`fas ${speakingMessageIndex === i ? 'fa-stop' : 'fa-volume-up'}`} aria-hidden="true"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message bot-message">
              <img src={sgamyLogo} alt="Avatar di Sgamy" className="message-avatar" loading="lazy" />
              <div className="message-content">
                <p className="typing-indicator">Sgamy sta scrivendo...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {imagePreview && (
          <div className="image-preview-container">
            <div className="image-preview">
              <img src={imagePreview} alt="Anteprima" loading="lazy" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={handleRemoveImage}
                aria-label="Rimuovi immagine"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSend}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="chatbot-file-input"
            id="chatbot-file-input"
            aria-label="Carica immagine"
          />
          <label htmlFor="chatbot-file-input" className="chatbot-file-label" title="Carica immagine">
            <i className="fas fa-image" aria-hidden="true"></i>
          </label>
          <label htmlFor="chatbot-message-input" className="sr-only">Scrivi un messaggio</label>
          <input
            id="chatbot-message-input"
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder={selectedImage ? "Scrivi un messaggio (opzionale)..." : "Scrivi un messaggio..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            autoComplete="off"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            aria-label="Invia messaggio"
            title="Invia messaggio"
            disabled={isLoading || (!inputMessage.trim() && !selectedImage)}
          >
            <i className="fas fa-paper-plane" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotModal;
