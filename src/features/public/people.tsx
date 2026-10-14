import { Field, Input } from '@cristiannichifor/civic-ui';
import { Fake, MetricGrid, OpenQuestions } from '../../components/wireframe';
import { officials } from '../../data/officials';
import { activeView, makeHash, recordIdFromPath, setHashParam } from '../../routing';
import type { HashRoute } from '../../routing';
import { SocialProfileLinks } from '../members/ResourceHub';

export function PeopleScreen({ route }: { route: HashRoute }) {
  const q = route.params.get('q') ?? '';
  const role = route.params.get('rol') ?? 'toate';
  const county = route.params.get('judet') ?? 'toate';
  const completeness = route.params.get('date') ?? 'toate';
  const withCv = officials.filter((item) => item.hasCv).length;

  const filtered = officials.filter((item) => {
    const queryMatch = [item.name, item.role, item.county, item.branch].join(' ').toLowerCase().includes(q.toLowerCase());
    const roleMatch = role === 'toate' || item.role === role;
    const countyMatch = county === 'toate' || item.county === county;
    const dataMatch =
      completeness === 'toate' ||
      (completeness === 'cv' && item.hasCv) ||
      (completeness === 'lipsuri' && (!item.hasCv || !item.publicContact));
    return queryMatch && roleMatch && countyMatch && dataMatch;
  });

  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Oameni</p>
        <h1>Directorul aleșilor</h1>
        <p className="statut-counter">
          <Fake source="director sintetic">{withCv}</Fake> din <Fake source="director sintetic">{officials.length}</Fake>{' '}
          aleși au CV publicat — cerut de art. 87(1) din Statut.
        </p>
      </section>

      <section className="wire-section" aria-labelledby="people-coverage-title">
        <p className="eyebrow">Acoperire date</p>
        <h2 id="people-coverage-title">Ce ar vedea publicul înainte să deschidă un profil</h2>
        <MetricGrid
          items={[
            {
              label: 'CV publicat',
              value: `${withCv} din ${officials.length}`,
              source: 'director sintetic',
              note: 'Lipsa CV-ului rămâne vizibilă în listă și pe profil.',
            },
            {
              label: 'Contact public',
              value: '3 din 4',
              source: 'director sintetic',
              note: 'Adresele lipsă sunt afișate ca lipsă, nu ascunse.',
            },
            {
              label: 'Voturi legate',
              value: '7 poziții',
              source: 'Parlament + index HCL sintetic',
              note: 'Fiecare vot are sursă și dată de verificare.',
            },
            {
              label: 'Proiecte urmărite',
              value: '5 fișe',
              source: 'site-uri proiecte sintetice',
              note: 'Proiectele sunt pe recordul persoanei, nu într-un articol separat.',
            },
          ]}
        />
      </section>

      <section className="wire-section" aria-labelledby="filters-title">
        <h2 id="filters-title">Căutare și filtre</h2>
        <Field id="people-search" label="Căutare">
          {(attributes) => (
            <Input
              {...attributes}
              type="search"
              value={q}
              placeholder="Căutați un nume, județ sau rol"
              onChange={(event) => setHashParam(route, 'q', event.target.value)}
            />
          )}
        </Field>
        <div className="filter-row" aria-label="Filtru rol">
          {['toate', 'Primar', 'Viceprimar', 'Consilier local', 'Parlamentar'].map((value) => (
            <a
              key={value}
              href={makeHash('/oameni', { q, rol: value, judet: county, date: completeness })}
              aria-current={role === value ? 'true' : undefined}
            >
              {value === 'toate' ? 'Toate rolurile' : value}
            </a>
          ))}
        </div>
        <div className="filter-row" aria-label="Filtru județ">
          {['toate', 'Județul Model', 'Județul Exemplu'].map((value) => (
            <a
              key={value}
              href={makeHash('/oameni', { q, rol: role, judet: value, date: completeness })}
              aria-current={county === value ? 'true' : undefined}
            >
              {value === 'toate' ? 'Toate județele' : value}
            </a>
          ))}
        </div>
        <div className="filter-row" aria-label="Filtru completitudine date">
          {[
            ['toate', 'Toate înregistrările'],
            ['cv', 'Cu CV publicat'],
            ['lipsuri', 'Cu lipsuri afișate'],
          ].map(([value, label]) => (
            <a
              key={value}
              href={makeHash('/oameni', { q, rol: role, judet: county, date: value })}
              aria-current={completeness === value ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      <section className="list-layout" aria-labelledby="people-list-title">
        <h2 id="people-list-title">Rezultate</h2>
        {filtered.map((item) => (
          <article className="row-card" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>
                {item.role}, {item.county}
              </p>
              <p>{item.hasCv ? item.cv : <span className="missing">Fără CV publicat</span>}</p>
              <p>{item.publicContact ? item.publicContact : <span className="missing">Fără contact public</span>}</p>
            </div>
            <a className="text-button" href={makeHash(`/oameni/${item.id}`, { view: 'public' })}>
              Deschide recordul
            </a>
          </article>
        ))}
      </section>

      <OpenQuestions screen="people" />
    </div>
  );
}

export function PersonScreen({ route }: { route: HashRoute }) {
  const id = recordIdFromPath(route.path);
  const record = officials.find((item) => item.id === id) ?? officials[0];
  const view = activeView(route);

  return (
    <div className="stack">
      <a className="back-link" href="#/oameni">
        Înapoi la Oameni
      </a>
      <section className="page-heading">
        <p className="eyebrow">Persoana</p>
        <h1>{record.name}</h1>
        <p>
          {record.role}, {record.county}. Un singur record canonic. Vizibilitate curentă:{' '}
          <strong>{view.toUpperCase()}</strong>.
        </p>
      </section>

      <section className="wire-section" aria-labelledby="record-state-title">
        <SocialProfileLinks name={record.name} />
        <p className="eyebrow">Stare record</p>
        <h2 id="record-state-title">Aceeași înregistrare, trei straturi de acces</h2>
        <div className="record-state-grid">
          {[
            ['PUBLIC', record.hasCv ? 'publicabil' : 'incomplet', 'CV, contact, voturi, proiecte'],
            ['MEMBRU', 'activ intern', 'minute filială, adunare, contact intern'],
            ['BIROU', 'blocat în machetă', 'dosare, sancțiuni, jurnal de acces'],
          ].map(([label, state, fields]) => (
            <article className={view.toUpperCase() === label ? 'state-card active' : 'state-card'} key={label}>
              <h3>{label}</h3>
              <Fake source="registru canonic sintetic">{state}</Fake>
              <p>{fields}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`record-layout record-layout--${view}`} aria-labelledby="public-record-title">
        <div className="wire-section">
          <h2 id="public-record-title">PUBLIC</h2>
          <dl className="definition-grid">
            <div>
              <dt>Nume</dt>
              <dd>{record.name}</dd>
            </div>
            <div>
              <dt>CV</dt>
              <dd>{record.hasCv ? record.cv : <span className="missing">Fără CV publicat</span>}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{record.publicContact ? record.publicContact : <span className="missing">Fără contact public</span>}</dd>
            </div>
          </dl>
          <h3>Voturi</h3>
          <ul className="plain-list">
            {record.votes.map((vote) => (
              <li key={vote.title}>
                {vote.title}: <strong>{vote.vote}</strong>, <Fake source={vote.source}>{vote.date}</Fake>
              </li>
            ))}
          </ul>
          <h3>Proiecte livrate</h3>
          <div className="mini-grid">
            {record.projects.map((project) => (
              <article className="mini-card" key={project.title}>
                <h4>{project.title}</h4>
                <p>{project.status}</p>
                <Fake source={project.source} verified={project.verified}>
                  {project.figure}
                </Fake>
              </article>
            ))}
          </div>
        </div>

        {view === 'membru' || view === 'birou' ? (
          <div className="wire-section visibility-layer">
            <h2>MEMBRU</h2>
            <dl className="definition-grid">
              <div>
                <dt>Filială</dt>
                <dd>{record.branch}</dd>
              </div>
              <div>
                <dt>Contact intern</dt>
                <dd>{record.internalContact}</dd>
              </div>
              <div>
                <dt>Următoarea adunare</dt>
                <dd>
                  <Fake source="e-USR sintetic">{record.nextAssembly}</Fake>
                </dd>
              </div>
            </dl>
            <h3>Procese-verbale filială</h3>
            <ul className="plain-list">
              {record.minutes.map((minute) => (
                <li key={minute.title}>
                  {minute.title}, <Fake source="e-USR sintetic">{minute.date}</Fake>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {view === 'birou' ? (
          <div className="wire-section visibility-layer">
            <h2>BIROU</h2>
            <p>Acest strat ar afișa informații cu acces restrâns. În machetă apar doar placeholder-ele blocate.</p>
            <div className="mini-grid">
              {record.cases.map((item) => (
                <article className="locked-card" key={item}>
                  <h3>{item}</h3>
                  <p>Blocat în machetă. Ar cere permisiuni, jurnal de acces și motiv de consultare.</p>
                </article>
              ))}
              {record.sanctions.map((item) => (
                <article className="locked-card" key={item}>
                  <h3>{item}</h3>
                  <p>Blocat în machetă. Nu se afișează conținut disciplinar real.</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <OpenQuestions screen="person" />
    </div>
  );
}
