import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173/Pierreg99-Pierreg99-Profile-Page/",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command:
      "node scripts/serve.mjs --port 4173 --base /Pierreg99-Pierreg99-Profile-Page",
    url: "http://localhost:4173/Pierreg99-Pierreg99-Profile-Page/",
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
