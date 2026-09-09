# Civic UI Adoption

Public Contacts imports native Button, IconButton, Field, Input and NativeSelect from [Civic UI v0.2.0](https://github.com/CristianNichifor/civic-ui/releases/tag/v0.2.0). The root package manifest pins its GitHub release tarball and the lockfile records its integrity. No npm account or local filesystem dependency is needed.

The screen explicitly imports `styles.css` and `themes/usr.css`, with `civic-scope civic-usr` on its root. The adapter uses this demo's existing `--usr-*` tokens and fonts. No new palette, neutral theme or brand assets are loaded.

The resource-filter row imports Field, Input and NativeSelect for search, content and organisation, plus Checkbox for saved-only and unavailable-scenario toggles. Unavailable/retry feedback uses Notice and Button; zero results use EmptyState. These areas have narrow `civic-scope civic-usr` boundaries. State, options, reset/retry behavior and fictional records are unchanged. Social/profile controls and other ResourceHub branches retain the older Select wrapper.

Projects uses Field and NativeSelect for the Competenta filter, scoped to its own wrapper. Project records, interest toggles, guides and downloads are unchanged. `tests/project-filter.spec.ts` checks all available skills, those actions, reset, exact labels, focus and 320/390/1440 layouts in all three engines.

The document library uses Field, Input, NativeSelect, Checkbox, Notice, Button and EmptyState within its list view. Document records, filtering, access restrictions, detail routes and synthetic downloads are unchanged. `tests/document-library.spec.ts` checks these behaviors offline, reset, storage/network isolation, keyboard focus, colors and 320/390/1440 layouts in all three engines. Other MemberDemo screens retain their existing controls.

The former repository-local Civic UI implementation has been removed. Changes to shared controls now belong in the Civic UI repository and must be adopted through a reviewed version update. Other demo controls remain unmigrated.

All fictional contact fixtures, filtering, bookmarks, clipboard fallback, inline details and draft review/download behavior remain in PublicContacts. No state, storage, authentication or infrastructure integration is added.

`tests/civic-pilot.spec.ts` covers contacts behavior, focus, hover colors, select padding and responsive layouts. `tests/resource-filters.spec.ts` covers combined filters, empty results, saved items, reset, exact labels, keyboard focus, dropdown padding and 320/390/1440 layouts. Both run in Chromium, Firefox and WebKit. The remaining member/resource/privacy tests continue to cover the surrounding demo in Chromium. See the root README for commands and test limitations.

Package SHA-256: `9a78cb63fd9885febc5aa94eefbb3647f7dd5841fda5e7a6b2e78192b3d0c802`. The dependency's MIT license and upstream notices remain in the release package; this does not license unrelated demo assets. Version 0.2.0 adds React DOM as an explicit peer and pinned Radix dependencies; no dialogs or menus are introduced in this migration.
