import { Table } from '@cristiannichifor/civic-ui';
import { Fake, OpenQuestions, SourceFlow } from '../../components/wireframe';
import { currentNews, publicInterestCases, repoModules } from '../../data/content';

export function NewsScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Știri</p>
        <h1>Fluxul actual, legat la dosare verificabile</h1>
        <p>
          Site-ul existent folosește știrile ca intrare principală. Propunerea păstrează acest comportament, dar fiecare
          știre importantă devine un nod: document, persoană, temă, status, material de presă și următor termen.
        </p>
      </section>

      <section className="wire-section" aria-labelledby="news-feed-title">
        <p className="eyebrow">Preluare din modelul actual</p>
        <h2 id="news-feed-title">Carduri de știri cu strat de evidență</h2>
        <div className="news-grid">
          {currentNews.map((item) => (
            <article className="news-card" key={item.title}>
              <div className="news-media" aria-hidden="true">
                {item.category}
              </div>
              <div>
                <p className="label">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.brief}</p>
                <a className="text-button" href={item.href}>
                  Deschide dosarul
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="news-workflow-title">
        <p className="eyebrow">Workflow editorial</p>
        <h2 id="news-workflow-title">Din articol în infrastructură de campanie</h2>
        <SourceFlow
          items={[
            'știrea primește tag de temă și persoană responsabilă',
            'redacția atașează documentul primar și data verificării',
            'dacă există impact local, se generează fișă județeană și material de teren',
            'presa primește brief, chart, CSV și contact de domeniu',
            'membrii văd ce pot verifica sau folosi în întâlniri locale',
          ]}
        />
      </section>

      <OpenQuestions screen="news" />
    </div>
  );
}

export function PressRoomScreen() {
  const spokespeople = [
    ['Administrație locală', 'Purtător de cuvânt Exemplu', 'presa-admin@example.invalid'],
    ['Buget și fiscalitate', 'Expert Bugetar Model', 'presa-buget@example.invalid'],
    ['Justiție și legislație', 'Consilier Legislativ Exemplu', 'presa-legislativ@example.invalid'],
  ];

  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Sala de presă</p>
        <h1>Contacte, active și dosare de date</h1>
        <p>Totul este sintetic. Nicio adresă nu trimite către persoane reale.</p>
      </section>

      <section className="wire-section table-wrap">
        <h2>Purtători de cuvânt pe domeniu</h2>
        <Table role="table" label="Rute de contact fictive">
          <caption>Rute de contact fictive</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" id="press-contacts-col-1">
                Domeniu
              </th>
              <th role="columnheader" scope="col" id="press-contacts-col-2">
                Nume placeholder
              </th>
              <th role="columnheader" scope="col" id="press-contacts-col-3">
                Contact
              </th>
              <th role="columnheader" scope="col" id="press-contacts-col-4">
                Verificat la
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {spokespeople.map(([area, name, contact]) => (
              <tr role="row" key={area}>
                <td role="cell" headers="press-contacts-col-1" data-label="Domeniu">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Domeniu
                  </span>
                  {area}
                </td>
                <td role="cell" headers="press-contacts-col-2" data-label="Nume placeholder">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Nume placeholder
                  </span>
                  {name}
                </td>
                <td role="cell" headers="press-contacts-col-3" data-label="Contact">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Contact
                  </span>
                  {contact}
                </td>
                <td role="cell" headers="press-contacts-col-4" data-label="Verificat la">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Verificat la
                  </span>
                  <Fake source="sală presă sintetică">08 septembrie 2026</Fake>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="split-layout">
        <div className="wire-section">
          <h2>Active descărcabile</h2>
          <ul className="plain-list">
            <li>Fotografie generică persoană: fișier placeholder gri.</li>
            <li>Chart PNG pentru execuție bugetară: generat din cifre sintetice.</li>
            <li>Fișă metodologică: sursă, limitări, cine răspunde.</li>
          </ul>
          <div className="export-row" aria-label="Descărcări simulate">
            <a href="#/presa?asset=png">PNG chart</a>
            <a href="#/presa?asset=csv">CSV date</a>
            <a href="#/presa?asset=brief">Brief PDF</a>
          </div>
        </div>
        <div className="wire-section">
          <h2>Dosare gata de explicat</h2>
          <div className="module-list">
            {repoModules
              .filter((module) => ['achizitii-deschise', 'administrative-reform-simulator', 'public-pay-simulator'].includes(module.repo))
              .map((module) => (
                <article className="module-card" key={module.repo}>
                  <h3>{module.label}</h3>
                  <p>{module.prototypeUse}</p>
                  <Fake source={`repo ${module.repo}`}>{module.syntheticExample}</Fake>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="wire-section" aria-labelledby="press-verification-title">
        <p className="eyebrow">Pentru blocaj media</p>
        <h2 id="press-verification-title">Dosare pe care presa le poate verifica rapid</h2>
        <div className="module-list">
          {publicInterestCases.map((item) => (
            <article className="module-card" key={item.title}>
              <h3>{item.title}</h3>
              <Fake source={item.source}>{item.status}</Fake>
              <p>{item.next}</p>
            </article>
          ))}
        </div>
      </section>

      <OpenQuestions screen="press" />
    </div>
  );
}
