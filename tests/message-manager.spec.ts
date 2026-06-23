import { expect, test } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { ClubDetailsPage } from '@/pages/club-details-page';
import { ClubPage } from '@/pages/club-page';
import { HomePage } from '@/pages/home-page';

test('TC-094 — Verify that clicking "Написати менеджеру" button shows the authentication modal for unauthorized users', async ({
  page,
}) => {
  await allure.epic('Speak Ukrainian');
  await allure.feature('Club details page');
  await allure.story(
    'As an unauthorized user, I want to see an authentication modal when clicking "Написати менеджеру".'
  );
  await allure.description(
    'Verifies that an unauthorized user who navigates to a club details page and clicks the "Написати менеджеру" button sees the authentication modal with the message "Увійдіть або зареєструйтеся!!!".'
  );

  const homePage = new HomePage(page);
  const clubPage = new ClubPage(page);
  const clubDetailsPage = new ClubDetailsPage(page);
  const authModal = page.locator('.ant-modal-content');
  const authModalMessage = authModal.locator('.ant-modal-body');

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
      await expect(authModal).toBeVisible();
      await expect(authModalMessage).toHaveText('Увійдіть або зареєструйтеся!!!');
    }
  );
});
