const { test: setup, expect } = require("@playwright/test");
const { requireCredentials } = require("./support/credentials");
const { login } = require("./support/login");

const authFile = "e2e/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await login(page, requireCredentials());
  // Sidebar persists the session (login / IsEnable) into localStorage after
  // the account list loads; wait for it before snapshotting storage.
  await expect
    .poll(() => page.evaluate(() => !!localStorage.getItem("IsEnable")), {
      timeout: 30_000,
    })
    .toBe(true);
  await page.context().storageState({ path: authFile });
});
