import { Fake, MetricGrid, OpenQuestions, SourceFlow } from '../../components/wireframe';
import { publicInterestCases, repoModules } from '../../data/content';

export function GovernmentScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">USR la guvernare</p>
        <h1>Miniștri, prefecturi și proiecte urmărite public</h1>
        <p>
          Intrarea existentă “USR la Guvernare” rămâne recognoscibilă. Diferența propusă este ca fiecare realizare
          comunicată să aibă fișă de execuție: promisiune, instituție, jalon, sursă, limită și următoarea actualizare.
        </p>
      </section>

      <section className="wire-section" aria-labelledby="government-overview-title">
        <p className="eyebrow">Ce vede publicul rapid</p>
        <h2 id="government-overview-title">Guvernare ca registru, nu doar vitrină de știri</h2>
        <MetricGrid
          items={[
            {
              label: 'Portofolii urmărite',
              value: '3',
              source: 'usr.ro + registru sintetic',
              note: 'Miniștri, secretari de stat sau responsabili politici grupați pe domenii.',
            },
            {
              label: 'Jaloane cu status',
              value: '12',
              source: 'PNRR / ministere sintetic',
              note: 'Fiecare jalon are sursă, termen, status și explicație pe înțelesul publicului.',
            },
            {
              label: 'Materiale locale',
              value: '8',
              source: 'bibliotecă materiale sintetică',
              note: 'O realizare națională devine fișă locală când afectează comunități concrete.',
            },
          ]}
        />
      </section>

      <section className="split-layout">
        <div className="wire-section">
          <h2>Model de fișă proiect</h2>
          <dl className="definition-grid">
            <div>
              <dt>Proiect</dt>
              <dd>Automatizarea proceselor de lucru din administrația publică</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <Fake source="registru guvernare sintetic">jalon închis</Fake>
              </dd>
            </div>
            <div>
              <dt>Impact explicat</dt>
              <dd>Mai puține proceduri manuale, date reutilizabile și termene urmărite public.</dd>
            </div>
            <div>
              <dt>Următor termen</dt>
              <dd>
                <Fake source="calendar proiect sintetic">raport trimestrial</Fake>
              </dd>
            </div>
          </dl>
        </div>
        <div className="wire-section">
          <h2>Cum se leagă de site</h2>
          <SourceFlow
            items={[
              'știre pe prima pagină',
              'fișă proiect cu surse',
              'persoană responsabilă',
              'brief pentru presă',
              'material pentru filială',
            ]}
          />
        </div>
      </section>

      <OpenQuestions screen="government" />
    </div>
  );
}

