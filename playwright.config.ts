import { defineConfig } from '@playwright/test';

const isCI = Boolean(process.env.CI);
const port = process.env.DEMO_PORT || '5187';
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  outputDir: '/tmp/usr-member-demo-tests',
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['github'], ['html', { outputFolder: '/tmp/usr-member-demo-report', open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', launchOptions: process.env.DEMO_CHROMIUM ? { executablePath: process.env.DEMO_CHROMIUM } : {} },
    },
    ...(['firefox', 'webkit'] as const).map(browserName => ({
      name: browserName,
      testMatch: '**/civic-pilot.spec.ts',
      use: { browserName },
    })),
  ],
  webServer: {
    command: `npm run ${isCI ? 'preview' : 'dev'} -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !isCI,
  },
});
