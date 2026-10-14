import assert from "node:assert/strict";
import test from "node:test";
import { findIssues, proseFromSource, proseFromMarkdown, checkRepository } from "./check-diacritics.mjs";

test("flags cedilla s and t", () => {
  assert.deepEqual(
    findIssues("Ştiri şi date").map((issue) => issue.word),
    ["Ştiri", "şi"],
  );
});

test("flags known words written without diacritics and suggests the fix", () => {
  assert.deepEqual(findIssues("Resurse si documente fara cont"), [
    { word: "si", suggestion: "și" },
    { word: "fara", suggestion: "fără" },
  ]);
  assert.deepEqual(findIssues("Cotizatii"), [{ word: "Cotizatii", suggestion: "Cotizații" }]);
});

test("accepts correct Romanian and ignores slugs, URLs and addresses", () => {
  assert.deepEqual(findIssues("Știri și cotizații fără cont"), []);
  assert.deepEqual(findIssues("Vezi #/membri/cotizatii și https://usr.ro/solicitari-informatii-publice"), []);
  assert.deepEqual(findIssues("Scrie la registratura@institutie.example"), []);
});

test("reads prose from string literals, templates and JSX text, not imports or identifiers", () => {
  const source = [
    'import x from "./fara";',
    'const route = "cotizatii";',
    'const label = "Plata si chitanta";',
    "const draft = `Buna ziua ${name} si multumesc`;",
    "const view = <p className=\"stiri\">Date fara surse</p>;",
  ].join("\n");
  const prose = proseFromSource(source, "sample.tsx").join(" | ");
  assert.match(prose, /Plata si chitanta/);
  assert.match(prose, /Buna ziua/);
  assert.match(prose, /Date fara surse/);
  assert.doesNotMatch(prose, /\.\/fara/);
  assert.doesNotMatch(prose, /^cotizatii$|\| cotizatii \|/);
  assert.doesNotMatch(prose, /stiri/);
});

test("skips inline code and link targets in markdown", () => {
  const prose = proseFromMarkdown("Vezi `#/stiri` si [demo](https://example.org/fara).");
  assert.deepEqual(findIssues(prose).map((issue) => issue.word), ["si"]);
});

test("the repository has no diacritics findings", () => {
  assert.deepEqual(checkRepository(new URL("..", import.meta.url)), []);
});
