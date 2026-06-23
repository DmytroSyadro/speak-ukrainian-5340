import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { ClubCategory } from '@/data';
import type { ClubCardComponent } from '@/components/club/club-card-component';
import type { TagsComponent } from '@/components/common/tags-component';

test.describe('search-bar', (): void => {
  const title = 'IT освіта: курси "ГРАНД"';
  const fixedCategory: ClubCategory = ClubCategory.PROGRAMMING;

  test.beforeEach(async ({ page }): Promise<void> => {
    await allure.epic('Speak Ukrainian');
    await allure.owner('Dmytro Syadro');
    await allure.feature('Club page');

    await page.route('**/api/search**', async (route): Promise<void> => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          categories: [{ id: 1, name: fixedCategory }],
          clubs: [{ id: 27, name: title }],
        }),
      });
    });

    await page.route('**/api/clubs/search**', async (route) => {
      const url = new URL(route.request().url());
      url.searchParams.set('categoryName', fixedCategory);

      await route.continue({
        url: url.toString(),
      });
    });
  });

  test('should search by exact hint name', async ({ clubPage, clubDetailsPage }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that the search bar filters clubs by the exact club name');
    await allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/33');

    await clubPage.navigate();
    await clubPage.waitForPageLoad();

    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');

    await Promise.all([clubPage.waitForClubsResponse(), clubPage.selectSearchBarHint(title)]);

    const club: ClubCardComponent = await clubPage.getClubByTitle(title);
    expect(await club.getClubTitle()).toBe(title);
    expect(await club.isOnlineVisible()).toBeTruthy();
    expect(await club.getClubRating()).toBe(4.5);

    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();

    expect(await clubPage.isTagEmpty()).not.toBeTruthy();
    expect(allTags).toContain(ClubCategory.PROGRAMMING);
    const count: number = await clubPage.getClubCount();
    expect(count).toBeGreaterThan(0);

    await club.clickMoreDetailsButton();

    await clubDetailsPage.waitForPageLoad();
    expect(await clubDetailsPage.getClubTitle()).toBe(title);
  });

  test('should search by exact name', async ({ clubPage, clubDetailsPage }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that the search bar filters clubs by the exact club name ');
    await allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/33');

    await clubPage.navigate();
    await clubPage.waitForPageLoad();

    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');

    await Promise.all([clubPage.waitForClubsResponse(), clubPage.searchByText(title)]);

    const club: ClubCardComponent = await clubPage.getClubByTitle(title);
    expect(club).toBeDefined();
    expect(await club.getClubTitle()).toBe(title);
    const count: number = await clubPage.getClubCount();
    expect(count).toBeGreaterThan(0);
    expect(await club.isOnlineVisible()).toBeTruthy();
    expect(await club.getClubRating()).toBe(4.5);

    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();

    expect(await clubPage.isTagEmpty()).not.toBeTruthy();
    expect(allTags).toContain(ClubCategory.PROGRAMMING);
    await club.clickMoreDetailsButton();

    await clubDetailsPage.waitForPageLoad();

    expect(await clubDetailsPage.getClubTitle()).toBe(title);
  });

  test('should search by hint category', async ({ clubPage }): Promise<void> => {
    await allure.severity('critical');
    await allure.description(
      'Verify that the user can filter clubs with categories using hints in the search bar'
    );
    await allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/73');

    await clubPage.navigate();

    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');

    const firstCategory: string = await clubPage.getFirstCategory();
    await Promise.all([
      clubPage.waitForClubsResponse(),
      clubPage.selectSearchBarHint(firstCategory),
    ]);

    const isEmpty: boolean = await clubPage.isTagEmpty();
    expect(isEmpty).toBeFalsy();

    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();
    expect(allTags).toContain(firstCategory);

    const cards: ClubCardComponent[] = await clubPage.getClubList();
    const cardCount: number = cards.length;

    for (const card of cards) {
      expect(await card.isRatingVisible()).toBeTruthy();
    }

    const totalCount: number = await clubPage.getClubCount();
    expect(totalCount).toBeGreaterThan(0);
    expect(totalCount).toBe(cardCount);
  });

  test('should search by hint category and exact name', async ({ clubPage }): Promise<void> => {
    await allure.severity('critical');
    await allure.description(
      'Verify that the clubs are located in the city selected in the City dropdown'
    );
    await allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/73');

    await clubPage.navigate();

    await Promise.all([
      clubPage.waitForClubsResponse(),
      clubPage.selectSearchBarHint(fixedCategory),
    ]);

    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();

    expect(allTags).toContain(fixedCategory);

    const cards: ClubCardComponent[] = await clubPage.getClubList();

    for (const card of cards) {
      expect(await card.isRatingVisible()).toBeTruthy();
    }

    const totalCount: number = await clubPage.getClubCount();
    expect(totalCount).toBe(cards.length);
  });
});
