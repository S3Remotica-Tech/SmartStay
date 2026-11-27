import { test, expect } from '@playwright/test';

// Login page (src/Components/NewLoginPage.jsx) — all test cases in one file.
// Every test starts logged OUT: a logged-in browser never shows the login page.
// TC15 / TC16 log in for real and need E2E_EMAIL / E2E_PASSWORD (.env.e2e or set in cmd);
// without them they are skipped, not failed.
test.use({ storageState: { cookies: [], origins: [] } });

const LOGIN_URL = '/hostel-management-login';

test.describe('Login page', () => {
  let email, password, signIn;

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    email = page.getByTestId('new-login-page-email-input');
    password = page.getByTestId('new-login-page-password-input');
    signIn = page.getByTestId('login-sign-in-btn');
  });

  const hasCredentials = () => Boolean(process.env.E2E_EMAIL && process.env.E2E_PASSWORD);

  test('TC01 page loads with all elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(page.getByText('Sign in to your SmartStay account')).toBeVisible();
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(page.getByTestId('new-login-page-forgot-password-btn')).toBeVisible();
    await expect(page.getByTestId('new-login-page-new-login-remember-checkbox')).not.toBeChecked();
    await expect(signIn).toBeVisible();
    await expect(page.getByTestId('new-login-page-create-account-btn')).toBeVisible();
    // Email box has focus so the user can type straight away
    await expect(email).toBeFocused();
    // Password is hidden by default
    await expect(password).toHaveAttribute('type', 'password');
  });

  test('TC02 empty email and password show both errors', async ({ page }) => {
    await signIn.click();

    await expect(page.getByText('Please Enter Email ID', { exact: true })).toBeVisible();
    await expect(page.getByText('Please Enter Password', { exact: true })).toBeVisible();
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(password).toHaveAttribute('aria-invalid', 'true');
    await expect(page).toHaveURL(/hostel-management-login/);
  });

  test('TC03 missing email shows email error only', async ({ page }) => {
    await password.fill('Any#Pass123');
    await signIn.click();

    await expect(page.getByText('Please Enter Email ID', { exact: true })).toBeVisible();
    await expect(page.getByText('Please Enter Password', { exact: true })).toHaveCount(0);
    await expect(page).toHaveURL(/hostel-management-login/);
  });

  for (const bad of ['abc', 'abc@', 'abc@gmail', '@gmail.com', 'abc gmail.com', 'abc@gmail.c']) {
    test(`TC04 invalid email format "${bad}" shows error`, async ({ page }) => {
      await email.fill(bad);
      await password.fill('Any#Pass123');
      await signIn.click();

      await expect(page.getByText('Please Enter Valid Email ID', { exact: true })).toBeVisible();
      await expect(page).toHaveURL(/hostel-management-login/);
    });
  }

  test('TC05 missing password shows password error only', async ({ page }) => {
    await email.fill('tester@example.com');
    await signIn.click();

    await expect(page.getByText('Please Enter Password', { exact: true })).toBeVisible();
    await expect(page.getByText('Please Enter Email ID', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Please Enter Valid Email ID', { exact: true })).toHaveCount(0);
  });

  test('TC06 errors clear when the user types', async ({ page }) => {
    await signIn.click();
    const emailError = page.getByText('Please Enter Email ID', { exact: true });
    const passwordError = page.getByText('Please Enter Password', { exact: true });
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();

    await email.fill('t');
    await expect(emailError).toHaveCount(0);
    await expect(passwordError).toBeVisible(); // untouched field keeps its error

    await password.fill('p');
    await expect(passwordError).toHaveCount(0);
  });

  test('TC07 email is converted to lowercase', async () => {
    await email.pressSequentially('Tester.Name@Example.COM');
    await expect(email).toHaveValue('tester.name@example.com');
  });

  test('TC08 password show / hide toggle', async ({ page }) => {
    const toggle = page.getByTestId('auth-parts-toggle-btn');

    // No eye icon while the password is empty
    await expect(toggle).toHaveCount(0);

    await password.fill('Secret#123');
    await expect(toggle).toBeVisible();
    await expect(password).toHaveAttribute('type', 'password');
    await expect(toggle).toHaveAttribute('aria-label', 'Show password');

    await toggle.click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(toggle).toHaveAttribute('aria-label', 'Hide password');

    await toggle.click();
    await expect(password).toHaveAttribute('type', 'password');

    // Clearing the password hides the eye icon again
    await password.fill('');
    await expect(toggle).toHaveCount(0);
  });

  test('TC09 remember me checkbox toggles', async ({ page }) => {
    const remember = page.getByTestId('new-login-page-new-login-remember-checkbox');
    await expect(remember).not.toBeChecked();

    await page.getByText('Remember me', { exact: true }).click();
    await expect(remember).toBeChecked();

    await page.getByText('Remember me', { exact: true }).click();
    await expect(remember).not.toBeChecked();
  });

  test('TC10 sign in button is dimmed until both fields are filled', async () => {
    await expect(signIn).toHaveClass(/opacity-40/);

    await email.fill('tester@example.com');
    await expect(signIn).toHaveClass(/opacity-40/);

    await password.fill('Secret#123');
    await expect(signIn).not.toHaveClass(/opacity-40/);
    await expect(signIn).toBeEnabled();
  });

  test('TC11 pressing Enter submits the form', async ({ page }) => {
    await email.fill('not-an-email');
    await password.fill('Secret#123');
    await password.press('Enter');

    await expect(page.getByText('Please Enter Valid Email ID', { exact: true })).toBeVisible();
  });

  test('TC12 forgot password link opens the forgot password page', async ({ page }) => {
    await page.getByTestId('new-login-page-forgot-password-btn').click();

    await expect(page).toHaveURL(/\/forget-password/);
    await expect(page.getByTestId('forgot-password-send-code-btn')).toBeVisible();
  });

  test('TC13 create account link opens the signup page', async ({ page }) => {
    await page.getByTestId('new-login-page-create-account-btn').click();

    await expect(page).toHaveURL(/\/hostel-management-signup/);
    await expect(page.getByTestId('signup-create-account-btn')).toBeVisible();
  });

  test('TC14 wrong credentials show "Invalid email or password"', async ({ page }) => {
    await email.fill('no-such-user-e2e@example.com');
    await password.fill('Wrong#1234');
    await signIn.click();

    const error = page.getByText('Invalid email or password', { exact: true });
    await expect(error).toBeVisible();
    await expect(page).toHaveURL(/hostel-management-login/);
    await expect(page.getByTestId('sidebar-home-link')).toHaveCount(0);

    // The message clears itself after about 2 seconds
    await expect(error).toBeHidden({ timeout: 5000 });
    // Typed values are kept so the user can correct them
    await expect(email).toHaveValue('no-such-user-e2e@example.com');
  });

  test('TC15 valid credentials log in to the dashboard', async ({ page }) => {
    test.skip(!hasCredentials(), 'Set E2E_EMAIL and E2E_PASSWORD');
    await email.fill(process.env.E2E_EMAIL);
    await password.fill(process.env.E2E_PASSWORD);
    await signIn.click();

    await expect(page.getByTestId('sidebar-home-link')).toBeVisible({ timeout: 30_000 });
    await expect(page).not.toHaveURL(/hostel-management-login/);
    // Login token cookie is set
    const cookies = await page.context().cookies();
    expect(cookies.some((c) => c.name === 'v2-token' && c.value)).toBeTruthy();
  });

  test('TC16 remember me keeps the user logged in after reload', async ({ page }) => {
    test.skip(!hasCredentials(), 'Set E2E_EMAIL and E2E_PASSWORD');
    await email.fill(process.env.E2E_EMAIL);
    await password.fill(process.env.E2E_PASSWORD);
    await page.getByText('Remember me', { exact: true }).click();
    await signIn.click();
    await expect(page.getByTestId('sidebar-home-link')).toBeVisible({ timeout: 30_000 });

    // "Remember me" stores the encrypted login flag
    expect(await page.evaluate(() => localStorage.getItem('login'))).toBeTruthy();

    await page.reload();
    await expect(page.getByTestId('sidebar-home-link')).toBeVisible({ timeout: 30_000 });
  });

  test('TC17 google button is visible but disabled', async ({ page }) => {
    const google = page.getByTestId('login-google-btn');
    test.skip((await google.count()) === 0, 'Google button only appears in the development build');
    await expect(google).toBeVisible();
    await expect(google).toBeDisabled();
  });
});
