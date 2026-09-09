import { expect, type Page } from "@playwright/test";

export async function civicCompositionIssues(page: Page) {
  return page.locator(".civic-input, .civic-select").evaluateAll((controls) =>
    controls.flatMap((element) => {
      const control = element as HTMLInputElement | HTMLSelectElement;
      const issues = [];
      if (!control.closest(".civic-scope")) issues.push("missing Civic scope");
      if (!control.closest(".civic-field")) issues.push("missing Field");
      if (!control.id || !control.labels?.length)
        issues.push("missing associated label");
      return issues.map((reason) => ({ id: control.id, reason }));
    }),
  );
}

export async function expectCivicComposition(page: Page) {
  expect(await civicCompositionIssues(page)).toEqual([]);
}
