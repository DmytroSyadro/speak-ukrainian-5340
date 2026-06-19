import { expect, test } from '@playwright/test';
import { ClubPage } from '@/pages/club-page';
import { CitiesUser } from '@/data/cities-user';

test.describe('Clubs Page - Search Functionality', () => {
  test('TC-035: Verify that the club search returns correct results when searching by club name "American Gymnastics Club" @High', async ({
    page,
  }) => {
    const clubPage = new ClubPage(page);
    const targetClubName = 'American Gymnastics Club';

    // --- Preconditions ---
    await clubPage.navigate();
    await clubPage.waitForPageLoad();

    await clubPage.header.selectCity(CitiesUser.KYIV);

    await clubPage.waitForPageLoad();

    // --- Step 1: Navigate to the clubs page ---
    await expect(page).toHaveURL(/.*\/clubs/);

    await page.locator('.ant-card-body').first().waitFor({ state: 'visible', timeout: 10000 });
    expect(
      await (
        await clubPage.getClubList()
      ).length,
      'List of clubs should be visible'
    ).toBeGreaterThan(0);

    const searchBarLocator = page.locator('div.search');
    await expect(searchBarLocator, 'Search field should be visible').toBeVisible();

    // --- Step 2 & 3: Click on the search field and type the club name ---
    await clubPage.searchByText(targetClubName);

    // --- Step 4: Check the search results ---
    await page
      .locator(`.name >> text="${targetClubName}"`)
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });

    const clubCard = await clubPage.getClubList().getClubCardByTitle(targetClubName);
    expect(
      clubCard,
      `A club card for "${targetClubName}" should appear in the results`
    ).toBeDefined();

    // --- Step 5: Verify the club card content ---
    expect(await clubCard!.getClubTitle(), 'The card should display the correct club name').toBe(
      targetClubName
    );

    // --- Step 6: Click the "Детальніше" button ---
    await clubCard!.clickMoreDetailsButton();

    await expect(page).toHaveURL(/.*\/club\/26/);
  });
});
