import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 580,
    width: 1260
  }
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/hostel-management-login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('jasvika@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Mathu@1995');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Rooms & Beds' })).toBeVisible();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('link', { name: 'Paying Guest' }).click();
  await expect(page.getByText('Floor').nth(2)).toBeVisible();
  await page.getByRole('link', { name: 'Assets' }).click();
  await expect(page.locator('label')).toBeVisible();
  await page.getByRole('link', { name: 'Vendor' }).click();
  await expect(page.locator('label')).toBeVisible();
  await page.getByRole('button', { name: 'JJ' }).click();
  await page.getByRole('button', { name: 'logout Logout' }).click();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
});