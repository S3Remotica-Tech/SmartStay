const base = require("@playwright/test");

/**
 * Extends Playwright's `test` with an automatic guard that fails the test if
 * the page throws an uncaught JavaScript exception (i.e. a React crash).
 */
const test = base.test.extend({
  pageErrors: [
    async ({ page }, use) => {
      const errors = [];
      page.on("pageerror", (err) => errors.push(err));
      await use(errors);
      base
        .expect(errors.map((e) => e.message), "uncaught page errors")
        .toEqual([]);
    },
    { auto: true },
  ],
});

module.exports = { test, expect: base.expect };
