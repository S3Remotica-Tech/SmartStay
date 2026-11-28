// Playwright end-to-end tests (e2e/).
// Record a test:  npm run e2e:codegen   (clicks become code)
// Run tests:      npm run e2e
import { defineConfig, devices } from "@playwright/test";

// Test login secrets (E2E_PASSWORD) live in .env.e2e, which is git-ignored.
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
    // Session saved by codegen (--save-storage), so tests start logged in.
    storageState: "playwright/.auth/user.json",
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

  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }],
});