export function VerificationScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Verificări publice</p>
        <h1>Anticorupție ca evidență verificabilă, nu ca slogan</h1>
        <p>
          Această rută este proiectată pentru contextul de corupție și blocaj media. Limbajul rămâne prudent:
          indicatorii semnalează cazuri de verificat, iar concluziile apar doar după documente, răspunsuri și drept la
          replică.
        </p>
      </section>

      <section className="wire-section" aria-labelledby="verification-cases-title">
        <p className="eyebrow">Dosare publice</p>
        <h2 id="verification-cases-title">Trei tipuri de cazuri care pot rupe blocajul media</h2>
        <div className="module-list">
          {publicInterestCases.map((item) => (
            <article className="module-card" key={item.title}>
              <h3>{item.title}</h3>
              <Fake source={item.source}>{item.status}</Fake>
              <p>{item.risk}</p>
              <p>{item.next}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="verification-rules-title">
        <p className="eyebrow">Reguli de publicare</p>
        <h2 id="verification-rules-title">Protecție politică, juridică și reputațională</h2>
        <div className="risk-stage-list">
          {[
            ['1. Indicator', 'Datele arată o anomalie sau o lipsă. Nu se formulează acuzații.'],
            ['2. Document', 'Se atașează actul primar, linkul, data, metoda și limitarea.'],
            ['3. Replică', 'Instituția sau persoana vizată primește cale clară de răspuns.'],
            ['4. Acțiune', 'Filiala primește întrebări, brief local și variantă de comunicare manuală.'],
          ].map(([title, text]) => (
            <article className="state-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="note-panel">
        <h2>De ce creează avantaj față de oponenți</h2>
        <p>
          Oponenții pot respinge o acuzație. Este mai greu să respingă un dosar cu document primar, cronologie,
          metodologie, răspuns lipsă sau răspuns publicat integral. Platforma face subiectele verificabile și
          reutilizabile pentru presă, filiale, aleși și membri.
        </p>
      </section>

      <OpenQuestions screen="verification" />
    </div>
  );
}

export function PositionsScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Ce propunem</p>
        <h1>Poziții publice cu istoric vizibil</h1>
        <p>Data primei publicări și diferența dintre revizii sunt afișate lângă poziție.</p>
      </section>

      <section className="wire-section" aria-labelledby="policy-index-title">
        <p className="eyebrow">Bibliotecă</p>
        <h2 id="policy-index-title">Mockup de structură pentru poziții și reforme</h2>
        <div className="dashboard-layout">
          <MetricGrid
            items={[
              {
                label: 'Poziții publicate',
                value: '18',
                source: 'bibliotecă sintetică',
                note: 'Fiecare poziție are dată inițială și revizii.',
              },
              {
                label: 'Dosare cu simulator',
                value: '3',
                source: 'repo-uri publice candidate',
                note: 'Simulatoarele rămân linkuri externe, nu pagini absorbite.',
              },
              {
                label: 'Poziții de revizuit',
                value: '4',
                source: 'workflow editorial sintetic',
                note: 'Revizia are diff vizibil înainte de publicare.',
              },
            ]}
          />
          <SourceFlow
            items={[
              'document sursă sau analiză repo',
              'notă metodologică',
              'poziție redactată',
              'revizie aprobată',
              'publicare cu diff și permalink',
            ]}
          />
        </div>
      </section>

      <article className="position-page">
        <div className="date-diff-panel">
          <div>
            <span className="label">Publicată prima dată</span>
            <strong>
              <Fake source="bibliotecă poziții sintetică">14 martie 2026</Fake>
            </strong>
          </div>
          <div>
            <span className="label">Diff ultima revizie</span>
            <div className="diff-box">
              <p>
                <span className="diff-added">adăugat:</span> calendar de aplicare și responsabil de urmărire.
              </p>
              <p>
                <span className="diff-removed">eliminat:</span> formulare vagă despre publicare ulterioară.
              </p>
            </div>
          </div>
        </div>
        <section>
          <h2>Întrebare</h2>
          <p className="large-copy">Cum ar trebui publicate criteriile pentru alocarea fondurilor locale?</p>
        </section>
        <section>
          <h2>Poziție</h2>
          <p>Alocările trebuie publicate cu criterii verificabile, calendar clar și explicație pentru fiecare excepție.</p>
        </section>
        <section>
          <h2>Raționament</h2>
          <p>Fără criterii publice, discuția se mută de la rezultat la suspiciune. Istoricul face schimbarea verificabilă.</p>
        </section>
        <section>
          <h2>Istoric revizii</h2>
          <ol className="timeline">
            <li>
              <Fake source="bibliotecă poziții sintetică">02 iunie 2026</Fake> revizie: calendar și responsabil.
            </li>
            <li>
              <Fake source="bibliotecă poziții sintetică">20 aprilie 2026</Fake> revizie: raționament extins.
            </li>
            <li>
              <Fake source="bibliotecă poziții sintetică">14 martie 2026</Fake> publicare inițială.
            </li>
          </ol>
        </section>
      </article>

      <section className="wire-section" aria-labelledby="policy-modules-title">
        <p className="eyebrow">Dosare extinse</p>
        <h2 id="policy-modules-title">Cum intră proiectele existente în „Ce propunem”</h2>
        <div className="module-list">
          {repoModules
            .filter((module) =>
              ['romania-reforms', 'administrative-reform-simulator', 'public-pay-simulator', 'legislativ'].includes(
                module.repo,
              ),
            )
            .map((module) => (
              <article className="module-card" key={module.repo}>
                <h3>{module.label}</h3>
                <p>{module.prototypeUse}</p>
                <dl className="compact-definition">
                  <div>
                    <dt>Mod</dt>
                    <dd>{module.integrationMode}</dd>
                  </div>
                  <div>
                    <dt>Exemplu</dt>
                    <dd>
                      <Fake source={`repo ${module.repo}`}>{module.syntheticExample}</Fake>
                    </dd>
                  </div>
                </dl>
                <a href={module.href} target="_blank" rel="noreferrer">
                  Deschide repo
                </a>
              </article>
            ))}
        </div>
      </section>

      <OpenQuestions screen="positions" />
    </div>
  );
}
