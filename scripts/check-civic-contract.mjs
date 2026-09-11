import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageName = "@cristiannichifor/civic-ui";
const release =
  "https://github.com/CristianNichifor/civic-ui/releases/download/v0.5.0/civic-ui-0.5.0.tgz";
const integrity =
  "sha512-Foi8E1TxPMnSJNuVuK96dYZRrALwCzKFP/tbOQJJ269Sa4fRxNa+8rgJwajpP6rzsuLvsZoAS2LaqFVRXGuSDw==";
const dependencyGroups = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
];

function isLocal(reference) {
  return (
    typeof reference === "string" &&
    (["file:", "link:", "workspace:", ".", "/", "~/", "\\"].some((prefix) =>
      reference.startsWith(prefix),
    ) ||
      /^[A-Za-z]:[\\/]/.test(reference))
  );
}

export function validateCivicContract(manifest, lock) {
  const errors = [];
  if (manifest.dependencies?.[packageName] !== release)
    errors.push(
      "Civic UI must use the reviewed v0.5.0 GitHub release tarball.",
    );
  if (lock.packages?.[""]?.dependencies?.[packageName] !== release)
    errors.push("The lockfile root must match the Civic UI release pin.");
  const installed = lock.packages?.["node_modules/" + packageName];
  if (
    installed?.version !== "0.5.0" ||
    installed?.resolved !== release ||
    installed?.integrity !== integrity
  ) {
    errors.push(
      "The Civic UI lock entry must match the reviewed version, release URL and integrity.",
    );
  }
  for (const group of dependencyGroups) {
    for (const [name, reference] of Object.entries(manifest[group] || {})) {
      if (isLocal(reference))
        errors.push(group + ": local dependency is not allowed: " + name);
    }
  }
  for (const [path, entry] of Object.entries(lock.packages || {})) {
    if (entry.link || isLocal(entry.resolved))
      errors.push("Lockfile local package is not allowed: " + path);
    for (const group of dependencyGroups) {
      for (const [name, reference] of Object.entries(entry[group] || {})) {
        if (isLocal(reference))
          errors.push(
            "Lockfile local dependency is not allowed: " + path + "/" + name,
          );
      }
    }
  }
  return errors;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const manifest = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  );
  const lock = JSON.parse(
    readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"),
  );
  const errors = validateCivicContract(manifest, lock);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Civic UI release and dependency contract passed.");
  }
}
