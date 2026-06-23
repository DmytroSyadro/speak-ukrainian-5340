import { defineConfig, devices } from '@playwright/test';
import env from '@/config/env';

process.env.allure_quiet = 'true';
process.env.QUIET = 'true';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: env.TEST_TIMEOUTS.defaultE2E,
  expect: {
    timeout: env.TEST_TIMEOUTS.expect,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: {
      width: 1920,
      height: 1080,
    },
    baseURL: env.BASE_URL,
    headless: env.HEADLESS,
    actionTimeout: env.TEST_TIMEOUTS.action,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    ignoreHTTPSErrors: true,
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        detail: false,
        suiteTitle: true,
        outputFolder: 'allure-results',
        environmentInfo: {
          BASE_URL: env.BASE_URL,
          HEADLESS: String(env.HEADLESS),
        },
        categories: [
          {
            name: 'Failed tests',
            matchedStatuses: ['failed'],
          },
          {
            name: 'Broken tests',
            matchedStatuses: ['broken'],
          },
          {
            name: 'Flaky tests',
            matchedStatuses: ['failed'],
            messageRegex: '.*RetryError.*',
          },
        ],
      },
    ],
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
