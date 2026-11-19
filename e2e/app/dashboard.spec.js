const { test, expect } = require("../support/test");
const { openApp } = require("../support/nav");

test.describe("Dashboard", () => {
  test("shows sidebar and key widgets", async ({ page }) => {
    const sidebar = await openApp(page);
    for (const label of [
      "Home", "Manage", "Banking", "Billing & Payments",
      "Electricity", "Service Desk", "Expenses", "Reports",
    ]) {
      await expect(sidebar.getByText(label, { exact: true }).first()).toBeVisible();
    }
    for (const heading of ["Rooms & Beds", "Sharing Breakdown", "Occupancy", "Tenants"]) {
      await expect(page.getByRole("heading", { name: heading, exact: true }).first()).toBeVisible();
    }
    await expect(page.getByRole("button", { name: /Upcoming Check-ins/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Overdue Invoices/ })).toBeVisible();
  });

  test("Home link returns to the hostel dashboard", async ({ page }) => {
    const sidebar = await openApp(page);
    await expect(async () => {
      await sidebar.getByText("Home", { exact: true }).click();
      await expect(page).toHaveURL(/\/dashboard\/[\w-]+$/, { timeout: 5_000 });
    }).toPass({ timeout: 30_000 });
  });

  test("session survives a page reload", async ({ page }) => {
    await openApp(page);
    await page.reload();
    await expect(
      page.locator(".sidebar-label").getByText("Home", { exact: true }),
    ).toBeVisible({ timeout: 30_000 });
    await expect(page).not.toHaveURL(/hostel-management-login/);
  });
});
