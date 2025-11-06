import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLanguage, faSignOutAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1>Dashboard Amministratore</h1>
        <button onClick={handleLogout} className="admin-dashboard__logout">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>

      <div className="admin-dashboard__content">
        <div className="admin-dashboard__welcome">
          <FontAwesomeIcon icon={faChartBar} className="admin-dashboard__welcome-icon" />
          <h2>Benvenuto nell'area amministratore</h2>
          <p>Gestisci i contenuti del glossario e del traduttore generazionale</p>
        </div>

        <div className="admin-dashboard__cards">
          <Link to="/admin-dashboard/glossario" className="admin-card">
            <div className="admin-card__icon">
              <FontAwesomeIcon icon={faBook} />
            </div>
            <h3>Gestione Glossario</h3>
            <p>Aggiungi, modifica o elimina termini del glossario antifrode</p>
            <div className="admin-card__arrow">→</div>
          </Link>

          <Link to="/admin-dashboard/traduttore" className="admin-card">
            <div className="admin-card__icon">
              <FontAwesomeIcon icon={faLanguage} />
            </div>
            <h3>Gestione Traduttore</h3>
            <p>Gestisci le traduzioni tra linguaggio boomer e slang moderno</p>
            <div className="admin-card__arrow">→</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

