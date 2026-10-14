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
| USR-7 | Split `src/App.tsx` into feature routes, `App.tsx` under 500 lines | todo (separate PR) |

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
- Test: the existing Playwright suite plus a line-count check.
