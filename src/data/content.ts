export type RepoModule = {
  repo: string;
  label: string;
  href: string;
  reusableData: string;
  prototypeUse: string;
  integrationMode: string;
  caveat: string;
  syntheticExample: string;
};

export const connectors = [
  ['AEP', 'intrare', 'lunar', 'Bani', 'subvenții și rambursări de campanie'],
  ['Monitorul Oficial', 'intrare', 'la publicare', 'Bani', 'declarații financiare ale partidului'],
  ['ForExeBug / Trezorerie', 'intrare', 'zilnic sau lunar', 'Date locale', 'execuție bugetară locală'],
  ['Site-uri municipale + indexuri HCL', 'intrare', 'săptămânal', 'Date locale', 'voturi consilii locale'],
  ['Date deschise Parlament', 'intrare', 'zilnic', 'Persoana', 'voturi și prezență'],
  ['ANI declarații', 'intrare', 'la publicare', 'Declarații de avere', 'scanuri și metadate'],
  ['e-USR', 'intrare internă', 'în timp real sau zilnic', 'Zona membrilor', 'statut membru, filială, procese-verbale'],
  ['Site-uri proiecte', 'link extern', 'manual', 'Persoana / Date locale', 'monitorpnrr.ro și domenii neutre păstrate separat'],
];

export const genericOpenQuestions = [
  'Care este sursa canonică și cine menține fiecare câmp?',
  'Care este temeiul GDPR? Directorul de membri folosește consimțământ opt-in sub art. 9. Art. 7(3) privește registrul statutar, nu publicarea între colegi.',
  'Care este cadența de refresh și cine răspunde când sursa întârzie?',
  'Ce se rupe la scară: PDF-uri scanate, nume duplicate, UAT-uri redenumite, mandate schimbate, permisiuni interne?',
  'Auto-postarea este respinsă: risc de bannare pentru postări coordonate identic, risc politic și lipsa controlului individual.',
];

export const screenQuestions: Record<string, string[]> = {
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

export const officialSiteAudit = [
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

export const publicPages = [
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

export const currentNews = [
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

export const publicInterestCases = [
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

export const electionContext = [
  ['Europarlamentare 2024', 'ADU 8,71%', 'Rezultatul cere utilitate publică zilnică, nu doar campanie periodică.'],
  ['Locale 2024, consilii județene', 'ADU 8,29%', 'Fără infrastructură locală de fapte, partidul rămâne dependent de valuri naționale.'],
  ['Parlamentare 2024', 'USR 12,40% Cameră', 'Există bază parlamentară, dar nu suficientă conversie locală și media proprie.'],
  ['Sondaje 2026', 'aprox. 9-10,5%', 'Platforma trebuie tratată ca mecanism de creștere organizațională, nu ca ornament digital.'],
];

export const repoModules: RepoModule[] = [
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
    href: 'https://github.com/CristianNichifor/legislation-linter',
    reusableData: 'obligații neîndeplinite, terminologie, contradicții, schemă de proveniență',
    prototypeUse: 'Zona membrilor: sarcini pentru echipa de cercetare; Ce propunem: verificare poziții',
    integrationMode: 'intern în primă fază; publicăm doar rezultate validate manual',
    caveat: 'Findings cu model trebuie validate strict. Rejecțiile trebuie afișate, nu ascunse.',
    syntheticExample: '5 verificări de proiect în coadă',
  },
  {
    repo: 'achizitii-deschise',
    label: 'Achiziții deschise',
    href: 'https://github.com/CristianNichifor/open-procurement',
    reusableData: 'prețuri unitare, agregate pe județ, indicatori de risc, metodologie OCDS',
    prototypeUse: 'Date locale, Fapte de azi, Sala de presă, Bani publici',
    integrationMode: 'link extern pentru explorator; agregate sintetice în pagini locale',
    caveat: 'Indicatorii arată cazuri de verificat, nu concluzii. Dreptul la replică trebuie proiectat.',
    syntheticExample: '8 indicatori de risc simulați',
  },
];

export const dataProducts = [
  ['Registru oameni', 'CV, mandat, voturi, proiecte, contacte lipsă sau publice', 'Oameni / Persoana'],
  ['Dosar poziție', 'întrebare, poziție, raționament, diff, metodologie, simulator extern', 'Ce propunem'],
  ['Pachet județean', 'buget, HCL, UAT, achiziții, hartă, materiale pentru teren', 'Date locale / Implică-te'],
  ['Fișă presă', 'purtător de cuvânt, active, cifre, surse, data ultimei verificări', 'Sala de presă'],
  ['Sarcină membru', 'verb, rezultat vizibil, owner, termen, material de lucru', 'Zona membrilor'],
];

export const strategicAdvantages = [
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
