import { footerNav, headerActions, topNav } from '../data/navigation';
import { officials } from '../data/officials';
import type { OfficialRecord } from '../data/officials';
import { activeView, currentHash, makeHash, recordIdFromPath } from '../routing';
import type { HashRoute, ViewMode } from '../routing';

export function Layout({ route, children }: { route: HashRoute; children: React.ReactNode }) {
  const recordId = recordIdFromPath(route.path);
  const record = officials.find((item) => item.id === recordId);

  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <header className="site-header">
        <div className="prototype-banner" role="note">
          Machetă neoficială, neafiliată USR — date fictive.
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

export function ViewSwitcher({ record, view }: { record: OfficialRecord; view: ViewMode }) {
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
