import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash, faBan } from '@fortawesome/free-solid-svg-icons';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Inserisci la password');
      return;
    }

    const success = login(password);
    if (success) {
      navigate('/admin-dashboard');
    } else {
      setError('Password non corretta');
      setPassword('');
    }
  }; //Smadonniamo II per colpa di Vercel

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__header">
          <div className="admin-login__icon">
            <FontAwesomeIcon icon={faBan} />
          </div>
          <h1>Accesso Amministratore</h1>
          <p>Area riservata per la gestione dei contenuti</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__field">
            <label htmlFor="admin-password">
              <FontAwesomeIcon icon={faKey} /> Password
            </label>
            <div className="admin-login__input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci la password amministratore"
                autoComplete="off"
                autoFocus
              />
              <button
                type="button"
                className="admin-login__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-login__error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="admin-login__submit">
            Accedi
          </button>
        </form>

        <div className="admin-login__footer">
          <p>Questa è un'area riservata. Accesso solo per personale autorizzato.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

