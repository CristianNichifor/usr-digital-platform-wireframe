# Production readiness

Status: `todo`, `done`, `blocked`, `needs-human`.

| ID | Item | Status |
| --- | --- | --- |
| USR-1 | `noindex,nofollow` and a persistent "unofficial, not affiliated" banner | done |
| USR-2 | Aileron font licence file | done |
| USR-3 | Romanian diacritics normalised in `src/**` and README, checked in the build | done (wording needs human review) |
| USR-4 | Each route sets its own `document.title` | done |
| USR-5 | Open Graph title, description and a synthetic image | done |
| USR-6 | Civic UI upgrade | blocked (waits for civic-ui 0.8) |
| USR-7 | Split `src/App.tsx` into feature routes, `App.tsx` under 500 lines | done (stacked PR) |
| USR-8 | `#/` is a mocked public homepage; the memo moves to `#/strategie` behind "Despre machetă" | done |
| USR-9 | Mobile header: menu button, Membri and Donează pinned | done |
| USR-10 | Every non-inline link and button is at least 32 px tall on mobile | done |
| USR-11 | Header: plain text section links, buttons only for Membri, Înscriere, Donează | done |
| USR-12 | Member area navigation grouped Eu / Filială / Resurse (side nav desktop, select mobile) | done |
| USR-13 | Readable "sursă: … verificat:" lines | done |
| USR-14 | Neutral text wordmark instead of the "MP" box | done |
| USR-15 | UX guideline `docs/ux-guidelines.md`; reduced motion honoured | done (wording needs human review) |
| USR-16 | Footer shows no internal route text | done (wording needs human review) |

## USR-1 Not for indexing, clearly unofficial

- Given any route, when the page loads,
  then `<meta name="robots" content="noindex,nofollow">` is in the document head.
- Given any route, including the member area,
  then a banner reading "Machetă neoficială, neafiliată USR" is visible at the top of the page.
- Test: `tests/meta.spec.ts` › "robots" and "banner" cases, over every route in `topNav`,
  the header actions and the footer.

## USR-2 Aileron licence

- Given the bundled Aileron `.woff2` files in `src/assets/usr/`,
  when the upstream licence can be confirmed,
  then `LICENSE-Aileron.txt` states it and names the source; otherwise the item is `needs-human`.
- Proof: https://dotcolon.net/font/aileron/ states "Aileron is No Rights Reserved." and links to
  CC0 1.0; the bundled files' name table says "No Rights Reserved." (designer Sora Sagano,
  vendor URL dotcolon.net). Recorded in `LICENSE-Aileron.txt`.

## USR-3 Diacritics

- Given Romanian prose in `src/**` (string literals, template text, JSX text) and `README.md`,
  then it uses ș ț with comma below (never ş ţ with cedilla) and no known word appears
  without its diacritics (for example "fara", "dupa", "informatii").
- Given `npm run build`, then `scripts/check-diacritics.mjs` runs first and fails on a finding.
- Test: `scripts/check-diacritics.test.mjs` (node --test) for the checker; the build runs the
  checker against the repository.
- Corrections are made by the agent: needs human review for wording.

## USR-4 Per-route titles

- Given a route such as `#/stiri` or `#/membri/documente`,
  when it renders, then `document.title` names that screen, followed by
  " — Machetă platformă digitală"; unknown routes get a "Pagină inexistentă" title.
- Test: `tests/meta.spec.ts` › "document title" cases.

## USR-5 Open Graph

- Given the built page, then it has `og:title`, `og:description`, `og:type`, `og:image`
  (a synthetic image in `public/`, no USR logo) and `twitter:card`. The image was rendered
  once from plain HTML with Playwright; it shows only the wireframe's name and placeholder boxes.
- Given `og:image`, then the file exists in the build output.
- Test: `tests/meta.spec.ts` › "open graph" case.

## USR-7 Split App.tsx

- Given the refactor, then `src/App.tsx` is under 500 lines and every existing spec
  passes unchanged.
