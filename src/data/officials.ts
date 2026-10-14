export type OfficialRecord = {
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

export const officials: OfficialRecord[] = [
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
