const { expect } = require("@playwright/test");

/** Fill and submit the login form at /hostel-management-login. */
async function fillLoginForm(page, { email, password, staySignedIn = true }) {
  await page.goto("/hostel-management-login");
  await page.getByPlaceholder("Enter Email ID").fill(email);
  await page.getByPlaceholder("Enter Password").fill(password);
  const stay = page.getByLabel("Stay signed in");
  if (staySignedIn && !(await stay.isChecked())) await stay.check();
  await page.getByRole("button", { name: "Sign in" }).click();
}

/** Log in and wait until the authenticated shell (dashboard) is shown. */
async function login(page, creds) {
  await fillLoginForm(page, creds);
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
}

module.exports = { fillLoginForm, login };
