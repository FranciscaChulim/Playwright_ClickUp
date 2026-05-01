import { defineConfig, devices } from '@playwright/test';

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
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://app.clickup.com',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  expect: {
    timeout: 10000,
  },
  timeout: 60000,

  /* Configure projects for major browsers */
  projects: [

    { 
      name: 'setup', 
      testDir: './auth',
      testMatch: /.*\.setup\.ts/
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
      }
    },
  ],
});
