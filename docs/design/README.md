# Design screens — target state

Static, self-contained mockups for the three screens that matter most in the wireframe. They
exist so an implementation session can build against them without re-deriving layout from
`docs/ux-guidelines.md`. Open each file directly in a browser; there are no external requests.

Status: **Prototip** / **Date demonstrative**. Every value in the mockups comes from the
current source (`src/data/content.ts`, `src/data/officials.ts`, `src/features/members/MemberDemo.tsx`)
or is a visible placeholder "—". No USR logo, no real names, no invented figures. Romanian copy
in the mockups was written by an agent: **needs human review**.

Token values are copied inline from `src/tokens.css` (civic-ui `usr` theme, extracted
2026-09-08): navy `#002A59`, red `#FF0021`, muted text `#4C698A` (4.5:1+ on white), lines
`#B2BFCD` / `#7F94AC`, chart fill `#6C8CC7`, 4/8/12/16/24/32/48 px spacing, 13–36 px type scale.

Before-screenshots: the live site is at
<https://cristiannichifor.github.io/usr-digital-platform-wireframe/>. PNG captures of the mockups
and of the live site were **not** produced in this round (no browser runs allowed on the fleet
laptop); see "Needs human" below.

## Index

| # | Screen | User task | Guideline sections | Changes vs today | File |
| --- | --- | --- | --- | --- | --- |
| 01 | Public homepage (`#/`) | Visitor reads the lead story, scans news, finds a representative, sees how to get involved | ux-guidelines §1, §2, §3, §5, §7 | Adds a status badge (Prototip · Date demonstrative) to the banner; adds a provenance line under the lead; "Oameni" block shows data gaps as chips with text, not colour; explicit loading/empty/error states; footer gains a data-limits/privacy link (backlog item) | `screens/01-homepage.html` |
| 02 | Member dashboard (`#/membri`) | Member reaches dues, next assembly and pending votes from one grouped navigation; supporter sees only open sections | ux-guidelines §2, §5, §6, §7; spec USR-12, USR-13 | Grouped nav Eu / Filială / Resurse with `aria-current`; summary cards are links with text status chips; dues table gets a caption with provenance; amounts in lei (`30 lei`, not `30 RON`); staged processing, empty and error+retry states shown; 390 px uses a "Secțiune" select with optgroups | `screens/02-member-dashboard.html` |
| 03 | Mobile header and menu (390 px) + desktop header reference | Visitor opens the section menu, reaches Membri / Donează without opening it, closes with Escape or a choice | ux-guidelines §6; spec USR-9, USR-11, USR-14 | Menu items ≥ 44 px, Înscriere pinned inside the menu as a full-width button, toggle label switches Meniu/Închide with `aria-expanded`, content behind the open menu is dimmed and `aria-hidden`; header stays ≤ 140 px | `screens/03-mobile-menu.html` |

Each file shows the desktop (1440 px) frame and the mobile (390 px) frame side by side, as
fixed-width frames (no media query needed to compare them).

## Implementation notes

- Keep the persistent banner (`role="note"`) as the family bar replacement; the badge is
  decorative text, not an image.
- Provenance lines use the existing `sursă: … · verificat: …` pattern at 13 px, regular weight,
  `#4C698A` (USR-13).
- Status chips carry a glyph and text (`✓ Achitată`, `◷ Neachitată`, `! eroare`) so colour is
  never the only carrier (ux-guidelines §4, §6).
- Error states use `role="alert"` and a "Reîncearcă" button; confirmations use `role="status"`.
- The "Secțiune" select at 390 px uses `<optgroup>` per nav group, matching the desktop groups.
- Currency: `lei` after the number with a space, ro-RO formatting (`30 lei`); the current
  `30 RON` strings in `MemberDemo.tsx` should follow ux-guidelines §3.
- Do not add JavaScript frameworks or external fonts to the mockups; Aileron falls back to Arial.

## Acceptance criteria (for tests)

These are recorded as USR-17 to USR-19 in `docs/specs/production-readiness.md`.

- USR-17 Homepage status and provenance: given `#/`, the banner shows the status vocabulary
  "Prototip" and "Date demonstrative"; the lead story has a `sursă:` line; the Oameni block marks
  a missing CV with text, not only colour; the footer has a privacy / data-limits link.
- USR-18 Member dashboard amounts and chips: given `#/membri`, amounts read `30 lei`; the
  summary cards are links; dues statuses are text chips; the dues table has a caption with
  provenance; the simulated payment failure shows `role="alert"` with "Reîncearcă".
- USR-19 Mobile menu: given 390 px with the menu open, the toggle reads "Închide" with
  `aria-expanded="true"`, each menu link is ≥ 44 px tall, Înscriere is inside the menu, Escape
  closes it and returns focus to the toggle; the header is ≤ 140 px closed.

## Implementation status (2026-10-14)

| Criterion | State | Landed in |
| --- | --- | --- |
| USR-17 banner status words, lead `sursă:` line, CV gaps as text | done | #31 |
| USR-17 footer privacy / data-limits link | done | #29 (USR-20) |
| USR-18 amounts in lei | done | #30 |
| USR-18 status chips with glyph and text, dues table source line | done | #32 |
| USR-18 summary cards are links, payment failure is `role="alert"` with "Reîncearcă" | already true before this round | — |
| USR-19 toggle reads "Închide" when open, Escape returns focus to it | done | #34 |
| USR-19 menu links ≥ 44 px tall | done | #36 |
| Screen 03 content behind the open menu dimmed and `aria-hidden` (USR-23) | done | this PR |
| Screen 03 Înscriere pinned as a full-width button in the menu (USR-23) | done | this PR |
| PNG captures of the mockups and the live site | open: no browser runs allowed on the fleet laptop | — |

Tests: `tests/homepage-status.spec.ts`, `tests/footer.spec.ts`, `tests/member-currency.spec.ts`,
`tests/member-chips.spec.ts`, `tests/mobile-menu.spec.ts`, `tests/menu-rows.spec.ts`,
`tests/menu-backdrop.spec.ts`.

## Needs human

- Review the Romanian copy in the three mockups.
- Produce PNG captures (1440 and 390) of each mockup and of the live site once a browser run is
  allowed: `npx -y playwright screenshot --full-page --viewport-size=1440,900 <file> <out.png>`.
- Decide whether the footer privacy link points to a new `#/confidentialitate` route or to the
  README section on data limits.
