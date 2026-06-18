import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '@/pages/home-page';
import { ClubPage } from '@/pages/club-page';
import { NewsPage } from '@/pages/news-page';
import { AboutUsPage } from '@/pages/about-us-page';
import { ChallengePage } from '@/pages/challenge-page';
import { ServicesPage } from '@/pages/services-page';
import config from '@/config/env';

const { BASE_URL } = config;

test.describe('Header Navigation Tests', () => {
  let page: Page;
  let homePage: HomePage;
  let clubPage: ClubPage;
  let newsPage: NewsPage;
  let aboutUsPage: AboutUsPage;
  let challengePage: ChallengePage;
  let servicesPage: ServicesPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    clubPage = new ClubPage(page);
    newsPage = new NewsPage(page);
    aboutUsPage = new AboutUsPage(page);
    challengePage = new ChallengePage(page);
    servicesPage = new ServicesPage(page);

    await homePage.navigateTo(BASE_URL);
    await homePage.waitForPageLoad();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('TC-029: Verify that all navigation menu links redirect to the correct pages', async () => {
    await test.step('Click on "Гуртки" link and verify redirect to Clubs page', async () => {
      await homePage.header.clickClubs();
      await expect(page).toHaveURL(/.*\/clubs/);
      await clubPage.waitForPageLoad();
    });

    await test.step('Click browser Back button and verify return to main page', async () => {
      await page.goBack();
      await expect(page).toHaveURL(BASE_URL);
      await homePage.waitForPageLoad();
    });

    await test.step('Click on "Челендж" link to open dropdown menu', async () => {
      await homePage.header.clickChallenge();
    });

    await test.step('Click on "Єдині" in dropdown and verify redirect to Challenge page', async () => {
      await homePage.header.waitForChallengeDropdown();
      await homePage.header.clickChallengeDropdownItem('Єдині');
      await expect(page).toHaveURL(/.*\/challenges\/\d+/);
      await challengePage.waitForPageLoad();
    });

    await test.step('Click on "Новини" link and verify redirect to News page', async () => {
      await homePage.navigateTo(BASE_URL);
      await homePage.waitForPageLoad();
      await homePage.header.clickNews();
      await expect(page).toHaveURL(/.*\/news/);
      await newsPage.waitForPageLoad();
    });

    await test.step('Click on "Про нас" link and verify redirect to About page', async () => {
      await homePage.navigateTo(BASE_URL);
      await homePage.waitForPageLoad();
      await homePage.header.clickAboutUs();
      await expect(page).toHaveURL(/.*\/about/);
      await aboutUsPage.waitForPageLoad();
    });

    await test.step('Click on "Послуги українською" link and verify redirect to Services page', async () => {
      await homePage.navigateTo(BASE_URL);
      await homePage.waitForPageLoad();
      await homePage.header.clickServices();
      await expect(page).toHaveURL(/.*\/service/);
      await servicesPage.waitForPageLoad();
    });

    await test.step('Click on logo and verify return to main page', async () => {
      await homePage.header.clickLogo();
      await expect(page).toHaveURL(BASE_URL);
    });
  });
});
