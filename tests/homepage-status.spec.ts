import { expect, test } from "@playwright/test";

test("the homepage shows the status vocabulary, lead provenance and CV gaps as text", async ({ page }) => {
  await page.goto("/#/");
  const banner = page.getByRole("note").filter({ hasText: "Machetă neoficială, neafiliată USR" });
  await expect(banner).toContainText("Prototip");
  await expect(banner).toContainText("Date demonstrative");

  const lead = page.locator(".home-lead");
  await expect(lead.locator("h1")).toBeVisible();
  await expect(lead).toContainText(/sursă: .+ · verificat: /);

  const people = page.locator("section[aria-labelledby='home-people-title'] .home-card");
  await expect(people).toHaveCount(3);
  for (const card of await people.all()) {
    await expect(card).toContainText(/CV publicat|CV lipsă/);
  }
});
