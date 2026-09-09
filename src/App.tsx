import Select from './components/Select';
import { useEffect, useMemo, useState } from 'react';
import MemberDemo from './features/members/MemberDemo';

// Low-to-medium fidelity rebuilt usr.ro prototype.
// Shareable navigation uses the URL hash; member demo state stays in memory.

type ViewMode = 'public' | 'membru' | 'birou';

type HashRoute = {
  path: string;
  params: URLSearchParams;
};

type OfficialRecord = {
  id: string;
  name: string;
  role: string;
  county: string;
  branch: string;
  hasCv: boolean;
  cv: string;
  publicContact: string | null;
  internalContact: string;
  votes: { title: string; vote: string; date: string; source: string }[];
  projects: { title: string; status: string; figure: string; source: string; verified: string }[];
  minutes: { title: string; date: string }[];
  nextAssembly: string;
  cases: string[];
  sanctions: string[];
};

type RepoModule = {
  repo: string;
  label: string;
  href: string;
  reusableData: string;
  prototypeUse: string;
  integrationMode: string;
  caveat: string;
  syntheticExample: string;
};

const topNav = [
  { path: '/stiri', label: 'Știri', href: '#/stiri' },
  { path: '/oameni', label: 'Oameni', href: '#/oameni' },
  { path: '/guvernare', label: 'Guvernare', href: '#/guvernare' },
  { path: '/verificari', label: 'Verificări', href: '#/verificari' },
  { path: '/implica-te', label: 'Implică-te', href: '#/implica-te' },
];

const headerActions = [
  { href: '#/membri', label: 'Membri', variant: 'member' },
  { href: '#/inscriere', label: 'Înscriere', variant: 'join' },
  { href: '#/doneaza', label: 'Donează', variant: 'donate' },
];

const footerNav = [
  { href: '#/ce-propunem', label: 'Ce propunem' },
  { href: '#/declaratii', label: 'Declarații de avere' },
  { href: '#/date-locale', label: 'Date locale' },
  { href: '#/bani', label: 'Bani' },
  { href: '#/presa', label: 'Sala de presă' },
  { href: '#/organizare', label: 'Organizare' },
  { href: '#/contact', label: 'Contact' },
  { href: '#/proiecte-date', label: 'Proiecte și date' },
  { href: '#/strategie', label: 'De ce contează' },
  { href: '#/arhitectura', label: 'Arhitectură date' },
  { href: '#/nota', label: 'Notă costuri' },
  { href: 'https://usr.ro/statut', label: 'Statut public' },
  { href: 'https://usr.ro/solicitari-informatii-publice', label: 'Solicitări 544' },
  { href: 'https://usr.ro/mandatari-financiari', label: 'Mandatari financiari' },
];

