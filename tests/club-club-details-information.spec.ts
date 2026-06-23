import { expect, test } from '@playwright/test';
import { ClubCardComponent } from '@/components/club/club-card-component';
import { ClubDetailsPage, ClubPage, NewsPage } from '@/pages';
import * as allure from 'allure-js-commons';

allure.epic('Speak Ukrainian');
allure.owner('Dmytro Syadro');
allure.feature('News page');

test.describe('news club information', (): void => {
  allure.severity('critical');
  allure.description(
    'Verify that club information on the News page matches the original club card on the Club page'
  );
  allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/73');

  test('should display club on the news page information', async ({ page }): Promise<void> => {
    const clubPage = new ClubPage(page);

    await allure.step('Navigate to club page and get first club card', async (): Promise<void> => {
      await clubPage.navigate();
    });

    const club: ClubCardComponent = await clubPage.getFirstClubCard();
    const clubTitle: string = await club.getClubTitle();

    await allure.step('Verify club card details on the Club page', async (): Promise<void> => {
      expect(await club.isOnlineVisible()).toBeFalsy();
      expect(await club.getClubRating()).toBe(5);
      expect(await club.isRatingVisible()).toBeTruthy();
      expect(await club.isClubAddressVisible()).toBeTruthy();
      expect(await (await club.getClubTags()).isTagEmpty()).toBeFalsy();
      expect(await club.isMoreDetailsButtonVisible()).toBeTruthy();
      expect(await club.isMoreDetailsButtonEnabled()).toBeTruthy();
    });

    const clubDetails = new ClubDetailsPage(page);

    await allure.step('Open club details page and verify title', async (): Promise<void> => {
      await club.clickMoreDetailsButton();
      await clubDetails.waitForPageLoad();
      expect(await clubDetails.getClubTitle()).toBe(clubTitle);
    });

    const newsPage = new NewsPage(page);

    await allure.step('Navigate to News page from club details', async (): Promise<void> => {
      await clubDetails.clickNews();
      await clubDetails.waitForPageLoad();
      expect(page.url()).toContain('/news');
    });

    const clubNews: ClubCardComponent = await newsPage.getFirstClubCard();

    await allure.step(
      'Verify club card details on the News page match original club',
      async (): Promise<void> => {
        expect(await clubNews.getClubTitle()).toBe(clubTitle);
        expect(await clubNews.isOnlineVisible()).toBeFalsy();
        expect(await clubNews.getClubRating()).toBe(5);
        expect(await clubNews.isRatingVisible()).toBeTruthy();
        expect(await clubNews.isClubAddressVisible()).toBeTruthy();
        expect(await (await clubNews.getClubTags()).isTagEmpty()).toBeFalsy();
        expect(await clubNews.isMoreDetailsButtonVisible()).toBeTruthy();
        expect(await clubNews.isMoreDetailsButtonEnabled()).toBeTruthy();
      }
    );
  });
});
