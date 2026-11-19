const { test, expect } = require("../support/test");
const { requireCredentials } = require("../support/credentials");
const { login } = require("../support/login");

// Uses its own fresh login (not the shared storage state) and runs after the
// "app" project so logging out can't invalidate the session other tests use.
test.describe("Logout", () => {
  test("cancel keeps the user signed in", async ({ page }) => {
    await login(page, requireCredentials());
    await page.goto("/settings/general");
    await page.getByRole("button", { name: "Logout" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("Are you sure you want Logout?")).toBeVisible();
    await dialog.getByRole("button", { name: "Cancel" }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/settings\/general$/);
  });

  test("confirming logs out and protects app routes", async ({ page }) => {
    await login(page, requireCredentials());
    await page.goto("/settings/general");
    await page.getByRole("button", { name: "Logout" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Logout" }).click();

    await expect(page).not.toHaveURL(/\/settings|\/dashboard/, { timeout: 30_000 });

    await page.goto("/tenant");
    await expect(page).toHaveURL(/\/$/);
  });
});