const officials: OfficialRecord[] = [
  {
    id: 'primar-exemplu',
    name: 'Primar Exemplu',
    role: 'Primar',
    county: 'Județul Model',
    branch: 'Filiala Municipiul Exemplu',
    hasCv: true,
    cv: 'CV sintetic: administrație locală, buget participativ, urbanism de proximitate.',
    publicContact: 'primar.exemplu@example.invalid',
    internalContact: 'canal intern: primar-exemplu',
    nextAssembly: '18 septembrie 2026',
    votes: [
      { title: 'HCL buget rectificat', vote: 'pentru', date: '2026-05-14', source: 'index HCL municipal' },
      { title: 'Regulament spații verzi', vote: 'abținere', date: '2026-04-03', source: 'index HCL municipal' },
    ],
    projects: [
      {
        title: 'Treceri pietoni iluminate',
        status: 'în execuție',
        figure: '12 locații',
        source: 'site proiect local',
        verified: '08 septembrie 2026',
      },
      {
        title: 'Registru sesizări publice',
        status: 'livrat parțial',
        figure: '68% fluxuri publicate',
        source: 'raport local sintetic',
        verified: '07 septembrie 2026',
      },
    ],
    minutes: [
      { title: 'Ședință birou filială', date: '2026-06-03' },
      { title: 'Adunare locală ordinară', date: '2026-04-21' },
    ],
    cases: ['Dosar sprijin audiențe', 'Dosar sesizare patrimoniu'],
    sanctions: ['Placeholder blocat: sancțiuni interne', 'Placeholder blocat: contestare'],
  },
  {
    id: 'consilier-model',
    name: 'Consilier Model',
    role: 'Consilier local',
    county: 'Județul Model',
    branch: 'Filiala Comuna Demo',
    hasCv: false,
    cv: 'Fără CV publicat',
    publicContact: null,
    internalContact: 'canal intern: consilier-model',
    nextAssembly: '21 septembrie 2026',
    votes: [
      { title: 'HCL transport local', vote: 'pentru', date: '2026-05-22', source: 'index HCL comunal' },
      { title: 'HCL taxă spațiu public', vote: 'contra', date: '2026-03-11', source: 'index HCL comunal' },
    ],
    projects: [
      {
        title: 'Publicare ordine de zi',
        status: 'în lucru',
        figure: '4 ședințe urmărite',
        source: 'monitorizare filială',
        verified: '06 septembrie 2026',
      },
    ],
    minutes: [{ title: 'Ședință locală de lucru', date: '2026-05-09' }],
    cases: ['Dosar cerere date HCL'],
    sanctions: ['Placeholder blocat: stare confidențială'],
  },
  {
    id: 'parlamentar-fictiv',
    name: 'Parlamentar Fictiv',
    role: 'Parlamentar',
    county: 'Județul Exemplu',
    branch: 'Filiala Județul Exemplu',
    hasCv: true,
    cv: 'CV sintetic: politici publice, digitalizare administrativă, control parlamentar.',
    publicContact: 'parlamentar.fictiv@example.invalid',
    internalContact: 'canal intern: parlamentar-fictiv',
    nextAssembly: '02 octombrie 2026',
    votes: [
      { title: 'Vot proiect administrație digitală', vote: 'pentru', date: '2026-06-18', source: 'date deschise Parlament' },
      { title: 'Vot moțiune simplă', vote: 'absent motivat', date: '2026-05-30', source: 'date deschise Parlament' },
    ],
    projects: [
      {
        title: 'Interpelări publicate',
        status: 'publicat',
        figure: '9 interpelări',
        source: 'date deschise Parlament',
        verified: '08 septembrie 2026',
      },
    ],
    minutes: [{ title: 'Briefing parlamentar intern', date: '2026-06-12' }],
    cases: ['Dosar audiențe legislative', 'Dosar amendamente bugetare'],
    sanctions: ['Placeholder blocat: procedură internă'],
  },
  {
    id: 'viceprimar-demo',
    name: 'Viceprimar Demo',
    role: 'Viceprimar',
    county: 'Județul Model',
    branch: 'Filiala Orașul Mostră',
    hasCv: false,
    cv: 'Fără CV publicat',
    publicContact: 'viceprimar.demo@example.invalid',
    internalContact: 'canal intern: viceprimar-demo',
    nextAssembly: '25 septembrie 2026',
    votes: [{ title: 'HCL investiții școli', vote: 'pentru', date: '2026-04-29', source: 'index HCL orășenesc' }],
    projects: [
      {
        title: 'Audit iluminat public',
        status: 'raport publicat',
        figure: '31% economii estimate',
        source: 'raport local sintetic',
        verified: '05 septembrie 2026',
      },
    ],
    minutes: [{ title: 'Ședință birou local', date: '2026-03-18' }],
    cases: ['Dosar achiziții locale'],
    sanctions: ['Placeholder blocat: fără afișare publică'],
  },
];

const connectors = [
  ['AEP', 'intrare', 'lunar', 'Bani', 'subvenții și rambursări de campanie'],
  ['Monitorul Oficial', 'intrare', 'la publicare', 'Bani', 'declarații financiare ale partidului'],
  ['ForExeBug / Trezorerie', 'intrare', 'zilnic sau lunar', 'Date locale', 'execuție bugetară locală'],
  ['Site-uri municipale + indexuri HCL', 'intrare', 'săptămânal', 'Date locale', 'voturi consilii locale'],
  ['Date deschise Parlament', 'intrare', 'zilnic', 'Persoana', 'voturi și prezență'],
  ['ANI declarații', 'intrare', 'la publicare', 'Declarații de avere', 'scanuri și metadate'],
  ['e-USR', 'intrare internă', 'în timp real sau zilnic', 'Zona membrilor', 'statut membru, filială, procese-verbale'],
  ['Site-uri proiecte', 'link extern', 'manual', 'Persoana / Date locale', 'monitorpnrr.ro și domenii neutre păstrate separat'],
];

