// Playwright end-to-end tests (e2e/).
// Record a test:  npm run e2e:codegen   (clicks become code)
// Run tests:      npm run e2e
import { defineConfig, devices } from "@playwright/test";

// Test login (E2E_EMAIL, E2E_PASSWORD) lives in .env.e2e, which is git-ignored.
try {
  process.loadEnvFile(".env.e2e");
} catch {
  // No .env.e2e: the variables may already be set in the shell.
}

const PORT = 5173; // Vite's default port (npm start)

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  // Starts the Vite dev server, or reuses the one already running.
  webServer: {
    command: "npm start",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },

  projects: [
    // 1. Logs in fresh with E2E_EMAIL / E2E_PASSWORD and saves the session.
    { name: "setup", testMatch: /auth\.setup\.js/ },
    // 2. All tests start logged in with that session.
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" },
      dependencies: ["setup"],
    },
  ],
});
