import { expect, test } from '@playwright/test';

test('resource filters preserve combinations, saved items, empty results and reset', async ({ page, baseURL }) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(baseURL!).origin) external.push(request.url());
  });
  await page.goto('/#/comunitate/resurse');
  const search = page.getByLabel('Cauta resurse', { exact: true });
  const kind = page.getByRole('combobox', { name: 'Continut', exact: true });
  const scope = page.getByRole('combobox', { name: 'Organizatie', exact: true });
  const items = page.locator('.resource-grid .resource-item');
  await expect(items).toHaveCount(5);
  await expect(kind.locator('option')).toHaveText(['Toate', 'Material', 'Articol']);
  await expect(scope.locator('option')).toHaveText(['Toate', 'National', 'Filiala']);
  await kind.selectOption('Articol');
  await expect(items).toHaveCount(2);
  await scope.selectOption('Filiala');
  await expect(items).toHaveCount(1);
  await expect(items).toContainText('Actualizare a programului bibliotecii');
  await search.fill('GAZETA');
  await expect(items).toHaveCount(1);
  await search.fill('fara rezultat');
  await expect(items).toHaveCount(0);
  await expect(page.getByText('Nicio resursa gasita.')).toBeVisible();
  await search.fill('');
  await kind.selectOption('Toate');
  await scope.selectOption('Toate');
  await expect(items).toHaveCount(5);
  await page.getByRole('button', { name: 'Salveaza Invitatie la intalnirea de organizare', exact: true }).click();
  await page.getByLabel('Doar salvate', { exact: true }).check();
  await expect(items).toHaveCount(1);
  await scope.selectOption('Filiala');
  await expect(items).toHaveCount(0);
  await page.getByRole('button', { name: 'Reseteaza demonstratia' }).click();
  await expect(search).toHaveValue('');
  await expect(kind).toHaveValue('Toate');
  await expect(scope).toHaveValue('Toate');
  await expect(page.getByLabel('Doar salvate', { exact: true })).not.toBeChecked();
  await expect(items).toHaveCount(5);
  await page.getByLabel('Doar salvate', { exact: true }).check();
  await expect(items).toHaveCount(0);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('resource filter labels, focus and layout fit narrow and desktop screens', async ({ page }, info) => {
  await page.goto('/#/comunitate/resurse');
  await expect(page.locator('.resource-filters .civic-field')).toHaveCount(3);
  await expect(page.locator('.resource-filters .civic-input')).toHaveCount(1);
  await expect(page.locator('.resource-filters .civic-select')).toHaveCount(2);
  await expect(page.locator('.resource-filters .civic-choice')).toHaveCount(2);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    const search = page.getByLabel('Cauta resurse', { exact: true });
    await search.focus();
    for (const label of ['Continut', 'Organizatie']) {
      await page.keyboard.press('Tab');
      const select = page.getByRole('combobox', { name: label, exact: true });
      await expect(select).toBeFocused();
      await expect(select).toHaveCSS('outline-style', 'solid');
      await expect(select).toHaveCSS('padding-right', '44px');
      await expect(select).toHaveCSS('color', 'rgb(0, 42, 89)');
      const bounds = await select.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Doar salvate', { exact: true })).toBeFocused();
    await expect(page.getByLabel('Doar salvate', { exact: true })).toHaveCSS('outline-style', 'solid');
    await expect(page.getByLabel('Doar salvate', { exact: true })).toHaveCSS('width', '20px');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: info.outputPath(`resource-filters-${width}.png`), fullPage: true });
  }
  await page.goto('/#/comunitate/social');
  await expect(page.locator('.resource-filters')).toHaveCount(0);
  await expect(page.getByRole('combobox', { name: 'Platforma', exact: true })).toHaveValue('Toate');
});

test('shared resource feedback preserves filters, retry and keyboard behavior offline', async ({ page, context }, info) => {
  await page.goto('/#/comunitate/resurse');
  const items = page.locator('.resource-grid .resource-item');
  await expect(items).toHaveCount(5);
  await context.setOffline(true);
  const route = page.url();
  const saved = page.getByRole('checkbox', { name: 'Doar salvate', exact: true });
  const unavailable = page.getByRole('checkbox', { name: 'Scenariu indisponibil', exact: true });
  await saved.focus();
  await page.keyboard.press('Space');
  await expect(saved).toBeChecked();
  await expect(page.locator('.resource-empty .civic-empty')).toHaveText('Nicio resursa gasita.');
  await page.keyboard.press('Space');
  await expect(saved).not.toBeChecked();
  await page.getByLabel('Continut', { exact: true }).selectOption('Articol');
  await expect(items).toHaveCount(2);
  const titles = await items.locator('h3').allTextContents();
  await unavailable.focus();
  await page.keyboard.press('Space');
  await expect(unavailable).toBeChecked();
  const notice = page.getByRole('alert');
  await expect(notice).toHaveClass(/civic-notice/);
  await expect(notice).toContainText('Resurse indisponibile.');
  await expect(items).toHaveCount(0);
  const retry = notice.getByRole('button', { name: 'Reincearca', exact: true });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await retry.focus();
    await expect(retry).toHaveCSS('outline-style', 'solid');
    // Read both positions together so native focus scrolling cannot skew the gap.
    const gap = await notice.evaluate(el => {
      const title = el.querySelector('strong')!.getBoundingClientRect();
      const button = el.querySelector('button')!.getBoundingClientRect();
      return button.top - title.bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(8);
    await retry.hover();
    await expect(retry).toHaveCSS('color', 'rgb(0, 42, 89)');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: info.outputPath(`resource-feedback-${width}.png`), fullPage: true });
  }
  await retry.focus();
  await page.keyboard.press('Enter');
  await expect(notice).toHaveCount(0);
  await expect(unavailable).not.toBeChecked();
  await expect(page.getByLabel('Continut', { exact: true })).toHaveValue('Articol');
  await expect(items.locator('h3')).toHaveText(titles);
  expect(page.url()).toBe(route);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
});
