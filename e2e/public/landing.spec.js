const { test, expect } = require("../support/test");

test.describe("Marketing site", () => {
  test("home page renders hero and CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SmartStay/i);
    await expect(
      page.getByRole("heading", { name: /Run Your Hostel Smarter/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Get Started" }).first()).toBeVisible();
  });

  test("Sign in button opens the login page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign in" }).first().click();
    await expect(page).toHaveURL(/\/hostel-management-login$/);
    await expect(page.getByRole("heading", { name: "Welcome back!" })).toBeVisible();
  });

  const pages = [
    { path: "/hostel-management-features", heading: /Powerful Features/i },
    { path: "/hostel-software-pricing", heading: /Designed for Every Stage of Growth/i },
    { path: "/pg-software-contact", heading: /See Smartstay in Action/i },
    { path: "/thankyou", heading: /Thank You for Booking/i },
  ];
  for (const { path, heading } of pages) {
    test(`${path} renders`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
    });
  }

  test("pricing page shows plans", async ({ page }) => {
    await page.goto("/hostel-software-pricing");
    for (const plan of [/^free trial$/i, /^standard$/i, /^pro$/i]) {
      await expect(page.getByRole("heading", { name: plan }).first()).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Monthly" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Yearly" })).toBeVisible();
  });

  test("contact page shows demo form", async ({ page }) => {
    await page.goto("/pg-software-contact");
    for (const ph of ["Your name", "Your phone", "Your city"]) {
      await expect(page.getByPlaceholder(ph)).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  test("unknown routes redirect to home when signed out", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page).toHaveURL(/\/$/);
  });

  test("protected routes redirect to home when signed out", async ({ page }) => {
    await page.goto("/tenant");
    await expect(page).toHaveURL(/\/$/);
  });
});
