import { Fake, OpenQuestions, PlaceholderBox } from '../../components/wireframe';
import { electionContext, officialSiteAudit, publicPages, strategicAdvantages } from '../../data/content';
import { currentHash } from '../../routing';
import type { HashRoute } from '../../routing';

export function IndexScreen() {
  return (
    <div className="stack">
      <section className="hero-panel" aria-labelledby="index-title">
        <div>
          <p className="eyebrow">Sinteză usr.ro + propunere</p>
          <h1 id="index-title">Site public USR ca infrastructură de încredere, nu doar flux de pagini.</h1>
          <p>
            Păstrăm intrările publice existente: știri, oameni, guvernare, înscriere, donații, organizare și contact.
            Adăugăm stratul care lipsește: fiecare afirmație importantă are sursă, owner, status, limită și material
            reutilizabil local.
          </p>
          <div className="export-row" aria-label="Acțiuni principale">
            <a href="#/stiri">Vedeți știrile ca dosare</a>
            <a href="#/verificari">Deschideți verificările</a>
            <a href="#/implica-te">Intrați în zona membrilor</a>
          </div>
        </div>
        <PlaceholderBox label="flux public conectat: știri, oameni, bani, date locale" />
      </section>

      <section className="wire-section" aria-labelledby="current-site-title">
        <p className="eyebrow">Website existent</p>
        <h2 id="current-site-title">Ce păstrăm de pe usr.ro și ce schimbăm</h2>
        <div className="content-lanes">
          {officialSiteAudit.map(([title, current, upgrade]) => (
            <article className="comparison-card" key={title}>
              <h3>{title}</h3>
              <dl className="compact-definition">
                <div>
                  <dt>Curent</dt>
                  <dd>{current}</dd>
                </div>
                <div>
                  <dt>Propus</dt>
                  <dd>{upgrade}</dd>
                </div>
              </dl>
              <Fake source="audit usr.ro, 08.09.2026">compatibil</Fake>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="site-map-title">
        <p className="eyebrow">Structură site</p>
        <h2 id="site-map-title">Intrări publice combinate</h2>
        <div className="screen-grid">
          {publicPages.map(([title, text, href]) => (
            <a className="screen-card" href={href} key={href}>
              <span>{title}</span>
              <small>{text}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="proof-title">
        <p className="eyebrow">Conținut public</p>
        <h2 id="proof-title">Ce intră pe prima pagină propusă</h2>
        <div className="content-lanes">
          {[
            ['Știre prioritară', 'Un articol public este legat de persoană, document primar, status și următorul termen.'],
            ['Verificare publică', 'Un indicator de risc este încadrat ca fapt de verificat, nu ca verdict politic.'],
            ['Apel la acțiune', 'Înscriere, donație, newsletter și sarcini pentru membri apar lângă efectul măsurabil.'],
          ].map(([title, text]) => (
            <article className="lane-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <Fake source="conținut sintetic">afișare editorială</Fake>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="benefits-title">
        <p className="eyebrow">De ce contează</p>
        <h2 id="benefits-title">Avantajul este organizațional, nu doar editorial</h2>
        <div className="benefit-grid">
          {strategicAdvantages.slice(0, 3).map((item) => (
            <article className="benefit-card" key={item.title}>
              <h3>{item.title}</h3>
              <Fake source="model strategic sintetic">{item.metric}</Fake>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <a className="text-button" href="#/strategie">
          Deschide argumentul complet
        </a>
      </section>

      <section className="wire-section" aria-labelledby="electoral-context-title">
        <p className="eyebrow">Context electoral</p>
        <h2 id="electoral-context-title">Problema de 8-12% trebuie tratată ca problemă de distribuție și încredere</h2>
        <div className="module-list">
          {electionContext.map(([label, value, interpretation]) => (
            <article className="module-card" key={label}>
              <h3>{label}</h3>
              <Fake source="rezultate publice / agregatoare sondaje, verificare manuală">{value}</Fake>
              <p>{interpretation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="screen-grid" aria-labelledby="linked-title">
        <h2 id="linked-title">Ecrane</h2>
        {[
          ['#/stiri', 'Știri', 'flux curent, transformat în dosare verificabile'],
          ['#/oameni', 'Oameni', 'director, filtre, date lipsă vizibile'],
          ['#/oameni/consilier-model?view=public', 'Persoana', 'același record în trei vizibilități'],
          ['#/guvernare', 'USR la guvernare', 'miniștri, prefecturi, proiecte, status'],
          ['#/verificari', 'Verificări publice', 'indicatori de risc și drept la replică'],
          ['#/ce-propunem', 'Ce propunem', 'poziții cu dată, diffs și revizii'],
          ['#/declaratii', 'Declarații de avere', 'scan, câmpuri, hash, diff anual'],
          ['#/date-locale', 'Date locale', 'buget, HCL, UAT, exporturi'],
          ['#/implica-te', 'Zona membrilor', 'sarcini, fapte de azi, colegi opt-in'],
          ['#/bani', 'Bani', 'subvenții, prag filiale, cheltuieli centrale'],
          ['#/presa', 'Sala de presă', 'contacte, active și dosare pentru presă'],
          ['#/organizare', 'Organizare', 'statut, 544, mandatari, cariere, filiale'],
          ['#/contact', 'Contact', 'idei, probleme locale, sesizări triage-uite'],
          ['#/inscriere', 'Înscriere', 'onboarding membru și primă sarcină'],
          ['#/doneaza', 'Donează', 'donații conectate la raportarea banilor'],
          ['#/proiecte-date', 'Proiecte și date', 'ce putem folosi din repo-uri publice'],
          ['#/strategie', 'De ce contează', 'beneficii, avantaj strategic, outreach'],
          ['#/arhitectura', 'Arhitectură date', 'conectori, direcții, cadențe'],
          ['#/nota', 'Notă costuri', 'cost real și articole din Statut'],
        ].map(([href, title, text]) => (
          <a className="screen-card" href={href} key={href}>
            <span>{title}</span>
            <small>{text}</small>
          </a>
        ))}
      </section>

      <OpenQuestions screen="index" />
    </div>
  );
}

export function NotFound({ route }: { route: HashRoute }) {
  return (
    <section className="page-heading">
      <p className="eyebrow">Rută necunoscută</p>
      <h1>Nu există ecran pentru {currentHash(route)}.</h1>
      <a className="text-button" href="#/">
        Revino la index
      </a>
    </section>
  );
}
