# Machetă rebuilt usr.ro

Aceasta este o machetă neoficială, neafiliată și construită cu date sintetice. Nu folosește date reale, persoane reale, backend, login, analytics, formulare care trimit date sau sigle USR.

Scopul proiectului este să facă o discuție structurală concretă despre un site public usr.ro reconstruit, cu o zonă de membri pusă peste aceleași înregistrări canonice. O persoană aleasă este un singur record, randat în trei vizibilități: PUBLIC, MEMBRU și BIROU.

A fost construită de un membru pentru a transforma un argument structural într-un prototip clicabil.

Directorul `/brand` nu a fost prezent în workspace. La cerere, valorile de temă au fost verificate pe `usr.ro` și extrase din fișiere publice livrate de site, mai ales CSS-ul Next/Tailwind. Aceasta nu este o copie a unui manual formal de identitate. Este o mapare tehnică după surse publice.

Toate valorile de culoare, tipografie și spațiere care țin de temă sunt izolate în `src/tokens.css`. Componentele nu conțin valori hex hardcodate. Macheta folosește o marcă neutră `MP`, nu logo-ul USR.

## Rulare

```bash
npm install
npm run dev
```

Build static pentru GitHub Pages:

```bash
npm run build
```

Vite este configurat cu `base: './'`, iar navigarea folosește hash routes, deci ecranele rămân shareable într-un build static.

Planul de implementare este în [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md).

## Ecrane

- `#/` index
- `#/oameni` director aleși cu filtre și lipsuri afișate
- `#/oameni/consilier-model?view=public` record canonic în vedere PUBLIC
- `#/oameni/consilier-model?view=membru` același record în vedere MEMBRU
- `#/oameni/consilier-model?view=birou` același record în vedere BIROU
- `#/ce-propunem` bibliotecă poziții și revizii
- `#/declaratii` scan, câmpuri structurate și diff anual
- `#/date-locale` date locale cu buget, HCL, UAT și exporturi
- `#/implica-te` zonă de membri cu sarcini, fapte de azi și director opt-in
- `#/bani` subvenții, prag de 32% către filiale și cheltuieli centrale
- `#/presa` sală de presă cu contacte, active și dosare de date
- `#/proiecte-date` inventar al repo-urilor publice care pot alimenta site-ul
- `#/strategie` beneficii, avantaj strategic și organizare online/teren
- `#/arhitectura` conectori simulați, direcții, cadențe și verificări
- `#/nota` decizii structurale, cost de produs real și articole din Statut

## Convenții

Toate cifrele, datele și valorile sintetice sunt marcate vizibil în interfață cu italic și culoare de token. Fiecare valoare are sursă și dată de verificare lângă ea. Bannerul persistent spune explicit: „MACHETĂ NEOFICIALĂ — date fictive. Fără aprobarea USR.”

Unde nu există integrare live, ecranul arată un mockup de produs de date: ce câmpuri ar exista, cine le-ar menține, ce export ar fi disponibil și ce limitare trebuie afișată. Mockup-ul nu pretinde că acele date există.

Roșul extras din `usr.ro` nu este folosit ca text normal pe fundal albastru sau alb, deoarece contrastul nu trece pragul WCAG AA pentru text obișnuit. În machetă este folosit doar ca accent non-text.

Modelul de partajare nu include auto-postare, OAuth sau publicare coordonată identică. `Fapte de azi` oferă text editabil, copiere în clipboard și link de tip share-intent care deschide composerul platformei. Membrul editează și publică manual.

Articolele din ecranul `#/nota` sunt raportate la Statutul public de pe `usr.ro/statut`, amendat în 24.11.2022. În această versiune publică, publicarea numelor și CV-urilor aleșilor apare la art. 87(1), declarațiile apar la art. 82, iar pragul de minimum 32% către filiale apare la art. 86(2), raportat la art. 84 lit. d. Art. 7(3) descrie registrul statutar al membrilor ca evidență confidențială; nu este temei pentru directorul opt-in între colegi.

## Date din repo-uri publice

Repo-urile `CristianNichifor` verificate pe GitHub sunt folosite în machetă ca surse de structură, nu ca backend și nu ca date operative live.

- `romania-reforms`: vocabular de proveniență, limitări, confidence și index de simulatoare.
- `administrative-reform-simulator`: structură UAT/SIRUTA, metodologie deterministă, bugete și hărți ca link extern.
- `public-pay-simulator`: regimuri salariale JSON, crosswalk-uri, rapoarte de import și modelul „legea ca date”.
- `legislativ`: obligații neîndeplinite, terminologie, contradicții și verificări interne pentru proiecte normative.
- `achizitii-deschise`: prețuri unitare, agregate pe județ, indicatori de risc și metodologia pentru drept la replică.

## Avantaj strategic

Integrarea cu repo-urile utile ar putea da partidului un avantaj prin timp mai scurt între analiză și material public, mesaje mai ușor de verificat, sarcini mai clare pentru membri, sprijin mai bun pentru aleși și materiale locale pregătite pentru teren. Relația cu electoratul devine bidirecțională: oamenii găsesc persoana, poziția și întâlnirea relevante; partidul vede unde lipsesc explicații, date sau prezență locală.

## Surse de brand verificate

- `https://usr.ro/`
- `https://usr.ro/_next/static/chunks/b403e873072364dd.css`
- `https://usr.ro/statut/`

## Surse GitHub verificate

- `https://github.com/CristianNichifor/romania-reforms`
- `https://github.com/CristianNichifor/administrative-reform-simulator`
- `https://github.com/CristianNichifor/public-pay-simulator`
- `https://github.com/CristianNichifor/legislativ`
- `https://github.com/CristianNichifor/achizitii-deschise`
