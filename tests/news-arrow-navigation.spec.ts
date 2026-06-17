import { test, expect } from '@playwright/test';
import { NewsPage } from '@/pages/news-page';
import { NewsDetailsPage } from '@/pages/newsdetails-page';

test.describe('News page arrow navigation', () => {
  test('Verify that the News component displays the same news articles after navigating right and then left', async ({
    page,
  }) => {
    const visibleCardsCount = 3;

    const newsPage = new NewsPage(page);
    await newsPage.navigateTo('/news');
    await newsPage.waitForPageLoad();

    const newsList = newsPage.getNewsList();
    const newsCount = await newsList.getNewsCount();
    expect(newsCount).toBeGreaterThan(0);
    const lastNewsCard = newsList.getNewsByIndex(newsCount - 1);
    await lastNewsCard.clickDetailsButton();

    const newsDetailsPage = new NewsDetailsPage(page);
    await newsDetailsPage.waitForPageLoad();
    const otherNews = newsDetailsPage.otherNews;
    await otherNews.waitForVisible();
    const firstVisibleCards = await otherNews.getVisibleCardsTitles();
    expect(firstVisibleCards).toHaveLength(visibleCardsCount);

    await otherNews.clickRightArrow();
    let secondVisibleCards: string[] = [];

    await expect(async () => {
      secondVisibleCards = await otherNews.getVisibleCardsTitles();
      expect(secondVisibleCards).not.toEqual(firstVisibleCards);
    }).toPass({ timeout: 3000 });

    expect(secondVisibleCards).toHaveLength(visibleCardsCount);

    await otherNews.clickLeftArrow();
    let thirdVisibleCards: string[] = [];

    await expect(async () => {
      thirdVisibleCards = await otherNews.getVisibleCardsTitles();
      expect(thirdVisibleCards).toEqual(firstVisibleCards);
    }).toPass({ timeout: 3000 });

    expect(thirdVisibleCards).toHaveLength(visibleCardsCount);
  });
});
