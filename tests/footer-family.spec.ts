import { expect, test } from "@playwright/test";

test("the footer links back to the civic projects hub", async ({ page }) => {
  await page.goto("/#/");
  await expect(
    page.locator("footer.site-footer").getByRole("link", { name: "Toate proiectele civice" }),
  ).toHaveAttribute("href", "https://projects.cristian-nichifor.com/ro/");
});
