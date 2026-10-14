import { Button, Field, NativeSelect as Select, Textarea } from '@cristiannichifor/civic-ui';
import { MetricGrid, OpenQuestions, SourceFlow } from '../../components/wireframe';

export function OrganizationScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Organizare</p>
        <h1>Despre noi, dar cu reguli și responsabilități găsibile</h1>
        <p>
          Meniul actual “Despre Noi” adună oamenii, organizarea, statutul, carierele, solicitările 544, mandatarii
          financiari și contactul. Propunerea îl transformă într-un hub de guvernanță publică.
        </p>
      </section>

      <section className="wire-section" aria-labelledby="organization-hub-title">
        <p className="eyebrow">Hub public</p>
        <h2 id="organization-hub-title">Legături păstrate, sens clarificat</h2>
        <div className="screen-grid">
          {[
            ['Oameni', 'cine reprezintă partidul și ce date lipsesc', '#/oameni'],
            ['Statut', 'reguli publice și obligații de transparență', 'https://usr.ro/statut'],
            ['Solicitări 544', 'cereri de informații publice și răspunsuri urmărite', 'https://usr.ro/solicitari-informatii-publice'],
            ['Mandatari financiari', 'responsabili financiari și context electoral', 'https://usr.ro/mandatari-financiari'],
            ['Cariere', 'roluri profesionale și capacitate organizațională', 'https://usr.ro/cariere'],
            ['Contact', 'intrare pentru idei, probleme locale și sesizări', '#/contact'],
          ].map(([title, text, href]) => (
            <a className="screen-card" href={href} key={title}>
              <span>{title}</span>
              <small>{text}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="organization-controls-title">
        <p className="eyebrow">Ce adăugăm</p>
        <h2 id="organization-controls-title">Controale operaționale peste pagini statice</h2>
        <SourceFlow
          items={[
            'owner public pentru fiecare pagină sensibilă',
            'dată de actualizare și termen de revizie',
            'registru de lipsuri: CV-uri, contacte, mandate, hotărâri',
            'workflow intern pentru solicitări 544 și răspunsuri publicabile',
            'legătură între mandatari financiari, donații și pagina de bani',
          ]}
        />
      </section>

      <OpenQuestions screen="organization" />
    </div>
  );
}

export function ContactScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Contact</p>
        <h1>Contact public cu triere politică utilă</h1>
        <p>
          Site-ul actual oferă telefon, adresă, email și formular. Propunerea păstrează intrarea simplă, dar cere
          alegerea tipului de mesaj pentru ca organizația să poată răspunde și învăța din cereri.
        </p>
      </section>

      <section className="contact-grid">
        <div className="wire-section">
          <h2>Canale curente</h2>
          <dl className="definition-grid">
            <div>
              <dt>Telefon</dt>
              <dd>0726.701.994</dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>Luni-Vineri, orele 9-17</dd>
            </div>
            <div>
              <dt>Adresă</dt>
              <dd>Șos. Pavel D. Kiseleff, nr. 55, vila 4, Sector 1, București</dd>
            </div>
          </dl>
        </div>
        <div className="wire-section">
          <h2>Formular propus</h2>
          <div className="mini-form" aria-label="Formular static de contact">
            <Field id="contact-type" label="Tip mesaj">
              {(attributes) => (
                <Select {...attributes} defaultValue="problema-locala">
                  <option value="problema-locala">Problemă locală</option>
                  <option value="idee-lege">Idee de lege</option>
                  <option value="verificare">Sesizare de verificat</option>
                  <option value="presa">Cerere presă</option>
                </Select>
              )}
            </Field>
            <Field id="contact-message" label="Mesaj">
              {(attributes) => (
                <Textarea {...attributes} defaultValue="Descrie problema, localitatea și documentul sursă dacă există." />
              )}
            </Field>
            <Button type="button">Simulează trimiterea</Button>
          </div>
        </div>
      </section>

      <section className="wire-section" aria-labelledby="contact-routing-title">
        <p className="eyebrow">Rutare internă</p>
        <h2 id="contact-routing-title">Ce se întâmplă după mesaj</h2>
        <div className="journey-grid">
          {[
            ['Problemă locală', 'merge la filială, ales local și pagina de date locale relevantă.'],
            ['Idee de lege', 'merge la politici publice, verificare legislativă și bibliotecă de poziții.'],
            ['Sesizare', 'merge la verificări publice cu status “indicator”, înainte de orice concluzie.'],
            ['Presă', 'merge la sala de presă, spokesperson și pachet de documente.'],
          ].map(([title, text]) => (
            <article className="journey-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <OpenQuestions screen="contact" />
    </div>
  );
}

export function SignupScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Înscriere</p>
        <h1>“Hai în USR!” legat de muncă concretă în prima săptămână</h1>
        <p>
          CTA-ul existent rămâne emoțional și simplu. Propunerea adaugă onboarding operațional: un membru nou vede rapid
          unde poate ajuta, ce verifică și cine preia rezultatul.
        </p>
      </section>

      <section className="split-layout">
        <div className="wire-section">
          <h2>Promisiune publică</h2>
          <p className="large-copy">
            Nu intri într-un newsletter politic. Intri într-o echipă cu sarcini verificabile, materiale locale și oameni
            responsabili.
          </p>
          <div className="export-row">
            <a href="#/implica-te">Vezi zona membrilor</a>
            <a href="https://usr.ro/inscriere" target="_blank" rel="noreferrer">
              Formular oficial
            </a>
          </div>
        </div>
        <div className="wire-section">
          <h2>Prima săptămână</h2>
          <SourceFlow
            items={[
              'alege județul și domeniul de interes',
              'primește o sarcină mică: CV, HCL, buget sau eveniment',
              'vezi ownerul și termenul',
              'primești material publicabil manual',
              'rezultatul se întoarce în pagina locală',
            ]}
          />
        </div>
      </section>

      <OpenQuestions screen="signup" />
    </div>
  );
}

export function DonateScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Donează</p>
        <h1>Donația conectată la transparență, nu izolată de bani</h1>
        <p>
          Site-ul actual are CTA puternic pentru donații. Propunerea îl păstrează, dar îl leagă direct de pagina de bani,
          mandatari financiari, raportare și valoarea produsă pentru filiale.
        </p>
      </section>

      <section className="split-layout">
        <div className="wire-section">
          <h2>CTA public</h2>
          <p className="large-copy">Fiecare donație trebuie să poată fi legată de capacitate: date, materiale, teren și presă.</p>
          <div className="export-row">
            <a href="https://usr.ro/doneaza" target="_blank" rel="noreferrer">
              Donează pe site-ul oficial
            </a>
            <a href="#/bani">Vezi transparența banilor</a>
          </div>
        </div>
        <div className="wire-section">
          <h2>Ce vede donatorul</h2>
          <MetricGrid
            items={[
              {
                label: 'Pachete locale',
                value: '6',
                source: 'bibliotecă materiale sintetică',
                note: 'Materiale reutilizabile pentru filiale, presă și întâlniri.',
              },
              {
                label: 'Surse verificate',
                value: '42',
                source: 'registru evidență sintetic',
                note: 'Costul digital produce infrastructură, nu doar postări.',
              },
              {
                label: 'Transfer filiale',
                value: '36%',
                source: 'calcul sintetic',
                note: 'Comparat cu pragul statutar afișat pe pagina de bani.',
              },
            ]}
          />
        </div>
      </section>

      <OpenQuestions screen="donate" />
    </div>
  );
}
