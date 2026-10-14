import { expect, test } from "@playwright/test";

const SUFFIX = " — Machetă platformă digitală";

const titles: [string, string][] = [
  ["/", "Acasă"],
  ["/stiri", "Știri"],
  ["/oameni", "Oameni"],
  ["/oameni/primar-exemplu", "Primar Exemplu"],
  ["/guvernare", "Guvernare"],
  ["/verificari", "Verificări"],
  ["/ce-propunem", "Ce propunem"],
  ["/declaratii", "Declarații de avere"],
  ["/date-locale", "Date locale"],
  ["/bani", "Bani"],
  ["/presa", "Sala de presă"],
  ["/organizare", "Organizare"],
  ["/contact", "Contact"],
  ["/inscriere", "Înscriere"],
  ["/doneaza", "Donează"],
  ["/proiecte-date", "Proiecte și date"],
  ["/strategie", "Despre machetă"],
  ["/arhitectura", "Arhitectură date"],
  ["/nota", "Notă costuri"],
  ["/implica-te", "Implică-te"],
  ["/membri", "Membri"],
  ["/membri/documente", "Documente · Membri"],
  ["/membri/cotizatii", "Cotizații · Membri"],
  ["/comunitate", "Resurse · Comunitate"],
  ["/comunitate/social", "Director social · Comunitate"],
  ["/nu-exista", "Pagină inexistentă"],
];

test("every route asks search engines not to index or follow it", async ({ page }) => {
  for (const [path] of titles) {
    await page.goto("/#" + path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  }
});

test("every route shows the unofficial, unaffiliated banner", async ({ page }) => {
  for (const [path] of titles) {
    await page.goto("/#" + path);
    const banner = page.getByRole("note").filter({ hasText: "Machetă neoficială, neafiliată USR" });
    await expect(banner).toBeVisible();
  }
});

test("the banner stays in view while scrolling on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#/presa");
  await page.mouse.wheel(0, 4000);
  await expect(page.getByText("Machetă neoficială, neafiliată USR")).toBeInViewport();
});

test("each route sets its own document title", async ({ page }) => {
  for (const [path, title] of titles) {
    await page.goto("/#" + path);
    await expect(page).toHaveTitle(title + SUFFIX);
  }
});

test("the title follows in-app navigation", async ({ page }) => {
  await page.goto("/#/");
  await page.getByRole("navigation", { name: "Navigare principală" }).getByRole("link", { name: "Știri" }).click();
  await expect(page).toHaveTitle("Știri" + SUFFIX);
});

test("open graph metadata describes a synthetic preview", async ({ page, request }) => {
  await page.goto("/#/");
  const content = (selector: string) => page.locator(selector).getAttribute("content");
  expect(await content('meta[property="og:title"]')).toBe("Machetă platformă digitală");
  expect(await content('meta[property="og:description"]')).toContain("date fictive");
  expect(await content('meta[property="og:type"]')).toBe("website");
  expect(await content('meta[name="twitter:card"]')).toBe("summary_large_image");
  const image = await content('meta[property="og:image"]');
  const published = image?.match(/^https:\/\/cristiannichifor\.github\.io\/usr-digital-platform-wireframe\/([\w.-]+\.png)$/);
  expect(published, "og:image is an absolute URL on the published site").toBeTruthy();
  const response = await request.get("/" + published![1]);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toMatch(/^image\//);
});
