import { officials } from './data/officials';
import { sections as memberSections } from './features/members/MemberDemo';

export const siteTitle = 'Machetă platformă digitală';

export const screenTitles: Record<string, string> = {
  '/': 'Acasă',
  '/stiri': 'Știri',
  '/oameni': 'Oameni',
  '/guvernare': 'Guvernare',
  '/verificari': 'Verificări',
  '/ce-propunem': 'Ce propunem',
  '/declaratii': 'Declarații de avere',
  '/date-locale': 'Date locale',
  '/bani': 'Bani',
  '/presa': 'Sala de presă',
  '/organizare': 'Organizare',
  '/contact': 'Contact',
  '/inscriere': 'Înscriere',
  '/doneaza': 'Donează',
  '/proiecte-date': 'Proiecte și date',
  '/strategie': 'Despre machetă',
  '/arhitectura': 'Arhitectură date',
  '/nota': 'Notă costuri',
  '/implica-te': 'Implică-te',
  '/membri': 'Membri',
};

export function memberSectionTitle(area: string, section: string): string {
  const label = memberSections.find(([key]) => key === section)?.[1];
  return label && section ? `${label} · ${area}` : area;
}

export function routeTitle(path: string): string {
  const [first = '', second = ''] = path.split('/').filter(Boolean);
  let screen = screenTitles[path];
  if (!screen && first === 'oameni') screen = officials.find((item) => item.id === second)?.name ?? 'Oameni';
  if (!screen && first === 'membri') screen = memberSectionTitle('Membri', second);
  if (first === 'comunitate') screen = memberSectionTitle('Comunitate', second || 'resurse');
  return `${screen ?? 'Pagină inexistentă'} — ${siteTitle}`;
}
