import { expect, test } from '@playwright/test';
import { NewsPage } from '@/pages';
import * as allure from 'allure-js-commons';
import { CitiesUser } from '@/data/cities-user';
import { OtherNewsComponent } from '@/components/news/other-news-component';

test.describe('news-navigation', (): void => {
  let newsPage: NewsPage;

  test.beforeEach(async ({ page }): Promise<void> => {
    newsPage = new NewsPage(page);
    await newsPage.navigate();
    await newsPage.waitForPageLoad();
  });

  test('tc-56: Verify pagination on the News page', async (): Promise<void> => {
    await allure.epic('Speak Ukrainian');
    await allure.owner('Petro Derlytsia');
    await allure.feature('News page');
    await allure.story('Pagination');
    await allure.severity('normal');
    await allure.tags('UI', 'News', 'Pagination');

    let firstPageTitles: string[] = [];

    await allure.step(
      'Step 1: Scroll down to the pagination component at the bottom of the news list',
      async () => {
        const pagination = newsPage.getPagination();
        await pagination.scrollToPagination();
        // eslint-disable-next-line playwright/prefer-web-first-assertions
        expect(await pagination.isVisible()).toBeTruthy();
      }
    );

    await allure.step('Step 2: Verify the active page number', async () => {
      const pagination = newsPage.getPagination();
      expect(await pagination.getActivePageNumber()).toBe(1);
      firstPageTitles = await newsPage.getNewsTitles();
    });

    await allure.step('Step 3: Click on the page "2" button in the pagination', async () => {
      const pagination = newsPage.getPagination();
      await pagination.goToPage(2);
      await newsPage.waitForPageLoad();
    });

    await allure.step('Step 4: Verify the active page number after click', async () => {
      const pagination = newsPage.getPagination();
      expect(await pagination.getActivePageNumber()).toBe(2);
    });

    await allure.step('Step 5: Verify the content of the news list', async () => {
      const secondPageTitles = await newsPage.getNewsTitles();
      expect(secondPageTitles).not.toEqual(firstPageTitles);
    });

    await allure.step('Step 6: Click on the "Next" (>) arrow button', async () => {
      const pagination = newsPage.getPagination();
      await pagination.clickNext();
      await newsPage.waitForPageLoad();
    });

    await allure.step('Step 7: Verify the active page number', async () => {
      const pagination = newsPage.getPagination();
      expect(await pagination.getActivePageNumber()).toBe(3);
    });
  });

  test('tc-58: Verify that changing the global city redirects to clubs, and returning to news displays the updated sidebar', async ({
    page,
  }): Promise<void> => {
    await newsPage.header.selectCity(CitiesUser.KYIV);
    await newsPage.navigate();
    await newsPage.waitForPageLoad();

    await allure.epic('Speak Ukrainian');
    await allure.owner('Petro Derlytsia');
    await allure.feature('News page');
    await allure.story('Sidebar City Synchronization');
    await allure.severity('high');

    const sidebar = newsPage.getClubsSidebar();

    await allure.step('Step 1: Locate the sidebar on the right side of the page', async () => {
      // eslint-disable-next-line playwright/prefer-web-first-assertions
      expect(await sidebar.isVisible()).toBeTruthy();
    });

    await allure.step('Step 2: Verify the title of the sidebar', async () => {
      expect(await sidebar.getSidebarTitle()).toBe('Гуртки у місті Київ');
    });

    await allure.step('Step 3: Locate the first club card in the sidebar', async () => {
      const firstCard = await sidebar.getClubCardByIndex(0);
      expect(await firstCard.isTitleVisible()).toBeTruthy();

      const address = await firstCard.getClubAddress();
      expect(address).toContain('Київ');
    });

    await allure.step(
      'Step 4: Change the global city selector in the header to a different city',
      async () => {
        await newsPage.header.selectCity(CitiesUser.KHARKIV);
      }
    );

    await allure.step(
      'Step 5: Verify that the Clubs page is opened for the selected city',
      async () => {
        await page.waitForURL('**/clubs*');
        expect(page.url()).toContain('/clubs');
        await newsPage.header.hasCitySelected(CitiesUser.KHARKIV);
      }
    );

    await allure.step(
      'Step 6: Click on the "Новини" link inside the main header to return to the news list',
      async () => {
        await newsPage.header.clickNews();
        await page.waitForURL('**/news*');
        await newsPage.waitForPageLoad();
      }
    );

    await allure.step(
      'Step 7: Verify the title of the sidebar after returning to the News page',
      async () => {
        expect(await sidebar.getSidebarTitle()).toBe('Гуртки у місті Харків');
      }
    );

    await allure.step(
      'Step 8: Verify the location/address text on the first club card in the sidebar',
      async () => {
        const firstCard = await sidebar.getClubCardByIndex(0);
        const address = await firstCard.getClubAddress();
        expect(address).toContain('Харків');
      }
    );

    await allure.step(
      'Step 9: Click on the "Детальніше" button of the first club in the sidebar',
      async () => {
        const firstCard = await sidebar.getClubCardByIndex(0);
        await firstCard.clickMoreDetailsButton();
        await page.waitForURL('**/club/*');
      }
    );
  });

  test('tc-59: Verify the full user journey of browsing, reading, and navigating between multiple news articles', async ({
    page,
  }): Promise<void> => {
    await allure.epic('Speak Ukrainian');
    await allure.owner('Petro Derlytsia');
    await allure.feature('News page');
    await allure.story('User Journey: Browsing and Reading News');
    await allure.severity('critical');

    let firstArticleTitle = '';
    let carouselArticleTitle = '';

    await allure.step('Step 1: Scroll down to the pagination and click on page "2"', async () => {
      const pagination = newsPage.getPagination();
      await pagination.scrollToPagination();
      await pagination.goToPage(2);
      await newsPage.waitForPageLoad();
    });

    await allure.step(
      'Step 2: Remember the title of the first news card on page 2, and click its "Детальніше ->" link',
      async () => {
        const firstCard = await newsPage.getNewsList().getNewsByIndex(0);
        firstArticleTitle = await firstCard.getTitle();
        await firstCard.clickDetailsButton();
      }
    );

    await allure.step('Step 3: Verify the article page has loaded correctly', async () => {
      await page.waitForURL('**/news/*');
      expect(page.url()).toContain('/news/');

      const articleTitleElement = page.getByText(firstArticleTitle, { exact: false }).first();
      await expect(articleTitleElement).toBeVisible();
    });

    await allure.step(
      'Step 4: Scroll down to the "Інші новини" (Other news) carousel section at the bottom',
      async () => {
        const carouselSection = page.locator('.other-news');
        await carouselSection.scrollIntoViewIfNeeded();
        await expect(carouselSection).toBeVisible();
      }
    );

    await allure.step(
      'Step 5: Remember the title of the first visible card in the carousel and click on it',
      async () => {
        const otherNews = new OtherNewsComponent(page.locator('.other-news'));

        const firstActiveCard = otherNews.getActiveCard(0);

        carouselArticleTitle = await firstActiveCard.getTitle();
        await firstActiveCard.clickDetailsButton();
      }
    );

    await allure.step('Step 6: Verify that the new article has loaded', async () => {
      await page.waitForURL('**/news/*');
      expect(page.url()).toContain('/news/');

      const articleTitleElement = page.getByText(carouselArticleTitle, { exact: false }).first();
      await expect(articleTitleElement).toBeVisible();
    });

    await allure.step(
      'Step 7: Click on the "Новини" link inside the main website header',
      async () => {
        await newsPage.header.clickNews();
      }
    );

    await allure.step('Step 8: Verify the final state of the user', async () => {
      await page.waitForURL('**/news');
      expect(page.url()).toContain('/news');

      await newsPage.waitForPageLoad();
      const pagination = newsPage.getPagination();
      expect(await pagination.getActivePageNumber()).toBe(1);
    });
  });
});
