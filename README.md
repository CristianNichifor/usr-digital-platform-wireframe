# USR Digital Platform Wireframe

Prototip neoficial pentru prezentarea unei alternative de site public și zonă de membri. Aplicația este un frontend static construit cu React, TypeScript și Vite. Nu este un serviciu USR aprobat și nu este conectată la infrastructura internă.

[Deschide demo-ul](https://cristiannichifor.github.io/usr-digital-platform-wireframe/#/) · [Zona membrilor](https://cristiannichifor.github.io/usr-digital-platform-wireframe/#/membri)

Comunitatea este accesibilă prin `#/comunitate`, fără calitatea de membru. Profilul demonstrativ de simpatizant are acces la resurse, director social, contacte instituționale fictive, design, proiecte și propriile profiluri sociale. Cotizațiile și celelalte ecrane interne rămân separate în demonstrație; schimbarea rolului nu este autentificare reală.

## Ce include

| Zonă | Conținut |
| --- | --- |
| Pagini publice | Știri, oameni, guvernare, verificări, propuneri, declarații, date locale și bani |
| Participare publică | Organizare, contact, înscriere, donații și sală de presă |
| Cotizații | Istoric fictiv și simularea unei plăți cu rezultat selectabil |
| Calendar | Evenimente fictive, participare simulată și export `.ics` |
| Documente | Căutare, filtrare, detalii și descărcarea unor exemple text sintetice |
| Participare internă | Alegeri și consultări fictive cu selecție, revizuire și confirmare; exemplu de dezbatere închisă |
| Organizație și profil | Roluri fictive, vizibilitate în director dezactivată implicit și salvare simulată |
| Media | Stări fără transmisie sau înregistrare video și o transcriere fictivă |
| Resurse | Materiale centrale/locale și articole fictive, filtre, salvare, aprecieri și comentarii locale, copiere și descărcare |
| Director social | Facebook, grupuri Facebook, Instagram, LinkedIn, GitHub, X, TikTok și YouTube; urmărire auto-declarată |
| Profiluri sociale | Identități fictive, ascunse implicit; opțiuni de vizibilitate publică sau pentru colegi |
| Contacte publice | Funcții locale, județene, naționale și europene fictive; filtre, detalii, adrese `.example` și descărcarea unei solicitări individuale fictive, fără trimitere |
| Design | Șabloane SVG editabile și tokenuri JSON sintetice, cu versiune și condiții de utilizare |
| Proiecte | Repository-uri fictive, sarcini introductive, ghiduri și interes demonstrativ pentru contribuții |

Directorul reprezentanților afișează public funcția, nu afilierea sau susținerea. Publicarea propriei afilieri declarate necesită un acord separat, dezactivat implicit și revocabil. Exemplele interne de afiliere sunt vizibile numai după selectarea profilului administrator și confirmarea scopului accesului. Schimbarea profilului închide acest acces. Nu există recomandări automate de unfollow sau acțiuni executate pe platforme. Profilele sociale folosesc identități prestabilite; demo-ul nu solicită adrese de cont reale.

Interfața și exporturile de design folosesc tokenurile comune USR din `src/tokens.css` și fontul local Aileron. Biblioteca de design nu este un kit de identitate oficială, iar catalogul de proiecte nu reprezintă repository-uri operative sau promisiuni de cost zero.

Zona de membri începe la `#/membri`; `#/implica-te` este un alias. Paginile publice includ și ecrane explicative despre strategie, arhitectură și costuri. Acestea prezintă propuneri, nu capabilități operaționale.

## Date și limite

- Fiecare pagină afișează banda „Machetă neoficială, neafiliată USR” și cere motoarelor de căutare să nu o indexeze (`noindex,nofollow`). Imaginea de previzualizare `public/og-image.png` este sintetică și nu folosește sigla USR.
- Persoanele, cotizațiile, documentele și răspunsurile din zona de membri sunt fictive. Nu sunt incluse parole, date de card sau înregistrări private din e-USR.
- Accesul la e-USR a fost folosit pentru observarea funcționalităților. Demo-ul nu necesită cont, API intern sau autentificare.
- Schimbarea profilului demonstrativ modifică interfața; nu reprezintă un sistem de autorizare.
- Toate exemplele sunt incluse în fișierele statice, inclusiv cele ascunse de interfață. Controalele de acord și acces nu protejează date reale și nu reprezintă o certificare de conformitate GDPR. O implementare operațională necesită autorizare pe server și evaluare juridică separată.
- Starea zonei de membri rămâne în memoria paginii. Resetarea, reîncărcarea sau părăsirea zonei de membri o șterg. Filtrele membrilor nu se păstrează la reîncărcare.
- Unele pagini publice folosesc parametri în URL pentru filtre și vizualizări. Nu introduceți informații private în demo.
- Aplicația conține referințe publice și legături externe, inclusiv către USR și GitHub. Deschiderea lor părăsește demo-ul; serviciile externe au propriul comportament.
- Nu există backend pentru plăți, voturi, înscrieri sau mesaje. Unele controale publice ilustrează un flux propus, fără a-l implementa complet.
- Cifrele și referințele din ecranele de prezentare nu trebuie tratate ca un set de date actualizat sau ca informație oficială verificată.

## Rulare locală

Folosiți Node.js 22, versiunea configurată și în workflow-ul de build, și npm.

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Deschideți adresa afișată de Vite. Comanda simplă `npm run dev` ascultă pe toate interfețele de rețea.

Pentru build și previzualizarea lui:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

Build-ul verifică diacriticele românești (`npm run check:diacritics`), tipurile TypeScript și generează fișierele statice în `dist/`. Navigarea folosește hash routes, iar Vite are `base: './'`.

## Teste

Ghidul [CONTRIBUTING.md](CONTRIBUTING.md) descrie verificarea completă, criteriile
de acceptare și limitele datelor fictive. `npm run verify` rulează build-ul și apoi
toată suita de browsere pe `dist/`, cu `CI=1`, fără reutilizarea serverului local.

```bash
npx --no-install playwright install chromium firefox webkit
npm test
```

Playwright pornește sau reutilizează serverul local de pe portul `5187`. `DEMO_PORT` poate selecta alt port. Pentru un Chromium deja instalat, variabila `DEMO_CHROMIUM` poate indica executabilul. În CI, testele pornesc un server de previzualizare pentru build-ul din `dist/`, fără reutilizarea unui server existent.

Cele 13 teste din [tests/members.spec.ts](tests/members.spec.ts), [tests/resources.spec.ts](tests/resources.spec.ts), [tests/privacy-contacts.spec.ts](tests/privacy-contacts.spec.ts) și [tests/civic-pilot.spec.ts](tests/civic-pilot.spec.ts) verifică fluxuri de membri și simpatizanți, vizibilitatea profilurilor sociale, acordul separat pentru afiliere, accesul intern simulat, contactele fictive, resetarea, descărcările, tokenurile de brand, spațiul dropdown-ului, contrastul unor controale la hover și lipsa overflow-ului la 390px și 1440px. Pilotul contactelor verifică și filtrele, marcajele salvate și focusul prin tastatură. Fluxurile verificate includ absența cererilor externe și a datelor în `localStorage`/`sessionStorage`; fluxul de membri verifică și erorile JavaScript.

Suita completă de 35 de teste rulează în Chromium, Firefox și WebKit (105 execuții). Controalele de formular, butoanele și cele șapte tabele folosesc Civic UI v0.5.0. Testele verifică filtre, resetare, indisponibilitate/reîncercare, operare offline, etichete, focus, contrast și padding. Sunt acoperite participarea cu tastatura și revizuirea răspunsului, consimțământul explicit și retragerea lui, accesul demonstrativ restricționat, descărcările sintetice și absența persistenței sau cererilor externe în fluxurile verificate. Formularul public de contact rămâne static, fără trimitere. Paginile publice cu formulare și tabele sunt verificate la 320, 390 și 1440px, inclusiv etichetele celulelor în afișarea mobilă. Pentru un singur motor: `npm test -- --project=firefox`. `DEMO_CHROMIUM` afectează numai proiectul Chromium.

Această acoperire nu reprezintă un audit complet de accesibilitate sau securitate. WebKit nu certifică Safari sau dispozitive iOS. Capturile și rezultatele sunt salvate în `/tmp`, conform configurației și testelor. CI folosește imaginea oficială Playwright `v1.63.0-noble`, cu browserele și bibliotecile de sistem incluse; versiunea imaginii trebuie păstrată în acord cu versiunea Playwright din lockfile. Rularea locală necesită bibliotecile de sistem compatibile pentru fiecare browser.

## Publicare

[Verificările automate](.github/workflows/checks.yml) rulează la fiecare pull request: instalarea dependențelor, build TypeScript/Vite și matricea Playwright descrisă mai sus. Rapoartele și capturile sunt păstrate ca artefacte timp de șapte zile. Statusul agregat
`verify` acceptă numai succesul jobului de build și browsere; eșecurile, anulările
și verificările omise nu trec acest prag.

[Workflow-ul GitHub Pages](.github/workflows/pages.yml) rulează la push pe `main` sau prin declanșare manuală. Apelează aceleași verificări și publică `dist/` numai după succesul lor. Obligativitatea verificărilor înainte de merge depinde de regulile configurate pentru ramura din GitHub.

## Fișiere principale

- [src/App.tsx](src/App.tsx): alegerea ecranului pentru ruta curentă; [src/routing.ts](src/routing.ts) citește și scrie hash-ul, iar [src/titles.ts](src/titles.ts) dă titlul fiecărei rute.
- [src/features/public/](src/features/public/): ecranele publice, grupate pe zone; datele fictive sunt în [src/data/](src/data/), iar antetul și subsolul în [src/components/Layout.tsx](src/components/Layout.tsx).
- [src/features/members/MemberDemo.tsx](src/features/members/MemberDemo.tsx): ecrane, date fictive și interacțiuni pentru membri.
- [src/features/members/ResourceHub.tsx](src/features/members/ResourceHub.tsx): resurse și profiluri pentru comunitate; exemplele sunt în [resources.ts](src/features/members/resources.ts).
- [src/features/members/PublicContacts.tsx](src/features/members/PublicContacts.tsx): director instituțional fictiv și solicitări individuale demonstrative.
- [src/components/civic/README.md](src/components/civic/README.md): inventarul adoptării Civic UI v0.5.0 și excepțiile intenționate.
- [src/tokens.css](src/tokens.css): fonturi locale și tokenuri de temă.
- [MEMBER_AREA_PLAN.md](MEMBER_AREA_PLAN.md): planul și limitele alternativei de prezentare.
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md): pași de mentenanță și verificare pentru demo.
- [PROPOSAL_MEMO.md](PROPOSAL_MEMO.md): scopul prezentării și criterii de feedback.

## Licență

Codul din acest depozit este licențiat MIT — vezi [`LICENSE`](LICENSE). Fontul Aileron din
`src/assets/usr/` este dedicat domeniului public (CC0 1.0) de autorul său — vezi
[`LICENSE-Aileron.txt`](LICENSE-Aileron.txt).

Licența acoperă codul. Nu acoperă numele, sigla sau identitatea vizuală USR: prototipul este
neoficial, nu este aprobat de USR, iar textele, persoanele și cifrele afișate sunt sintetice.
