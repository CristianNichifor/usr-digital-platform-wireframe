# Contributing

Read [AGENTS.md](AGENTS.md) for the source boundaries and invariants. Development
and PR checks use only public dependencies; no private handbook, account,
1Password setup or publishing credentials are required. The code is MIT-licensed
under [LICENSE](LICENSE); preserve existing third-party notices and asset terms.

## Start a change

Fetch `origin/dev` and create a branch with `feat/`, `fix/`, `chore/`, `docs/`,
`sec/` or `adr/`. In the maintainer workspace:

```bash
git fetch origin dev
wt new chore/my-change origin/dev
cd .worktrees/chore/my-change
```

Worktrees always live at `<repo>/.worktrees/<name>`; never move them by hand.
Use `wt rm` / `wt gc` when finished. Without `wt`, clone separately:

```bash
git clone https://github.com/CristianNichifor/usr-digital-platform-wireframe.git
cd usr-digital-platform-wireframe
git fetch origin dev
git switch -c chore/my-change origin/dev
```

For an external contribution, push the branch to your fork and open a PR against
this repository's `dev`. Preserve unrelated work. Use one coherent change per
Conventional Commit, with an imperative lower-case subject of at most 72
characters and no trailing full stop. Link issues with `Refs: #N` or `Closes: #N`
trailers. Agents must never merge PRs, publish releases or deploy; a maintainer
reviews and performs those actions separately.

## Setup and complete verification

Use Node.js 22 (at least 22.12) and npm, matching CI. Initial installation uses the
public npm registry and the pinned Civic UI GitHub release, with no account needed.

```bash
npm ci
npx --no-install playwright install chromium firefox webkit
npm run verify
```

`npm run verify` uses a POSIX shell: it builds once (`check:civic`, TypeScript and
Vite), then runs all Playwright tests with `CI=1` against that production build.
It starts a fresh loopback preview, without reusing a dev server. Keep port 5187
free or set `DEMO_PORT`. On other shells, run `npm run build`, set `CI=1` using
your shell's environment syntax, then run `npm test`.

For systems lacking compatible browser libraries, use Docker for browsers as CI
does (the build runs on the host). This is equivalent to the full verification:

```bash
npm run build
docker run --rm --ipc=host -e CI=1 -v "$PWD:/work" -v /tmp:/tmp -w /work \
  mcr.microsoft.com/playwright:v1.63.0-noble npm test
```

Keep the container image aligned with locked `@playwright/test`. For a focused
iteration after a build: `CI=1 npm test -- tests/privacy-contacts.spec.ts --project=chromium`.
Final evidence must include Chromium, Firefox and WebKit. `DEMO_CHROMIUM` only
changes Chromium's executable. A plain `npm test` starts/reuses the development
server instead; it does not establish production-build parity.

Use `npm run dev -- --host 127.0.0.1` for local exploration. The unqualified dev
command binds all interfaces. Routes use hashes (`/#/membri`, `/#/comunitate`)
and the production base is relative. Browser results/traces are in
`/tmp/usr-member-demo-tests`, the CI HTML report in `/tmp/usr-member-demo-report`,
and route screenshots in `/tmp/usr-member-*.png`; none are source files. CI retains
these reports for seven days. Do not run concurrent suites sharing these paths.

## Define acceptance criteria and preserve the demo boundary

In the issue or PR specify the route, fictitious persona, initial state, interaction
and expected result, including reset/reload and restricted/empty/error states when
relevant. Inspect existing tests before adding one; the current suites cover role
changes, consent, synthetic exports, no storage/network, Civic composition,
keyboard behavior and responsive layouts. Add coverage for a missing observable
behavior, not a count or snapshot of source declarations.

All member/community examples must remain synthetic, local and memory-only.
Use fixed fictitious identities and `.example` contact addresses. Persona switching
is presentation, not authentication; hidden data is still in the public bundle.
Administrator history needs a purpose confirmation which clears on persona change.
Affiliation publication requires separate revocable consent. Never add real
payments, messages, votes, private data or infrastructure access. Read the full
[fixture and role invariants](AGENTS.md#fixture-role-and-scope-boundaries).

Preserve scoped Civic controls, Field/label associations and host-owned USR tokens.
See [Civic adoption](src/components/civic/README.md) before changing composition or
its reviewed v0.5.0 dependency. Do not edit built `dist/` or installed dependencies.

Describe the change and why in the PR, link issues, list exact commands/results and
add before/after screenshots for changed UI at relevant widths (320, 390, 1440).
Include persona/route and keyboard/reset evidence where applicable. Redact nothing
by substituting real data: capture only synthetic examples. Record failures and
limits; browser checks do not certify authorization or accessibility compliance.

## CI and delivery

[Demo checks](.github/workflows/checks.yml) runs the existing dependency-contract,
build and three-engine browser checks once. Aggregate status `verify` runs with
`always()` and requires `demo-checks` success; failed, skipped or cancelled work
cannot pass. The host/container split avoids rebuilding inside the browser image.
PR checks work on forks without secrets. Required branch checks are configured
separately by maintainers. [Pages](.github/workflows/pages.yml) reuses the same
checks before its separate deployment job. Passing CI is not permission for an
agent to merge or deploy.
