# Implementation plan

This plan turns the prototype into a real product path. The repository remains an unofficial design exploration with synthetic data.

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
- people directory and profile
- positions library and position detail
- declarations viewer
- local data explorer
- money and subsidy transparency
- press room
- project/data inventory
- contact and participation routes

Use static rendering where possible. Keep hash or path-level shareability for every filter and screen.

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

1. Keep this prototype public and gather structural feedback.
2. Split the app into `data`, `components`, `screens` and `routing`.
3. Build static content models with synthetic fixtures.
4. Add browser accessibility checks and responsive screenshots.
5. Replace synthetic fixtures only after ownership, legal basis and source contracts are approved.
6. Add authentication and permissions only after the record model is stable.
7. Pilot one county, one policy area and one branch before scaling.

## 10. Success criteria

- A public visitor can find a person, position, local fact and meeting route in under one minute.
- A member can see what to do now, who owns the outcome and what material to use.
- A journalist can export a chart, CSV or permalink and see the source.
- A branch can see what data is missing and who must repair it.
- Every sensitive feature has a visible unresolved-question panel until governance is settled.
