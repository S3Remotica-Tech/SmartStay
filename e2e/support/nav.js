const { expect } = require("@playwright/test");

/**
 * The Sidebar runs a redirect effect on load (to the last visited page /
 * hostel-scoped dashboard), so a click fired too early can be overridden.
 * Load the app, wait for the shell to settle, then click with retries until
 * the expected URL sticks.
 */
async function openApp(page) {
  await page.goto("/dashboard");
  const sidebar = page.locator(".sidebar-label");
  await expect(sidebar.getByText("Home", { exact: true })).toBeVisible({
    timeout: 30_000,
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  return sidebar;
}

/**
 * Navigate via the sidebar.
 * @param {import('@playwright/test').Page} page
 * @param {{ group?: string, label: string, url: RegExp }} target
 */
async function goToModule(page, { group, label, url }) {
  const sidebar = await openApp(page);
  await expect(async () => {
    if (group) {
      const item = sidebar.getByText(label, { exact: true }).first();
      if (!(await item.isVisible())) {
        await sidebar.getByText(group, { exact: true }).click();
      }
    }
    await sidebar.getByText(label, { exact: true }).first().click();
    await expect(page).toHaveURL(url, { timeout: 5_000 });
  }).toPass({ timeout: 45_000, intervals: [1_000, 2_000, 3_000] });
  await page.waitForLoadState("networkidle").catch(() => {});
}

module.exports = { openApp, goToModule };
