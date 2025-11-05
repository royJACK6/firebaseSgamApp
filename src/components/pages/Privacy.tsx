import './privacy.css';

function PrivacyPolicy() {
  return (
    <main className="privacy">
      <header className="privacy__intro">
        <h1>Politica sulla Privacy e Cookie</h1>
        <p>
          La presente Informativa sulla Privacy descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti del sito sgamapp.
        </p>
      </header>

      <section className="privacy__section">
        <h2>1. Titolare del trattamento</h2>
        <p>Il titolare del trattamento dei dati è [SgamApp].</p>
      </section>

      <section className="privacy__section">
        <h2>2. Tipologia di dati raccolti</h2>
        <p>
          Raccogliamo dati personali forniti volontariamente dall’utente, come nome, email, dati di navigazione, ecc.  
          Il sito potrebbe utilizzare cookie per migliorare l’esperienza d’uso.
        </p>
      </section>

      <section className="privacy__section">
        <h2>3. Finalità del trattamento</h2>
        <ul>
          <li>Fornire i servizi richiesti dall’utente;</li>
          <li>Migliorare il sito e il servizio;</li>
          <li>Adempiere obblighi di legge.</li>
        </ul>
      </section>

      <section className="privacy__section">
        <h2>4. Base giuridica</h2>
        <p>Il trattamento dei dati avviene nel rispetto del Regolamento UE 2016/679 (GDPR).</p>
      </section>

      <section className="privacy__section">
        <h2>5. Conservazione dei dati</h2>
        <p>I dati saranno conservati per il tempo necessario a garantire il servizio e adempiere obblighi legali.</p>
      </section>

      <section className="privacy__section">
        <h2>6. Diritti dell’utente</h2>
        <p>
          L’utente ha diritto di accedere, rettificare, cancellare i dati e opporsi al trattamento in ogni momento.
        </p>
      </section>

      <section className="privacy__section">
        <h2>7. Sicurezza</h2>
        <p>Adottiamo misure tecniche e organizzative per garantire la sicurezza dei dati.</p>
      </section>

      <section className="privacy__section">
        <h2>8. Cookie</h2>
        <p>Utilizziamo cookie tecnici e, dopo consenso, cookie di profilazione per migliorare il sito.</p>
      </section>

      <section className="privacy__section privacy__footer">
        <p>Per esercitare i tuoi diritti o per informazioni, scrivici a: privacy@sgamapp.com</p>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
