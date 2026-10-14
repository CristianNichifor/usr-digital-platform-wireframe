import { useEffect, useState } from 'react';

export type ViewMode = 'public' | 'membru' | 'birou';

export type HashRoute = {
  path: string;
  params: URLSearchParams;
};

export function parseHash(): HashRoute {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart = ''] = raw.split('?');
  const cleanPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;

  return {
    path: cleanPath.replace(/\/+$/, '') || '/',
    params: new URLSearchParams(queryPart),
  };
}

export function useHashRoute(): HashRoute {
  const [route, setRoute] = useState<HashRoute>(() => parseHash());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export function makeHash(path: string, params?: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value && value !== 'toate') search.set(key, value);
  });
  return `#${path}${search.toString() ? `?${search.toString()}` : ''}`;
}

export function replaceHash(path: string, params: URLSearchParams) {
  const search = params.toString();
  window.location.replace(`#${path}${search ? `?${search}` : ''}`);
}

export function setHashParam(route: HashRoute, key: string, value: string | null) {
  const next = new URLSearchParams(route.params);
  if (!value || value === 'toate') next.delete(key);
  else next.set(key, value);
  replaceHash(route.path, next);
}

export function currentHash(route: HashRoute): string {
  const search = route.params.toString();
  return `#${route.path}${search ? `?${search}` : ''}`;
}

export function recordIdFromPath(path: string): string | null {
  const parts = path.split('/').filter(Boolean);
  return parts[0] === 'oameni' && parts[1] ? parts[1] : null;
}

export function activeView(route: HashRoute): ViewMode {
  const value = route.params.get('view');
  return value === 'membru' || value === 'birou' ? value : 'public';
}