const genericOpenQuestions = [
  'Care este sursa canonică și cine menține fiecare câmp?',
  'Care este temeiul GDPR? Directorul de membri folosește consimțământ opt-in sub art. 9. Art. 7(3) privește registrul statutar, nu publicarea între colegi.',
  'Care este cadența de refresh și cine răspunde când sursa întârzie?',
  'Ce se rupe la scară: PDF-uri scanate, nume duplicate, UAT-uri redenumite, mandate schimbate, permisiuni interne?',
  'Auto-postarea este respinsă: risc de bannare pentru postări coordonate identic, risc politic și lipsa controlului individual.',
];

const screenQuestions: Record<string, string[]> = {
  index: ['Este acesta un site public cu zonă internă sau două produse separate?'],
  news: ['Când devine o știre simplă un dosar urmărit cu surse, documente și status?'],
  government: ['Ce promisiuni de guvernare primesc fișă de execuție și owner public?'],
  verification: ['Cine validează un indicator de risc înainte să fie pus într-un dosar public?'],
  people: ['Cine cere CV-ul lipsă și ce termen intern există pentru publicare?'],
  person: ['Cine decide ce intră în PUBLIC, MEMBRU și BIROU pe același record?'],
  positions: ['Cine poate modifica o poziție publică și cum se validează diff-ul?'],
  declarations: ['Cine verifică extragerea câmpurilor față de scanul semnat?'],
  local: ['Cine repară mapările între UAT, consiliu, buget și hotărâri?'],
  members: ['Ce activități sunt generate de sistem și ce activități sunt asumate de un om?'],
  money: ['Ce nivel de detaliu financiar poate fi public fără a distorsiona contabilitatea?'],
  press: ['Cine aprobă purtătorii de cuvânt pe domeniu și cine retrage un activ depășit?'],
  organization: ['Ce rămâne pagină publică, ce devine registru intern și ce are nevoie de audit?'],
  contact: ['Cum se triagează o sesizare ca idee politică, problemă locală sau dosar de verificare?'],
  signup: ['Ce promisiune operațională primește un membru nou în prima săptămână?'],
  donate: ['Ce dovadă vede un donator despre folosirea banilor, fără a distorsiona contabilitatea?'],
  projects: ['Ce repo devine sursă canonică, ce rămâne link extern și ce nu intră deloc în site?'],
  strategy: ['Cine transformă avantajul de date în muncă politică repetabilă, nu în încă un dashboard?'],
  architecture: ['Ce conector este critic în prima versiune și ce poate rămâne manual?'],
  note: ['Ce obligații statutare cer produs real, nu doar pagini editoriale?'],
};

const officialSiteAudit = [
  [
    'Navigație curentă',
    'usr.ro folosește intrări recognoscibile: USR la Guvernare, Despre Noi, Știri, Înscriere, Donează și Caută.',
    'Păstrăm limbajul public familiar, dar adăugăm rute clare către date locale, bani și verificări.',
  ],
  [
    'Homepage curent',
    'Prima pagină este condusă de știri, donație, newsletter, “Hai în USR!” și carduri pentru Oameni, Guvernare, Organizare, Contact.',
    'Legăm fiecare bloc de un record verificabil: persoană, proiect, sursă, status, material reutilizabil.',
  ],
  [
    'Despre noi',
    'Meniul include Oameni, Centru dreapta modern, Organizare, Statut, Cariere, Solicitări 544, Mandatari financiari și Contact.',
    'Îl transformăm într-un hub de încredere: cine decide, unde sunt regulile, unde sunt banii și cum se cere informație.',
  ],
  [
    'Presă și știri',
    'Site-ul publică actualizări și comunicate, dar acestea rămân în mare parte articole independente.',
    'Propunerea adaugă pachete de presă: cronologie, document primar, grafic, CSV, drept la replică și owner.',
  ],
];

const publicPages = [
  ['Știri', 'Fluxul existent devine index de știri legate la documente, oameni și dosare.', '#/stiri'],
  ['Oameni', 'Aleși, miniștri, primari, consilieri și lipsuri de date afișate clar.', '#/oameni'],
  ['USR la guvernare', 'Miniștri, prefecturi și proiecte cu status, surse și responsabil.', '#/guvernare'],
  ['Verificări publice', 'Indicatori de risc, cronologii și drept la replică, fără verdicte neverificate.', '#/verificari'],
  ['Ce propunem', 'Poziții, reforme, simulatoare linkate și istoric de revizii.', '#/ce-propunem'],
  ['Implică-te', 'Înscriere, zona membrilor simulată și acțiuni publice fără auto-postare.', '#/implica-te'],
  ['Donează / Bani', 'CTA-ul de donație legat de transparență financiară și subvenții.', '#/doneaza'],
  ['Organizare', 'Statut, 544, mandatari financiari, cariere, filiale și responsabilități.', '#/organizare'],
  ['Contact', 'Mesaje, idei de lege, probleme locale și sesizări triage-uite.', '#/contact'],
];

