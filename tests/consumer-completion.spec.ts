import { expect, test } from "@playwright/test";

test("contact remains static and public search keeps shareable state offline", async ({
  page,
  context,
  baseURL,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (
      /^https?:/.test(request.url()) &&
      new URL(request.url()).origin !== new URL(baseURL!).origin
    )
      external.push(request.url());
  });
  await page.goto("/#/contact");
  await expect(page.locator(".mini-form .civic-field")).toHaveCount(2);
  await context.setOffline(true);
  await page.getByLabel("Tip mesaj", { exact: true }).selectOption("presa");
  await page
    .getByLabel("Mesaj", { exact: true })
    .fill("Mesaj fictiv, pastrat numai in ecran.");
  await page.getByRole("button", { name: "Simulează trimiterea" }).click();
  await expect(page).toHaveURL(/#\/contact$/);
  await expect(page.getByLabel("Mesaj", { exact: true })).toHaveValue(
    "Mesaj fictiv, pastrat numai in ecran.",
  );
  await page.evaluate(() => {
    location.hash = "/oameni";
  });
  await page.getByLabel("Căutare", { exact: true }).fill("Model");
  await expect(page).toHaveURL(/q=Model/);
  expect(
    await page.evaluate(() => [localStorage.length, sessionStorage.length]),
  ).toEqual([0, 0]);
  expect(external).toEqual([]);
});

test("participation review and consent use shared keyboard controls", async ({
  page,
  context,
}) => {
  await page.goto("/#/membri/participare");
  await context.setOffline(true);
  await page
    .getByRole("link", { name: /Programul intalnirilor interne/ })
    .click();
  const choice = page.getByRole("radio", { name: "In weekend", exact: true });
  await expect(page.locator(".civic-radio-group")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Revizuieste alegerea" }),
  ).toBeDisabled();
  await choice.focus();
  await page.keyboard.press("Space");
  await expect(choice).toBeChecked();
  await page.getByRole("button", { name: "Revizuieste alegerea" }).click();
  await choice.focus();
  await page.keyboard.press("ArrowUp");
  await expect(choice).not.toBeChecked();
  await expect(
    page.getByRole("button", { name: "Confirma in demonstratie" }),
  ).toHaveCount(0);
  await choice.focus();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Revizuieste alegerea" }).click();
  await page.getByRole("button", { name: "Inapoi", exact: true }).click();
  await expect(choice).toBeChecked();
  await page.getByRole("button", { name: "Revizuieste alegerea" }).click();
  await page.getByRole("button", { name: "Confirma in demonstratie" }).click();
  await expect(
    page.getByText("Raspuns fictiv inregistrat: In weekend"),
  ).toBeVisible();
  await page.getByRole("link", { name: "Setari", exact: true }).click();
  const consent = page.getByLabel(
    "Accept explicit publicarea afilierii mele in comunitate",
  );
  await expect(consent).not.toBeChecked();
  await consent.focus();
  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
  await expect(consent).toHaveCSS("width", "20px");
  await page.getByLabel("Afiliere declarata").selectOption("Simpatizant");
  await expect(consent).not.toBeChecked();
  await page.getByRole("button", { name: "Reseteaza demonstratia" }).click();
  await expect(
    page.getByLabel("Afiseaza profilul fictiv in director"),
  ).not.toBeChecked();
});

for (const width of [320, 390, 1440]) {
  test(`public controls and tables preserve responsive layout at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 950 });
    for (const route of [
      "/",
      "/contact",
      "/oameni",
      "/date-locale",
      "/presa",
      "/proiecte-date",
      "/arhitectura",
      "/nota",
    ]) {
      await page.goto("/#" + route);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const tables = page.locator(".table-wrap .civic-table");
      for (const table of await tables.all()) {
        await expect(table.locator("caption")).toBeVisible();
        if (width < 700) {
          await expect(table.locator("thead")).toBeHidden();
          const cell = table.locator("tbody td").first();
          await expect(cell).toBeVisible();
          expect(await cell.getAttribute("data-label")).toBeTruthy();
          expect(
            await cell.evaluate(
              (el) => getComputedStyle(el, "::before").content,
            ),
          ).not.toBe("none");
        } else {
          await expect(table.locator("thead")).toBeVisible();
        }
      }
      await page.screenshot({
        path: info.outputPath(
          `public-${route.replaceAll("/", "") || "home"}-${width}.png`,
        ),
        fullPage: true,
      });
    }
  });
}
