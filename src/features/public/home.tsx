import { Fake, OpenQuestions, PlaceholderBox } from '../../components/wireframe';
import { currentNews, officialSiteAudit, publicInterestCases, publicPages } from '../../data/content';
import { officials } from '../../data/officials';
import { StrategySections } from './proposal';
import { currentHash } from '../../routing';
import type { HashRoute } from '../../routing';

export function HomeScreen() {
  const [lead, ...latest] = currentNews;
  return (
    <div className="stack home">
      <section className="home-lead" aria-labelledby="home-lead-title">
        <p className="eyebrow">
          {lead.category} · {lead.date}
        </p>
        <h1 id="home-lead-title">{lead.title}</h1>
        <p>{lead.brief}</p>
        <div className="home-actions">
          <a className="home-button home-button--primary" href={lead.href}>
            Citește dosarul
          </a>
          <a className="home-button" href="#/inscriere">
            Înscrie-te
          </a>
          <a className="home-button home-button--donate" href="#/doneaza">
            Donează
          </a>
        </div>
      </section>

      <section className="wire-section" aria-labelledby="home-news-title">
        <h2 id="home-news-title">Ultimele știri</h2>
        <div className="home-cards">
          {latest.map((item) => (
            <a className="home-card" href={item.href} key={item.title}>
              <span className="eyebrow">
                {item.category} · {item.date}
              </span>
              <strong>{item.title}</strong>
              <span>{item.brief}</span>
            </a>
          ))}
          <a className="home-card home-card--more" href="#/stiri">
            <strong>Toate știrile</strong>
            <span>Arhiva de dosare, cu sursă și status.</span>
          </a>
        </div>
      </section>

      <section className="wire-section" aria-labelledby="home-people-title">
        <h2 id="home-people-title">Oamenii noștri</h2>
        <div className="home-cards">
          {officials.slice(0, 3).map((person) => (
            <a className="home-card" href={`#/oameni/${person.id}`} key={person.id}>
              <PlaceholderBox label={`fotografie fictivă: ${person.name}`} />
              <strong>{person.name}</strong>
              <span>
                {person.role} · {person.county}
              </span>
            </a>
          ))}
        </div>
        <a className="text-button" href="#/oameni">
          Toți aleșii și reprezentanții
        </a>
      </section>

      <section className="wire-section" aria-labelledby="home-checks-title">
        <h2 id="home-checks-title">Verificări publice</h2>
        <div className="home-cards">
          {publicInterestCases.slice(0, 2).map((item) => (
            <a className="home-card" href="#/verificari" key={item.title}>
              <span className="eyebrow">{item.status}</span>
              <strong>{item.title}</strong>
              <span>{item.risk}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="home-involve-title">
        <h2 id="home-involve-title">Implică-te</h2>
        <div className="home-cards">
          {[
            ['#/inscriere', 'Devino membru', 'Înscriere online și prima sarcină în filiala ta.'],
            ['#/comunitate', 'Intră în comunitate', 'Resurse, proiecte și contacte publice, fără calitatea de membru.'],
            ['#/doneaza', 'Susține financiar', 'Donații conectate la raportarea publică a banilor.'],
          ].map(([href, title, text]) => (
            <a className="home-card" href={href} key={href}>
              <strong>{title}</strong>
              <span>{text}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function AboutScreen() {
  return (
    <div className="stack">
      <section className="hero-panel" aria-labelledby="index-title">
        <div>
          <p className="eyebrow">Despre machetă</p>
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
          ['#/strategie', 'Despre machetă', 'acest memoriu: beneficii, avantaj strategic, outreach'],
          ['#/arhitectura', 'Arhitectură date', 'conectori, direcții, cadențe'],
          ['#/nota', 'Notă costuri', 'cost real și articole din Statut'],
        ].map(([href, title, text]) => (
          <a className="screen-card" href={href} key={href}>
            <span>{title}</span>
            <small>{text}</small>
          </a>
        ))}
      </section>

      <StrategySections />

      <OpenQuestions screen={['index', 'strategy']} />
    </div>
  );
}

export function NotFound({ route }: { route: HashRoute }) {
  return (
    <section className="page-heading">
      <p className="eyebrow">Rută necunoscută</p>
      <h1>Nu există ecran pentru {currentHash(route)}.</h1>
      <a className="text-button" href="#/">
        Revino la prima pagină
      </a>
    </section>
  );
}
