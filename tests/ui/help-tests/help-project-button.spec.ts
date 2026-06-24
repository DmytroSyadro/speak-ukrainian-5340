import { expect, test } from '@/fixtures';
import * as allure from 'allure-js-commons';

test.describe('Help the Project button', () => {
  test('TC-07 Verify the functionality of the "Help the Project" button on a news article page', async ({
    page,
    newsPage,
    newsDetailsPage,
  }) => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('News page');
    await allure.story(
      'As a user, I want to click the "Help the Project" button and be redirected to the donation page.'
    );
    await allure.description(
      'Verifies that the "Help the Project" button on a news article page is visible, enabled, and redirects the user to the correct donation URL.'
    );

    await allure.step('Step 1: Open the last news article from the News page', async () => {
      await page.goto('/news');

      const newsCards = newsPage.getNewsCardsContainerLocator();

      await expect(newsCards.last()).toBeVisible();
      const count = await newsCards.count();
      expect(count).toBeGreaterThan(0);
      await newsCards.last().locator('a').first().click();
      await page.waitForLoadState('load');
      await expect(page).toHaveURL(/news\/.+/);
    });

    await allure.step('Step 2: Locate the "Help the Project" button', async () => {
      const donateButton = newsDetailsPage.getHelpButtonLocator();

      await expect(donateButton).toBeVisible();
      await expect(donateButton).toBeEnabled();
    });

    await allure.step(
      'Step 3: Click the button and verify redirect to the donation page',
      async () => {
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page'),
          newsDetailsPage.clickHelpButton(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL('https://secure.wayforpay.com/payment/s0f2891d77061');
      }
    );
  });
});
