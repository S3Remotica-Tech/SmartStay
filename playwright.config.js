// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

// Load E2E credentials from .env.e2e (gitignored) when present.
const envFile = path.join(__dirname, ".env.e2e");
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const PORT = 5173;
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;

module.exports = defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // The Vite dev server compiles on demand; too many workers starve it.
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: { width: 1440, height: 900 },
    permissions: [],
  },

  projects: [
    { name: "setup", testMatch: /auth\.setup\.js/ },
    {
      name: "public",
      testMatch: /public\/.*\.spec\.js/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "app",
      testMatch: /app\/.*\.spec\.js/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        storageState: "e2e/.auth/user.json",
      },
    },
    {
      // Runs last: logging out may invalidate the shared session server-side.
      name: "session",
      testMatch: /session\/.*\.spec\.js/,
      dependencies: ["app"],
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],

  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npx vite --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
