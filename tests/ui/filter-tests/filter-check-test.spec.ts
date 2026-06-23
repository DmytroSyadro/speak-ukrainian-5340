import { test, expect } from '@playwright/test';
import { ClubPage } from '@/pages/club-page';
import { HomePage } from '@/pages/home-page';
import { ClubCategory } from '@/data/club-category';

test.describe('Check filtering functionality through the Home page', () => {
  test('[TC-6]: Verify homepage category selection redirects to the clubs filtered by the chosen category', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const CATEGORY_NAME = 'Спортивні секції';

    await homePage.navigateTo('/');
    await homePage.waitForPageLoad();
    await homePage.clickCategory(CATEGORY_NAME);

    const clubPage = new ClubPage(page);
    await clubPage.waitForPageLoad();
    await expect(clubPage.isCaregoryButtonChecked(ClubCategory.SPORTS)).resolves.toBeTruthy();
    await expect(clubPage.isCategoryLabelVisible()).resolves.toBeTruthy();
    await expect(clubPage.getFirstCategory()).resolves.toContain(CATEGORY_NAME);
  });
});
