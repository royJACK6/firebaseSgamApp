import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { glossaryApi, type GlossaryTerm } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './AdminCrud.css';

interface EditingTerm {
  id?: number;
  term: string;
  definition: string;
  category: string;
}

const AdminGlossario: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTerm, setEditingTerm] = useState<EditingTerm>({
    term: '',
    definition: '',
    category: 'Generale'
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await glossaryApi.getAll();
      console.log('📊 Glossario - Dati caricati:', data);
      console.log('📊 Glossario - Primo elemento:', data[0]);
      setTerms(data);
    } catch (err) {
      setError('Errore nel caricamento dei termini');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setIsEditing(true);
    setEditingTerm({
      term: '',
      definition: '',
      category: 'Generale'
    });
  };

  const handleEdit = (term: GlossaryTerm) => {
    setIsEditing(true);
    setEditingTerm({
      id: term.id,
      term: term.term,
      definition: term.definition,
      category: term.category
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTerm({
      term: '',
      definition: '',
      category: 'Generale'
    });
  };

  const handleSave = async () => {
    if (!editingTerm.term.trim() || !editingTerm.definition.trim()) {
      alert('Compila tutti i campi obbligatori');
      return;
    }

    try {
      if (editingTerm.id) {
        // Update
        await glossaryApi.update(editingTerm.id, {
          term: editingTerm.term,
          definition: editingTerm.definition,
          category: editingTerm.category
        });
        setSuccessMessage('Termine aggiornato con successo!');
      } else {
        // Add
        await glossaryApi.add({
          term: editingTerm.term,
          definition: editingTerm.definition,
          category: editingTerm.category
        });
        setSuccessMessage('Termine aggiunto con successo!');
      }
      
      await loadTerms();
      handleCancel();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Errore nel salvataggio del termine');
      console.error(err);
    }
  };

  const handleDelete = async (id: number, term: string) => {
    if (!window.confirm(`Sei sicuro di voler eliminare il termine "${term}"?`)) {
      return;
    }

    try {
      await glossaryApi.delete(id);
      setSuccessMessage('Termine eliminato con successo!');
      await loadTerms();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Errore nell\'eliminazione del termine');
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
          <h1>Gestione Glossario</h1>
        </div>
        {!isEditing && (
          <button onClick={handleAdd} className="admin-crud__add-btn">
            <FontAwesomeIcon icon={faPlus} /> Aggiungi Termine
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
          <h2>{editingTerm.id ? 'Modifica Termine' : 'Nuovo Termine'}</h2>
          <div className="admin-crud__form">
            <div className="admin-crud__field">
              <label>Termine *</label>
              <input
                type="text"
                value={editingTerm.term}
                onChange={(e) => setEditingTerm({ ...editingTerm, term: e.target.value })}
                placeholder="Es: Phishing"
              />
            </div>
            <div className="admin-crud__field">
              <label>Definizione *</label>
              <textarea
                value={editingTerm.definition}
                onChange={(e) => setEditingTerm({ ...editingTerm, definition: e.target.value })}
                placeholder="Inserisci la definizione del termine"
                rows={4}
              />
            </div>
            <div className="admin-crud__field">
              <label>Categoria *</label>
              <input
                type="text"
                value={editingTerm.category}
                onChange={(e) => setEditingTerm({ ...editingTerm, category: e.target.value })}
                placeholder="Es: Sicurezza, Truffe Online, ecc."
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
                <th>Termine</th>
                <th>Definizione</th>
                <th>Categoria</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {terms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-crud__empty">
                    Nessun termine presente. Aggiungi il primo termine!
                  </td>
                </tr>
              ) : (
                terms.map((term) => (
                  <tr key={term.id}>
                    <td>{term.id}</td>
                    <td><strong>{term.term}</strong></td>
                    <td>{term.definition}</td>
                    <td><span className="admin-crud__category-badge">{term.category}</span></td>
                    <td>
                      <div className="admin-crud__actions">
                        <button
                          onClick={() => handleEdit(term)}
                          className="admin-crud__action-btn admin-crud__action-btn--edit"
                          title="Modifica"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(term.id, term.term)}
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

export default AdminGlossario;

