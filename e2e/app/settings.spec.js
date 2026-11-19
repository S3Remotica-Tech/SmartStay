const { test, expect } = require("../support/test");

/** Settings sub-pages are deep-linkable; each check is read-only. */
const pages = [
  { path: "general", button: "+ Create Master" },
  { path: "manage-pg", button: "+ PG" },
  { path: "security", heading: "Enable Two-factor Authentication" },
  { path: "subscription", heading: "Billing History" },
  { path: "integration", heading: "Coming Soon" },
  { path: "electricity", heading: "Electricity Calculation Type" },
  { path: "electricity-rule", heading: "Billing Preview" },
  { path: "billing-rule", button: "Coming Soon" },
  { path: "long-stay-recurring", heading: "Basic Billing Configuration" },
  { path: "notifications" },
  { path: "invoice", heading: "Global Bill Setting" },
  { path: "bill-templates", button: "Receipt", nav: false },
  { path: "expenses", button: "+ Category" },
  { path: "vendor-category", button: "+ Vendor Category" },
  { path: "complaints", button: "+ Complaint Type" },
  { path: "amenities", button: "+ Amenities" },
  { path: "user", button: "+ Staff" },
  { path: "role", button: "Create Role" },
  { path: "agreement", heading: "Agreements & Policies" },
  { path: "tenant-app-controls" },
];

const settingsNav = [
  "General", "Organization", "PG Configuration",
  "Lists & Categories", "User Management", "Tenant App Controls",
];

test.describe("Settings", () => {
  for (const p of pages) {
    test(`${p.path} page loads`, async ({ page }) => {
      await page.goto(`/settings/${p.path}`);
      await expect(page).toHaveURL(new RegExp(`/settings/${p.path}$`));
      await expect(page.getByRole("button", { name: "Close Settings" })).toBeVisible({ timeout: 30_000 });
      if (p.nav !== false) {
        for (const name of settingsNav) {
          await expect(page.getByRole("button", { name, exact: true })).toBeVisible();
        }
      }
      if (p.heading) {
        await expect(page.getByRole("heading", { name: p.heading }).first()).toBeVisible();
      }
      if (p.button) {
        await expect(page.getByRole("button", { name: p.button, exact: true }).first()).toBeVisible();
      }
    });
  }

  test("Close Settings returns to the app", async ({ page }) => {
    await page.goto("/settings/general");
    await page.getByRole("button", { name: "Close Settings" }).click();
    await expect(page).not.toHaveURL(/\/settings/);
    await expect(page.locator(".sidebar-label").getByText("Home", { exact: true })).toBeVisible();
  });
});
