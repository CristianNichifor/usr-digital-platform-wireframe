import { expect, test } from '@playwright/test';

test('project skill filtering preserves interest, guides, downloads and reset', async ({ page, baseURL }) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(baseURL!).origin) external.push(request.url());
  });
  await page.goto('/#/comunitate/proiecte');
  const skill = page.getByRole('combobox', { name: 'Competenta', exact: true });
  const projects = page.locator('.resource-grid .resource-item');
  await expect(projects).toHaveCount(3);
  await expect(skill.locator('option')).toHaveText(['Toate', 'Documentare', 'Dezvoltare', 'Traducere']);
  for (const [value, title] of [
    ['Documentare', 'Index de documente Model'],
    ['Dezvoltare', 'Componente accesibile Model'],
    ['Traducere', 'Ghid de contributii Model'],
  ]) {
    await skill.selectOption(value);
    await expect(projects).toHaveCount(1);
    await expect(projects.getByRole('heading', { level: 3 })).toHaveText(title);
  }
  await skill.selectOption('Dezvoltare');
  await page.getByRole('button', { name: 'Marcheaza interesul demonstrativ', exact: true }).click();
  await skill.selectOption('Toate');
  await expect(projects).toHaveCount(3);
  await skill.selectOption('Dezvoltare');
  const withdraw = page.getByRole('button', { name: 'Retrage interesul demonstrativ', exact: true });
  await expect(withdraw).toHaveAttribute('aria-pressed', 'true');
  await withdraw.click();
  await expect(page.getByRole('button', { name: 'Marcheaza interesul demonstrativ', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await page.getByText('Ghid de contributie', { exact: true }).click();
  await expect(page.getByText('Citeste descrierea si criteriile sarcinii.')).toBeVisible();
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descarca sarcina', exact: true }).click();
  expect((await downloaded).suggestedFilename()).toBe('access-contributie-demo.md');
  await page.getByRole('button', { name: 'Marcheaza interesul demonstrativ', exact: true }).click();
  await page.getByRole('button', { name: 'Reseteaza demonstratia', exact: true }).click();
  await expect(skill).toHaveValue('Toate');
  await expect(projects).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Retrage interesul demonstrativ', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('project filter keeps keyboard focus, branding and responsive layouts', async ({ page }, info) => {
  await page.goto('/#/comunitate/proiecte');
  const skill = page.getByRole('combobox', { name: 'Competenta', exact: true });
  await expect(page.locator('.project-filter .civic-field')).toHaveCount(1);
  await expect(page.locator('.project-filter .civic-select')).toHaveCount(1);
  await expect(page.locator('.resource-grid .civic-scope')).toHaveCount(0);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    await skill.focus();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Ghid de contributie', { exact: true }).first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(skill).toBeFocused();
    await expect(skill).toHaveCSS('outline-style', 'solid');
    await expect(skill).toHaveCSS('padding-right', '44px');
    await expect(skill).toHaveCSS('color', 'rgb(0, 42, 89)');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: info.outputPath(`project-filter-${width}.png`), fullPage: true });
  }
  await page.goto('/#/comunitate/setari');
  await expect(page.locator('.project-filter')).toHaveCount(0);
  await expect(page.getByLabel('Accept explicit publicarea afilierii mele in comunitate')).not.toBeChecked();
});
