// Low-to-medium fidelity rebuilt usr.ro prototype.
// Shareable navigation uses the URL hash; member demo state stays in memory.

import { useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import MemberDemo from './features/members/MemberDemo';
import { GovernmentScreen, PositionsScreen, VerificationScreen } from './features/public/government';
import { IndexScreen, NotFound } from './features/public/home';
import { LocalDataScreen } from './features/public/local-data';
import { NewsScreen, PressRoomScreen } from './features/public/news';
import { ContactScreen, DonateScreen, OrganizationScreen, SignupScreen } from './features/public/participation';
import { PeopleScreen, PersonScreen } from './features/public/people';
import { ArchitectureScreen, CostNoteScreen, ProjectDataScreen, StrategyScreen } from './features/public/proposal';
import { DeclarationsScreen, MoneyScreen } from './features/public/transparency';
import { useHashRoute } from './routing';
import { routeTitle } from './titles';

export default function App() {
  const route = useHashRoute();

  const screen = useMemo(() => {
    if (route.path === '/comunitate' || route.path.startsWith('/comunitate/')) return <MemberDemo path={'/membri/' + (route.path.slice('/comunitate/'.length) || 'resurse')} supporter />;
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

  useEffect(() => {
    document.title = routeTitle(route.path);
  }, [route.path]);

  return <Layout route={route}>{screen}</Layout>;
}