const currentNews = [
  {
    category: 'Integritate',
    date: '01.09.2026',
    title: 'Hotărâre parlamentară contestată la CCR',
    brief: 'Modelăm știrea ca dosar: decizie, document, actor responsabil, termen și actualizare.',
    href: '#/stiri?tema=integritate',
  },
  {
    category: 'Miniștri USR',
    date: '21.08.2026',
    title: 'Țintă PNRR raportată ca îndeplinită',
    brief: 'Actualizarea intră într-o fișă de guvernare cu jalon, sursă și rezultat verificabil.',
    href: '#/guvernare?tema=pnrr',
  },
  {
    category: 'Administrație',
    date: '21.08.2026',
    title: 'Automatizarea proceselor din administrația publică',
    brief: 'Știrea devine urmărită prin status de proiect, instituție owner și material pentru filiale.',
    href: '#/guvernare?tema=digitalizare',
  },
];

const publicInterestCases = [
  {
    title: 'Amendament cu traseu neclar într-o lege de integritate',
    status: 'cronologie de clarificat',
    source: 'știre publică + documente parlamentare sintetice',
    risk: 'Transparența averilor publice poate fi slăbită prin procedură opacă.',
    next: 'publicăm cronologia, cerem documentele primare și marcăm răspunsurile lipsă.',
  },
  {
    title: 'Achiziție locală cu preț unitar atipic',
    status: 'indicator de risc, nu concluzie',
    source: 'achizitii-deschise + SEAP sintetic',
    risk: 'Prețurile ieșite din plaja comparabilă pot semnala risipă sau caiete de sarcini slabe.',
    next: 'comparăm categoria, solicităm explicație instituției și oferim drept la replică.',
  },
  {
    title: 'Buget local cu investiții întârziate',
    status: 'problemă de execuție',
    source: 'ForExeBug / Trezorerie sintetic',
    risk: 'Promisiunile locale rămân comunicare dacă plățile și termenele nu sunt urmărite.',
    next: 'legăm indicatorul de HCL, proiect, responsabil și întrebare pentru ședința locală.',
  },
];

const electionContext = [
  ['Europarlamentare 2024', 'ADU 8,71%', 'Rezultatul cere utilitate publică zilnică, nu doar campanie periodică.'],
  ['Locale 2024, consilii județene', 'ADU 8,29%', 'Fără infrastructură locală de fapte, partidul rămâne dependent de valuri naționale.'],
  ['Parlamentare 2024', 'USR 12,40% Cameră', 'Există bază parlamentară, dar nu suficientă conversie locală și media proprie.'],
  ['Sondaje 2026', 'aprox. 9-10,5%', 'Platforma trebuie tratată ca mecanism de creștere organizațională, nu ca ornament digital.'],
];

