import { expect, test } from '@playwright/test';
import { expectCivicComposition } from './support/civic-contract';

test('dropdowns reserve arrow space and hover text stays readable', async ({ page }) => {
  await page.goto('/#/membri');
  const profile = page.getByLabel('Profil demonstrativ');
  const padding = await profile.evaluate(e => {
    const s = getComputedStyle(e);
    return { right: parseFloat(s.paddingRight), left: parseFloat(s.paddingLeft) };
  });
  expect(padding.right - padding.left).toBeGreaterThanOrEqual(24);
  for (const control of [page.locator('.header-action--member'), page.getByRole('button', { name: 'Resetează demonstrația' })]) {
    await control.hover();
    const contrast = await control.evaluate(e => {
      const luminance = (rgb: string) => {
        const channels = (rgb.match(/[\d.]+/g) || []).slice(0, 3).map(Number).map(v => {
          const c = v / 255;
          return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
        });
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
      };
      const style = getComputedStyle(e);
      let parent: Element | null = e;
      let bg = style.backgroundColor;
      while (bg === 'rgba(0, 0, 0, 0)' && parent?.parentElement) {
        parent = parent.parentElement;
        bg = getComputedStyle(parent).backgroundColor;
      }
      const a = luminance(style.color), b = luminance(bg);
      return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    });
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  }
  await page.getByRole('link', { name: 'Participare', exact: true }).click();
  const tab = page.getByRole('button', { name: 'Alegeri', exact: true });
  const before = await tab.boundingBox();
  await tab.click();
  const after = await tab.boundingBox();
  expect(after?.height).toBe(before?.height);
});

test('member workflows remain local and reset without retaining preferences', async ({ page, baseURL }) => {
  const external: string[] = [];
  const errors: string[] = [];
  page.on('request', r => { if (new URL(r.url()).origin !== new URL(baseURL!).origin) external.push(r.url()); });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/#/membri/setari');
  const visibility = page.getByLabel('Afișează profilul fictiv în director');
  await expect(visibility).not.toBeChecked();
  await visibility.check();
  await page.getByLabel('Scenariu eroare la salvare').check();
  await page.getByRole('button', { name: 'Salvează preferința' }).click();
  await expect(page.getByText('Stare salvată: Ascuns')).toBeVisible();
  await page.getByLabel('Scenariu eroare la salvare').uncheck();
  await page.getByRole('button', { name: 'Salvează preferința' }).click();
  await expect(page.getByText('Stare salvată: Vizibil')).toBeVisible();
  await page.getByRole('link', { name: 'Cotizații', exact: true }).click();
  await page.getByRole('button', { name: 'Simulează plata' }).click();
  await page.getByRole('button', { name: 'Confirmă simularea' }).click();
  await expect(page.getByRole('cell', { name: 'În așteptare', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Simulează plata' })).toBeDisabled();
  await page.getByRole('link', { name: 'Participare', exact: true }).click();
  await page.getByRole('link', { name: /Programul întâlnirilor interne/ }).click();
  await page.getByLabel('În weekend', { exact: true }).check();
  await page.getByRole('button', { name: 'Revizuiește alegerea' }).click();
  await page.getByRole('button', { name: 'Confirmă în demonstrație' }).click();
  await expect(page.getByText('Răspuns fictiv înregistrat: În weekend')).toBeVisible();
  await page.getByRole('link', { name: 'Calendar', exact: true }).click();
  await page.getByRole('link', { name: /Adunarea filialei/ }).click();
  await page.getByRole('button', { name: 'Confirmă participarea simulată' }).click();
  await expect(page.getByText('Participare confirmată în demonstrație.')).toBeVisible();
  const calendar = page.waitForEvent('download');
  await page.getByRole('button', { name: /Calendar .ics/ }).click();
  expect((await calendar).suggestedFilename()).toBe('adunare-demo.ics');
  await page.getByRole('link', { name: 'Documente', exact: true }).click();
  await page.getByLabel('Caută documente').fill('zzzz');
  await expect(page.getByText('Niciun document găsit.')).toBeVisible();
  await page.getByLabel('Caută documente').fill('');
  await page.getByLabel('Scenariu indisponibil').check();
  await page.getByRole('button', { name: 'Reîncearcă' }).click();
  await page.getByRole('link', { name: /Raport administrativ/ }).click();
  await expect(page.getByText('Acces rezervat profilului Administrator Model.')).toBeVisible();
  await page.getByLabel('Profil demonstrativ').selectOption('Administrator Model');
  const document = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descarcă exemplul' }).click();
  expect((await document).suggestedFilename()).toBe('raport-fictiv.txt');
  await page.getByRole('button', { name: 'Resetează demonstrația' }).click();
  await page.getByRole('link', { name: 'Setări', exact: true }).click();
  await expect(visibility).not.toBeChecked();
  await expect(page.getByText('Stare salvată: Ascuns')).toBeVisible();
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

for (const width of [390, 1440]) {
  test(`all member routes render without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    for (const route of ['', 'cotizatii', 'calendar', 'documente', 'participare', 'organizatie', 'media', 'setari']) {
      await page.goto('/#/membri' + (route ? '/' + route : ''));
      await expect(page.getByRole('heading', { name: 'Spațiul meu' })).toBeVisible();
      await expectCivicComposition(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `/tmp/usr-member-${width}-${route || 'home'}.png`, fullPage: true });
    }
    await page.goto('/#/implica-te');
    await expect(page.getByRole('heading', { name: 'Spațiul meu' })).toBeVisible();
    await page.goto('/#/membri/documente/absent');
    await expect(page.getByRole('heading', { name: 'Pagină indisponibilă' })).toBeVisible();
  });
}
