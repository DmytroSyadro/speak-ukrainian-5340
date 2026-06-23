import { expect, test } from '@playwright/test';

test.describe('Help the Project button', () => {
  test('TC-07 Verify the functionality of the "Help the Project" button on a news article page', async ({
    page,
  }) => {
    await page.goto('/news');

    const newsCards = page.locator('#newsContainer');
    await expect(newsCards.last()).toBeVisible();

    const count = await newsCards.count();
    expect(count).toBeGreaterThan(0);

    await newsCards.last().locator('a').first().click();

    await page.waitForLoadState('load');
    await expect(page).not.toHaveURL(/\/news$/);

    const donateButton = page.locator('.help-button .donate-button');
    await expect(donateButton).toBeVisible();
    await expect(donateButton).toBeEnabled();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      donateButton.click(),
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL('https://secure.wayforpay.com/payment/s0f2891d77061');
  });
});
