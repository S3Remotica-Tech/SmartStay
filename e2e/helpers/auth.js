import { expect } from '@playwright/test';

// Saved login session shared by all tests (git-ignored).
export const AUTH_FILE = 'playwright/.auth/user.json';

// Hostel the tests run on (E2E_HOSTEL in .env.e2e). Must have an active plan:
// on an expired-plan hostel every add/edit button is disabled.
export const HOSTEL = process.env.E2E_HOSTEL || 'Nov-18';

export const hasCredentials = () => Boolean(process.env.E2E_EMAIL && process.env.E2E_PASSWORD);

// Logs in through the real login page with E2E_EMAIL / E2E_PASSWORD from .env.e2e.
export async function login(page) {
  if (!hasCredentials()) {
    throw new Error(
      'Not logged in and no credentials. Either run `npm run e2e:login` (log in, close the window), ' +
      'or create .env.e2e with E2E_EMAIL=… and E2E_PASSWORD=… (git-ignored).',
    );
  }
  await page.goto('/hostel-management-login');
  await page.getByTestId('new-login-page-email-input').fill(process.env.E2E_EMAIL);
  await page.getByTestId('new-login-page-password-input').fill(process.env.E2E_PASSWORD);
  await page.getByTestId('login-sign-in-btn').click();
  await expect(page.getByTestId('sidebar-home-link')).toBeVisible({ timeout: 30_000 });
}

// Switches the sidebar hostel picker to `name` (no-op if already selected).
export async function selectHostel(page, name = HOSTEL) {
  const picker = page.getByTestId('sidebar-toggle-dropdown-action');
  await picker.waitFor({ state: 'visible' });
  if ((await picker.innerText()).includes(name)) return;
  await picker.click();
  await page.getByTestId('sidebar-search-hostel-input').fill(name);
  await page.locator('[data-testid^="sidebar-hostel-id-action-"]').filter({ hasText: name }).first().click();
  await expect(picker).toContainText(name);
}

// Opens the app logged in, on the E2E hostel. If the saved session was ended
// (a logout, or another login as the same user elsewhere), the landing page
// shows instead of the sidebar — then it logs in again (needs .env.e2e).
export async function openApp(page, path = '/') {
  await page.goto(path);
  const sidebar = page.getByTestId('sidebar-home-link');
  try {
    await sidebar.waitFor({ state: 'visible', timeout: 10_000 });
  } catch {
    await login(page);
  }
  await selectHostel(page);
  if (path !== '/') await page.goto(path);
}
