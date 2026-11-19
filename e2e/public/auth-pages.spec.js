const { test, expect } = require("../support/test");
const { requireCredentials } = require("../support/credentials");
const { fillLoginForm, login } = require("../support/login");

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hostel-management-login");
  });

  test("renders the form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome back!" })).toBeVisible();
    await expect(page.getByPlaceholder("Enter Email ID")).toBeFocused();
    await expect(page.getByPlaceholder("Enter Password")).toHaveAttribute("type", "password");
    await expect(page.getByLabel("Stay signed in")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeEnabled();
  });

  test("shows required errors when submitted empty", async ({ page }) => {
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Please Enter Email ID")).toBeVisible();
    await expect(page.getByText("Please Enter Password")).toBeVisible();
  });

  test("shows password error when only email is entered", async ({ page }) => {
    await page.getByPlaceholder("Enter Email ID").fill("someone@example.com");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Please Enter Password")).toBeVisible();
    await expect(page.getByText("Please Enter Email ID")).toHaveCount(0);
  });

  test("toggles password visibility", async ({ page }) => {
    const pwd = page.getByPlaceholder("Enter Password");
    await pwd.fill("secret");
    // The eye icon is the sibling right after the password input.
    await pwd.locator("xpath=following-sibling::div[1]").click();
    await expect(pwd).toHaveAttribute("type", "text");
    await pwd.locator("xpath=following-sibling::div[1]").click();
    await expect(pwd).toHaveAttribute("type", "password");
  });

  test("rejects a wrong password", async ({ page }) => {
    const { email } = requireCredentials();
    await fillLoginForm(page, { email, password: "Wrong-Password-123!", staySignedIn: false });
    // The banner auto-clears after ~2s, so assert promptly.
    await expect(page.getByText("Invalid email or password")).toBeVisible();
    await expect(page).toHaveURL(/\/hostel-management-login$/);
  });

  test("links to forgot password and sign up", async ({ page }) => {
    await page.getByText("Forgot Password?").click();
    await expect(page).toHaveURL(/\/forget-password$/);
    await page.goto("/hostel-management-login");
    await page.getByText("Create an account").click();
    await expect(page).toHaveURL(/\/hostel-management-signup$/);
  });

  test("valid credentials sign in to the dashboard", async ({ page }) => {
    await login(page, requireCredentials());
    await expect(
      page.locator(".sidebar-label").getByText("Home", { exact: true }),
    ).toBeVisible();
    const cookies = await page.context().cookies();
    expect(cookies.some((c) => c.name === "v2-token" && c.value)).toBe(true);
  });
});

test.describe("Forgot password page", () => {
  test("validates the email field", async ({ page }) => {
    await page.goto("/forget-password");
    await expect(page.getByRole("heading", { name: "Forgot Password?" })).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByText("Please Enter Email Id")).toBeVisible();
  });

  test("Sign in link returns to login", async ({ page }) => {
    await page.goto("/forget-password");
    await page.getByText("Sign in", { exact: true }).click();
    await expect(page).toHaveURL(/\/hostel-management-login$/);
  });
});

test.describe("Sign up page", () => {
  test("shows all required-field errors", async ({ page }) => {
    await page.goto("/hostel-management-signup");
    await expect(page.getByText("Create your free account")).toBeVisible();
    await page.getByRole("button", { name: "Create account" }).click();
    for (const msg of [
      "Please Enter First Name",
      "Please Enter Email ID",
      "Please Enter Mobile No",
      "Please Enter Password",
      "Please Enter Confirm Password",
    ]) {
      await expect(page.getByText(msg, { exact: true })).toBeVisible();
    }
  });

  test("Sign in link returns to login", async ({ page }) => {
    await page.goto("/hostel-management-signup");
    await page.getByText("Sign in", { exact: true }).click();
    await expect(page).toHaveURL(/\/hostel-management-login$/);
  });
});
