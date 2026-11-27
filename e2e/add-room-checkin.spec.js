import { test, expect } from '@playwright/test';

// Flow: Paying Guest → add a room → add 2 beds → add a walk-in tenant on bed 1
// → assign + check in that tenant on bed 2.
// Starts logged in via the saved session (run `npm run e2e:login` once first).
// NOTE: this creates real data (room, beds, tenant) on the backend in .env.development.
// Selectors use the pg-* data-testids in src/Pages/PayingGuestFile.

test.use({ viewport: { width: 1260, height: 580 } });

// Floor to add the room on (the floor tile's name, e.g. "F1").
const FLOOR = 'F1';

// Unique values per run, so re-running never clashes with existing rooms/tenants.
const RUN_ID = Date.now().toString().slice(-6);
const ROOM = `E2E-R${RUN_ID}`;
const BED_1 = `B1-${RUN_ID}`;
const BED_2 = `B2-${RUN_ID}`;
const TENANT = `E2E${RUN_ID}`;
const MOBILE = `9${Date.now().toString().slice(-9)}`;
const RENT = '9000';

test('add room, beds, tenant and check in', async ({ page }) => {
  const roomCard = page.getByTestId(`pg-room-card-${ROOM}`);
  const bedIcon = (bedName) => roomCard.getByTestId(`pg-bed-${bedName}`).getByTestId('pg-bed-icon');

  const addBed = async (bedName) => {
    await roomCard.getByTestId('pg-add-bed-tile').click();
    await page.getByTestId('pg-bed-name-input').fill(bedName);
    await page.getByTestId('pg-bed-amount-input').fill(RENT);
    await page.getByTestId('pg-add-bed-submit').click();
    await expect(roomCard.getByTestId(`pg-bed-${bedName}`)).toBeVisible();
  };

  // 1. Paying Guest page, pick floor
  await page.goto('/');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('link', { name: 'Paying Guest' }).click();
  await page.getByTestId(`pg-floor-${FLOOR}`).click();

  // 2. Add room
  await page.getByTestId('pg-add-room-btn').click();
  await page.getByTestId('pg-room-name-input').fill(ROOM);
  await page.getByTestId('pg-add-room-submit').click();
  await expect(roomCard).toBeVisible();

  // 3. Add two beds
  await addBed(BED_1);
  await addBed(BED_2);

  // 4. Bed 1 → Add Tenant (walk-in customer)
  await bedIcon(BED_1).click();
  await page.getByTestId('pg-add-tenant-btn').click();
  await page.getByTestId('pg-tenant-first-name').fill(TENANT);
  await page.getByTestId('pg-tenant-mobile').fill(MOBILE);
  await page.getByTestId('pg-tenant-save-info').click();

  // 5. Bed 2 → Assign Tenant → check in
  await bedIcon(BED_2).click();
  await page.getByTestId('pg-assign-tenant-btn').click();
  await page.getByTestId('pg-assign-tab-checkin').click();

  await page.getByTestId('pg-checkin-tenant-select').click();
  await page.keyboard.type(TENANT);
  await page.getByRole('option', { name: new RegExp(TENANT, 'i') }).click();

  await page.getByTestId('pg-checkin-stay-type-select').click();
  await page.getByRole('option', { name: 'Long Stay' }).click();

  // Joining date = today (antd DatePicker accepts typed DD/MM/YYYY + Enter)
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const joiningDate = page.getByTestId('pg-checkin-joining-date').locator('input');
  await joiningDate.click();
  await joiningDate.fill(`${dd}/${mm}/${today.getFullYear()}`);
  await joiningDate.press('Enter');

  await page.getByTestId('pg-checkin-rent-amount').fill(RENT);
  await page.getByTestId('pg-checkin-submit').click();

  // 6. Bed 2 now shows the tenant
  await bedIcon(BED_2).click();
  await expect(page.getByText(new RegExp(TENANT, 'i')).first()).toBeVisible();
});
