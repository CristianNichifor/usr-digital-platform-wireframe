# Implementation plan

This plan turns the prototype into a real product path. The repository remains an unofficial design exploration with synthetic data. The companion decision memo is [`PROPOSAL_MEMO.md`](PROPOSAL_MEMO.md).

## 0. Current usr.ro synthesis

Audit date: 2026-09-08. The current public site structure should be preserved where users already understand it:

- Top-level behavior: `USR la Guvernare`, `Despre Noi`, `Știri`, `Înscriere`, `Donează`, search.
- Homepage blocks: news, donation CTA, newsletter, `Hai în USR!`, cards for people, government, organization and contact.
- Trust/legal links: `Statut`, `Solicitări 544`, `Mandatari financiari`, `Contact`, `Cariere`.

The redesign should not discard this IA. It should add an evidence layer beneath it: source, owner, verified date, limitation, status, permalink and next action.

## 1. Product scope

Build a rebuilt public party site with a member area layered on the same records.

- Public users see people, positions, declarations, local data, money, press assets and participation routes.
- Members see extra branch context, tasks, internal materials and opt-in colleague discovery.
- Bureau users see restricted placeholders only after a real permission model exists.
- The top navigation stays small: `Oameni`, `Ce propunem`, `Implică-te`.

## 2. Canonical records

Define one source record for each major object:

- elected official
- branch
- position
- declaration
- local authority
- financial entry
- member task
- press asset

Each record needs owner, source, last verified date, visibility level, limitation and audit trail.

## 3. Data provenance

Adopt the reusable pattern from the public policy repos:

- every number carries source and verified date;
- every derived value carries confidence and limitation;
- missing data is displayed plainly;
- primary documents govern over extracted fields;
- generated summaries never replace the source record.

## 4. Repo integration

Use these repos as inputs or linked modules:

- `romania-reforms`: shared provenance vocabulary and public reform index.
- `administrative-reform-simulator`: UAT/SIRUTA, administrative reform methodology and map-linked scenarios.
- `public-pay-simulator`: law-as-data pattern, salary regime examples and policy methodology.
- `legislativ`: internal legislative checks before publication.
- `achizitii-deschise`: procurement aggregates, unit-price methodology and risk-indicator pattern.

Do not absorb simulator brands into the party site. Link out where the project must keep its neutral identity.

## 5. Public site build

Create production-grade routes for:

- homepage
- news as evidence-backed dossiers
- government record / ministers / prefectures
- public-interest verification dossiers
- people directory and profile
- positions library and position detail
- declarations viewer
- local data explorer
- money and subsidy transparency
- press room
- project/data inventory
- contact and participation routes

Use static rendering where possible. Keep hash or path-level shareability for every filter and screen.

## 5a. Anti-corruption and media-blockade layer

The public-interest route must use careful status language:

- `indicator de risc`, not accusation;
- primary document and method before conclusion;
- visible missing answers;
- right-of-reply slot;
- press pack: chart, CSV, timeline, contact;
- member task: verify local source, ask institution, prepare meeting question.

This is how the party extracts value from difficult media conditions: it makes each case reusable by press, branches, elected officials and members without depending on automatic amplification.

## 6. Member area

Build member workflows around verbs:

- verify a source;
- prepare a local meeting;
- assemble a field pack;
- copy and adapt a message;
- document a HCL vote;
- escalate a local issue to the right elected official.

No auto-posting. No OAuth to social platforms. No coordinated identical posting.

## 7. Permissions and GDPR

Before real member data:

- document lawful basis for each internal field;
- make colleague directory opt-in only;
- separate statutory register access from member directory publication;
- log sensitive views;
- model public, member and bureau visibility in code and data.

## 8. Operations

Assign maintainers for every data source:

- editorial owner;
- technical owner;
- data-quality owner;
- legal/GDPR reviewer;
- branch owner where local data is involved.

Define refresh cadence, failure state, correction process and escalation path.

## 9. Delivery sequence

1. Preserve the current public entry points and CTA language.
2. Convert news, government, people, donation and contact blocks into record-backed screens.
3. Add public-interest verification dossiers with cautious legal framing.
4. Split the app into `data`, `components`, `screens` and `routing`.
5. Add browser accessibility checks and responsive screenshots.
6. Replace synthetic fixtures only after ownership, legal basis and source contracts are approved.
7. Add authentication and permissions only after the record model is stable.
8. Pilot one county, one policy area and one branch before scaling.

## 10. Success criteria

- A public visitor can find a person, position, local fact and meeting route in under one minute.
- A member can see what to do now, who owns the outcome and what material to use.
- A journalist can export a chart, CSV or permalink and see the source.
- A branch can see what data is missing and who must repair it.
- Every sensitive feature has a visible unresolved-question panel until governance is settled.
