import { test as setup } from '@playwright/test';
import { AUTH_FILE, hasCredentials, login, selectHostel } from './helpers/auth';

// Runs before every `npm run e2e`. With .env.e2e it logs in fresh and saves the
// session; without it, the session saved by `npm run e2e:login` is reused as is.
setup('log in', async ({ page }) => {
  setup.skip(!hasCredentials(), 'No .env.e2e: reusing the saved session from npm run e2e:login');
  await login(page);
  await selectHostel(page);
  await page.context().storageState({ path: AUTH_FILE });
});
