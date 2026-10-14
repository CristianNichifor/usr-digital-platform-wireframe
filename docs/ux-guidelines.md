# UX guidelines — USR digital platform wireframe

Status: **Prototip** (Prototype). Every person, amount, document and response in this app is
synthetic. The fleet-wide rules live in civic-ui `docs/ux-guidelines.md`; this file applies them
to the wireframe and wins only where the wireframe needs something narrower. Product language is
Romanian; this document is in English to match `docs/specs/`.

Romanian wording in this file and in the UI was written or corrected by an agent: **needs human
review**.

## 1. Users and top tasks

| User | Top task |
| --- | --- |
| Visitor of the public site | Read the latest news, find a representative, see how to get involved or donate |
| Journalist | Find the press room and verifiable records quickly |
| Member or supporter (demo profile) | Reach dues, documents, calendar, resources from one grouped navigation |
| Decision maker reviewing the proposal | Understand what is kept from usr.ro and why (`#/strategie`) |

**One job of the first screen (`#/`):** read as a plausible public homepage — the lead story is the
`h1`, followed by latest news, people and ways to get involved. The memo is never the first
screen; it sits behind "Despre machetă".

## 2. Page anatomy

Top to bottom, on every route:

1. Skip link "Sari la conținut".
2. Persistent banner (`role="note"`): "Machetă neoficială, neafiliată USR — date fictive." with
   the "Despre machetă" link. This replaces the fleet family bar: the wireframe is not part of the
   civic product family and must not look affiliated with it or with USR.
3. Header: text wordmark, section links, action buttons Membri / Înscriere / Donează.
4. `h1` plus one-line purpose.
5. Provenance: every synthetic value carries a "sursă: … verificat: …" line (USR-13). Real data is
   never shown, so there is no "Date: sursă, an" line for live sources.
6. Primary task, then secondary sections.
7. Footer: "Machetă neoficială", secondary links, the memo, architecture and cost notes, and the
   public usr.ro links (statut, 544, mandatari).

## 3. Content rules

- Romanian with ș ț comma-below; never ş ţ. Enforced by `scripts/check-diacritics.mjs` in the build.
- Numbers, dates and currency in ro-RO: `1.234,5`, `14 octombrie 2026`, `25 lei`. Amounts above a
  million use `mil.` / `mld.` with the unit (`2,3 mil. lei`).
- Tone: plain, second person plural for calls to action ("Implică-te", "Donează"), no slogans as
  facts, no claims about USR policy or people that are not visibly fictional.
- Fictional contacts use `.example` addresses; no real names of members, no logos.
- Banned in user-facing text: internal terms such as `hash`, `route`, `mock`, `seed`, `payload`,
  `feature flag`, `e-USR API`, English UI labels where a Romanian one exists.

## 4. Data visualisation

The wireframe shows metric cards and tables, not charts. If a chart is added it follows civic-ui:
viz palette (colour-blind safe), direct labels on bars, no dual axes, a table alternative,
source and as-of on the chart, and a "Date demonstrative" badge. Colour is never the only carrier
of meaning in status chips or legends.

## 5. States

- Empty: filters that return nothing say so and offer reset (resources, documents, contacts).
- Error: simulated failures use `role="alert"` with a "Reîncearcă" action (dues payment demo).
- Feedback: confirmations use `role="status"`.
- Loading: the app is static; any simulated delay over 2 s shows staged progress text.
- Demo data: the banner states "date fictive" on every route; member screens say actions are simulated.

## 6. Mobile, accessibility, motion

- Designed at 390 px first; no horizontal overflow on any route (member and community suites check it).
- Header at 390 px: "Meniu" button with `aria-expanded`, Membri and Donează pinned, ≤ 140 px tall.
- Touch targets: links and controls outside running text are ≥ 32 px tall (USR-10); 44 px preferred
  for primary actions. The fleet floor is 24 px.
- WCAG 2.1 AA: text contrast ≥ 4.5:1, visible focus, labelled controls, keyboard operable menus
  (Escape closes the menu).
- Reduced motion: under `prefers-reduced-motion: reduce` there is no smooth scrolling and no card
  transitions.
- Forced colours: borders, not background tints alone, mark buttons and selected states.

## 7. Status vocabulary

Use exactly one of: **Date live** (Live data) / **Date demonstrative** (Demo data) /
**Prototip** (Prototype) / **Arhivat** (Archived). This app is always **Prototip** with
**Date demonstrative**; the hub card shows it as such.

## 8. Conformance checklist

| Rule | Check |
| --- | --- |
| Unofficial banner on every route | `tests/meta.spec.ts` › banner |
| `noindex,nofollow` | `tests/meta.spec.ts` › robots |
| Per-route titles | `tests/meta.spec.ts` › document title |
| Diacritics comma-below | `scripts/check-diacritics.mjs` (build) |
| Civic UI contract | `scripts/check-civic-contract.mjs` (build) |
| Homepage first screen | `tests/ux.spec.ts` › home route |
| Mobile header and menu | `tests/ux.spec.ts` › mobile header |
| Targets ≥ 32 px on mobile | `tests/ux.spec.ts` › 32px |
| Provenance line readable | `tests/ux.spec.ts` › sursă line contrast |
| No overflow at narrow widths | `tests/members.spec.ts`, `tests/resources.spec.ts`, `tests/consumer-completion.spec.ts` |
| No external requests | `tests/resources.spec.ts`, `tests/privacy-contacts.spec.ts` and others |
| Reduced motion | `tests/ux.spec.ts` › reduced motion (USR-15) |

## 9. Known deviations backlog

- Footer shows "Rută curentă: #/…", an internal routing detail; replace with a plain page label or drop.
- Footer has no explicit privacy link; the data-limits text lives only in the README.
- civic-ui is pinned at 0.5.0; StatTile, SourceCitation and StatusMessage adoption waits for 0.8 (USR-6).
- No automated axe run; add one when the civic-ui upgrade lands.
- Touch target floor is 32 px, below the 44 px preferred size for primary actions.
- No forced-colours test.
