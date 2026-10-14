import { expect, test } from "@playwright/test";

test("the open menu toggle reads Închide and Escape returns focus to it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  const header = page.locator(".site-header");
  const toggle = page.locator(".menu-toggle");
  const sections = page.getByRole("navigation", { name: "Navigare principală" });

  await expect(toggle).toHaveText(/Meniu/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect((await header.boundingBox())!.height).toBeLessThanOrEqual(140);

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveText(/Închide/);
  await expect(toggle).toHaveAttribute("aria-label", "Închide meniul");
  await expect(sections.getByRole("link", { name: "Înscriere" })).toBeVisible();

  await sections.getByRole("link", { name: "Știri" }).focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveText(/Meniu/);
  await expect(toggle).toBeFocused();
});
