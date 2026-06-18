import { test as base } from '@playwright/test';
import * as allure from 'allure-js-commons';

export const test = base.extend<{ globalBeforeEach: void }>({
  globalBeforeEach: [
    async ({ page }, use, testInfo) => {
      await allure.step(`Run test: ${testInfo.title}`, async () => {});

      await use();

      if (testInfo.status !== 'passed') {
        const screenshot = await page.screenshot({ fullPage: true });
        await allure.attachment('Screenshot on Failure', screenshot, 'image/png');
      }
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
export type { TestInfo } from '@playwright/test';
