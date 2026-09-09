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
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: info.outputPath(`resource-filters-${width}.png`), fullPage: true });
  }
  await page.goto('/#/comunitate/social');
  await expect(page.locator('.resource-filters')).toHaveCount(0);
  await expect(page.locator('.civic-scope')).toHaveCount(0);
});