const repoModules: RepoModule[] = [
  {
    repo: 'romania-reforms',
    label: 'Index de reforme și vocabular de proveniență',
    href: 'https://github.com/CristianNichifor/romania-reforms',
    reusableData: 'provenance, confidence, limitations, data-assets manifest, simulatoare publice linkabile',
    prototypeUse: 'schelet pentru Ce propunem și Arhitectură date',
    integrationMode: 'absorbim vocabularul; link extern către simulatoare',
    caveat: 'Nu transformăm simulatoarele în poziție oficială. Sunt instrumente de dezbatere.',
    syntheticExample: '4 dosare publice mapate',
  },
  {
    repo: 'administrative-reform-simulator',
    label: 'Reformă administrativă',
    href: 'https://github.com/CristianNichifor/administrative-reform-simulator',
    reusableData: 'UAT, SIRUTA, populație, drumuri, bugete, metodologie deterministă',
    prototypeUse: 'Date locale, hartă UAT, completitudine, poziții despre administrație',
    integrationMode: 'link extern pentru simulator; sumar sintetic în site',
    caveat: 'Hărțile și scenariile rămân discutabile. Macheta arată structura, nu recomandă o variantă.',
    syntheticExample: '3.186 UAT-uri ca tip de set, valori demo mascate',
  },
  {
    repo: 'public-pay-simulator',
    label: 'Salarizare publică',
    href: 'https://github.com/CristianNichifor/public-pay-simulator',
    reusableData: 'regimuri salariale JSON, crosswalk-uri, rapoarte de import, limitări pe câmpuri',
    prototypeUse: 'poziții de politici publice, pagini explicative, note cu articol și sursă',
    integrationMode: 'link extern; preluăm numai rezumatul și modelul de sursare',
    caveat: 'Nu este calculator de drepturi individuale. Pe site ar trebui încadrat ca analiză de politică publică.',
    syntheticExample: '3 regimuri comparate în machetă',
  },
  {
    repo: 'legislativ',
    label: 'Linter legislativ',
    href: 'https://github.com/CristianNichifor/legislativ',
    reusableData: 'obligații neîndeplinite, terminologie, contradicții, schemă de proveniență',
    prototypeUse: 'Zona membrilor: sarcini pentru echipa de cercetare; Ce propunem: verificare poziții',
    integrationMode: 'intern în primă fază; publicăm doar rezultate validate manual',
    caveat: 'Findings cu model trebuie validate strict. Rejecțiile trebuie afișate, nu ascunse.',
    syntheticExample: '5 verificări de proiect în coadă',
  },
  {
    repo: 'achizitii-deschise',
    label: 'Achiziții deschise',
    href: 'https://github.com/CristianNichifor/achizitii-deschise',
    reusableData: 'prețuri unitare, agregate pe județ, indicatori de risc, metodologie OCDS',
    prototypeUse: 'Date locale, Fapte de azi, Sala de presă, Bani publici',
    integrationMode: 'link extern pentru explorator; agregate sintetice în pagini locale',
    caveat: 'Indicatorii arată cazuri de verificat, nu concluzii. Dreptul la replică trebuie proiectat.',
    syntheticExample: '8 indicatori de risc simulați',
  },
];

const dataProducts = [
  ['Registru oameni', 'CV, mandat, voturi, proiecte, contacte lipsă sau publice', 'Oameni / Persoana'],
  ['Dosar poziție', 'întrebare, poziție, raționament, diff, metodologie, simulator extern', 'Ce propunem'],
  ['Pachet județean', 'buget, HCL, UAT, achiziții, hartă, materiale pentru teren', 'Date locale / Implică-te'],
  ['Fișă presă', 'purtător de cuvânt, active, cifre, surse, data ultimei verificări', 'Sala de presă'],
  ['Sarcină membru', 'verb, rezultat vizibil, owner, termen, material de lucru', 'Zona membrilor'],
];

const strategicAdvantages = [
  {
    title: 'Resurse umane mai bine folosite',
    metric: '5 roluri conectate',
    body: 'Membrii, angajații, aleșii, birourile și purtătorii de cuvânt lucrează pe aceeași evidență. Fiecare vede doar stratul potrivit.',
  },
  {
    title: 'Mesaj public mai verificabil',
    metric: '1 sursă lângă fiecare cifră',
    body: 'O afirmație publică nu pleacă singură. Pleacă împreună cu sursa, data verificării, limita și materialul reutilizabil.',
  },
  {
    title: 'Conectare mai bună cu electoratul posibil',
    metric: '3 căi de apropiere',
    body: 'Un vizitator poate găsi omul local, poziția pe o temă și o întâlnire relevantă. Partidul poate vedea ce teme cer materiale mai clare.',
  },
  {
    title: 'Muncă de teren mai ușor de coordonat',
    metric: '4 materiale pe județ',
    body: 'Filiala primește fapte locale, grafice, variante de text și sarcini. Nu primește ordine de postare automată.',
  },
  {
    title: 'Avantaj competitiv de învățare',
    metric: '5 repo-uri reutilizabile',
    body: 'Repo-urile publice reduc timpul de la analiză la material politic. Ce a fost verificat o dată poate fi folosit în mai multe contexte.',
  },
];

function parseHash(): HashRoute {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart = ''] = raw.split('?');
  const cleanPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;

  return {
    path: cleanPath.replace(/\/+$/, '') || '/',
    params: new URLSearchParams(queryPart),
  };
}

function useHashRoute(): HashRoute {
  const [route, setRoute] = useState<HashRoute>(() => parseHash());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function makeHash(path: string, params?: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value && value !== 'toate') search.set(key, value);
  });
  return `#${path}${search.toString() ? `?${search.toString()}` : ''}`;
}

