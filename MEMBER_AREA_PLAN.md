# Member area review and implementation plan

Date: 2026-09-09. Scope: member administration, navigation and usability.
Status: core presentation workflows implemented locally. All prototype records remain synthetic.

Community extension: `#/comunitate` opens supporter access to resources, social profiles, public institutional contact examples, design assets and collaborative project examples. Member status is not required for these sections. Public social visibility and declared affiliation have separate, reversible opt-ins. Internal affiliation examples require the administrator persona and purpose confirmation; changing persona clears access. These are UI simulations: all fixtures remain in the static bundle, not behind real authorization. Contact examples use `.example` addresses and downloadable individual drafts without sending. UI and design exports share USR theme tokens and local Aileron. The test suite now has 11 tests, including supporter access, privacy controls, contact drafts, brand tokens and synthetic downloads. No real social account, article, repository or private profile is connected.

Implemented: member overview/navigation, dues simulation with result states, event list/detail and calendar export, searchable document examples, participation selection/review/confirmation, organization, media empty states and fictional transcript, opt-in settings and reset. Four browser tests cover core workflows, selected control styles, external requests and desktop/mobile overflow. The shared CI workflow runs the build and browser checks on pull requests and before Pages deployment. No private records or credentials were copied into the demo.

Remaining presentation refinements: filters currently persist across member navigation in memory, not reload; media intentionally has no playable recording; stakeholder walkthroughs and a full accessibility audit remain future review work. The phase estimates below describe the original proposal, not a measured completion time.

Scope clarified by the user: this repository is a standalone presentation alternative with no access to internal infrastructure. Access to e-USR is exclusively for observing existing workflows and learning what the proposed experience should improve. Implementation means building demonstrable screens and local interactions, not connecting this repository to e-USR. This scope supersedes production and integration assumptions in the earlier IMPLEMENTATION_PLAN.md for this work.

## Evidence and limits

- An authorized login to https://e-usr.ro/#/ succeeded during this session. Its navigation exposes events, dues, three donation destinations, financial activity, documents, archived/live video, organization structure, internal elections, debates and member consultations.
- The public wireframe homepage and #/implica-te were inspected in a browser. The local React source and existing IMPLEMENTATION_PLAN.md were reviewed; the worktree was clean before this document was added.
- Later credential reads failed, including the retry for this review. Internal detail screens, permissions, APIs, payment behavior, election mechanics and administrative roles have NOT been verified. Navigation presence establishes a module, not its behavior or quality.
- No credentials, session cookies or member records are included here. No internal forms were submitted except login.

## Findings

| Priority | Evidence | Proposed improvement |
| --- | --- | --- |
| P2 | Member view is explicitly simulated; activeView in src/App.tsx derives visibility from a URL parameter. | Keep simulated role switching so reviewers can explore alternative views. This is appropriate for synthetic data and is not an authentication defect in this demo. |
| P1 | MemberZoneScreen defaults consent to yes unless the URL says no. | Default directory visibility to off. Demonstrate an explicit settings control, confirmation and a reversible local preference. |
| P1 | e-USR has dues and financial activity; the member screen has neither. | Add personal dues summary, period history and clear payment states. Keep personal finances separate from public financial reports. |
| P1 | e-USR has elections and consultations; neither has a dedicated wireframe route. | Add deadline/status lists and synthetic participation flows; identify proposed behavior rather than assuming existing eligibility or voting rules. |
| P1 | Public participation and the simulated member workspace share /implica-te. | Give members a dedicated /membri home and navigation; preserve the old entry point as a link to it. |
| P2 | Calendar/documents are represented only by a next-meeting preview and two minutes entries. | Add calendar list/detail and searchable document list/detail with date, organization scope, type and owner. |
| P2 | Organization structure, debates and media appear in e-USR navigation but lack equivalent member modules. | Provide representative screens with fictional records and local interactions. |
| P2 | Directory preference and edited text are encoded in the member URL. | Use local state for simulated preferences and drafts, and keep useful filters shareable. Add a reset so presentations start consistently. |
| P2 | The member screen includes repository inventories, implementation explanations and unresolved design questions. | Move review material to documentation or a separate prototype notes view; keep the member workspace focused on services. |
| P2 | All screens, fixtures, routing and many helpers live in src/App.tsx; package.json has no test script. | Extract the member area incrementally and add focused navigation, state and accessibility checks. |

These are findings about the presentation alternative, not claims that the existing e-USR implementation has these defects.

## Proposed navigation

Public navigation remains available. Add a clearly named member entry and a distinct member layout:

