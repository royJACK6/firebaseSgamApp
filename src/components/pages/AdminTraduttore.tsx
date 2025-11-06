import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { translatorApi, type TranslationResult } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './AdminCrud.css';

interface EditingTranslation {
  id?: number;
  boomerWord: string;
  slangWord: string;
  description?: string;
}

const AdminTraduttore: React.FC = () => {
  const [translations, setTranslations] = useState<TranslationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<EditingTranslation>({
    boomerWord: '',
    slangWord: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await translatorApi.getAll();
      setTranslations(data);
    } catch (err) {
      setError('Errore nel caricamento delle traduzioni');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setIsEditing(true);
    setEditingTranslation({
      boomerWord: '',
      slangWord: '',
      description: ''
    });
  };

  const handleEdit = (translation: TranslationResult) => {
    setIsEditing(true);
    setEditingTranslation({
      id: translation.id,
      boomerWord: translation.boomerWord,
      slangWord: translation.slangWord,
      description: translation.description || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTranslation({
      boomerWord: '',
      slangWord: '',
      description: ''
    });
  };

  const handleSave = async () => {
    if (!editingTranslation.boomerWord.trim() || !editingTranslation.slangWord.trim()) {
      alert('Compila tutti i campi obbligatori');
      return;
    }

    try {
      if (editingTranslation.id) {
        // Update
        await translatorApi.update(editingTranslation.id, {
          boomerWord: editingTranslation.boomerWord,
          slangWord: editingTranslation.slangWord,
          description: editingTranslation.description
        });
        setSuccessMessage('Traduzione aggiornata con successo!');
      } else {
        // Add
        await translatorApi.add({
          boomerWord: editingTranslation.boomerWord,
          slangWord: editingTranslation.slangWord,
          description: editingTranslation.description
        });
        setSuccessMessage('Traduzione aggiunta con successo!');
      }
      
      await loadTranslations();
      handleCancel();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Errore nel salvataggio della traduzione');
      console.error(err);
    }
  };

  const handleDelete = async (id: number | undefined, boomerWord: string) => {
    if (!id) return;
    
    if (!window.confirm(`Sei sicuro di voler eliminare la traduzione "${boomerWord}"?`)) {
      return;
    }

    try {
      await translatorApi.delete(id);
      setSuccessMessage('Traduzione eliminata con successo!');
      await loadTranslations();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Errore nell\'eliminazione della traduzione');
      console.error(err);
    }
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud__header">
        <div>
          <Link to="/admin-dashboard" className="admin-crud__back">
            <FontAwesomeIcon icon={faArrowLeft} /> Torna alla Dashboard
          </Link>
          <h1>Gestione Traduttore Generazionale</h1>
        </div>
        {!isEditing && (
          <button onClick={handleAdd} className="admin-crud__add-btn">
            <FontAwesomeIcon icon={faPlus} /> Aggiungi Traduzione
          </button>
        )}
      </div>

      {successMessage && (
        <div className="admin-crud__success">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="admin-crud__error">
          {error}
        </div>
      )}

      {isEditing && (
        <div className="admin-crud__form-card">
          <h2>{editingTranslation.id ? 'Modifica Traduzione' : 'Nuova Traduzione'}</h2>
          <div className="admin-crud__form">
            <div className="admin-crud__field">
              <label>Parola Boomer *</label>
              <input
                type="text"
                value={editingTranslation.boomerWord}
                onChange={(e) => setEditingTranslation({ ...editingTranslation, boomerWord: e.target.value })}
                placeholder="Es: Telefono"
              />
            </div>
            <div className="admin-crud__field">
              <label>Parola Slang *</label>
              <input
                type="text"
                value={editingTranslation.slangWord}
                onChange={(e) => setEditingTranslation({ ...editingTranslation, slangWord: e.target.value })}
                placeholder="Es: Cell"
              />
            </div>
            <div className="admin-crud__field">
              <label>Descrizione/Spiegazione</label>
              <textarea
                value={editingTranslation.description || ''}
                onChange={(e) => setEditingTranslation({ ...editingTranslation, description: e.target.value })}
                placeholder="Aggiungi una descrizione o spiegazione della traduzione (opzionale)"
                rows={3}
              />
            </div>
            <div className="admin-crud__form-actions">
              <button onClick={handleSave} className="admin-crud__btn admin-crud__btn--save">
                <FontAwesomeIcon icon={faSave} /> Salva
              </button>
              <button onClick={handleCancel} className="admin-crud__btn admin-crud__btn--cancel">
                <FontAwesomeIcon icon={faTimes} /> Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="admin-crud__loading">Caricamento...</div>
      ) : (
        <div className="admin-crud__table-container">
          <table className="admin-crud__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Parola Boomer</th>
                <th>Parola Slang</th>
                <th>Descrizione</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {translations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-crud__empty">
                    Nessuna traduzione presente. Aggiungi la prima traduzione!
                  </td>
                </tr>
              ) : (
                translations.map((translation) => (
                  <tr key={translation.id}>
                    <td>{translation.id}</td>
                    <td><strong>{translation.boomerWord}</strong></td>
                    <td><strong>{translation.slangWord}</strong></td>
                    <td>{translation.description || <em style={{ color: '#999' }}>Nessuna descrizione</em>}</td>
                    <td>
                      <div className="admin-crud__actions">
                        <button
                          onClick={() => handleEdit(translation)}
                          className="admin-crud__action-btn admin-crud__action-btn--edit"
                          title="Modifica"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(translation.id, translation.boomerWord)}
                          className="admin-crud__action-btn admin-crud__action-btn--delete"
                          title="Elimina"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTraduttore;

