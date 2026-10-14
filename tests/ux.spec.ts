import { expect, test, type Page } from "@playwright/test";

const contrast = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((element) => {
    const luminance = (rgb: string) => {
      const [r, g, b] = (rgb.match(/[\d.]+/g) || []).slice(0, 3).map(Number).map((v) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return r * 0.2126 + g * 0.7152 + b * 0.0722;
    };
    let parent: Element | null = element;
    let background = "rgba(0, 0, 0, 0)";
    while (parent && (background === "rgba(0, 0, 0, 0)" || background === "transparent")) {
      background = getComputedStyle(parent).backgroundColor;
      parent = parent.parentElement;
    }
    const a = luminance(getComputedStyle(element).color);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });

test("the home route is a public homepage and the memo sits behind Despre machetă", async ({ page }) => {
  await page.goto("/#/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hotărâre parlamentară contestată la CCR");
  await expect(page.getByRole("heading", { name: "Ultimele știri" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Oamenii noștri" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Implică-te" })).toBeVisible();
  await expect(page.getByText("Sinteză usr.ro + propunere")).toHaveCount(0);

  await page.getByRole("note").getByRole("link", { name: "Despre machetă" }).click();
  await expect(page).toHaveURL(/#\/strategie$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Site public USR ca infrastructură de încredere, nu doar flux de pagini.",
  );
  await expect(page.getByRole("heading", { name: "Ce păstrăm de pe usr.ro și ce schimbăm" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Beneficii pentru partid" })).toBeVisible();
});

test("the mobile header collapses sections behind a menu and pins Membri and Donează", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  const header = page.locator(".site-header");
  const menu = page.getByRole("button", { name: "Meniu" });
  const sections = page.getByRole("navigation", { name: "Navigare principală" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(sections.getByRole("link", { name: "Știri" })).toBeHidden();
  await expect(header.getByRole("link", { name: "Membri", exact: true })).toBeVisible();
  await expect(header.getByRole("link", { name: "Donează", exact: true })).toBeVisible();
  expect((await header.boundingBox())!.height).toBeLessThanOrEqual(140);

  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(sections.getByRole("link", { name: "Știri" })).toBeVisible();
  await expect(sections.getByRole("link", { name: "Înscriere" })).toBeVisible();
  await sections.getByRole("link", { name: "Știri" }).click();
  await expect(page).toHaveURL(/#\/stiri$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(sections.getByRole("link", { name: "Știri" })).toBeHidden();
});

test("the desktop header shows plain section links and three action buttons", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#/");
  await expect(page.getByRole("button", { name: "Meniu" })).toBeHidden();
  const sections = page.getByRole("navigation", { name: "Navigare principală" });
  for (const link of await sections.getByRole("link").filter({ visible: true }).all()) {
    await expect(link).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(link).toHaveCSS("border-top-width", "0px");
  }
  await expect(sections.getByRole("link", { name: "Înscriere" })).toBeHidden();
  const actions = page.getByRole("navigation", { name: "Acțiuni principale" }).getByRole("link");
  await expect(actions).toHaveText(["Membri", "Înscriere", "Donează"]);
  for (const action of await actions.all()) {
    const styled = await action.evaluate((element) => {
      const style = getComputedStyle(element);
      return style.backgroundColor !== "rgba(0, 0, 0, 0)" || parseFloat(style.borderTopWidth) > 0;
    });
    expect(styled).toBe(true);
  }
});

test("links and controls outside running text are at least 44px tall on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/stiri", "/oameni", "/oameni/primar-exemplu", "/contact", "/strategie", "/membri", "/comunitate", "/membri/documente"]) {
    await page.goto("/#" + route);
    const menu = page.getByRole("button", { name: "Meniu" });
    if ((await menu.getAttribute("aria-expanded")) === "false") await menu.click();
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("a, button, select, input, textarea, summary")]
        .filter((element) => {
          const style = getComputedStyle(element);
          const box = element.getBoundingClientRect();
          const type = (element as HTMLInputElement).type;
          return (
            style.display !== "inline" &&
            box.width > 0 &&
            box.height > 0 &&
            box.height < 44 &&
            !element.classList.contains("skip-link") &&
            type !== "checkbox" &&
            type !== "radio"
          );
        })
        .map((element) => `${element.tagName} ${(element.textContent || "").trim().slice(0, 30)}`),
    );
    expect(small, route).toEqual([]);
  }
});

test("member navigation is grouped beside the content on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#/membri");
  const nav = page.getByRole("navigation", { name: "Navigare membri" });
  await expect(nav.getByRole("heading")).toHaveText(["Eu", "Filială", "Resurse"]);
  await expect(nav.getByRole("link", { name: "Cotizații", exact: true })).toBeVisible();
  const navBox = (await nav.boundingBox())!;
  const contentBox = (await page.locator(".member-content").boundingBox())!;
  expect(navBox.x + navBox.width).toBeLessThanOrEqual(contentBox.x);
  await expect(page.getByLabel("Secțiune", { exact: true })).toBeHidden();
});

test("member navigation is a section select on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/membri");
  const nav = page.getByRole("navigation", { name: "Navigare membri" });
  await expect(nav.getByRole("link", { name: "Cotizații", exact: true })).toBeHidden();
  const select = page.getByLabel("Secțiune", { exact: true });
  await expect(select).toBeVisible();
  await select.selectOption({ label: "Documente" });
  await expect(page).toHaveURL(/#\/membri\/documente$/);
  await expect(select).toHaveValue("documente");

  await page.goto("/#/comunitate");
  await page.reload();
  const options = await page.getByLabel("Secțiune", { exact: true }).locator("option").allTextContents();
  expect(options).not.toContain("Cotizații");
  expect(options).toContain("Resurse");
});

test("source and verification lines are readable", async ({ page }) => {
  await page.goto("/#/oameni");
  const meta = page.locator(".fake-meta").first();
  await expect(meta).toBeVisible();
  const style = await meta.evaluate((element) => {
    const computed = getComputedStyle(element);
    return { size: parseFloat(computed.fontSize), weight: Number(computed.fontWeight) };
  });
  expect(style.size).toBeGreaterThanOrEqual(13);
  expect(style.weight).toBeLessThanOrEqual(500);
  expect(await contrast(page, ".fake-meta")).toBeGreaterThanOrEqual(4.5);
});

test("the header uses a neutral text wordmark", async ({ page }) => {
  await page.goto("/#/stiri");
  const home = page.locator(".site-header").getByRole("link", { name: /Platformă digitală/ });
  await expect(home).toBeVisible();
  await expect(home).toContainText("Platformă digitală");
  await expect(home).toContainText("machetă");
  await expect(page.locator(".site-header").getByText("MP", { exact: true })).toHaveCount(0);
});

test("reduced motion turns off smooth scrolling and card transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/stiri");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  const card = page.locator(".news-card").first();
  await expect(card).toHaveCSS("transition-duration", "0s");
});

test("the footer explains the mock-up without internal route text", async ({ page }) => {
  await page.goto("/#/");
  const footer = page.locator("footer.site-footer");
  await expect(footer).toContainText("Machetă neoficială.");
  await expect(footer).toContainText("Conținut sintetic");
  await expect(footer).not.toContainText("Rută curentă");
});

test("primary buttons are at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/");
  const box = await page.getByRole("button", { name: "Meniu" }).boundingBox();
  expect(Math.round(box!.height)).toBeGreaterThanOrEqual(44);
});

test("forced colours keep the current page marked in the menu", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/#/stiri");
  const current = page.locator(".primary-nav a[aria-current='page']").first();
  await expect(current).toHaveCSS("text-decoration-line", "underline");
});