function replaceHash(path: string, params: URLSearchParams) {
  const search = params.toString();
  window.location.replace(`#${path}${search ? `?${search}` : ''}`);
}

function setHashParam(route: HashRoute, key: string, value: string | null) {
  const next = new URLSearchParams(route.params);
  if (!value || value === 'toate') next.delete(key);
  else next.set(key, value);
  replaceHash(route.path, next);
}

function currentHash(route: HashRoute): string {
  const search = route.params.toString();
  return `#${route.path}${search ? `?${search}` : ''}`;
}

function recordIdFromPath(path: string): string | null {
  const parts = path.split('/').filter(Boolean);
  return parts[0] === 'oameni' && parts[1] ? parts[1] : null;
}

function activeView(route: HashRoute): ViewMode {
  const value = route.params.get('view');
  return value === 'membru' || value === 'birou' ? value : 'public';
}

function Fake({
  children,
  mono = false,
  source = 'set sintetic',
  verified = '08 septembrie 2026',
}: {
  children: React.ReactNode;
  mono?: boolean;
  source?: string;
  verified?: string;
}) {
  return (
    <span className={mono ? 'fake-value fake-value--mono' : 'fake-value'}>
      <em className="fake-token">{children}</em>
      <span className="fake-meta">
        sursă: {source}; verificat: {verified}
      </span>
    </span>
  );
}

function PlaceholderBox({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div className={tall ? 'placeholder placeholder--tall' : 'placeholder'} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

function OpenQuestions({ screen }: { screen: keyof typeof screenQuestions }) {
  return (
    <aside className="open-questions" aria-labelledby="open-questions-title">
      <h2 id="open-questions-title">Întrebări deschise</h2>
      <ul>
        {[...(screenQuestions[screen] ?? []), ...genericOpenQuestions].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

function MetricGrid({
  items,
}: {
  items: { label: string; value: string; source: string; note: string; verified?: string }[];
}) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <article className="metric-card" key={item.label}>
          <span className="label">{item.label}</span>
          <Fake source={item.source} verified={item.verified}>
            {item.value}
          </Fake>
          <p>{item.note}</p>
        </article>
      ))}
    </div>
  );
}

