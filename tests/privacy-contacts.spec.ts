import { expect, test } from "@playwright/test";

test("affiliation requires separate opt-in; internal history requires a purpose and administrator persona", async ({
  page,
}) => {
  await page.goto("/#/comunitate/setari");
  const consent = page.getByLabel(
    "Accept explicit publicarea afilierii mele in comunitate",
  );
  await expect(consent).not.toBeChecked();
  await page
    .getByRole("combobox", { name: "Afiliere declarata", exact: true })
    .selectOption("Nu mai este membru");
  await consent.check();
  await page
    .getByRole("link", { name: "Director social", exact: true })
    .click();
  await expect(
    page.getByText("Afiliere declarata: Nu mai este membru"),
  ).toBeVisible();
  await page.getByRole("link", { name: "Setari", exact: true }).click();
  await consent.uncheck();
  await page
    .getByRole("link", { name: "Director social", exact: true })
    .click();
  await expect(
    page.getByText("Afiliere declarata: Nu mai este membru"),
  ).toHaveCount(0);
  await page.getByLabel("Profil demonstrativ").selectOption("Membru Model");
  await expect(
    page.getByRole("combobox", { name: "Afiliere", exact: true }),
  ).toHaveCount(0);
  await page
    .getByLabel("Profil demonstrativ")
    .selectOption("Administrator Model");
  await expect(
    page.getByText("Sustinere anterioara", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("combobox", { name: "Scopul accesului", exact: true })
    .selectOption("Administrarea evidentei");
  await page
    .getByRole("button", { name: "Confirma accesul pentru scopul selectat" })
    .click();
  await page
    .getByRole("combobox", { name: "Afiliere", exact: true })
    .selectOption("Nu mai este membru");
  await expect(
    page.getByText("Sustinere anterioara", { exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("Profil demonstrativ")
    .selectOption("Simpatizant Model");
  await expect(
    page.getByText("Sustinere anterioara", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByLabel("Profil demonstrativ")
    .selectOption("Administrator Model");
  await expect(
    page.getByRole("combobox", { name: "Scopul accesului", exact: true }),
  ).toHaveValue("");
  await expect(
    page.getByRole("combobox", { name: "Afiliere", exact: true }),
  ).toHaveCount(0);
});

test("public contacts support individual fictional drafts without external requests", async ({
  page,
  baseURL,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      new URL(r.url()).origin !== new URL(baseURL!).origin
    )
      external.push(r.url());
  });
  await page.goto("/#/comunitate/contacte-publice");
  await page
    .getByRole("combobox", { name: "Functie", exact: true })
    .selectOption("Viceprimar");
  await page.getByRole("button", { name: "Detalii Viceprimar Model" }).click();
  await expect(
    page.getByText("Registratura institutiei", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pregateste solicitarea" }).click();
  await page.getByRole("button", { name: "Revizuieste draftul" }).click();
  await expect(page.locator(".contact-draft")).toContainText(
    "DRAFT FICTIV - NU TRIMITE",
  );
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descarca draftul fictiv" }).click();
  expect((await download).suggestedFilename()).toBe("solicitare-demo.txt");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await page
    .getByRole("combobox", { name: "Functie", exact: true })
    .selectOption("Conducator de institutie");
  await page.getByRole("button", { name: "Detalii Director Model" }).click();
  await expect(
    page.getByRole("button", { name: "Pregateste solicitarea" }),
  ).toBeDisabled();
  await expect(page.locator(".contact-draft")).toHaveCount(0);
  expect(external).toEqual([]);
});

test("design previews and downloads use the shared USR palette", async ({
  page,
}) => {
  await page.goto("/#/comunitate/design");
  await expect(
    page.getByRole("button", { name: "Albastru USR #002A59" }),
  ).toBeVisible();
  const preview = await page
    .locator(".design-preview")
    .first()
    .getAttribute("src");
  const svg = decodeURIComponent(preview!.split(",").slice(1).join(","));
  expect(svg).toContain("#002A59");
  expect(svg).toContain("#FF0021");
  expect(svg).toContain("font-family:Aileron");
  for (const removed of ["#075f4c", "#243431", "#52665c", "#faf2eb"])
    expect(svg).not.toContain(removed);
  expect(
    await page
      .locator(".member-demo")
      .evaluate((e) => getComputedStyle(e).color),
  ).toBe("rgb(0, 42, 89)");
});
