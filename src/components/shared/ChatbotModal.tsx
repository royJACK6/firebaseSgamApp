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
    { type: 'bot', text: 'Ciao! Sono Sgamy, il tuo assistente digitale. Come posso aiutarti oggi?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
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
            <img src={sgamyLogo} alt="Logo di Sgamy" className="chatbot-logo" />
            <div>
              <h2 id="chatbot-title" className="chatbot-title">Sgamy</h2>
              <p className="chatbot-subtitle">Il tuo assistente digitale</p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <div className={`server-status server-status-${serverStatus}`}>
              <span className="status-indicator"></span>
              <span className="status-text">
                {serverStatus === 'checking' && 'Controllo...'}
                {serverStatus === 'online' && 'Sgamy è operativo!'}
                {serverStatus === 'offline' && 'Sgamy sta dormendo... zzz...'}
              </span>
            </div>
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
              {m.type === 'bot' && <img src={sgamyLogo} alt="Avatar di Sgamy" className="message-avatar" />}
              <div className="message-content">
                {m.imageUrl && (
                  <div className="message-image-container">
                    <img src={m.imageUrl} alt="Immagine inviata" className="message-image" />
                  </div>
                )}
                {m.type === 'bot' && m.score && (
                  <div className={`score-alert score-alert-${getScoreColor(m.score)}`}>
                    {getScoreLabel(m.score)}
                  </div>
                )}
                <p>{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message bot-message">
              <img src={sgamyLogo} alt="Avatar di Sgamy" className="message-avatar" />
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
              <img src={imagePreview} alt="Anteprima" />
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
