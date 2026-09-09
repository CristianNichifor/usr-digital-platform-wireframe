# Demo maintenance plan

This repository is a standalone presentation alternative. Implementation means synthetic screens and local interactions, not production services or integration with internal infrastructure.

The earlier production-oriented plan is superseded by this document. See [MEMBER_AREA_PLAN.md](MEMBER_AREA_PLAN.md) for the member-workspace design and [README.md](README.md) for current functionality and commands.

## Scope

- Keep the public pages and member workspace navigable on a static host.
- Use fictional records for member services and clearly identify simulated actions.
- Keep credentials, private records, authentication, real payments and real voting outside the repository.
- Use observations of existing services only as design references.
- Treat external links as references, not data connections.

## Current implementation

- React, TypeScript and Vite with hash-based navigation.
- Public presentation pages in `src/App.tsx`.
- A member workspace in `src/features/members/MemberDemo.tsx`, available through `#/membri` and the `#/implica-te` alias.
- Shared select controls, local font files and theme tokens.
- In-memory member state with reset; fictional document and calendar downloads.
- Browser checks for member journeys, selected control styles and mobile/desktop overflow.

## Change workflow

1. Describe the proposed screen or interaction and identify which details are observed versus invented for presentation.
2. Implement the smallest useful change using synthetic fixtures and existing components.
3. Run `npm run build` and the browser checks appropriate to the change.
4. Review screenshots when layout changes and confirm that demo actions do not send private data externally.
5. Open a pull request for manual review and merge.

The reusable [checks workflow](.github/workflows/checks.yml) installs dependencies, builds the site and runs Playwright against the static build. It runs for pull requests and is also called by the Pages workflow before deployment. Test reports and screenshots are retained as workflow artifacts for seven days.

Automatic checks do not enforce a merge policy by themselves; required status checks depend on repository branch rules.

## Remaining optional improvements

- Expand browser coverage beyond member workflows to the public pages.
- Perform a broader keyboard and accessibility review.
- Validate presentation journeys with reviewers and revise confusing labels.
- Keep proposal text distinct from implemented behavior as screens evolve.

These are possible follow-ups, not prerequisites for connecting to a live service. Infrastructure integration is out of scope.
