# End-to-end tests (Playwright)

## Setup

```bash
npm install
npx playwright install chromium
cp .env.e2e.example .env.e2e   # then fill in E2E_EMAIL / E2E_PASSWORD
```

`.env.e2e` is gitignored. In CI, set `E2E_EMAIL` and `E2E_PASSWORD` as repository secrets.

## Running

| Command | What it does |
| --- | --- |
| `npm run test:e2e` | Run everything headless (starts Vite on :5173 automatically) |
| `npm run test:e2e:ui` | Playwright UI mode — pick and debug tests interactively |
| `npm run test:e2e:headed` | Run with a visible browser |
| `npm run test:e2e:report` | Open the last HTML report |
| `npx playwright test e2e/app/reports.spec.js` | Run a single file |
| `E2E_BASE_URL=https://… npm run test:e2e` | Test an already-running/deployed app instead of local Vite |

Tests run against whatever API `.env.development` points to.

## Layout

```
e2e/
  auth.setup.js        logs in once, saves session to e2e/.auth/user.json
  public/              signed-out pages: marketing site, login, signup, forgot password
  app/                 signed-in pages (reuse the saved session)
    dashboard.spec.js
    modules.spec.js    every sidebar module + tab switching
    reports.spec.js    operational + analytical reports
    settings.spec.js   every settings sub-page
  session/             logout — runs last, after the app project
  support/
    test.js            `test` with an auto-fixture that fails on uncaught page errors
    nav.js             sidebar navigation helpers
    login.js, credentials.js
```

Projects (see `playwright.config.js`): `setup` → `app` → `session`; `public` runs independently.

## Conventions

- **Import `test`/`expect` from `support/test.js`**, not `@playwright/test`, so uncaught JS errors fail the test.
- **Navigate app modules through the sidebar** with `goToModule()`. Deep-linking `/tenant` etc. on a fresh
  load is redirected by the Sidebar to the last visited page. Settings pages *can* be deep-linked.
- **Tests are read-only** against the shared dev API. If you add tests that create data, clean it up
  afterwards and use clearly-named test records.
- Table headers and some headings are uppercased with CSS; match accessible names case-insensitively.
