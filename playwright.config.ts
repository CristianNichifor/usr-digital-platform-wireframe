import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: '/tmp/usr-member-demo-tests',
  use: {
    baseURL: 'http://127.0.0.1:5187',
    launchOptions: process.env.DEMO_CHROMIUM ? { executablePath: process.env.DEMO_CHROMIUM } : {},
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5187',
    url: 'http://127.0.0.1:5187',
    reuseExistingServer: true,
  },
});
