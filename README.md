# USR Digital Platform Wireframe

Prototip neoficial pentru prezentarea unei alternative de site public și zonă de membri. Aplicația este un frontend static construit cu React, TypeScript și Vite. Nu este un serviciu USR aprobat și nu este conectată la infrastructura internă.

[Deschide demo-ul](https://cristiannichifor.github.io/usr-digital-platform-wireframe/#/) · [Zona membrilor](https://cristiannichifor.github.io/usr-digital-platform-wireframe/#/membri)

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

Zona de membri începe la `#/membri`; `#/implica-te` este un alias. Paginile publice includ și ecrane explicative despre strategie, arhitectură și costuri. Acestea prezintă propuneri, nu capabilități operaționale.

## Date și limite

- Persoanele, cotizațiile, documentele și răspunsurile din zona de membri sunt fictive. Nu sunt incluse parole, date de card sau înregistrări private din e-USR.
- Accesul la e-USR a fost folosit pentru observarea funcționalităților. Demo-ul nu necesită cont, API intern sau autentificare.
- Schimbarea profilului demonstrativ modifică interfața; nu reprezintă un sistem de autorizare.
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

Build-ul verifică tipurile TypeScript și generează fișierele statice în `dist/`. Navigarea folosește hash routes, iar Vite are `base: './'`.

## Teste

```bash
npx playwright install chromium
npm test
```

Playwright pornește sau reutilizează serverul local de pe portul `5187`. `DEMO_PORT` poate selecta alt port. Pentru un Chromium deja instalat, variabila `DEMO_CHROMIUM` poate indica executabilul. În CI, testele pornesc un server de previzualizare pentru build-ul din `dist/`, fără reutilizarea unui server existent.

Cele patru teste din [tests/members.spec.ts](tests/members.spec.ts) verifică fluxuri de membri, resetarea, spațiul pentru săgeata dropdown-ului, contrastul a două controale la hover și lipsa overflow-ului paginilor de membri la lățimi de 390px și 1440px. Un flux verifică și absența cererilor externe, a erorilor JavaScript și a datelor în `localStorage`/`sessionStorage`.

Această acoperire nu reprezintă un audit complet de accesibilitate sau securitate. Capturile și rezultatele sunt salvate în `/tmp`, conform configurației și testelor.

## Publicare

[Verificările automate](.github/workflows/checks.yml) rulează la fiecare pull request: instalarea dependențelor, build TypeScript/Vite și teste Playwright cu Chromium. Rapoartele și capturile sunt păstrate ca artefacte timp de șapte zile.

[Workflow-ul GitHub Pages](.github/workflows/pages.yml) rulează la push pe `main` sau prin declanșare manuală. Apelează aceleași verificări și publică `dist/` numai după succesul lor. Obligativitatea verificărilor înainte de merge depinde de regulile configurate pentru ramura din GitHub.

## Fișiere principale

- [src/App.tsx](src/App.tsx): rutare și ecrane publice.
- [src/features/members/MemberDemo.tsx](src/features/members/MemberDemo.tsx): ecrane, date fictive și interacțiuni pentru membri.
- [src/components/Select.tsx](src/components/Select.tsx): controlul select comun.
- [src/tokens.css](src/tokens.css): fonturi locale și tokenuri de temă.
- [MEMBER_AREA_PLAN.md](MEMBER_AREA_PLAN.md): planul și limitele alternativei de prezentare.
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md): pași de mentenanță și verificare pentru demo.
- [PROPOSAL_MEMO.md](PROPOSAL_MEMO.md): scopul prezentării și criterii de feedback.
