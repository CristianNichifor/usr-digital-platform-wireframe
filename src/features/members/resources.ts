export const platforms = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "GitHub",
  "X",
  "TikTok",
  "YouTube",
] as const;
export type Platform = (typeof platforms)[number];
export const channels: {
  id: string;
  name: string;
  platform: Platform;
  kind: string;
  scope: string;
}[] = [
  {
    id: "national",
    name: "Pagina nationala Model",
    platform: "Facebook",
    kind: "Pagina",
    scope: "National",
  },
  {
    id: "group",
    name: "Grupul oficial al filialei Model",
    platform: "Facebook",
    kind: "Grup oficial",
    scope: "Filiala",
  },
  {
    id: "photo",
    name: "Organizatia Model",
    platform: "Instagram",
    kind: "Pagina",
    scope: "Filiala",
  },
  {
    id: "professional",
    name: "Comunitatea profesionala Model",
    platform: "LinkedIn",
    kind: "Pagina",
    scope: "National",
  },
  {
    id: "code",
    name: "Proiecte deschise Model",
    platform: "GitHub",
    kind: "Organizatie",
    scope: "National",
  },
  {
    id: "updates",
    name: "Actualizari Model",
    platform: "X",
    kind: "Pagina",
    scope: "National",
  },
  {
    id: "shorts",
    name: "Video Model",
    platform: "TikTok",
    kind: "Pagina",
    scope: "National",
  },
  {
    id: "video",
    name: "Arhiva publica Model",
    platform: "YouTube",
    kind: "Canal",
    scope: "National",
  },
];
export const people = [
  {
    id: "actual",
    name: "Reprezentant Model A",
    membership: "Membru actual",
    office: "Consilier local - mandat in curs",
    endorsement: "Sustinere actuala",
    networks: ["Facebook", "LinkedIn"],
  },
  {
    id: "former",
    name: "Reprezentant Model B",
    membership: "Nu mai este membru",
    office: "Consilier local - mandat in curs",
    endorsement: "Sustinere anterioara",
    networks: ["Instagram", "X"],
  },
  {
    id: "independent",
    name: "Reprezentant Model C",
    membership: "Independent",
    office: "Mandat incheiat",
    endorsement: "Sustinere anterioara",
    networks: ["LinkedIn", "YouTube"],
  },
  {
    id: "unknown",
    name: "Reprezentant Model D",
    membership: "Afiliere neconfirmata",
    office: "Rol public neconfirmat",
    endorsement: "Sustinere neconfirmata",
    networks: ["Facebook", "TikTok"],
  },
];
export const resources = [
  {
    id: "meeting",
    type: "Material",
    title: "Invitatie la intalnirea de organizare",
    publisher: "Echipa centrala Model",
    scope: "National",
    platform: "Facebook",
    date: "2026-09-09",
    status: "Disponibil",
    text: "Exemplu fictiv de invitatie: data, locul, ordinea de zi si persoana de contact.",
    source: "Material creat pentru demonstratie",
  },
  {
    id: "library",
    type: "Material",
    title: "Biblioteca filialei: documente si program",
    publisher: "Echipa filialei Model",
    scope: "Filiala",
    platform: "Instagram",
    date: "2026-09-08",
    status: "Disponibil",
    text: "Exemplu fictiv de anunt despre accesul la biblioteca si programul de lucru.",
    source: "Material creat pentru demonstratie",
  },
  {
    id: "article",
    type: "Articol",
    title: "Cum se organizeaza o arhiva accesibila",
    publisher: "Publicatia Fictiva",
    scope: "National",
    platform: "Presa",
    date: "2026-09-07",
    status: "Disponibil",
    text: "Rezumat sintetic despre indexarea documentelor si formate accesibile. Nu reproduce un articol real.",
    source: "Articol inventat; fara sursa externa",
  },
  {
    id: "correction",
    type: "Articol",
    title: "Actualizare a programului bibliotecii",
    publisher: "Gazeta Model",
    scope: "Filiala",
    platform: "Presa",
    date: "2026-09-06",
    status: "Corectat",
    text: "Corectie fictiva: programul incepe la 10:00, nu la 09:00.",
    source: "Corectie inventata pentru prezentare",
  },
  {
    id: "expired",
    type: "Material",
    title: "Invitatia editiei precedente",
    publisher: "Echipa filialei Model",
    scope: "Filiala",
    platform: "LinkedIn",
    date: "2026-08-01",
    status: "Retras",
    text: "Exemplu arhivat. Materialul a fost inlocuit.",
    source: "Material sintetic retras",
  },
];
export const projects = [
  {
    id: "archive",
    name: "Index de documente Model",
    skill: "Documentare",
    license: "MIT",
    task: "Documenteaza campurile unui exemplu",
    description: "Catalog demonstrativ de documente, fara date reale.",
  },
  {
    id: "access",
    name: "Componente accesibile Model",
    skill: "Dezvoltare",
    license: "MIT",
    task: "Verifica navigarea cu tastatura",
    description: "Componente de interfata si exemple de utilizare.",
  },
  {
    id: "language",
    name: "Ghid de contributii Model",
    skill: "Traducere",
    license: "CC BY 4.0",
    task: "Revizuieste un paragraf demonstrativ",
    description: "Documentatie pentru contributori noi.",
  },
];

export function saveExample(
  name: string,
  content: string,
  type = "text/plain;charset=utf-8",
) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const template = (title: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="#f0f2f5"/><rect x="0" y="0" width="1080" height="44" fill="#075f4c"/><text x="80" y="150" font-family="Arial" font-size="28" fill="#243431">DEMO / MATERIAL FICTIV</text><text x="80" y="440" font-family="Arial" font-size="54" fill="#243431">${title}</text><text x="80" y="550" font-family="Arial" font-size="30" fill="#52665c">Data / Loc / Organizator</text><path d="M80 860H1000" stroke="#075f4c" stroke-width="4"/><text x="80" y="950" font-family="Arial" font-size="24" fill="#243431">Model de prezentare. Fara identitate oficiala.</text></svg>`;
