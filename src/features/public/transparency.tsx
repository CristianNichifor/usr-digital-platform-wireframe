import { Fake, MetricGrid, OpenQuestions, PlaceholderBox } from '../../components/wireframe';
import { currentHash, makeHash } from '../../routing';
import type { HashRoute } from '../../routing';

export function DeclarationsScreen({ route }: { route: HashRoute }) {
  const year = route.params.get('an') === '2025' ? '2025' : '2026';
  const previousYear = year === '2026' ? '2025' : '2024';

  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Declarații de avere</p>
        <h1>Scan semnat și câmpuri structurate</h1>
        <p>Veniturile și datoriile sunt afișate neredactat în machetă. Statutul public curent indică art. 82.</p>
        <div className="filter-row" aria-label="Selectare an">
          {['2026', '2025'].map((value) => (
            <a key={value} href={makeHash('/declaratii', { an: value })} aria-current={year === value ? 'true' : undefined}>
              An <Fake source="ANI declarații sintetic">{value}</Fake>
            </a>
          ))}
        </div>
      </section>

      <section className="wire-section" aria-labelledby="declaration-quality-title">
        <p className="eyebrow">Control calitate</p>
        <h2 id="declaration-quality-title">Cum arată datele înainte de publicare</h2>
        <MetricGrid
          items={[
            {
              label: 'Câmpuri extrase',
              value: '12 din 14',
              source: 'OCR sintetic',
              note: 'Câmpurile neclare cer verificare umană.',
            },
            {
              label: 'Hash scan',
              value: 'valid',
              source: 'pipeline ANI sintetic',
              note: 'Hash-ul leagă câmpurile de scanul semnat.',
            },
            {
              label: 'Diferențe anuale',
              value: '3 schimbări',
              source: 'comparator sintetic',
              note: 'Diferențele sunt afișate lângă câmpuri, nu într-o notă.',
            },
          ]}
        />
      </section>

      <section className="declaration-layout">
        <div className="wire-section">
          <h2>Câmpuri structurate</h2>
          <dl className="definition-grid">
            <div>
              <dt>Persoană</dt>
              <dd>Funcționar Exemplu</dd>
            </div>
            <div>
              <dt>An</dt>
              <dd>
                <Fake source="ANI declarații sintetic">{year}</Fake>
              </dd>
            </div>
            <div>
              <dt>Venituri neredactate</dt>
              <dd>
                <Fake source="ANI declarații sintetic">{year === '2026' ? '84.000 lei' : '79.000 lei'}</Fake>
              </dd>
            </div>
            <div>
              <dt>Datorii neredactate</dt>
              <dd>
                <Fake source="ANI declarații sintetic">{year === '2026' ? '42.000 lei' : '47.000 lei'}</Fake>
              </dd>
            </div>
            <div>
              <dt>SHA-256 scan</dt>
              <dd>
                <Fake mono source="ANI declarații sintetic">sha256:7f3a-model-{year}</Fake>
              </dd>
            </div>
          </dl>
          <p className="governing-note">Scanul semnat guvernează. Câmpurile structurate ajută citirea.</p>
        </div>
        <div className="wire-section">
          <h2>Original semnat</h2>
          <PlaceholderBox label="scan semnat gri, document fictiv" tall />
        </div>
      </section>

      <section className="wire-section">
        <h2>
          Diferențe an peste an: <Fake source="ANI declarații sintetic">{previousYear}</Fake> la{' '}
          <Fake source="ANI declarații sintetic">{year}</Fake>
        </h2>
        <div className="diff-grid">
          <div>
            <span className="label">Venituri</span>
            <p>
              <Fake source="ANI declarații sintetic">{previousYear === '2025' ? '79.000 lei' : '72.000 lei'}</Fake> la{' '}
              <Fake source="ANI declarații sintetic">{year === '2026' ? '84.000 lei' : '79.000 lei'}</Fake>
            </p>
          </div>
          <div>
            <span className="label">Datorii</span>
            <p>
              <Fake source="ANI declarații sintetic">{previousYear === '2025' ? '47.000 lei' : '51.000 lei'}</Fake> la{' '}
              <Fake source="ANI declarații sintetic">{year === '2026' ? '42.000 lei' : '47.000 lei'}</Fake>
            </p>
          </div>
        </div>
      </section>

      <OpenQuestions screen="declarations" />
    </div>
  );
}

