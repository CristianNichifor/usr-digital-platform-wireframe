import { expect, test } from "@playwright/test";
import {
  civicCompositionIssues,
  expectCivicComposition,
} from "./support/civic-contract";

test("stacked public tables keep headers available to accessibility navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 950 });
  for (const route of [
    "date-locale",
    "presa",
    "proiecte-date",
    "arhitectura",
    "nota",
  ]) {
    await page.goto("/#/" + route);
    await expect(page.locator(".table-wrap .civic-table")).toHaveCount(route === "date-locale" ? 2 : 1);
    for (const table of await page.locator(".table-wrap .civic-table").all()) {
      const headers = table.locator("thead th");
      await expect(table.getByRole("columnheader")).toHaveCount(
        await headers.count(),
      );
      for (const header of await headers.all()) {
        await expect(header).toHaveAttribute("scope", "col");
      }
      expect(
        await table.evaluate((element) =>
          Array.from(element.querySelectorAll("tbody td")).map((cell) => {
            const header = document.getElementById(
              cell.getAttribute("headers") || "",
            );
            const label = cell.querySelector(".mobile-cell-label");
            return Boolean(
              header &&
              element.contains(header) &&
              header.textContent === cell.getAttribute("data-label") &&
              label?.textContent === header.textContent &&
              label.getAttribute("aria-hidden") === "true",
            );
          }),
        ),
      ).not.toContain(false);
      const snapshot = await table.ariaSnapshot();
      expect(snapshot).toContain("columnheader");
      expect(snapshot).toContain("cell");
      await table.locator("..").focus();
      await expect(table.locator("..")).toBeFocused();
      await expect(table.locator("..")).toHaveCSS("outline-style", "solid");
      await expect(table).toHaveAttribute("role", "table");
      await expect(table.locator("tbody tr").first()).toHaveAttribute(
        "role",
        "row",
      );
      await expect(table.locator("tbody td").first()).toHaveAttribute(
        "role",
        "cell",
      );
    }
  }
});

test("Civic fields retain composition in conditionally displayed controls", async ({
  page,
}) => {
  await page.goto("/#/membri/setari");
  await page
    .getByRole("button", { name: "Adauga profil fictiv LinkedIn", exact: true })
    .click();
  await expect(page.getByLabel("Vizibilitate LinkedIn")).toBeVisible();
  await expectCivicComposition(page);
  await page.getByRole("link", { name: "Cotizatii", exact: true }).click();
  await page.getByRole("button", { name: "Simuleaza plata" }).click();
  await expect(page.getByLabel("Rezultat demonstrativ")).toBeVisible();
  await expectCivicComposition(page);
  await page
    .getByRole("link", { name: "Director social", exact: true })
    .click();
  await page
    .getByLabel("Profil demonstrativ")
    .selectOption("Administrator Model");
  await page
    .getByLabel("Scopul accesului")
    .selectOption("Administrarea evidentei");
  await page
    .getByRole("button", { name: "Confirma accesul pentru scopul selectat" })
    .click();
  await expect(
    page.getByRole("combobox", { name: "Afiliere", exact: true }),
  ).toBeVisible();
  await expectCivicComposition(page);
  await page.getByRole("link", { name: "Resurse", exact: true }).click();
  await page
    .getByRole("button", { name: "Vezi detalii", exact: true })
    .first()
    .click();
  await expect(page.getByLabel("Comentariu fictiv")).toBeVisible();
  await expectCivicComposition(page);
});

test("composition guard rejects unscoped or unlabelled controls", async ({
  page,
}) => {
  await page.setContent(
    '<div class="civic-scope"><div class="civic-field"><label for="sample">Sample</label><input id="sample" class="civic-input"></div></div>',
  );
  await expectCivicComposition(page);
  await page.locator(".civic-scope").evaluate(scope => scope.classList.remove("civic-scope"));
  expect(await civicCompositionIssues(page)).toEqual([{ id: "sample", reason: "missing Civic scope" }]);
  await page.locator("body > div").evaluate(scope => scope.classList.add("civic-scope"));
  await page
    .locator(".civic-field")
    .evaluate((field) => field.classList.remove("civic-field"));
  expect(await civicCompositionIssues(page)).toEqual([
    { id: "sample", reason: "missing Field" },
  ]);
  await page.locator("label").evaluate((label) => label.remove());
  expect(await civicCompositionIssues(page)).toContainEqual({
    id: "sample",
    reason: "missing associated label",
  });
});

test("contact journey markers leave a clear text gutter at every layout", async ({
  page,
}, info) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/#/contact");
    const gaps = await page.locator(".journey-card").evaluateAll((cards) =>
      cards.map((card) => {
        const marker = getComputedStyle(card, "::before");
        const box = card.getBoundingClientRect();
        const text = card.querySelector("h3")!.getBoundingClientRect();
        return (
          text.left -
          box.left -
          parseFloat(getComputedStyle(card).borderLeftWidth) -
          parseFloat(marker.left) -
          parseFloat(marker.width)
        );
      }),
    );
    expect(gaps).toHaveLength(4);
    for (const gap of gaps) expect(gap).toBeGreaterThanOrEqual(8);
    await page.screenshot({
      path: info.outputPath("contact-gutter-" + width + ".png"),
      fullPage: true,
    });
  }
});
