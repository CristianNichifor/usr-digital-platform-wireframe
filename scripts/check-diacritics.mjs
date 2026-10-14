// Romanian prose must use ș and ț with comma below and keep its diacritics.
// The word list is a regression guard built from corrections made in this repository;
// it is not a spell checker. Add a word when a new misspelling is fixed.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const missing = {
  activitatii: "activității", actualizari: "actualizări", adaugat: "adăugat",
  administratie: "administrație", adunarii: "adunării", afisat: "afișat", afiseaza: "afișează",
  asteptare: "așteptare", audienta: "audiență", audiente: "audiențe", campurile: "câmpurile",
  circumscriptia: "circumscripția", citeste: "citește", competenta: "competență",
  comunicati: "comunicați", comunitatii: "comunității", conducator: "conducător",
  consultari: "consultări", continut: "conținut", contributie: "contribuție",
  contributii: "contribuții", corectie: "corecție", cotizatie: "cotizație",
  cotizatii: "cotizații", cotizatiile: "cotizațiile", declaratie: "declarație",
  declaratiei: "declarației", deliberari: "deliberări", demonstratia: "demonstrația",
  demonstratie: "demonstrație", deputatilor: "deputaților", discutie: "discuție",
  documentatie: "documentație", donatii: "donații", donatiile: "donațiile", editiei: "ediției",
  esuat: "eșuat", evidenta: "evidență", evidentei: "evidenței", exercitiu: "exercițiu",
  fara: "fără", functie: "funcție", gasit: "găsit", gasita: "găsită", hotarari: "hotărâri",
  identitati: "identități", imi: "îmi", in: "în", inapoi: "înapoi", incepe: "începe",
  incheiat: "încheiat", inchide: "închide", inchis: "închis", inchisa: "închisă",
  informatii: "informații", inlocuit: "înlocuit", inregistrare: "înregistrare",
  inregistrat: "înregistrat", inscriere: "înscriere", institutia: "instituția",
  institutie: "instituție", institutiei: "instituției", institutii: "instituții",
  institutionala: "instituțională", intalnire: "întâlnire", intalnirea: "întâlnirea",
  intalnirilor: "întâlnirilor", interfata: "interfață", intrebare: "întrebare",
  intrebari: "întrebări", invitatia: "invitația", invitatie: "invitație", judetean: "județean",
  judetul: "județul", legislatie: "legislație", licenta: "licența", marti: "marți",
  mentenanta: "mentenanță", modificarile: "modificările", multumesc: "mulțumesc",
  national: "național", nationala: "națională", optional: "opțional", orasul: "orașul",
  organizatia: "organizația", organizatie: "organizație", pastreaza: "păstrează",
  platile: "plățile", poti: "poți", preferinta: "preferința", pregateste: "pregătește",
  primaria: "primăria", publicatia: "publicația", ramane: "rămâne", raspuns: "răspuns",
  raspunsul: "răspunsul", raspunsurile: "răspunsurile", reincearca: "reîncearcă",
  reprezentanti: "reprezentanți", responsabilitati: "responsabilități",
  revizuieste: "revizuiește", romania: "românia", rosu: "roșu", sabloane: "șabloane",
  sablon: "șablon", saptamanii: "săptămânii", sedinta: "ședință", sedinte: "ședințe",
  setari: "setări", setarile: "setările", si: "și", simpatizanti: "simpatizanți",
  solicitari: "solicitări", spatiul: "spațiul", sustinere: "susținere", tau: "tău",
  urmaresc: "urmăresc", urmarire: "urmărire", urmatoarea: "următoarea",
};

const cedilla = /[şţŞŢ]/;
const nonProse = /\S*(?:\/\/|#\/|@|\.example)\S*/g;

function matchCase(original, replacement) {
  if (original === original.toUpperCase() && original.length > 1) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase())
    return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

export function findIssues(text) {
  const issues = [];
  for (const word of text.replace(nonProse, " ").match(/\p{L}+(?:-\p{L}+)*/gu) || []) {
    if (cedilla.test(word)) {
      issues.push({ word, suggestion: word.replace(/ş/g, "ș").replace(/ţ/g, "ț").replace(/Ş/g, "Ș").replace(/Ţ/g, "Ț") });
      continue;
    }
    const fix = missing[word.toLowerCase()];
    if (fix) issues.push({ word, suggestion: matchCase(word, fix) });
  }
  return issues;
}

const slug = /^[a-z0-9\-/#?=&.:_]*$/;

export function proseFromSource(code, fileName) {
  const kind = fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, kind);
  const prose = [];
  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isJsxAttribute(node) && ["className", "href", "id", "htmlFor", "type"].includes(node.name.getText(source))) return;
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isJsxText(node)
    ) {
      const text = node.text.trim();
      if (text && !slug.test(text)) prose.push(text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return prose;
}

export function proseFromMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<https?:[^>]*>/g, " ");
}

function sourceFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

export function checkRepository(root) {
  const base = fileURLToPath(root);
  const findings = [];
  const report = (file, text) => {
    for (const issue of findIssues(text)) findings.push(file + ": " + issue.word + " -> " + issue.suggestion);
  };
  for (const file of sourceFiles(join(base, "src"))) {
    for (const text of proseFromSource(readFileSync(file, "utf8"), file)) report(file.slice(base.length), text);
  }
  report("README.md", proseFromMarkdown(readFileSync(join(base, "README.md"), "utf8")));
  return findings;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const findings = checkRepository(new URL("..", import.meta.url));
  if (findings.length) {
    console.error(findings.join("\n"));
    console.error(findings.length + " Romanian diacritics finding(s).");
    process.exit(1);
  }
  console.log("Romanian diacritics check passed.");
}
