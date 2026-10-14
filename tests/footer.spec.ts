import { expect, test } from "@playwright/test";

test("the footer links to the data limits and privacy note", async ({ page }) => {
  await page.goto("/#/");
  const link = page.locator("footer.site-footer a", {
    hasText: "Limitele datelor și confidențialitate",
  });
  await expect(link).toHaveCount(1);
  await expect(link).toHaveAttribute("href", /date-%C8%99i-limite$/);
});
