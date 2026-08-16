import { defineConfig, devices } from "@playwright/test";

const WEB_PORT = 5173;
const API_PORT = 4000;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],

  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    // API tests hit the server directly and don't need a browser at all.
    // Convention: any file named *.api.spec.ts runs only in this project.
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts/,
      use: { baseURL: `http://localhost:${API_PORT}` },
    },
    {
      name: "chromium",
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: [
    {
      command: "npm run dev:server",
      url: `http://localhost:${API_PORT}/api/health`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev:web",
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
