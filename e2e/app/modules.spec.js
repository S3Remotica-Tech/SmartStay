const { test, expect } = require("../support/test");
const { goToModule } = require("../support/nav");

/**
 * Every main sidebar module: navigate through the sidebar, check the route,
 * and check the module's main UI (primary action / table columns) renders.
 * These tests are read-only — they never submit forms against the API.
 */
const modules = [
  {
    name: "Paying Guest",
    group: "Manage",
    url: /\/paying-guest\//,
    buttons: ["+ Floor"],
    text: ["Occupied", "Vacant"],
  },
  {
    name: "Tenant",
    group: "Manage",
    url: /\/tenant\//,
    buttons: ["Tenants", "Walk-in", "Check-out", "Add Tenant"],
  },
  { name: "Assets", group: "Manage", url: /\/asset\//, buttons: ["+ Asset"] },
  { name: "Vendor", group: "Manage", url: /\/vendor\//, buttons: ["Add Vendor"] },
  { name: "Banking", url: /\/banking\//, buttons: ["Add Transaction"] },
  {
    name: "Bills",
    group: "Billing & Payments",
    url: /\/invoice\//,
    buttons: ["+ Create Invoice"],
  },
  {
    name: "Retainer Invoice",
    group: "Billing & Payments",
    url: /\/retainer-invoice\//,
    columns: ["INV NO", "STATUS", "TENANT NAME"],
  },
  {
    name: "Recurring bills",
    group: "Billing & Payments",
    url: /\/recurring\//,
    buttons: ["Long Stay", "Short Stay"],
  },
  {
    name: "Receipts",
    group: "Billing & Payments",
    url: /\/receipts\//,
    columns: ["RECEIPT NO", "FULL NAME", "PAYMENT MODE", "AMOUNT"],
  },
  {
    name: "Electricity",
    url: /\/electricity\//,
    columns: ["FLOOR", "ROOM", "TOTAL UNITS", "AMOUNT"],
  },
  {
    name: "Compliants", // sic — matches the sidebar label
    group: "Service Desk",
    url: /\/compliance\//,
    buttons: ["+ Complaint"],
  },
  {
    // Only shown in development builds (Sidebar `isDevelopment`).
    name: "Requests",
    group: "Service Desk",
    url: /\/requests\//,
    buttons: ["Current", "Completed"],
  },
  {
    name: "Expenses",
    url: /\/expense\//,
    columns: ["DATE", "CATEGORY", "VENDOR", "STATUS"],
  },
  {
    name: "Reports",
    url: /\/reports\//,
    buttons: ["Operational Reports", "Analytical Reports"],
  },
];

test.describe("Sidebar modules", () => {
  for (const m of modules) {
    test(`${m.name} page loads`, async ({ page }) => {
      await goToModule(page, { group: m.group, label: m.name, url: m.url });
      for (const name of m.buttons ?? []) {
        await expect(page.getByRole("button", { name, exact: true }).first()).toBeVisible();
      }
      for (const col of m.columns ?? []) {
        // Headers are uppercased via CSS (accessible name is title-case), and
        // sortable ones append a sort icon's alt text, e.g. "Floor swap".
        await expect(
          page.getByRole("columnheader", { name: new RegExp(`^${col}(\\s|$)`, "i") }).first(),
        ).toBeVisible();
      }
      for (const t of m.text ?? []) {
        await expect(page.getByText(t, { exact: true }).first()).toBeVisible();
      }
    });
  }
});

test.describe("Module tabs", () => {
  const tabbed = [
    { name: "Tenant", group: "Manage", url: /\/tenant\//, tabs: ["Walk-in", "Check-out", "Tenants"] },
    { name: "Recurring bills", group: "Billing & Payments", url: /\/recurring\//, tabs: ["Short Stay", "Long Stay"] },
    { name: "Requests", group: "Service Desk", url: /\/requests\//, tabs: ["Completed", "Current"] },
  ];
  for (const m of tabbed) {
    test(`${m.name} tabs switch without errors`, async ({ page }) => {
      await goToModule(page, { group: m.group, label: m.name, url: m.url });
      for (const tab of m.tabs) {
        await page.getByRole("button", { name: tab, exact: true }).first().click();
        await expect(page).toHaveURL(m.url);
        await expect(page.getByRole("button", { name: tab, exact: true }).first()).toBeVisible();
      }
    });
  }
});
