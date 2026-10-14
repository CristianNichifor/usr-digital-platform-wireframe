import { expect, test } from "@playwright/test";

test("member dues amounts use lei in ro-RO form, not RON", async ({ page }) => {
  await page.goto("/#/membri");
  const main = page.locator("main");
  await expect(main).toContainText("30 lei");
  await expect(main).not.toContainText("RON");
  await page.goto("/#/membri/cotizatii");
  await expect(main).toContainText("30 lei");
  await expect(main).not.toContainText("RON");
});
