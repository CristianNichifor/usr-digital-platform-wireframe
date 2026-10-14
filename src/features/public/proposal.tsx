import { Table } from '@cristiannichifor/civic-ui';
import { Fake, MetricGrid, OpenQuestions } from '../../components/wireframe';
import { connectors, dataProducts, electionContext, repoModules, strategicAdvantages } from '../../data/content';

export function ProjectDataScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Proiecte și date</p>
        <h1>Ce putem folosi din repo-urile publice CristianNichifor</h1>
        <p>
          Ecranul nu importă date reale în runtime. Arată ce tipuri de date, metodologii și linkuri ar putea alimenta o
          versiune reală.
        </p>
      </section>

      <section className="wire-section table-wrap">
        <h2>Inventar de reutilizare</h2>
        <Table role="table" label="Inventar de reutilizare">
          <caption>Repo-uri verificate pe GitHub în 08 septembrie 2026</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" id="reuse-inventory-col-1">
                Repo
              </th>
              <th role="columnheader" scope="col" id="reuse-inventory-col-2">
                Ce putem folosi
              </th>
              <th role="columnheader" scope="col" id="reuse-inventory-col-3">
                Unde intră
              </th>
              <th role="columnheader" scope="col" id="reuse-inventory-col-4">
                Mod
              </th>
              <th role="columnheader" scope="col" id="reuse-inventory-col-5">
                Limită
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {repoModules.map((module) => (
              <tr role="row" key={module.repo}>
                <td role="cell" headers="reuse-inventory-col-1" data-label="Repo">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Repo
                  </span>
                  <a href={module.href} target="_blank" rel="noreferrer">
                    {module.repo}
                  </a>
                </td>
                <td role="cell" headers="reuse-inventory-col-2" data-label="Ce putem folosi">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Ce putem folosi
                  </span>
                  {module.reusableData}
                </td>
                <td role="cell" headers="reuse-inventory-col-3" data-label="Unde intră">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Unde intră
                  </span>
                  {module.prototypeUse}
                </td>
                <td role="cell" headers="reuse-inventory-col-4" data-label="Mod">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Mod
                  </span>
                  {module.integrationMode}
                </td>
                <td role="cell" headers="reuse-inventory-col-5" data-label="Limită">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Limită
                  </span>
                  {module.caveat}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="wire-section" aria-labelledby="data-products-title">
        <p className="eyebrow">Produse de date</p>
        <h2 id="data-products-title">Ce ar deveni reutilizabil în site</h2>
        <div className="module-list">
          {dataProducts.map(([title, contents, surface]) => (
            <article className="module-card" key={title}>
              <h3>{title}</h3>
              <p>{contents}</p>
              <Fake source="arhitectură sintetică">{surface}</Fake>
            </article>
          ))}
        </div>
      </section>

      <section className="note-panel">
        <h2>Decizie de principiu</h2>
        <p>
          Site-ul public poate rezuma și lega aceste proiecte, dar nu trebuie să le înghită. Simulatoarele rămân pe
          domenii sau rute neutre, cu metodologia lor și cu avertismentul că nu sunt poziții oficiale.
        </p>
        <p>
          În machetă, cifrele afișate pe baza lor rămân sintetice: <Fake source="inventar repo-uri">5 module candidate</Fake>.
        </p>
      </section>

      <OpenQuestions screen="projects" />
    </div>
  );
}

export function StrategySections() {
  return (
    <>

      <section className="wire-section" aria-labelledby="strategy-benefits-title">
        <h2 id="strategy-benefits-title">Beneficii pentru partid</h2>
        <div className="benefit-grid">
          {strategicAdvantages.map((item) => (
            <article className="benefit-card" key={item.title}>
              <h3>{item.title}</h3>
              <Fake source="model strategic sintetic">{item.metric}</Fake>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="strategic-pressure-title">
        <p className="eyebrow">Presiune strategică</p>
        <h2 id="strategic-pressure-title">De ce un redesign editorial nu este suficient</h2>
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

      <section className="strategy-grid" aria-labelledby="human-resource-title">
        <div className="wire-section">
          <p className="eyebrow">Resursă umană</p>
          <h2 id="human-resource-title">Cum ajută membrii, angajații și aleșii</h2>
          <ul className="plain-list">
            <li>Membrii primesc sarcini clare: ce verifică, ce livrează, cine preia rezultatul.</li>
            <li>Angajații văd ce materiale lipsesc și care filiale au nevoie de sprijin.</li>
            <li>Aleșii au record public coerent: CV, voturi, proiecte, declarații, poziții relevante.</li>
            <li>Birourile văd aceeași realitate cu permisiuni diferite, nu rapoarte paralele.</li>
          </ul>
        </div>
        <div className="wire-section">
          <p className="eyebrow">Mockup capacitate</p>
          <MetricGrid
            items={[
              {
                label: 'Membri activați',
                value: '18%',
                source: 'simulare organizațională',
                note: 'Procent fictiv pentru a discuta ținta de activare.',
              },
              {
                label: 'Timp până la material',
                value: '2 zile',
                source: 'workflow sintetic',
                note: 'De la fapt verificat la pachet local reutilizabil.',
              },
              {
                label: 'Filiale cu owner',
                value: '31',
                source: 'hartă operațională sintetică',
                note: 'Owner pentru date, presă, teren și evenimente.',
              },
            ]}
          />
        </div>
      </section>

      <section className="wire-section" aria-labelledby="media-blockade-title">
        <p className="eyebrow">Blocaj media</p>
        <h2 id="media-blockade-title">Cum extrage partidul valoare când presa nu preia spontan subiectul</h2>
        <div className="journey-grid">
          {[
            ['Canal propriu', 'site-ul publică dosare complete, nu doar reacții la agenda altora.'],
            ['Presă ajutată', 'jurnaliștii primesc documente, chart, CSV, contact și cronologie gata de verificat.'],
            ['Filiale activate', 'același dosar produce întrebări locale, întâlniri și materiale de teren.'],
            ['Oponenți constrânși', 'răspunsul lor trebuie să intre pe documente, nu pe etichete sau zgomot.'],
          ].map(([title, text]) => (
            <article className="journey-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="electorate-title">
        <p className="eyebrow">Relația cu electoratul posibil</p>
        <h2 id="electorate-title">Descoperire în ambele sensuri</h2>
        <div className="journey-grid">
          {[
            ['Cetățeanul caută', 'o problemă locală, un ales, o poziție sau o întâlnire.'],
            ['Site-ul răspunde', 'cu persoana responsabilă, poziția curentă, sursa cifrei și materialul local.'],
            ['Filiala învață', 'ce teme sunt căutate și unde trebuie organizată o întâlnire sau o fișă mai clară.'],
            ['Munca se întoarce în teren', 'cu materiale printabile, grafice, mesaje editabile și owners vizibili.'],
          ].map(([title, text]) => (
            <article className="journey-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="repo-advantage-title">
        <p className="eyebrow">Avantaj competitiv</p>
        <h2 id="repo-advantage-title">De ce repo-urile cresc utilitatea politică</h2>
        <div className="module-list">
          {repoModules.map((module) => (
            <article className="module-card" key={module.repo}>
              <h3>{module.label}</h3>
              <p>{module.prototypeUse}</p>
              <p>{module.integrationMode}</p>
              <Fake source={`repo ${module.repo}`}>{module.syntheticExample}</Fake>
            </article>
          ))}
        </div>
      </section>

      <section className="note-panel">
        <h2>Limită strategică</h2>
        <p>
          Avantajul nu vine din automatizarea mesajelor. Vine din faptul că mesajele sunt mai ușor de verificat, adaptat
          local și transformat în întâlniri reale. Auto-postarea rămâne respinsă.
        </p>
      </section>

    </>
  );
}

export function ArchitectureScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Arhitectură date</p>
        <h1>Conectori simulați</h1>
        <p>Nu există integrare reală. Ecranul arată direcția, cadența și suprafața care ar consuma datele.</p>
      </section>

      <section className="wire-section table-wrap">
        <h2>Conectori</h2>
        <Table role="table" label="Integrări simulate">
          <caption>Integrări simulate, fără backend</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" id="connectors-col-1">
                Conector
              </th>
              <th role="columnheader" scope="col" id="connectors-col-2">
                Direcție
              </th>
              <th role="columnheader" scope="col" id="connectors-col-3">
                Cadență
              </th>
              <th role="columnheader" scope="col" id="connectors-col-4">
                Ecran
              </th>
              <th role="columnheader" scope="col" id="connectors-col-5">
                Ce aduce
              </th>
              <th role="columnheader" scope="col" id="connectors-col-6">
                Verificat la
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {connectors.map(([name, direction, cadence, screen, detail]) => (
              <tr role="row" key={name}>
                <td role="cell" headers="connectors-col-1" data-label="Conector">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Conector
                  </span>
                  {name}
                </td>
                <td role="cell" headers="connectors-col-2" data-label="Direcție">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Direcție
                  </span>
                  {direction}
                </td>
                <td role="cell" headers="connectors-col-3" data-label="Cadență">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Cadență
                  </span>
                  {cadence}
                </td>
                <td role="cell" headers="connectors-col-4" data-label="Ecran">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Ecran
                  </span>
                  {screen}
                </td>
                <td role="cell" headers="connectors-col-5" data-label="Ce aduce">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Ce aduce
                  </span>
                  {detail}
                </td>
                <td role="cell" headers="connectors-col-6" data-label="Verificat la">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Verificat la
                  </span>
                  <Fake source={`${name} sintetic`}>08 septembrie 2026</Fake>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="note-panel">
        <h2>Site-uri de proiecte</h2>
        <p>Proiectele cu domenii neutre rămân legate extern. Nu sunt absorbite în identitatea site-ului public.</p>
        <a className="text-button" href="https://monitorpnrr.ro" target="_blank" rel="noreferrer">
          Link extern exemplu
        </a>
      </section>

      <section className="wire-section" aria-labelledby="repo-layer-title">
        <p className="eyebrow">Strat repo-uri publice</p>
        <h2 id="repo-layer-title">Ce vine din GitHub</h2>
        <div className="module-list">
          {repoModules.slice(0, 5).map((module) => (
            <article className="module-card" key={module.repo}>
              <h3>{module.repo}</h3>
              <p>{module.reusableData}</p>
              <p>{module.integrationMode}</p>
            </article>
          ))}
        </div>
      </section>

      <OpenQuestions screen="architecture" />
    </div>
  );
}

export function CostNoteScreen() {
  const rows = [
    [
      'Oameni',
      'Lipsa este câmp vizibil, nu absență din listă.',
      'Art. 87(1): numele tuturor aleșilor și CV-ul detaliat pe site.',
      'Registru mandate, workflow CV, verificare date lipsă, responsabil editorial.',
    ],
    [
      'Persoana',
      'Un record canonic servește PUBLIC, MEMBRU și BIROU.',
      'Art. 87(1)-(3): public, membri, birouri cu acces la minute relevante.',
      'Model de permisiuni, jurnal acces, record canonic și politici de vizibilitate.',
    ],
    [
      'Ce propunem',
      'Pozițiile sunt documente versionate, nu articole de știri.',
      'Nu am găsit articol direct pentru bibliotecă de poziții în Statutul public.',
      'Guvernanță editorială, istoric revizii, aprobare politică, arhivare.',
    ],
    [
      'Declarații de avere',
      'Scanul semnat guvernează; câmpurile structurate sunt auxiliare.',
      'Art. 82: declarații publicate; veniturile și datoriile nu pot fi anonimizate.',
      'Ingestie ANI, scanuri, OCR, verificare umană, hash, rectificări.',
    ],
    [
      'Date locale',
      'Datele locale sunt explorabile și exportabile pentru presă.',
      'Sprijină art. 12(2) și art. 87(1), dar cere surse publice externe.',
      'Conectori buget/HCL, normalizare UAT, QA, exporturi pentru presă.',
    ],
    [
      'Zona membrilor',
      'Zona internă începe cu verbe concrete, nu cu noutăți pasive.',
      'Art. 12(2): membrii informați la timp și transparent.',
      'e-USR, permisiuni, consimțământ opt-in, operațiuni de filială, audit intern.',
    ],
    [
      'Bani',
      'Fluxul banilor este comparat cu pragul statutar, nu prezentat izolat.',
      'Art. 86(2): minim 32% din subvențiile art. 84 lit. d către filiale.',
      'AEP, Monitorul Oficial, contabilitate, reconciliere, explicații publice.',
    ],
    [
      'Sala de presă',
      'Presa primește contacte, active și dosare de date, nu doar comunicate.',
      'Nu am găsit articol direct; susține obligația generală de transparență publică.',
      'Responsabili pe domenii, SLA pentru presă, active versionate, procedură de retragere.',
    ],
    [
      'Proiecte și date',
      'Repo-urile publice sunt surse și linkuri, nu CMS ascuns.',
      'Nu este cerut direct; ajută la trasabilitatea pozițiilor și a cifrelor.',
      'Inventar surse, licențe, sincronizare manuală, note editoriale și ownership.',
    ],
    [
      'Arhitectură date',
      'Fiecare cifră are conector, direcție, cadență și verificare.',
      'Nu este cerută ca ecran, dar este costul real al tuturor obligațiilor.',
      'Conectori, contracte de date, alerte de refresh, proprietari de câmpuri.',
    ],
  ];

  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Notă costuri</p>
        <h1>Ce ar costa să devină real</h1>
        <p>Articolele sunt raportate la Statutul USR public pe usr.ro, amendat în 24.11.2022.</p>
      </section>

      <section className="wire-section table-wrap">
        <h2>Costuri și temei statutar</h2>
        <Table role="table" label="Costuri și temei statutar">
          <caption>Costul este exprimat ca muncă și guvernanță, nu ca buget estimat.</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" id="cost-notes-col-1">
                Ecran
              </th>
              <th role="columnheader" scope="col" id="cost-notes-col-2">
                Decizie structurală
              </th>
              <th role="columnheader" scope="col" id="cost-notes-col-3">
                Articol relevant
              </th>
              <th role="columnheader" scope="col" id="cost-notes-col-4">
                Cost real
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {rows.map(([screen, decision, article, cost]) => (
              <tr role="row" key={screen}>
                <td role="cell" headers="cost-notes-col-1" data-label="Ecran">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Ecran
                  </span>
                  {screen}
                </td>
                <td role="cell" headers="cost-notes-col-2" data-label="Decizie structurală">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Decizie structurală
                  </span>
                  {decision}
                </td>
                <td role="cell" headers="cost-notes-col-3" data-label="Articol relevant">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Articol relevant
                  </span>
                  {article}
                </td>
                <td role="cell" headers="cost-notes-col-4" data-label="Cost real">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Cost real
                  </span>
                  {cost}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <OpenQuestions screen="note" />
    </div>
  );
}
