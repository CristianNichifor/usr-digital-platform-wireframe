# Civic UI Adoption

The demo uses [Civic UI v0.2.0](https://github.com/CristianNichifor/civic-ui/releases/tag/v0.2.0). The root package manifest pins its GitHub release tarball and the lockfile records its integrity. No npm account or local filesystem dependency is needed.

Shared styles and the USR adapter are loaded at the application root within a `civic-scope civic-usr` boundary. Existing narrow scope wrappers remain composition boundaries. The adapter uses this demo's existing `--usr-*` tokens and fonts. No new palette or brand assets are loaded.

## Completed Inventory

| Surface | Shared components |
| --- | --- |
| Public people search and static contact form | Field, Input, NativeSelect, Textarea, Button |
| Member persona, payments and calendar | Field, NativeSelect, Button, IconButton, Table |
| Document library | Field, Input, NativeSelect, Checkbox, Notice, Button, EmptyState |
| Participation and profile preferences | RadioGroup, Checkbox, Button |
| Resources and feedback | Field, Input, NativeSelect, Checkbox, Notice, EmptyState, Button, IconButton |
| Social directory, following, affiliation and visibility | Field, NativeSelect, Checkbox, Button |
| Projects and design downloads | Field, NativeSelect, Button |
| Fictional public contacts and draft review | Field, Input, NativeSelect, Button, IconButton |
| Six public reporting/inventory tables | Table, original captions and distinct scroll-region labels |

There are no direct native button, input, select, textarea or table elements left in application TSX. The obsolete Select wrapper and its arrow/padding CSS are removed. Every Input and NativeSelect is composed with Field, as required by v0.2 control styling.

## Intentional Local Behavior

- Hash navigation and URL filters remain links, not action buttons or in-memory tabs.
- Participation categories remain an aria-pressed button group: they filter one list rather than own separate tab panels.
- Native details/summary remain disclosure controls. Domain-specific lists, media previews and template graphics remain local.
- Public tables retain data-label cells and mobile stacked layouts. Member payment history retains a horizontally scrollable table. No sorting, pagination or records were added.
- Inline payment, response and contact reviews remain inline, not dialogs.
- The public contact form remains static: its simulation button sends nothing and stores nothing. Member actions, social following, consent, access scenarios and downloads remain synthetic and memory-only.

State, routes, consent defaults, explicit affiliation opt-in, reset behavior and fixtures remain owned by the demo. No authentication, persistence, real social activity or infrastructure integration was introduced.

## Verification

All 25 Playwright tests run in Chromium, Firefox and WebKit (75 executions). Coverage includes member/supporter routes, filtering, review/cancel/confirm, radio keyboard selection, consent withdrawal/reset, synthetic downloads, retry states, branding, focus, hover contrast and select arrow padding.

The completion suite checks offline static contact behavior, shareable people search and public contact/people/table layouts at 320, 390 and 1440 pixels. Public tables retain visible captions and mobile cell labels. Existing tests cover document access restrictions, fictional contact drafts and absence of storage/external requests in representative workflows.

These checks are not a full accessibility or security audit. WebKit is not certification for Safari or iOS. See the root README for commands, CI environment and artifact paths.

Package SHA-256: `9a78cb63fd9885febc5aa94eefbb3647f7dd5841fda5e7a6b2e78192b3d0c802`. The dependency's MIT license and upstream notices remain in the release package; this does not license unrelated demo assets. No new dependency version or library release was required.
