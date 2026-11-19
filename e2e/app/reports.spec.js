const { test, expect } = require("../support/test");
const { goToModule } = require("../support/nav");

const operational = [
  { title: "Invoice Register", url: /\/reports\/invoice-register\// },
  { title: "Receipt Register", url: /\/reports\/receipt-register\// },
  { title: "Tenant Register", url: /\/reports\/tenant-register\// },
  { title: "Expense Register", url: /\/reports\/expense-register\// },
];

const analytical = [
  { title: "Month vs Month Revenue", url: /\/reports\/month-revenue\// },
  { title: "Collected vs Outstanding", url: /\/reports\/collected-outstanding\// },
  { title: "Vacant vs Occupied Beds", url: /\/reports\/vacant-occupied\// },
  { title: "Monthly Expense Trend", url: /\/reports\/expense-trend\// },
  { title: "Overdue Invoices Trend", url: /\/reports\/overdue-invoice-trend\// },
  { title: "Complaints Resolved", url: /\/reports\/complaints-resolved\// },
];

async function openReports(page) {
  await goToModule(page, { label: "Reports", url: /\/reports\/[\w-]+$/ });
  await expect(page.getByText("View Report").first()).toBeVisible();
}

test.describe("Reports", () => {
  test("operational summary cards", async ({ page }) => {
    await openReports(page);
    for (const kpi of ["Total Revenue (MTD)", "Outstanding Amount", "Active Tenants", "Occupancy Rate"]) {
      await expect(page.getByText(kpi, { exact: true }).first()).toBeVisible();
    }
  });

  operational.forEach(({ title, url }, i) => {
    test(`opens ${title}`, async ({ page }) => {
      await openReports(page);
      await expect(page.getByText(title, { exact: true }).first()).toBeVisible();
      await page.getByText("View Report").nth(i).click();
      await expect(page).toHaveURL(url);
      await expect(page.getByText(`Reports / ${title}`)).toBeVisible();
      await expect(page.getByRole("button", { name: /Export/ }).first()).toBeVisible();
    });
  });

  analytical.forEach(({ title, url }, i) => {
    test(`opens ${title}`, async ({ page }) => {
      await openReports(page);
      await page.getByRole("button", { name: "Analytical Reports" }).click();
      await expect(page.getByText(title, { exact: true }).first()).toBeVisible();
      await page.getByText("View Analytics").nth(i).click();
      await expect(page).toHaveURL(url);
    });
  });
});
