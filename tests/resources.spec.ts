import { expect, test } from '@playwright/test';

test('supporters can explore resources without exposing private social profiles', async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on('request', r => { if (/^https?:/.test(r.url()) && new URL(r.url()).origin !== new URL(baseURL!).origin) external.push(r.url()); });
  await page.goto('/#/comunitate');
  await expect(page.getByRole('heading', { name: 'Resurse si lectura' })).toBeVisible();
  await expect(page.getByLabel('Profil demonstrativ')).toHaveValue('Simpatizant Model');
  await expect(page.getByRole('link', { name: 'Cotizatii', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Salveaza Invitatie la intalnirea de organizare', exact: true }).click();
  await page.getByRole('button', { name: 'Apreciere simulata: Invitatie la intalnirea de organizare', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Apreciere simulata: Invitatie la intalnirea de organizare', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Comentariu demonstrativ: Invitatie la intalnirea de organizare', exact: true }).click();
  await page.getByRole('button', { name: 'Adauga comentariul demonstrativ' }).click();
  await expect(page.getByText('Comentariu local: Exemplul este clar.')).toBeVisible();
  await page.getByLabel('Doar salvate').check();
  await expect(page.locator('.resource-item')).toHaveCount(1);
  await page.getByRole('link', { name: 'Setari', exact: true }).click();
  await page.getByRole('button', { name: 'Adauga profil fictiv LinkedIn', exact: true }).click();
  await expect(page.getByLabel('Vizibilitate LinkedIn')).toHaveValue('Doar eu');
  await page.getByRole('link', { name: 'Director social', exact: true }).click();
  await expect(page.getByText('Niciun profil personal distribuit public.')).toBeVisible();
  await page.getByRole('link', { name: 'Setari', exact: true }).click();
  await page.getByLabel('Vizibilitate LinkedIn').selectOption('Public');
  await page.getByRole('link', { name: 'Director social', exact: true }).click();
  await expect(page.getByText('LinkedIn: @profil-model-demo', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Platforma', exact: true }).selectOption('Facebook');
  await expect(page.getByRole('heading', { name: 'Grupul oficial al filialei Model' })).toBeVisible();
  await page.getByLabel('Stare pentru Grupul oficial al filialei Model').selectOption('Urmaresc');
  await page.getByRole('combobox', { name: 'Urmarire', exact: true }).selectOption('Urmaresc');
  await expect(page.locator('.channel-list > article')).toHaveCount(1);
  await expect(page.getByRole('combobox', { name: 'Afiliere', exact: true })).toHaveCount(0);
  await expect(page.getByText('Consilier local - mandat in curs').first()).toBeVisible();
  await expect(page.getByText('Nu mai este membru', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Sustinere anterioara', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /unfollow/i })).toHaveCount(0);
  await page.getByRole('button', { name: 'Reseteaza demonstratia' }).click();
  await expect(page.getByText('Niciun profil personal distribuit public.')).toBeVisible();
  await page.getByRole('link', { name: 'Resurse', exact: true }).click();
  await page.getByLabel('Doar salvate').check();
  await expect(page.getByText('Nicio resursa gasita.')).toBeVisible();
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  expect(external).toEqual([]);
  await page.goto('/#/comunitate/cotizatii');
  await expect(page.getByRole('heading', { name: 'Zona rezervata membrilor' })).toBeVisible();
});

test('design downloads, resource states and project interest remain synthetic', async ({ page }) => {
  await page.goto('/#/comunitate/design');
  const image = page.locator('.design-preview').first();
  await expect(image).toBeVisible();
  expect(await image.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth === 1080)).toBe(true);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descarca SVG editabil' }).first().click();
  expect((await download).suggestedFilename()).toBe('sablon-demo.svg');
  await page.getByRole('link', { name: 'Proiecte', exact: true }).click();
  await page.getByRole('combobox', { name: 'Competenta', exact: true }).selectOption('Dezvoltare');
  await page.getByRole('button', { name: 'Marcheaza interesul demonstrativ' }).click();
  await expect(page.getByRole('button', { name: 'Retrage interesul demonstrativ' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('link', { name: 'Resurse', exact: true }).click();
  await page.getByLabel('Scenariu indisponibil').check();
  await page.getByRole('button', { name: 'Reincearca' }).click();
  await page.getByLabel('Cauta resurse').fill('editiei precedente');
  await page.getByRole('button', { name: 'Vezi detalii' }).click();
  await expect(page.getByRole('button', { name: 'Descarca exemplul' })).toBeDisabled();
  await page.getByRole('button', { name: 'Inchide detaliile' }).click();
  await expect(page.getByRole('region', { name: 'Detalii resursa' })).toHaveCount(0);
});

for (const width of [390, 1440]) {
  test(`community routes fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    for (const section of ['resurse', 'social', 'design', 'proiecte', 'setari', 'contacte-publice']) {
      await page.goto('/#/comunitate/' + section);
      await expect(page.getByRole('heading', { name: 'Spatiul meu' })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `/tmp/usr-member-${width}-community-${section}.png`, fullPage: true });
    }
  });
}
