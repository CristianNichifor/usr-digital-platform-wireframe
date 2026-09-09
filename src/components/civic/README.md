# Civic UI Adoption

Public Contacts imports native Button, IconButton, Field, Input and NativeSelect from [Civic UI v0.1.0](https://github.com/CristianNichifor/civic-ui/releases/tag/v0.1.0). The root package manifest pins its GitHub release tarball and the lockfile records its integrity. No npm account or local filesystem dependency is needed.

The screen explicitly imports `styles.css` and `themes/usr.css`, with `civic-scope civic-usr` on its root. The adapter uses this demo's existing `--usr-*` tokens and fonts. No new palette, neutral theme or brand assets are loaded.

The resource-filter row also imports Field, Input and NativeSelect for its search, content and organisation filters. Only that row has `civic-scope civic-usr`; its checkboxes retain their native markup. Its state, options, reset behavior and fictional records are unchanged. Social/profile controls and other ResourceHub branches retain the older Select wrapper.

The former repository-local Civic UI implementation has been removed. Changes to shared controls now belong in the Civic UI repository and must be adopted through a reviewed version update. Other demo controls remain unmigrated.

All fictional contact fixtures, filtering, bookmarks, clipboard fallback, inline details and draft review/download behavior remain in PublicContacts. No state, storage, authentication or infrastructure integration is added.

`tests/civic-pilot.spec.ts` covers contacts behavior, focus, hover colors, select padding and responsive layouts. `tests/resource-filters.spec.ts` covers combined filters, empty results, saved items, reset, exact labels, keyboard focus, dropdown padding and 320/390/1440 layouts. Both run in Chromium, Firefox and WebKit. The remaining member/resource/privacy tests continue to cover the surrounding demo in Chromium. See the root README for commands and test limitations.

Package SHA-256: `67aa86d0c6672917e25efdfe777b4827eef71847e6b11834be2c9d1cbe0b598f`. The dependency's MIT license and upstream notices remain in the release package; this does not license unrelated demo assets.
