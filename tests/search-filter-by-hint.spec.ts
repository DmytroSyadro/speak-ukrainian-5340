import { expect, test } from '@playwright/test';
import { ClubPage } from '@/pages/club-page';
import { ClubCategory } from '@/data/club-category';
import { ClubCardComponent } from '@/components/club-card-component';
import { TagsComponent } from '@/components/tags-component';

test.describe('search-bar', (): void => {
  const title = 'IT освіта: курси "ГРАНД"';

  test('should search by exact hint name', async ({ page }): Promise<void> => {
    const clubPage = new ClubPage(page);

    await clubPage.navigate();

    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');

    await clubPage.selectSearchBarHint(title);
    await clubPage.waitForClubsResponse();
    await clubPage.waitForPageLoad();

    const club: ClubCardComponent = await clubPage.getClubByTitle(title);
    expect(await club.getClubTitle()).toBe(title);
    expect(await club.isOnlineVisible()).toBeTruthy();
    expect(await club.getClubRating()).toBe(4.5);

    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();
    expect(await clubPage.isTagEmpty()).not.toBeTruthy();
    expect(allTags).toContain(ClubCategory.PROGRAMMING);
    expect(await clubPage.getClubCount()).toBe(1);
  });

  test('should search by exact name', async ({ page }): Promise<void> => {
    const clubPage = new ClubPage(page);

    await clubPage.navigate();

    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');

    await clubPage.searchByText(title);

    const club: ClubCardComponent = await clubPage.getClubByTitle(title);
    expect(club).toBeDefined();
    expect(await club.getClubTitle()).toBe(title);
    expect(await club.isOnlineVisible()).toBeTruthy();
    expect(await club.getClubRating()).toBe(4.5);

    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();
    expect(await clubPage.isTagEmpty()).not.toBeTruthy();
    expect(allTags).toContain(ClubCategory.PROGRAMMING);
  });

  test('should search by hint category', async ({ page }): Promise<void> => {
    const clubPage = new ClubPage(page);

    await clubPage.navigate();

    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');

    const firstCategory: string = await clubPage.getFirstCategory();
    await clubPage.selectSearchBarHint(firstCategory);

    await clubPage.waitForNetworkIdle();
    await clubPage.waitForClubsResponse();

    const isEmpty: boolean = await clubPage.isTagEmpty();

    if (!isEmpty) {
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
    } else {
      const cardCount: number = await clubPage.getClubCount();
      expect(cardCount).toBe(0);
    }
  });
});
