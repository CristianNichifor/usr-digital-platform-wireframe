import { Table } from '@cristiannichifor/civic-ui';
import { Fake, MetricGrid, OpenQuestions } from '../../components/wireframe';
import { repoModules } from '../../data/content';
import { currentHash, makeHash } from '../../routing';
import type { HashRoute } from '../../routing';

export function LocalDataScreen({ route }: { route: HashRoute }) {
  const county = route.params.get('judet') ?? 'Județul Model';
  const exportType = route.params.get('export');

  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Date locale</p>
        <h1>{county}</h1>
        <p>Execuție bugetară, voturi HCL și completitudine pe UAT.</p>
        <div className="filter-row" aria-label="Filtru județ">
          {['Județul Model', 'Județul Exemplu'].map((value) => (
            <a key={value} href={makeHash('/date-locale', { judet: value })} aria-current={county === value ? 'true' : undefined}>
              {value}
            </a>
          ))}
        </div>
        <div className="export-row" aria-label="Exporturi">
          <a href={makeHash('/date-locale', { judet: county, export: 'csv' })}>CSV</a>
          <a href={makeHash('/date-locale', { judet: county, export: 'png' })}>PNG chart</a>
          <a href={makeHash('/date-locale', { judet: county, export: 'permalink' })}>Permalink</a>
        </div>
        {exportType ? <p className="state-note">Export selectat în hash: {exportType}. Macheta nu descarcă fișiere.</p> : null}
      </section>

      <section className="local-dashboard" aria-labelledby="local-overview-title">
        <div className="wire-section">
          <p className="eyebrow">Hartă mockup</p>
          <h2 id="local-overview-title">Acoperire locală</h2>
          <div className="map-wireframe" role="img" aria-label="Hartă sintetică UAT pentru județ">
            <span>UAT-uri cu date complete</span>
            <span>UAT-uri cu HCL lipsă</span>
            <span>UAT-uri cu buget întârziat</span>
          </div>
        </div>
        <div className="wire-section">
          <p className="eyebrow">Rezumat județ</p>
          <MetricGrid
            items={[
              {
                label: 'UAT-uri urmărite',
                value: '74',
                source: 'model UAT sintetic',
                note: 'Cheia reală ar fi SIRUTA și istoricul redenumirilor.',
              },
              {
                label: 'HCL indexate',
                value: '126',
                source: 'index HCL sintetic',
                note: 'Linkul la documentul primar rămâne obligatoriu.',
              },
              {
                label: 'Prețuri comparabile',
                value: '9 categorii',
                source: 'model achiziții sintetic',
                note: 'Rândurile necomparabile sunt păstrate cu motiv.',
              },
            ]}
          />
        </div>
      </section>

      <section className="split-layout">
        <div className="wire-section">
          <h2>Execuție bugetară</h2>
          <div className="bar-list">
            {[
              ['Venituri estimate', '72%'],
              ['Cheltuieli angajate', '64%'],
              ['Investiții plătite', '31%'],
            ].map(([label, value]) => (
              <div className="bar-row" key={label}>
                <span>{label}</span>
                <div className="bar-track" aria-hidden="true">
                  <span style={{ width: value }} />
                </div>
                <Fake source="ForExeBug / Trezorerie">{value}</Fake>
              </div>
            ))}
          </div>
        </div>
        <div className="wire-section">
          <h2>Permalink</h2>
          <p>
            Starea curentă este în hash: <Fake mono source="machetă">{currentHash(route)}</Fake>
          </p>
        </div>
      </section>

      <section className="wire-section table-wrap">
        <h2>Voturi HCL</h2>
        <Table role="table" label="Hotărâri locale fictive">
          <caption>Hotărâri locale fictive</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" id="local-votes-col-1">
                HCL
              </th>
              <th role="columnheader" scope="col" id="local-votes-col-2">
                Titlu
              </th>
              <th role="columnheader" scope="col" id="local-votes-col-3">
                Pentru
              </th>
              <th role="columnheader" scope="col" id="local-votes-col-4">
                Contra
              </th>
              <th role="columnheader" scope="col" id="local-votes-col-5">
                Absent
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {[
              ['12/2026', 'Rectificare bugetară model', '14', '3', '2'],
              ['19/2026', 'Regulament spații publice', '11', '6', '2'],
            ].map(([hcl, title, yes, no, absent]) => (
              <tr role="row" key={hcl}>
                <td role="cell" headers="local-votes-col-1" data-label="HCL">
                  <span className="mobile-cell-label" aria-hidden="true">
                    HCL
                  </span>
                  <Fake source="site municipal + index HCL">{hcl}</Fake>
                </td>
                <td role="cell" headers="local-votes-col-2" data-label="Titlu">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Titlu
                  </span>
                  {title}
                </td>
                <td role="cell" headers="local-votes-col-3" data-label="Pentru">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Pentru
                  </span>
                  <Fake source="site municipal + index HCL">{yes}</Fake>
                </td>
                <td role="cell" headers="local-votes-col-4" data-label="Contra">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Contra
                  </span>
                  <Fake source="site municipal + index HCL">{no}</Fake>
                </td>
                <td role="cell" headers="local-votes-col-5" data-label="Absent">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Absent
                  </span>
                  <Fake source="site municipal + index HCL">{absent}</Fake>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="wire-section table-wrap">
        <h2>Completitudine pe UAT</h2>
        <Table role="table" label="Completitudine pe UAT">
          <caption>Procente sintetice de completitudine</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" id="local-coverage-col-1">
                UAT
              </th>
              <th role="columnheader" scope="col" id="local-coverage-col-2">
                Buget
              </th>
              <th role="columnheader" scope="col" id="local-coverage-col-3">
                HCL
              </th>
              <th role="columnheader" scope="col" id="local-coverage-col-4">
                Contacte
              </th>
              <th role="columnheader" scope="col" id="local-coverage-col-5">
                Observație
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {[
              ['Municipiul Exemplu', '88%', '73%', '92%', 'date aproape complete'],
              ['Comuna Demo', '41%', '22%', '58%', 'PDF-uri scanate'],
              ['Orașul Mostră', '64%', '51%', '67%', 'calendar neregulat'],
            ].map(([uat, budget, hcl, contacts, note]) => (
              <tr role="row" key={uat}>
                <td role="cell" headers="local-coverage-col-1" data-label="UAT">
                  <span className="mobile-cell-label" aria-hidden="true">
                    UAT
                  </span>
                  {uat}
                </td>
                <td role="cell" headers="local-coverage-col-2" data-label="Buget">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Buget
                  </span>
                  <Fake source="ForExeBug / Trezorerie">{budget}</Fake>
                </td>
                <td role="cell" headers="local-coverage-col-3" data-label="HCL">
                  <span className="mobile-cell-label" aria-hidden="true">
                    HCL
                  </span>
                  <Fake source="site municipal + index HCL">{hcl}</Fake>
                </td>
                <td role="cell" headers="local-coverage-col-4" data-label="Contacte">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Contacte
                  </span>
                  <Fake source="director sintetic">{contacts}</Fake>
                </td>
                <td role="cell" headers="local-coverage-col-5" data-label="Observație">
                  <span className="mobile-cell-label" aria-hidden="true">
                    Observație
                  </span>
                  {note}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="wire-section" aria-labelledby="local-modules-title">
        <p className="eyebrow">Extensii din repo-uri</p>
        <h2 id="local-modules-title">Date care ar face pagina locală mai utilă</h2>
        <div className="module-list">
          {repoModules
            .filter((module) => ['administrative-reform-simulator', 'achizitii-deschise'].includes(module.repo))
            .map((module) => (
              <article className="module-card" key={module.repo}>
                <h3>{module.label}</h3>
                <p>{module.reusableData}</p>
                <p>{module.caveat}</p>
                <Fake source={`repo ${module.repo}`}>{module.syntheticExample}</Fake>
              </article>
            ))}
        </div>
      </section>

      <OpenQuestions screen="local" />
    </div>
  );
}
