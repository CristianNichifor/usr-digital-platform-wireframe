import aileronFont from "../../assets/usr/AileronRegular.woff2?inline";

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
    name: "Pagina națională Model",
    platform: "Facebook",
    kind: "Pagină",
    scope: "Național",
  },
  {
    id: "group",
    name: "Grupul oficial al filialei Model",
    platform: "Facebook",
    kind: "Grup oficial",
    scope: "Filială",
  },
  {
    id: "photo",
    name: "Organizația Model",
    platform: "Instagram",
    kind: "Pagină",
    scope: "Filială",
  },
  {
    id: "professional",
    name: "Comunitatea profesională Model",
    platform: "LinkedIn",
    kind: "Pagină",
    scope: "Național",
  },
  {
    id: "code",
    name: "Proiecte deschise Model",
    platform: "GitHub",
    kind: "Organizație",
    scope: "Național",
  },
  {
    id: "updates",
    name: "Actualizări Model",
    platform: "X",
    kind: "Pagină",
    scope: "Național",
  },
  {
    id: "shorts",
    name: "Video Model",
    platform: "TikTok",
    kind: "Pagină",
    scope: "Național",
  },
  {
    id: "video",
    name: "Arhiva publică Model",
    platform: "YouTube",
    kind: "Canal",
    scope: "Național",
  },
];
export const people = [
  {
    id: "actual",
    name: "Reprezentant Model A",
    membership: "Membru actual",
    office: "Consilier local - mandat în curs",
    endorsement: "Susținere actuală",
    networks: ["Facebook", "LinkedIn"],
  },
  {
    id: "former",
    name: "Reprezentant Model B",
    membership: "Nu mai este membru",
    office: "Consilier local - mandat în curs",
    endorsement: "Susținere anterioară",
    networks: ["Instagram", "X"],
  },
  {
    id: "independent",
    name: "Reprezentant Model C",
    membership: "Independent",
    office: "Mandat încheiat",
    endorsement: "Susținere anterioară",
    networks: ["LinkedIn", "YouTube"],
  },
  {
    id: "unknown",
    name: "Reprezentant Model D",
    membership: "Afiliere neconfirmată",
    office: "Rol public neconfirmat",
    endorsement: "Susținere neconfirmată",
    networks: ["Facebook", "TikTok"],
  },
];
export const resources = [
  {
    id: "meeting",
    type: "Material",
    title: "Invitație la întâlnirea de organizare",
    publisher: "Echipa centrală Model",
    scope: "Național",
    platform: "Facebook",
    date: "2026-09-09",
    status: "Disponibil",
    text: "Exemplu fictiv de invitație: data, locul, ordinea de zi și persoana de contact.",
    source: "Material creat pentru demonstrație",
  },
  {
    id: "library",
    type: "Material",
    title: "Biblioteca filialei: documente și program",
    publisher: "Echipa filialei Model",
    scope: "Filială",
    platform: "Instagram",
    date: "2026-09-08",
    status: "Disponibil",
    text: "Exemplu fictiv de anunț despre accesul la bibliotecă și programul de lucru.",
    source: "Material creat pentru demonstrație",
  },
  {
    id: "article",
    type: "Articol",
    title: "Cum se organizează o arhivă accesibilă",
    publisher: "Publicația Fictivă",
    scope: "Național",
    platform: "Presă",
    date: "2026-09-07",
    status: "Disponibil",
    text: "Rezumat sintetic despre indexarea documentelor și formate accesibile. Nu reproduce un articol real.",
    source: "Articol inventat; fără sursă externă",
  },
  {
    id: "correction",
    type: "Articol",
    title: "Actualizare a programului bibliotecii",
    publisher: "Gazeta Model",
    scope: "Filială",
    platform: "Presă",
    date: "2026-09-06",
    status: "Corectat",
    text: "Corecție fictivă: programul începe la 10:00, nu la 09:00.",
    source: "Corecție inventată pentru prezentare",
  },
  {
    id: "expired",
    type: "Material",
    title: "Invitația ediției precedente",
    publisher: "Echipa filialei Model",
    scope: "Filială",
    platform: "LinkedIn",
    date: "2026-08-01",
    status: "Retras",
    text: "Exemplu arhivat. Materialul a fost înlocuit.",
    source: "Material sintetic retras",
  },
];
export const projects = [
  {
    id: "archive",
    name: "Index de documente Model",
    skill: "Documentare",
    license: "MIT",
    task: "Documentează câmpurile unui exemplu",
    description: "Catalog demonstrativ de documente, fără date reale.",
  },
  {
    id: "access",
    name: "Componente accesibile Model",
    skill: "Dezvoltare",
    license: "MIT",
    task: "Verifică navigarea cu tastatura",
    description: "Componente de interfață și exemple de utilizare.",
  },
  {
    id: "language",
    name: "Ghid de contribuții Model",
    skill: "Traducere",
    license: "CC BY 4.0",
    task: "Revizuiește un paragraf demonstrativ",
    description: "Documentație pentru contributori noi.",
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

export function brandTokens() {
  const style = getComputedStyle(document.documentElement);
  const read = (key: string) => style.getPropertyValue(key).trim();
  return {
    navy: read("--usr-navy"),
    red: read("--usr-red"),
    blue: read("--usr-blue-mid"),
    background: read("--usr-surface-muted"),
    surface: read("--usr-surface"),
    text: read("--usr-text"),
    muted: read("--usr-text-muted"),
    font: "Aileron",
  };
}

export const template = (title: string) => {
  const colors = brandTokens();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><defs><style>@font-face{font-family:Aileron;src:url("${aileronFont}") format("woff2");}</style></defs><rect width="1080" height="1080" fill="${colors.background}"/><rect width="1080" height="44" fill="${colors.navy}"/><text x="80" y="150" font-family="Aileron,Arial" font-size="28" fill="${colors.navy}">DEMO / MATERIAL FICTIV</text><text x="80" y="440" font-family="Aileron,Arial" font-size="54" fill="${colors.navy}">${title}</text><text x="80" y="550" font-family="Aileron,Arial" font-size="30" fill="${colors.muted}">Data / Loc / Organizator</text><path d="M80 860H1000" stroke="${colors.red}" stroke-width="4"/><text x="80" y="950" font-family="Aileron,Arial" font-size="24" fill="${colors.navy}">Model de prezentare. Nu este material oficial.</text></svg>`;
};
