# usr-digital-platform-wireframe

Unofficial synthetic React/TypeScript wireframe of a public site and member area.
It is not an approved USR service or a production authorization system.

## Commands and gates

Use Node.js 22 (at least 22.12), npm and the committed lockfile.

| Task | Command |
| --- | --- |
| Install | `npm ci` |
| Develop on loopback | `npm run dev -- --host 127.0.0.1` |
| Civic dependency contract tests/check | `npm run check:civic` |
| Typecheck and production build | `npm run build` |
| Install browser engines | `npx --no-install playwright install chromium firefox webkit` |
| Complete local verification (POSIX shell) | `npm run verify` |
| Browser tests against development server | `npm test` |
| Browser tests against an existing build | `CI=1 npm test` |

`verify` builds once (including the Civic contract tests), then runs all existing
Playwright tests with `CI=1` against `dist/`, without reusing a running server.
Use free port 5187 or set `DEMO_PORT`. `DEMO_CHROMIUM` affects Chromium only;
Firefox and WebKit remain required. See [CONTRIBUTING.md](CONTRIBUTING.md) for
system-library/container setup, focused tests and report locations.

`.github/workflows/checks.yml` builds on the host and runs browsers in the pinned
Playwright container, once each. Aggregate status `verify` runs with `always()`
and accepts only a successful `demo-checks` job; skipped/cancelled/failed checks
are failures. The reusable workflow also gates Pages, whose deployment remains
separate in `pages.yml`. Branch-rule configuration is separate. PRs target `dev`;
agents must never merge or deploy, irrespective of credential privileges.

## Fixture, role and scope boundaries

- All member/community data is synthetic and shipped in the public static bundle,
  including examples hidden by UI roles. Never import real member records,
  credentials, political affiliation data, card details or internal API responses.
  Use fixed fictitious identities and `.example` contact addresses.
- `src/App.tsx` owns public hash routes and URL filters. Member flows live in
  `src/features/members/MemberDemo.tsx`; community fixtures in `resources.ts`,
  interactions in `ResourceHub.tsx`, and fictitious contacts/drafts in
  `PublicContacts.tsx`. Keep proposal copy distinct from operational capabilities.
- Member/community state stays in memory: reset, reload and leaving the area clear
  it. No storage, telemetry, remote fonts, API calls, real payments, votes, messages
  or social actions. Downloads remain synthetic local blobs. Existing explicit
  public reference links may leave the demo; do not turn them into background calls.
- `Simpatizant Model`, `Membru Model` and `Administrator Model` are demo personas,
  not authentication. Preserve supporter/member separation and direct-route
  restricted states. Internal affiliation examples need administrator persona
  plus explicit purpose confirmation; switching persona clears that access.
- Social profiles are private by default. Public affiliation requires separate,
  revocable opt-in. Public office is not political affiliation. Preserve consent
  withdrawal/reset and never imply that hiding static fixtures protects real data.
- Preserve `civic-scope civic-usr`, explicit CSS/theme imports and existing
  `--usr-*` tokens/local fonts. Inputs/selects need Field plus associated labels;
  overlays, focus and mobile table headers must remain accessible. Follow
  [the Civic adoption contract](src/components/civic/README.md).
- Civic UI remains pinned to the reviewed v0.5.0 public archive and integrity.
  An upgrade must update manifest, lock and reviewed contract expectations together;
  never substitute a sibling checkout or edit `node_modules`.
- `src/`, `scripts/` and `tests/` are sources; `dist/`, dependencies and `/tmp`
  browser reports are generated. Do not commit generated output or private screenshots.
- Inspect existing behavioral tests before adding coverage: member reset/network
  boundaries, privacy/role gates, synthetic downloads, Civic composition (including
  rejection fixtures), offline behavior and responsive layouts already have tests.
  Add a test only for a missing observable acceptance criterion.

## Contribution and delivery rules

- Work from fetched `origin/dev`; open a PR back to `dev`. Approved branch prefixes:
  `feat/`, `fix/`, `chore/`, `docs/`, `sec/`, `adr/`.
- In the maintainer workspace use `wt new <prefix/name> origin/dev`, which creates
  `<repo>/.worktrees/<prefix/name>`. Never edit the original checkout for a task or
  move worktrees manually; remove finished ones with `wt rm` / `wt gc`.
  Contributors without `wt` can use a separate clone and `git switch -c <prefix/name> origin/dev`.
- Use Conventional Commits: imperative, lower-case subject, no trailing full stop,
  at most 72 characters; one coherent change per commit. Explain why in the body
  only when needed; use `Refs: #N` / `Closes: #N` trailers for issue links.
- Agents must never merge PRs (including into `dev`), publish releases or deploy.
  This is an agent rule, not a claim that administrator credentials cannot do so.
- PR checks need no secrets, private handbook, 1Password or internal service.
  Publishing credentials are maintainer-only; never commit credentials.
- Never modify vendored third-party sources; fix tooling or upstream dependencies.
  Keep the MIT license and upstream notices. Verify before claiming completion.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for acceptance criteria and review evidence.
