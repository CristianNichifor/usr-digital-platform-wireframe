import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
import { validateCivicContract } from "./check-civic-contract.mjs";

function fixture() {
  return {
    manifest: JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ),
    lock: JSON.parse(
      readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"),
    ),
  };
}
const name = "@cristiannichifor/civic-ui";
const entry = "node_modules/" + name;

test("accepts the reviewed public release and integrity-locked dependency tree", () => {
  const { manifest, lock } = fixture();
  manifest.devDependencies.example = "~1.2.3";
  assert.deepEqual(validateCivicContract(manifest, lock), []);
});

for (const replacement of [
  "^0.5.0",
  "https://example.org/civic-ui.tgz",
  "file:../civic-ui",
  "workspace:*",
]) {
  test("rejects unreviewed manifest pin: " + replacement, () => {
    const { manifest, lock } = fixture();
    manifest.dependencies[name] = replacement;
    assert.ok(
      validateCivicContract(manifest, lock).some((error) =>
        error.includes("reviewed v0.5.0"),
      ),
    );
  });
}

for (const property of ["version", "resolved", "integrity"]) {
  test("rejects Civic UI lock entry drift: " + property, () => {
    const { manifest, lock } = fixture();
    lock.packages[entry][property] = "changed";
    assert.ok(
      validateCivicContract(manifest, lock).some((error) =>
        error.includes("lock entry"),
      ),
    );
  });
}

test("rejects mismatching lockfile root and missing package entry", () => {
  const { manifest, lock } = fixture();
  lock.packages[""].dependencies[name] = "^0.5.0";
  delete lock.packages[entry];
  assert.equal(validateCivicContract(manifest, lock).length, 2);
});

for (const reference of [
  "file:../local",
  "link:../local",
  "workspace:*",
  "../local",
  "/tmp/local",
  "C:\\local",
]) {
  test("rejects local dependencies outside Civic UI: " + reference, () => {
    const { manifest, lock } = fixture();
    manifest.devDependencies.local = reference;
    lock.packages["node_modules/local"] = { resolved: reference };
    assert.equal(validateCivicContract(manifest, lock).length, 2);
  });
}

test("rejects linked packages and transitive local dependencies", () => {
  const { manifest, lock } = fixture();
  lock.packages["node_modules/local"] = {
    link: true,
    dependencies: { nested: "file:../nested" },
  };
  assert.equal(validateCivicContract(manifest, lock).length, 2);
});
