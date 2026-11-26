import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import packageJson from "./package.json";
import buildInfo from "./build.json";

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  define: {
    global: "globalThis",

    APP_VERSION: JSON.stringify(packageJson.version),
    BUILD_NUMBER: JSON.stringify(
      mode === "development"
        ? buildInfo.dev
        : mode === "qa"
          ? buildInfo.qa
          : buildInfo.prod,
    ),
  },

  server: {
    historyApiFallback: true,
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.jsx",
    // Playwright specs in e2e/ run with `npm run e2e`, not Vitest.
    exclude: [...configDefaults.exclude, "e2e/**"],
    coverage: {
      reporter: ["text", "lcov"],
      exclude: [...configDefaults.coverage.exclude, "./src/setupTests.jsx"],
    },
  },

  optimizeDeps: {
    include: ["@apollo/client", "@apollo/client/react"],
  },
}));
