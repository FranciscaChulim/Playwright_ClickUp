import { defineConfig, devices } from '@playwright/test';
import { CREDENTIALS } from '@utils/constants';

export default defineConfig({
  testDir: '.',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'], // Keeps the terminal output clean
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://app.clickup.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    headless: true,
    launchOptions: {
      args: [
      '--disable-blink-features=AutomationControlled',
      ]
    },
  },
  expect: {
    timeout: 30000,
  },
  timeout: 90000,

  /* Configure projects for major browsers */
  projects: [

    { 
      name: 'setup', 
      testDir: './auth',
      testMatch: /.*\.setup\.ts/,
    },
    // Authenticated tests
    {
      name: 'authenticated',
      testDir: './src/tests/ui',
      testIgnore: /.*login\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/auth.json',
      },
      dependencies: ['setup'],
    },
    // Not Authenticated tests
    {
      name: 'login',
      testMatch: /.*login\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
        headless: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    },
    // API tests
    {
      name: 'api',
      testDir: './src/tests/api',
      testMatch: /.*\.api\.spec\.ts/,
      use:{
          extraHTTPHeaders: {
          'Authorization': CREDENTIALS.API_TOKEN || '',
          'Content-Type': 'application/json',
          },
    },
    },
  ],
});