- /membri: overview of dues status, upcoming events and pending consultations, with direct links.
- /membri/cotizatii: personal balance and history.
- /membri/calendar and /membri/calendar/:id: events and details.
- /membri/documente and /membri/documente/:id: documents and metadata.
- /membri/participare: separate elections, consultations and debates tabs.
- /membri/organizatie: branch structure and role contacts.
- /membri/media: recorded and live media.
- /membri/setari: profile and directory visibility.

Keep donations explicitly labeled by destination. Do not equate dues, donations and financial reports. Whether all three current donation destinations belong in primary navigation requires validation with users.

## Delivery plan

Effort ranges are engineering days for one developer with an available reviewer. They are estimates for the synthetic wireframe, not production commitments. Each phase should be a reviewable PR; merges remain manual.

### 0. Learn existing workflows and define the presentation (1-2 days)

- Walk through existing services with a member and an administrator once access is available. Record screens, states and permissions without copying personal records.
- For each service record what was observed, what appears worth preserving and what the alternative proposes to improve. Mark unobserved behavior as a design assumption.
- Define presentation scenarios: finding dues, exploring an event, locating a document, completing a fictional consultation and changing directory visibility.
- Resolve the current plan's conflicting navigation descriptions. Define public, member and administrator views using fictional personas, with no real login.

Exit: a service inventory, prioritized screen list and demonstration script. Incomplete internal access need not block synthetic design work.

### 1. Member layout and settings (2-3 days)

- Extract member screens and fixtures into src/features/members; extract the shared hash router only as needed. Keep GitHub Pages deployment working.
- Add MemberLayout, member navigation, overview and settings with synthetic fixtures.
- Make directory visibility off by default; model save failure and cancellation. Use local demo state, with an explicit reset.
- Preserve public routes and the existing /implica-te entry. Define mobile navigation and visible keyboard focus.

Exit: every new route works via direct URL, reload and browser back; all member services are discoverable; a fresh demo profile is absent from the directory.

### 2. Dues workflow (2-3 days)

- Add synthetic DuesSummary and DuesEntry records using integer minor units and explicit currency.
- Build summary, history, period filtering and detail views with current, overdue, pending, failed and unavailable examples; document these as proposed states where not observed.
- Demonstrate payment selection, review and a simulated result entirely within the demo. Do not collect card details or navigate to a live payment service.

Exit: a reviewer can find the outstanding amount, the period it covers and the next action; pending is never shown as paid.

### 3. Events and documents (3-4 days)

- Add synthetic Event and DocumentMetadata records; implement list/detail, search, filters and empty/error states.
- Display event time zone, cancellation state, organizer and location. Add a working calendar export using a maintained iCalendar library when this slice is implemented.
- Provide document type, date, organization scope and access state. Downloads must open a real synthetic sample or be explicitly unavailable.

Exit: a member can find an upcoming event and a meeting document; filters survive reload; expired/restricted links have useful states.

### 4. Participation and remaining services (2-3 days)

- Build election/consultation/debate lists with fictional details and local participation interactions.
- Distinguish not started, open, closed, unavailable and unknown eligibility. These are proposed display states, not inferred e-USR rules.
- Add organization and media entry points; show ownership and availability where known.
- Demonstrate selection, review and confirmation using fictional choices and local state. Any results are fixtures; no real ballot, identity check or election tally is involved. Include a reset for repeated presentations.

Exit: reviewers can follow a complete fictional participation journey, with a clear demo indicator and reset.

### 5. Verification and handover (1-2 days)

- Run npm run build and focused browser tests for direct routes, back navigation, filters, consent defaults and failure states.
- Check keyboard navigation, labels, focus, contrast and layouts at 390px and 1440px. Verify screenshots for overflow and overlapping controls.
- Check that each visible member-service action works locally with fixtures or is explicitly unavailable. No workflow depends on internal infrastructure or a real account.
- Ask representative users to locate dues, an event, a document and a consultation without guidance; record completion and confusion. Initial target: each task within one minute, to be revised after baseline observation.

Exit: reviewed desktop/mobile flows and a prioritized follow-up list.

Initial estimate: 11-17 engineering days for the described presentation scope, subject to review after choosing screen depth. Internal access is useful for learning but is not an implementation dependency. Ship phase 1 first for early feedback.

## Presentation completion criteria

- The demo runs on GitHub Pages without e-USR access, credentials, APIs or SSO.
- All people, financial entries, documents, participation choices and results are synthetic.
- Each core journey has enough local interaction to demonstrate the proposed improvement, including relevant empty, error and confirmation states.
- Reviewers can switch fictional personas and reset the demonstration without changing any external system.
- Documentation distinguishes observed e-USR features from proposed alternatives and unverified assumptions.
- No infrastructure integration, production migration, backend authorization, real payments or voting services are in scope. PRs remain subject to manual review and merge.
