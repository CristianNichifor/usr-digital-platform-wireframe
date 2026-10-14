import { expect, test } from "@playwright/test";

test("the page behind the open menu is dimmed and hidden from assistive tech", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  const toggle = page.locator(".menu-toggle");
  const behind = [page.locator("main#continut"), page.locator(".site-footer")];
  const sections = page.getByRole("navigation", { name: "Navigare principală" });

  for (const region of behind) {
    await expect(region).not.toHaveAttribute("aria-hidden", "true");
    await expect(region).not.toHaveAttribute("inert");
  }

  await toggle.click();
  for (const region of behind) {
    await expect(region).toHaveAttribute("aria-hidden", "true");
    await expect(region).toHaveAttribute("inert", "");
    expect(Number(await region.evaluate((el) => getComputedStyle(el).opacity))).toBeLessThan(1);
  }
  await expect(sections.getByRole("link", { name: "Știri" })).toBeVisible();

  await page.keyboard.press("Escape");
  for (const region of behind) {
    await expect(region).not.toHaveAttribute("aria-hidden", "true");
    await expect(region).not.toHaveAttribute("inert");
    expect(Number(await region.evaluate((el) => getComputedStyle(el).opacity))).toBe(1);
  }
});

test("widening past the menu breakpoint closes the menu and frees the page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  await page.locator(".menu-toggle").click();
  await expect(page.locator("main#continut")).toHaveAttribute("inert", "");

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator("main#continut")).not.toHaveAttribute("inert");
  await expect(page.locator("main#continut")).not.toHaveAttribute("aria-hidden", "true");
});

test("Înscriere is a full-width button inside the open menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  await page.locator(".menu-toggle").click();
  const nav = page.getByRole("navigation", { name: "Navigare principală" });
  const join = nav.getByRole("link", { name: "Înscriere" });
  await expect(join).toBeVisible();
  const [joinBox, navBox] = [(await join.boundingBox())!, (await nav.boundingBox())!];
  expect(joinBox.width).toBeGreaterThan(navBox.width * 0.9);
  expect(joinBox.height).toBeGreaterThanOrEqual(44);
  expect(await join.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
});
