import { expect, test } from '@/fixtures';
import * as allure from 'allure-js-commons';

test('TC-094 — Verify that clicking "Написати менеджеру" button shows the authentication modal for unauthorized users', async ({
  page,
  homePage,
  clubPage,
  clubDetailsPage,
}) => {
  await allure.epic('Speak Ukrainian');
  await allure.feature('Club details page');
  await allure.story(
    'As an unauthorized user, I want to see an authentication modal when clicking "Написати менеджеру".'
  );
  await allure.description(
    'Verifies that an unauthorized user who navigates to a club details page and clicks the "Написати менеджеру" button sees the authentication modal with the message "Увійдіть або зареєструйтеся!!!".'
  );

  await allure.step(
    'Step 1: Navigate to the home page and click "Гуртки" in the header',
    async () => {
      await page.goto('/');
      await homePage.header.clickClubs();
      await expect(page).toHaveURL(/\/clubs/);
    }
  );

  await allure.step('Step 2: Click "Детальніше" on the first club card', async () => {
    await clubPage.waitForPageLoad();
    const firstCard = await clubPage.getFirstClubCard();
    await firstCard.clickMoreDetailsButton();
    await expect(page).toHaveURL(/\/club\/\d+/);
  });

  await allure.step('Step 3: Click "Написати менеджеру" button', async () => {
    await clubDetailsPage.hero.waitForVisible();
    await clubDetailsPage.clickMessageManager();
  });

  await allure.step(
    'Step 4: Verify the authentication modal appears with correct message',
    async () => {
      await expect(clubDetailsPage.getAuthModalLocator()).toBeVisible();
      await expect(clubDetailsPage.getAuthModalMessageLocator()).toHaveText(
        'Увійдіть або зареєструйтеся!!!'
      );
    }
  );
});
