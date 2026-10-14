import { expect, test } from "@playwright/test";

test("dues statuses are text chips and the history table states its source", async ({ page }) => {
  await page.goto("/#/membri");
  const summaryChip = page.locator(".member-summary .member-chip");
  await expect(summaryChip).toHaveCount(1);
  await expect(summaryChip).toContainText("Restant");

  await page.goto("/#/membri/cotizatii");
  const source = page.locator(".member-table__source");
  await expect(source).toContainText(/sursă: .+ · verificat: /);
  const rowChips = page.locator(".member-table tbody .member-chip");
  await expect(rowChips).toHaveCount(2);
  await expect(rowChips.nth(1)).toContainText("Achitat");
  for (const chip of await rowChips.all()) {
    const glyph = chip.locator("[aria-hidden='true']");
    await expect(glyph).toHaveText(/[✓◷!]/);
  }
});
