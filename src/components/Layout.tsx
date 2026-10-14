import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { footerNav, headerActions, topNav } from '../data/navigation';
import { officials } from '../data/officials';
import type { OfficialRecord } from '../data/officials';
import { activeView, makeHash, recordIdFromPath } from '../routing';
import type { HashRoute, ViewMode } from '../routing';

export function Layout({ route, children }: { route: HashRoute; children: React.ReactNode }) {
  const recordId = recordIdFromPath(route.path);
  const record = officials.find((item) => item.id === recordId);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [route.path]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <header className="site-header">
        <div className="prototype-banner" role="note">
          Machetă neoficială, neafiliată USR — date fictive. <a href="#/strategie">Despre machetă</a>
        </div>
        <div className="header-main" data-menu={menuOpen ? 'open' : 'closed'}>
          <a className="wordmark" href="#/">
            <span className="wordmark__name">Platformă digitală</span>
            <span className="wordmark__note">machetă</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span className="menu-toggle__label">Meniu</span>
          </button>
          <nav id="primary-nav" className="primary-nav" aria-label="Navigare principală">
            {topNav.map((item) => (
              <a
                key={item.path}
                href={item.href}
                aria-current={route.path.startsWith(item.path) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="primary-nav__join" href="#/inscriere" onClick={() => setMenuOpen(false)}>
              Înscriere
            </a>
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
          <span> Conținut sintetic; nu este un serviciu oficial USR.</span>
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
