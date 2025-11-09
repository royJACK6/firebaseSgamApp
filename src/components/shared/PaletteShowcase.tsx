/**
 * PALETTE SHOWCASE
 * 
 * Componente di esempio per visualizzare tutti i colori e stili
 * della palette SgamApp. Utile per development e come riferimento.
 * 
 * Per usarlo, importalo e renderizzalo in una route di test:
 * import PaletteShowcase from './components/shared/PaletteShowcase';
 */

import './PaletteShowcase.css';

const PaletteShowcase = () => {
  return (
    <div className="palette-showcase">
      <div className="showcase-container">
        <h1 className="showcase-title">🎨 Palette SgamApp</h1>
        <p className="showcase-subtitle">
          Visualizzazione completa dei colori e stili disponibili
        </p>

        {/* Colori Brand */}
        <section className="showcase-section">
          <h2 className="section-title">Colori Brand</h2>
          <div className="color-grid">
            <div className="color-card">
              <div className="color-swatch sfondo-primario"></div>
              <div className="color-info">
                <strong>Primario</strong>
                <code>--colore-primario</code>
                <span>#1565D6</span>
              </div>
            </div>
            <div className="color-card">
              <div className="color-swatch sfondo-secondario"></div>
              <div className="color-info">
                <strong>Secondario</strong>
                <code>--colore-secondario</code>
                <span>#64B5F6</span>
              </div>
            </div>
            <div className="color-card">
              <div className="color-swatch" style={{ backgroundColor: 'var(--colore-intermedio)' }}></div>
              <div className="color-info">
                <strong>Intermedio</strong>
                <code>--colore-intermedio</code>
                <span>#1976D2</span>
              </div>
            </div>
          </div>
        </section>

        {/* Colori di Stato */}
        <section className="showcase-section">
          <h2 className="section-title">Colori di Stato</h2>
          <div className="color-grid">
            <div className="color-card">
              <div className="color-swatch sfondo-successo"></div>
              <div className="color-info">
                <strong>Successo</strong>
                <code>--colore-successo</code>
                <span>#10B981</span>
              </div>
            </div>
            <div className="color-card">
              <div className="color-swatch sfondo-warning"></div>
              <div className="color-info">
                <strong>Warning</strong>
                <code>--colore-warning</code>
                <span>#F59E0B</span>
              </div>
            </div>
            <div className="color-card">
              <div className="color-swatch sfondo-errore"></div>
              <div className="color-info">
                <strong>Errore</strong>
                <code>--colore-errore</code>
                <span>#EF4444</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gradienti */}
        <section className="showcase-section">
          <h2 className="section-title">Gradienti</h2>
          <div className="gradient-grid">
            <div className="gradient-card">
              <div className="gradient-swatch gradiente-blu"></div>
              <div className="gradient-info">
                <strong>Blu Principale</strong>
                <code>--gradiente-blu-principale</code>
              </div>
            </div>
            <div className="gradient-card">
              <div className="gradient-swatch gradiente-verde"></div>
              <div className="gradient-info">
                <strong>Verde Successo</strong>
                <code>--gradiente-verde-successo</code>
              </div>
            </div>
            <div className="gradient-card">
              <div className="gradient-swatch gradiente-rosso"></div>
              <div className="gradient-info">
                <strong>Rosso Errore</strong>
                <code>--gradiente-rosso-errore</code>
              </div>
            </div>
          </div>
        </section>

        {/* Bottoni */}
        <section className="showcase-section">
          <h2 className="section-title">Bottoni di Esempio</h2>
          <div className="buttons-grid">
            <button className="btn-esempio btn-primario">
              Bottone Primario
            </button>
            <button className="btn-esempio btn-successo">
              Bottone Successo
            </button>
            <button className="btn-esempio btn-errore">
              Bottone Errore
            </button>
            <button className="btn-esempio btn-outline">
              Bottone Outline
            </button>
          </div>
        </section>

        {/* Card con Ombre */}
        <section className="showcase-section">
          <h2 className="section-title">Card con Ombre</h2>
          <div className="shadow-grid">
            <div className="shadow-card ombra-leggera">
              <h3>Ombra Leggera</h3>
              <code>--ombra-leggera</code>
            </div>
            <div className="shadow-card ombra-media">
              <h3>Ombra Media</h3>
              <code>--ombra-media</code>
            </div>
            <div className="shadow-card ombra-card">
              <h3>Ombra Card</h3>
              <code>--ombra-card</code>
            </div>
            <div className="shadow-card ombra-pronunciata">
              <h3>Ombra Pronunciata</h3>
              <code>--ombra-pronunciata</code>
            </div>
          </div>
        </section>

        {/* Alert */}
        <section className="showcase-section">
          <h2 className="section-title">Alert di Esempio</h2>
          <div className="alert-grid">
            <div className="alert alert-successo">
              <strong>✅ Successo!</strong> Operazione completata con successo.
            </div>
            <div className="alert alert-warning">
              <strong>⚠️ Attenzione!</strong> Verifica i dati inseriti.
            </div>
            <div className="alert alert-errore">
              <strong>❌ Errore!</strong> Impossibile completare l'operazione.
            </div>
          </div>
        </section>

        {/* Spaziature */}
        <section className="showcase-section">
          <h2 className="section-title">Spaziature</h2>
          <div className="spacing-demo">
            <div className="spacing-item">
              <div className="spacing-box spacing-xs"></div>
              <span>XS (4px)</span>
            </div>
            <div className="spacing-item">
              <div className="spacing-box spacing-sm"></div>
              <span>SM (8px)</span>
            </div>
            <div className="spacing-item">
              <div className="spacing-box spacing-md"></div>
              <span>MD (16px)</span>
            </div>
            <div className="spacing-item">
              <div className="spacing-box spacing-lg"></div>
              <span>LG (24px)</span>
            </div>
            <div className="spacing-item">
              <div className="spacing-box spacing-xl"></div>
              <span>XL (32px)</span>
            </div>
          </div>
        </section>

        {/* Bordi */}
        <section className="showcase-section">
          <h2 className="section-title">Bordi Arrotondati</h2>
          <div className="border-grid">
            <div className="border-demo bordo-piccolo">
              <span>Piccolo (4px)</span>
            </div>
            <div className="border-demo bordo-medio">
              <span>Medio (8px)</span>
            </div>
            <div className="border-demo bordo-grande">
              <span>Grande (12px)</span>
            </div>
            <div className="border-demo bordo-xl">
              <span>XL (16px)</span>
            </div>
          </div>
        </section>

        {/* Testi */}
        <section className="showcase-section">
          <h2 className="section-title">Colori di Testo</h2>
          <div className="text-examples">
            <p className="testo-primario">Testo con colore primario</p>
            <p className="testo-secondario">Testo con colore secondario</p>
            <p className="testo-successo">Testo con colore successo</p>
            <p className="testo-errore">Testo con colore errore</p>
            <p className="testo-warning">Testo con colore warning</p>
            <p className="testo-grigio-scuro">Testo grigio scuro</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PaletteShowcase;