- Test: the existing Playwright suite, unchanged; `wc -l src/App.tsx` reported in the pull request.
- Layout: `src/routing.ts`, `src/titles.ts`, `src/data/*`, `src/components/{Layout,wireframe}.tsx`,
  `src/features/public/*.tsx` (screens grouped by area).

## USR-8 to USR-14 UX review

From the coordinator's UX review. Tests: `tests/ux.spec.ts`.

- USR-8: Given `#/`, then the page reads as a public homepage: the lead story is the `h1`,
  with latest news, people and ways to get involved. Given the banner, then it has a
  "Despre machetă" link to `#/strategie`, which holds the memo (audit, site map, strategy).
- USR-9: Given a 390 px viewport, then the header shows a "Meniu" button (`aria-expanded`),
  Membri and Donează, and is at most 140 px tall; opening the menu shows the section links and
  Înscriere; choosing a link closes it. Given 1280 px, then there is no menu button.
- USR-10: Given 390 px on the public and member routes, then every visible link, button or
  form control that is not inline in running text is at least 32 px tall.
- USR-11: Given the desktop header, then section links have no background or border and
  Membri, Înscriere and Donează are styled as buttons.
- USR-12: Given `#/membri` at 1280 px, then "Navigare membri" shows the groups Eu, Filială and
  Resurse beside the content. Given 390 px, then a "Secțiune" select replaces the links and
  choosing an option opens that section. Supporters see only the open sections.
- USR-13: Given a synthetic value, then its "sursă: … verificat:" line is at least 13 px,
  not bold, with contrast of at least 4.5:1.
- USR-14: Given the header, then the home link is a text wordmark ("Platformă digitală",
  "machetă") and no "MP" box remains.

## USR-15 UX guideline and reduced motion

- Given `docs/ux-guidelines.md`, then it covers users and first-screen job, page anatomy,
  content rules, data-viz, states, mobile and accessibility, status vocabulary, a conformance
  checklist mapped to tests and a known-deviations backlog, and points to civic-ui
  `docs/ux-guidelines.md` as the fleet guideline.
- Given `prefers-reduced-motion: reduce`, then the document does not scroll smoothly and cards
  have no transition.
- Test: `tests/ux.spec.ts` › "reduced motion" case.

## USR-16 No internal route in the footer

- Given any page, then the footer says the site is an unofficial mock-up with
  synthetic content and does not show the internal "Rută curentă: #/…" hash.
- Test: `tests/ux.spec.ts` › "footer" case.

## USR-17 to USR-19 Design screens

From `docs/design/README.md` (target-state mockups in `docs/design/screens/`). Romanian copy in
the mockups is agent-written: needs human review. Tests to add in `tests/ux.spec.ts`.

- USR-17: Given `#/`, then the banner shows "Prototip" and "Date demonstrative", the lead story
  has a `sursă:` line, a missing CV in the Oameni block is marked with text (not only colour),
  and the footer has a privacy / data-limits link.
  Test: `tests/ux.spec.ts` › "homepage status and provenance".
- USR-18: Given `#/membri`, then amounts read `30 lei` (not `RON`), the summary cards are links,
  dues statuses are text chips, the dues table has a caption with provenance, and the simulated
  payment failure renders `role="alert"` with a "Reîncearcă" button.
  Test: `tests/ux.spec.ts` › "member dashboard amounts and chips".
- USR-19: Given 390 px with the menu open, then the toggle reads "Închide" with
  `aria-expanded="true"`, every menu link is at least 44 px tall, Înscriere is inside the menu,
  Escape closes the menu and returns focus to the toggle; closed, the header is at most 140 px.
  Test: `tests/ux.spec.ts` › "mobile menu open state".

## USR-20 Footer privacy link

- Given any page, then the footer's secondary links include "Limitele datelor și
  confidențialitate", pointing at the README section "Date și limite", so the data-limits
  text is reachable from the app and not only from the repository.
- Test: `tests/footer.spec.ts`.