function SourceFlow({ items }: { items: string[] }) {
  return (
    <ol className="source-flow">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function Layout({ route, children }: { route: HashRoute; children: React.ReactNode }) {
  const recordId = recordIdFromPath(route.path);
  const record = officials.find((item) => item.id === recordId);

  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <header className="site-header">
        <div className="prototype-banner" role="note">
          MACHETĂ NEOFICIALĂ — date fictive. Fără aprobarea USR.
        </div>
        <div className="header-main">
          <a className="neutral-mark" href="#/" aria-label="Machetă site public, index">
            <span aria-hidden="true">MP</span>
          </a>
          <nav className="primary-nav" aria-label="Navigare principală">
            {topNav.map((item) => (
              <a key={item.path} href={item.href} aria-current={route.path.startsWith(item.path) ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="header-actions" aria-label="Acțiuni principale">
            {headerActions.map((item) => (
              <a className={`header-action header-action--${item.variant}`} key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        {record ? <ViewSwitcher record={record} view={activeView(route)} /> : null}
      </header>
      <main id="continut" className="page-shell">
        {children}
      </main>
      <footer className="site-footer">
        <div>
          <strong>Machetă neoficială.</strong>
          <span> Rută curentă: {currentHash(route)}</span>
        </div>
        <nav aria-label="Legături secundare">
          {footerNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}

function ViewSwitcher({ record, view }: { record: OfficialRecord; view: ViewMode }) {
  const views: { value: ViewMode; label: string }[] = [
    { value: 'public', label: 'PUBLIC' },
    { value: 'membru', label: 'MEMBRU' },
    { value: 'birou', label: 'BIROU' },
  ];

  return (
    <section className="record-switcher" aria-label="Vizibilitate pe aceeași înregistrare">
      <span>Înregistrare canonică: {record.name}</span>
      <div>
        {views.map((item) => (
          <a
            key={item.value}
            href={makeHash(`/oameni/${record.id}`, { view: item.value })}
            aria-current={view === item.value ? 'true' : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const route = useHashRoute();

  const screen = useMemo(() => {
    if (route.path === '/') return <IndexScreen />;
    if (route.path === '/stiri') return <NewsScreen />;
    if (route.path === '/oameni') return <PeopleScreen route={route} />;
    if (route.path.startsWith('/oameni/')) return <PersonScreen route={route} />;
    if (route.path === '/guvernare') return <GovernmentScreen />;
    if (route.path === '/verificari') return <VerificationScreen />;
    if (route.path === '/ce-propunem') return <PositionsScreen />;
    if (route.path === '/declaratii') return <DeclarationsScreen route={route} />;
    if (route.path === '/date-locale') return <LocalDataScreen route={route} />;
    if (route.path === '/implica-te' || route.path === '/membri' || route.path.startsWith('/membri/')) return <MemberDemo path={route.path} />;
    if (route.path === '/bani') return <MoneyScreen route={route} />;
    if (route.path === '/presa') return <PressRoomScreen />;
    if (route.path === '/organizare') return <OrganizationScreen />;
    if (route.path === '/contact') return <ContactScreen />;
    if (route.path === '/inscriere') return <SignupScreen />;
    if (route.path === '/doneaza') return <DonateScreen />;
    if (route.path === '/proiecte-date') return <ProjectDataScreen />;
    if (route.path === '/strategie') return <StrategyScreen />;
    if (route.path === '/arhitectura') return <ArchitectureScreen />;
    if (route.path === '/nota') return <CostNoteScreen />;
    return <NotFound route={route} />;
  }, [route]);

  return <Layout route={route}>{screen}</Layout>;
}

function IndexScreen() {
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

function NewsScreen() {
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

function GovernmentScreen() {
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

function VerificationScreen() {
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

function PeopleScreen({ route }: { route: HashRoute }) {
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
        <label className="field-label" htmlFor="people-search">
          Căutare
        </label>
        <input
          id="people-search"
          type="search"
          value={q}
          placeholder="Căutați un nume, județ sau rol"
          onChange={(event) => setHashParam(route, 'q', event.target.value)}
        />
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

function PersonScreen({ route }: { route: HashRoute }) {
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

function PositionsScreen() {
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

function DeclarationsScreen({ route }: { route: HashRoute }) {
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

function LocalDataScreen({ route }: { route: HashRoute }) {
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
        <table>
          <caption>Hotărâri locale fictive</caption>
          <thead>
            <tr>
              <th>HCL</th>
              <th>Titlu</th>
              <th>Pentru</th>
              <th>Contra</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['12/2026', 'Rectificare bugetară model', '14', '3', '2'],
              ['19/2026', 'Regulament spații publice', '11', '6', '2'],
            ].map(([hcl, title, yes, no, absent]) => (
              <tr key={hcl}>
                <td data-label="HCL">
                  <Fake source="site municipal + index HCL">{hcl}</Fake>
                </td>
                <td data-label="Titlu">{title}</td>
                <td data-label="Pentru">
                  <Fake source="site municipal + index HCL">{yes}</Fake>
                </td>
                <td data-label="Contra">
                  <Fake source="site municipal + index HCL">{no}</Fake>
                </td>
                <td data-label="Absent">
                  <Fake source="site municipal + index HCL">{absent}</Fake>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wire-section table-wrap">
        <h2>Completitudine pe UAT</h2>
        <table>
          <caption>Procente sintetice de completitudine</caption>
          <thead>
            <tr>
              <th>UAT</th>
              <th>Buget</th>
              <th>HCL</th>
              <th>Contacte</th>
              <th>Observație</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Municipiul Exemplu', '88%', '73%', '92%', 'date aproape complete'],
              ['Comuna Demo', '41%', '22%', '58%', 'PDF-uri scanate'],
              ['Orașul Mostră', '64%', '51%', '67%', 'calendar neregulat'],
            ].map(([uat, budget, hcl, contacts, note]) => (
              <tr key={uat}>
                <td data-label="UAT">{uat}</td>
                <td data-label="Buget">
                  <Fake source="ForExeBug / Trezorerie">{budget}</Fake>
                </td>
                <td data-label="HCL">
                  <Fake source="site municipal + index HCL">{hcl}</Fake>
                </td>
                <td data-label="Contacte">
                  <Fake source="director sintetic">{contacts}</Fake>
                </td>
                <td data-label="Observație">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

function MoneyScreen({ route }: { route: HashRoute }) {
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
        <a className="text-button" href="https://github.com/CristianNichifor/achizitii-deschise" target="_blank" rel="noreferrer">
          Deschide repo
        </a>
      </section>

      <OpenQuestions screen="money" />
    </div>
  );
}

function PressRoomScreen() {
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
        <table>
          <caption>Rute de contact fictive</caption>
          <thead>
            <tr>
              <th>Domeniu</th>
              <th>Nume placeholder</th>
              <th>Contact</th>
              <th>Verificat la</th>
            </tr>
          </thead>
          <tbody>
            {spokespeople.map(([area, name, contact]) => (
              <tr key={area}>
                <td data-label="Domeniu">{area}</td>
                <td data-label="Nume placeholder">{name}</td>
                <td data-label="Contact">{contact}</td>
                <td data-label="Verificat la">
                  <Fake source="sală presă sintetică">08 septembrie 2026</Fake>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

function OrganizationScreen() {
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

function ContactScreen() {
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
            <label className="field-label" htmlFor="contact-type">
              Tip mesaj
            </label>
            <Select id="contact-type" defaultValue="problema-locala">
              <option value="problema-locala">Problemă locală</option>
              <option value="idee-lege">Idee de lege</option>
              <option value="verificare">Sesizare de verificat</option>
              <option value="presa">Cerere presă</option>
            </Select>
            <label className="field-label" htmlFor="contact-message">
              Mesaj
            </label>
            <textarea id="contact-message" defaultValue="Descrie problema, localitatea și documentul sursă dacă există." />
            <button type="button">Simulează trimiterea</button>
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

function SignupScreen() {
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

function DonateScreen() {
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

function ProjectDataScreen() {
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
        <table>
          <caption>Repo-uri verificate pe GitHub în 08 septembrie 2026</caption>
          <thead>
            <tr>
              <th>Repo</th>
              <th>Ce putem folosi</th>
              <th>Unde intră</th>
              <th>Mod</th>
              <th>Limită</th>
            </tr>
          </thead>
          <tbody>
            {repoModules.map((module) => (
              <tr key={module.repo}>
                <td data-label="Repo">
                  <a href={module.href} target="_blank" rel="noreferrer">
                    {module.repo}
                  </a>
                </td>
                <td data-label="Ce putem folosi">{module.reusableData}</td>
                <td data-label="Unde intră">{module.prototypeUse}</td>
                <td data-label="Mod">{module.integrationMode}</td>
                <td data-label="Limită">{module.caveat}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

function StrategyScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">De ce contează</p>
        <h1>Avantaj strategic prin date, oameni și muncă repetabilă</h1>
        <p>
          Integrarea cu repo-urile publice nu este un exercițiu tehnic. Este o metodă de a transforma analiză verificată
          în materiale, întâlniri și acțiuni pe care organizația le poate repeta în fiecare filială.
        </p>
      </section>

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

      <OpenQuestions screen="strategy" />
    </div>
  );
}

function ArchitectureScreen() {
  return (
    <div className="stack">
      <section className="page-heading">
        <p className="eyebrow">Arhitectură date</p>
        <h1>Conectori simulați</h1>
        <p>Nu există integrare reală. Ecranul arată direcția, cadența și suprafața care ar consuma datele.</p>
      </section>

      <section className="wire-section table-wrap">
        <h2>Conectori</h2>
        <table>
          <caption>Integrări simulate, fără backend</caption>
          <thead>
            <tr>
              <th>Conector</th>
              <th>Direcție</th>
              <th>Cadență</th>
              <th>Ecran</th>
              <th>Ce aduce</th>
              <th>Verificat la</th>
            </tr>
          </thead>
          <tbody>
            {connectors.map(([name, direction, cadence, screen, detail]) => (
              <tr key={name}>
                <td data-label="Conector">{name}</td>
                <td data-label="Direcție">{direction}</td>
                <td data-label="Cadență">{cadence}</td>
                <td data-label="Ecran">{screen}</td>
                <td data-label="Ce aduce">{detail}</td>
                <td data-label="Verificat la">
                  <Fake source={`${name} sintetic`}>08 septembrie 2026</Fake>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

function CostNoteScreen() {
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
        <table>
          <caption>Costul este exprimat ca muncă și guvernanță, nu ca buget estimat.</caption>
          <thead>
            <tr>
              <th>Ecran</th>
              <th>Decizie structurală</th>
              <th>Articol relevant</th>
              <th>Cost real</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([screen, decision, article, cost]) => (
              <tr key={screen}>
                <td data-label="Ecran">{screen}</td>
                <td data-label="Decizie structurală">{decision}</td>
                <td data-label="Articol relevant">{article}</td>
                <td data-label="Cost real">{cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <OpenQuestions screen="note" />
    </div>
  );
}

function NotFound({ route }: { route: HashRoute }) {
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
