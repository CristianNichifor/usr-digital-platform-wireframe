import { test, expect } from "@playwright/test";

test("contact pilot preserves search, filters, bookmarks and control states", async ({
  page,
}) => {
  await page.goto("/#/comunitate/contacte-publice");
  const pilot = page.locator(".public-contacts");
  await expect(pilot.locator(".resource-item")).toHaveCount(8);
  const bookmark = page.getByRole("button", {
    name: "Salveaza Primar Model",
    exact: true,
  });
  await expect(bookmark).toHaveCSS("width", "44px");
  await expect(bookmark).toHaveCSS("height", "44px");
  await bookmark.click();
  await expect(bookmark).toHaveAttribute("aria-pressed", "true");
  await page
    .getByLabel("Cauta nume, institutie sau localitate")
    .fill("Primaria Model");
  await expect(pilot.locator(".resource-item")).toHaveCount(1);
  await page.getByLabel("Cauta nume, institutie sau localitate").fill("");
  await page.getByLabel("Nivel", { exact: true }).selectOption("European");
  await expect(pilot.locator(".resource-item")).toHaveCount(1);
  await expect(
    pilot.getByRole("heading", { name: "Europarlamentar Model" }),
  ).toBeVisible();
  await page.getByLabel("Nivel", { exact: true }).selectOption("Toate");
  await expect(bookmark).toHaveAttribute("aria-pressed", "true");
  await bookmark.click();
  await expect(bookmark).toHaveAttribute("aria-pressed", "false");
  await bookmark.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(bookmark).toBeFocused();
  await expect(bookmark).toHaveCSS("outline-style", "solid");
  await bookmark.hover();
  await expect(bookmark).toHaveCSS("background-color", "rgb(229, 233, 238)");
  await expect(bookmark).toHaveCSS("color", "rgb(0, 42, 89)");
  await expect(page.getByLabel("Functie", { exact: true })).toHaveCSS(
    "padding-right",
    "44px",
  );
  await page.getByRole("button", { name: "Detalii Director Model" }).click();
  await expect(
    page.getByRole("button", { name: "Copiaza adresa fictiva" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Pregateste solicitarea" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Inchide contactul" }).click();
  await expect(
    page.getByRole("region", { name: "Detalii contact" }),
  ).toHaveCount(0);
  await page.goto("/#/comunitate/setari");
  await expect(page.locator(".civic-scope")).toHaveCount(0);
  await expect(page.locator(".member-demo .civic-button")).toHaveCount(0);
});

test("contact pilot responsive baselines include details and draft", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/#/comunitate/contacte-publice");
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `/tmp/usr-civic-pilot-${width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Detalii Viceprimar Model" })
      .click();
    await page.getByRole("button", { name: "Pregateste solicitarea" }).click();
    await page.getByLabel("Tip solicitare").selectOption("Cerere de audienta");
    await page.getByRole("button", { name: "Revizuieste draftul" }).click();
    await expect(page.locator(".contact-draft")).toContainText(
      "Subiect: Cerere de audienta",
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: `/tmp/usr-civic-pilot-draft-${width}.png`,
      fullPage: true,
    });
  }
});
