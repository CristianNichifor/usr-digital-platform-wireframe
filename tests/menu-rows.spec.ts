import { expect, test } from "@playwright/test";

test("every open-menu link is at least 44 px tall at 390 px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  await page.locator(".menu-toggle").click();
  const links = page.getByRole("navigation", { name: "Navigare principală" }).getByRole("link");
  await expect(links).toHaveCount(7);
  for (const link of await links.all()) {
    const box = await link.boundingBox();
    expect(box, "link has a box").not.toBeNull();
    // Firefox reports 43.99999 for a 44 px box; allow subpixel rounding.
    expect(box!.height).toBeGreaterThanOrEqual(43.5);
  }
});
