import { test, expect } from '@playwright/test';

// Signup page (src/Components/NewSignupPage.jsx) — all test cases in one file.
// Every test starts logged OUT. Valid form → "Verify OTP" step; email OTP is not live
// yet, so the page shows a demo code, which these tests read and type.
// TC17 needs E2E_EMAIL (an existing account) — the server rejects it, nothing is created.
// TC18 really CREATES an account on the backend → runs only when E2E_ALLOW_SIGNUP=true.
test.use({ storageState: { cookies: [], origins: [] } });

const SIGNUP_URL = '/hostel-management-signup';
const runId = () => Date.now().toString().slice(-8);

test.describe('Signup page', () => {
  let fullName, mobile, email, password, agree, createAccount;

  test.beforeEach(async ({ page }) => {
    await page.goto(SIGNUP_URL);
    fullName = page.getByTestId('new-signup-page-your-name-input');
    mobile = page.getByTestId('new-signup-page-78654-98732-input');
    email = page.getByTestId('new-signup-page-email-input');
    password = page.getByTestId('new-signup-page-minimum-8-characters-input');
    agree = page.getByTestId('new-signup-page-signup-agree-checkbox');
    createAccount = page.getByTestId('signup-create-account-btn');
  });

  // The "I agree" checkbox sits at the bottom edge of the form's scroll area and
  // Playwright never sees it as "stable" there, so it is ticked with force: true.
  // Fills a valid form (each value can be overridden), ticks "I agree".
  const fillValidForm = async (values = {}) => {
    const id = runId();
    const data = {
      name: 'Test User',
      mobile: `9${id.padStart(9, '1')}`,
      email: `e2e.signup.${id}@example.com`,
      password: 'Test@1234',
      ...values,
    };
    await fullName.fill(data.name);
    await mobile.fill(data.mobile);
    await email.fill(data.email);
    await password.fill(data.password);
    await agree.check({ force: true });
    return data;
  };

  // On the OTP step: reads the demo code shown on screen.
  const demoCode = async (page) =>
    (await page.getByText('Demo code:').locator('strong').innerText()).trim();

  const typeOtp = async (page, code) => {
    await page.getByTestId('otp-parts-code-input-0').click();
    await page.keyboard.type(code);
  };

  test('TC01 page loads with all elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: "Let's get started" })).toBeVisible();
    await expect(page.getByText('Start your 30-Day free trial')).toBeVisible();
    await expect(fullName).toBeVisible();
    await expect(mobile).toBeVisible();
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(password).toHaveAttribute('type', 'password');
    await expect(agree).not.toBeChecked();
    await expect(createAccount).toBeVisible();
    await expect(page.getByTestId('new-signup-page-sign-in-btn')).toBeVisible();
    // Full Name has focus so the user can type straight away
    await expect(fullName).toBeFocused();
  });

  test('TC02 Create Account is disabled until "I agree" is ticked', async () => {
    await expect(createAccount).toBeDisabled();
    await agree.check({ force: true });
    await expect(createAccount).toBeEnabled();
    await agree.uncheck({ force: true });
    await expect(createAccount).toBeDisabled();
  });

  test('TC03 empty form shows all required errors', async ({ page }) => {
    await agree.check({ force: true });
    await createAccount.click();

    await expect(page.getByText('Please Enter Full Name', { exact: true })).toBeVisible();
    await expect(page.getByText('Please Enter Mobile No', { exact: true })).toBeVisible();
    await expect(page.getByText('Please Enter Email ID', { exact: true })).toBeVisible();
    await expect(page.getByText('Please Enter Password', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/hostel-management-signup/);
  });

  test('TC04 full name accepts only letters and spaces', async ({ page }) => {
    await fullName.pressSequentially('Ravi123 Kumar@#');
    await expect(fullName).toHaveValue('Ravi Kumar');

    // Only spaces is not accepted as a name
    await fullName.fill('');
    await fullName.pressSequentially('   ');
    await expect(fullName).toHaveValue('');

    // Typing clears the "required" error
    await agree.check({ force: true });
    await createAccount.click();
    await expect(page.getByText('Please Enter Full Name', { exact: true })).toBeVisible();
    await fullName.pressSequentially('A');
    await expect(page.getByText('Please Enter Full Name', { exact: true })).toHaveCount(0);
  });

  test('TC05 mobile accepts only digits, maximum 10', async () => {
    await mobile.pressSequentially('98a76-54321099');
    await expect(mobile).toHaveValue('9876543210');
  });

  test('TC06 mobile shows an error until it has 10 digits', async ({ page }) => {
    const error = page.getByText('Please Enter Valid Mobile Number', { exact: true });
    await mobile.pressSequentially('98765');
    await expect(error).toBeVisible();
    await mobile.pressSequentially('43210');
    await expect(error).toHaveCount(0);
  });

  for (const bad of ['0123456789', '0000000000']) {
    test(`TC07 mobile "${bad}" is rejected on submit`, async ({ page }) => {
      await fillValidForm({ mobile: bad });
      await createAccount.click();
      await expect(page.getByText('Please Enter Valid Mobile Number', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Verify OTP' })).toHaveCount(0);
    });
  }

  test('TC08 email is lowercased and checked while typing', async ({ page }) => {
    const error = page.getByText('Please Enter Valid Email ID', { exact: true });
    await email.pressSequentially('Test.User@Gmail');
    await expect(email).toHaveValue('test.user@gmail');
    await expect(error).toBeVisible();

    await email.pressSequentially('.com');
    await expect(email).toHaveValue('test.user@gmail.com');
    await expect(error).toHaveCount(0);
  });

  for (const bad of ['abc', 'abc@', '@gmail.com', 'abc@gmail.c']) {
    test(`TC09 invalid email "${bad}" is rejected on submit`, async ({ page }) => {
      await fillValidForm({ email: bad });
      await createAccount.click();
      await expect(page.getByText('Please Enter Valid Email ID', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Verify OTP' })).toHaveCount(0);
    });
  }

  test('TC10 password rules are shown until the password is strong', async ({ page }) => {
    await password.fill('abc');
    await expect(page.getByText('8 characters minimum')).toBeVisible();
    await expect(page.getByText('One uppercase and lowercase')).toBeVisible();
    await expect(page.getByText('Numeric and Special symbols')).toBeVisible();

    await password.fill('Abc def#1');
    await expect(page.getByText('Password cannot contain spaces.')).toBeVisible();

    await password.fill('Abcdef@1');
    await expect(page.getByText('8 characters minimum')).toHaveCount(0);
    await expect(page.getByText('One uppercase and lowercase')).toHaveCount(0);
    await expect(page.getByText('Numeric and Special symbols')).toHaveCount(0);
    await expect(page.getByText('Password cannot contain spaces.')).toHaveCount(0);
  });

  test('TC10b only @ $ ! % * ? & count as special symbols (# does not)', async ({ page }) => {
    // App rule (passwordChecks): numberSymbol = a digit AND one of @$!%*?&
    await password.fill('Abcdef#1');
    await expect(page.getByText('Numeric and Special symbols')).toBeVisible();
    for (const ok of ['Abcdef@1', 'Abcdef$1', 'Abcdef!1', 'Abcdef%1', 'Abcdef*1', 'Abcdef?1', 'Abcdef&1']) {
      await password.fill(ok);
      await expect(page.getByText('Numeric and Special symbols')).toHaveCount(0);
    }
  });

  test('TC11 weak password blocks submit', async ({ page }) => {
    await fillValidForm({ password: 'weakpass' });
    await createAccount.click();
    await expect(page.getByText('One uppercase and lowercase')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Verify OTP' })).toHaveCount(0);
  });

  test('TC12 password show / hide toggle', async ({ page }) => {
    const toggle = page.getByTestId('auth-parts-toggle-btn');
    await expect(toggle).toHaveCount(0);

    await password.fill('Test@1234');
    await expect(password).toHaveAttribute('type', 'password');
    await toggle.click();
    await expect(password).toHaveAttribute('type', 'text');
    await toggle.click();
    await expect(password).toHaveAttribute('type', 'password');
  });

  test('TC13 coming-soon fields are disabled and Privacy Policy opens in a new tab', async ({ page }) => {
    await expect(page.getByTestId('new-signup-page-property-organization-name-input')).toBeDisabled();
    await expect(page.getByTestId('new-signup-page-country-code-91-btn')).toBeDisabled();
    await expect(page.getByTestId('new-signup-page-coming-soon-btn')).toBeDisabled(); // Terms of Service

    const privacy = page.getByTestId('new-signup-page-privacy-policy-link');
    await expect(privacy).toHaveAttribute('href', '/privacy-policy');
    await expect(privacy).toHaveAttribute('target', '_blank');
  });

  test('TC14 Sign in link opens the login page', async ({ page }) => {
    await page.getByTestId('new-signup-page-sign-in-btn').click();
    await expect(page).toHaveURL(/hostel-management-login/);
    await expect(page.getByTestId('login-sign-in-btn')).toBeVisible();
  });

  test('TC15 valid form opens the Verify OTP step', async ({ page }) => {
    const data = await fillValidForm();
    await createAccount.click();

    await expect(page.getByRole('heading', { name: 'Verify OTP' })).toBeVisible();
    // The email is shown masked, so check the sentence and the email's domain
    const sentTo = page.getByText("We've sent a 6-digit verification code to");
    await expect(sentTo).toBeVisible();
    await expect(sentTo).toContainText(data.email.split('@')[1]);
    expect(await demoCode(page)).toMatch(/^\d{6}$/);
    await expect(page.getByText(/Resend code in 00:\d\d/)).toBeVisible();

    // Verify button is dimmed until all 6 digits are typed
    const verify = page.getByTestId('otp-verify-btn');
    await expect(verify).toHaveClass(/opacity-40/);
    await typeOtp(page, '123');
    await expect(verify).toHaveClass(/opacity-40/);
    await page.keyboard.type('456'); // focus has moved on to the 4th box
    await expect(verify).not.toHaveClass(/opacity-40/);
  });

  test('TC16 wrong OTP counts down attempts, then asks to resend', async ({ page }) => {
    await fillValidForm();
    await createAccount.click();
    const code = await demoCode(page);
    const wrong = code === '111111' ? '222222' : '111111';
    const verify = page.getByTestId('otp-verify-btn');

    await typeOtp(page, wrong);
    await verify.click();
    await expect(page.getByText('Incorrect code. 2 attempts left.')).toBeVisible();

    await page.getByTestId('otp-parts-code-input-5').click();
    for (let i = 0; i < 6; i++) await page.keyboard.press('Backspace');
    await typeOtp(page, wrong);
    await verify.click();
    await expect(page.getByText('Incorrect code. 1 attempt left.')).toBeVisible();

    await page.getByTestId('otp-parts-code-input-5').click();
    for (let i = 0; i < 6; i++) await page.keyboard.press('Backspace');
    await typeOtp(page, wrong);
    await verify.click();
    await expect(page.getByText('Too many attempts. Use Resend OTP to get a new code.')).toBeVisible();
    await expect(page.getByText('Demo code:')).toHaveCount(0);
  });

  test('TC17 "Change email address" goes back to the form with values kept', async ({ page }) => {
    const data = await fillValidForm();
    await createAccount.click();
    await expect(page.getByRole('heading', { name: 'Verify OTP' })).toBeVisible();

    await page.getByTestId('otp-parts-change-contact-btn').click();

    await expect(page.getByRole('heading', { name: "Let's get started" })).toBeVisible();
    await expect(fullName).toHaveValue(data.name);
    await expect(mobile).toHaveValue(data.mobile);
    await expect(email).toHaveValue(data.email);
  });

  test('TC18 Resend OTP appears after 30 seconds and gives a new code', async ({ page }) => {
    await page.clock.install();
    await page.goto(SIGNUP_URL);
    await fillValidForm();
    await createAccount.click();
    const first = await demoCode(page);

    await expect(page.getByTestId('otp-parts-resend-otp-btn')).toHaveCount(0);
    await page.clock.runFor(31_000); // runs every 1s countdown tick
    await expect(page.getByText('Resend code in 00:00')).toBeVisible();

    await page.getByTestId('otp-parts-resend-otp-btn').click();
    await expect(page.getByText(/Resend code in 00:(29|30)/)).toBeVisible();
    const second = await demoCode(page);
    expect(second).toMatch(/^\d{6}$/);
    // (a new random code — almost always different from the first)
    expect.soft(second).not.toBe(first);
  });

  test('TC19 already registered email shows a server error', async ({ page }) => {
    test.skip(!process.env.E2E_EMAIL, 'Set E2E_EMAIL (an existing account)');
    await fillValidForm({ email: process.env.E2E_EMAIL });
    await createAccount.click();
    await typeOtp(page, await demoCode(page));
    await page.getByTestId('otp-verify-btn').click();

    // Server rejects → back on the form with the error under the field
    await expect(page.getByRole('heading', { name: "Let's get started" })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/already|exist|registered/i).first()).toBeVisible();
  });

  test('TC20 successful signup opens login with the email filled in', async ({ page }) => {
    test.skip(process.env.E2E_ALLOW_SIGNUP !== 'true', 'Creates a real account: set E2E_ALLOW_SIGNUP=true to run');
    const data = await fillValidForm();
    await createAccount.click();
    await typeOtp(page, await demoCode(page));
    await page.getByTestId('otp-verify-btn').click();

    await expect(page).toHaveURL(/hostel-management-login/, { timeout: 30_000 });
    await expect(page.getByTestId('new-login-page-email-input')).toHaveValue(data.email);
    await expect(page.getByTestId('new-login-page-password-input')).toBeFocused();
  });

  test('TC21 Google button is visible but disabled', async ({ page }) => {
    const google = page.getByTestId('signup-google-btn');
    test.skip((await google.count()) === 0, 'Google button only appears in the development build');
    await expect(google).toBeVisible();
    await expect(google).toBeDisabled();
  });

  test('TC22 Region state is optional and can be selected', async ({ page }) => {
    const region = page.getByTestId('new-signup-page-region-select');
    test.skip((await region.count()) === 0, 'Region only appears in the development build');
    await region.click();
    await page.keyboard.type('Tamil');
    await page.getByRole('option', { name: 'Tamil Nadu' }).click();
    await expect(region).toContainText('Tamil Nadu');
  });
});