export function MoneyScreen({ route }: { route: HashRoute }) {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Bani</p>
        <h1>Subvenții și distribuire către filiale</h1>
        <p>Pragul statutar curent este art. 86(2), raportat la subvențiile de la art. 84 lit. d.</p>
      </section>

      <section className="wire-section" aria-labelledby="money-dashboard-title">
        <p className="eyebrow">Mockup financiar</p>
        <h2 id="money-dashboard-title">Ce ar vedea publicul rapid</h2>
        <MetricGrid
          items={[
            {
              label: 'Intrări lunare',
              value: '1.240.000 lei',
              source: 'AEP sintetic',
              note: 'Subvenția intră cu lună, sursă și verificare.',
            },
            {
              label: 'Transfer filiale',
              value: '36%',
              source: 'calcul sintetic',
              note: 'Comparat imediat cu pragul statutar de 32%.',
            },
            {
              label: 'Cheltuieli explicate',
              value: '4 categorii',
              source: 'Monitorul Oficial sintetic',
              note: 'Categoriile duc la metodologie, nu la postări de opinie.',
            },
          ]}
        />
      </section>

      <section className="split-layout">
        <div className="wire-section">
          <h2>Intrări subvenție</h2>
          <p>
            Total lună machetă: <Fake source="AEP">1.240.000 lei</Fake>
          </p>
          <p>
            Transfer minim filiale: <Fake source="calcul sintetic după art. 86(2)">32%</Fake>
          </p>
          <div className="bar-list">
            {[
              ['Prag statutar filiale', '32%'],
              ['Alocat filiale în machetă', '36%'],
            ].map(([label, value]) => (
              <div className="bar-row" key={label}>
                <span>{label}</span>
                <div className="bar-track" aria-hidden="true">
                  <span style={{ width: value }} />
                </div>
                <Fake source="AEP + calcul sintetic">{value}</Fake>
              </div>
            ))}
          </div>
        </div>
        <div className="wire-section">
          <h2>Cheltuieli centrale</h2>
          <ul className="plain-list">
            <li>
              Comunicare publică: <Fake source="Monitorul Oficial sintetic">28%</Fake>
            </li>
            <li>
              Organizare internă: <Fake source="Monitorul Oficial sintetic">18%</Fake>
            </li>
            <li>
              Juridic și conformitate: <Fake source="Monitorul Oficial sintetic">9%</Fake>
            </li>
            <li>
              Platforme și date: <Fake source="Monitorul Oficial sintetic">6%</Fake>
            </li>
          </ul>
        </div>
      </section>

      <section className="wire-section">
        <h2>Permalink</h2>
        <p>
          <Fake mono source="machetă">{currentHash(route)}</Fake>
        </p>
      </section>

      <section className="note-panel" aria-labelledby="procurement-bridge-title">
        <p className="eyebrow">Legătură către bani publici</p>
        <h2 id="procurement-bridge-title">Achizițiile rămân un proiect separat</h2>
        <p>
          Pagina de bani a partidului nu trebuie să absoarbă exploratorul de achiziții. Poate trimite către el când o
          cheltuială locală are nevoie de context comparabil.
        </p>
        <p>
          Exemplu sintetic: indicatori de verificare locală <Fake source="repo achizitii-deschise">8</Fake>.
        </p>
        <a className="text-button" href="https://github.com/CristianNichifor/open-procurement" target="_blank" rel="noreferrer">
          Deschide repo
        </a>
      </section>

      <OpenQuestions screen="money" />
    </div>
  );
}
