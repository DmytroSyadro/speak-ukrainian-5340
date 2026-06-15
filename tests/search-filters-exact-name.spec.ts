import { expect, test } from '@playwright/test';
import { ClubPage } from '../pages/club-page';
import { ClubCardComponent } from '../pages/components/club-card-component';
import { TagsComponent } from '../pages/components/tags-component';
import { ClubCategory } from '../data/club-category';

test.describe('search-filters-exact-name', () => {
  test('should search by exact name', async ({ page }): Promise<void> => {
    const clubPage = new ClubPage(page);
    await clubPage.navigate();
    const inputText: string = await clubPage.getSearchInput();
    expect(inputText).toBe('Який гурток шукаєте?');
    await clubPage.searchByText('ІТ освіта: курси "ГРАНД"');
    await clubPage.waitForTitle('ІТ освіта: курси "ГРАНД"');
    const club: ClubCardComponent = await clubPage.getClubByTitle('IT освіта: курси "ГРАНД"');
    expect(club).toBeDefined();
    expect(await club.getClubTitle()).toBe('IT освіта: курси "ГРАНД"');
    const tags: TagsComponent = await clubPage.getClubTags();
    const allTags: string[] = await tags.getAllCategoryTags();
    expect(allTags).toContain(ClubCategory.PROGRAMMING);
  });
});
