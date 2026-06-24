import { test, expect } from '@/fixtures/modal-fixture';
import { ClubCategory } from '@/data/club-category';
import * as allure from 'allure-js-commons';

test.describe('Right redirection from home page', () => {
  test('[TC-6]', async ({ homePage, clubPage }) => {
    allure.feature('Club page, Home page');
    allure.owner('Lesia Liashko');
    allure.description(
      'Verify homepage category selection redirects to the clubs filtered by the chosen category'
    );

    const CATEGORY_NAME: ClubCategory = ClubCategory.SPORTS;

    await homePage.navigateTo('/');
    await homePage.waitForPageLoad();

    await allure.step(
      `Click on the "Переглянути" button or the card itself for a specific category`,
      async () => {
        await homePage.clickCategory(CATEGORY_NAME);
        await clubPage.waitForPageLoad();
      }
    );

    await allure.step('Verify the filter panel state', async () => {
      await expect(clubPage.isCaregoryButtonChecked(CATEGORY_NAME)).resolves.toBeTruthy();
    });

    await allure.step('Verify the displayed search results', async () => {
      const categories = await clubPage.getAllCategories();
      for (const category of categories) {
        expect(category).toContain(CATEGORY_NAME);
      }
    });
  });
});
