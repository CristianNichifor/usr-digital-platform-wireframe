# Civic Controls Pilot

Reusable native controls used by the contacts screen. Not a published package.

Import controls from this directory's index. Put `civic-scope` on their ancestor and provide the semantic color tokens. For the existing demo, import `usr.css` and add `civic-usr`; it maps directly to the existing `--usr-*` palette. No new palette or font assets are introduced into the demo.

`foundations.css` owns shared control dimensions and spacing. `controls.css` is scoped using CSS nesting and supplies native control styles only. It must not style unrelated routes. Target browser support for native CSS nesting needs review before distribution outside the current tested Chromium/Vite setup.

The contacts pilot retains inline details and draft review and does not add a dialog, a UI-library dependency, or change its data flow.

The Field render callback supplies id, description association, and invalid state to its child. Pass these attributes to the actual input/select. Callers own IDs, values, validation, permissions, and event handling. Button forwards native attributes and defaults to type="button". NativeSelect preserves the native select and decorative Lucide chevron. IconButton requires a label and provides an accessible name and title.

Migration scope: only `PublicContacts.tsx`. All fictional office fixtures, filters, bookmarks, clipboard fallback, review/download behavior, and disabled-contact states remain local to that screen. No data layer, storage, authentication, or dependency changes were made to the main app.

Verification: `tests/civic-pilot.spec.ts` covers search, level filtering, bookmarks, keyboard focus, hover colors, select padding, unavailable-contact states, and desktop/mobile layouts. `tests/privacy-contacts.spec.ts` retains the draft-download and no-external-request checks. Other member screens keep their existing controls.
