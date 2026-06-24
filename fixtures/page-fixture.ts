import {
  ChallengePage,
  ClubDetailsPage,
  ClubPage,
  HomePage,
  NewsPage,
  NewsDetailsPage,
  ServicesPage,
} from '@/pages';
import { test as baseTest, expect as baseExpect } from './base-fixture';
import { PaymentPage } from '@/pages/payment-page';

type PageFixture = {
  challengePage: ChallengePage;
  paymentPage: PaymentPage;
  clubPage: ClubPage;
  homePage: HomePage;
  clubDetailsPage: ClubDetailsPage;
  newsPage: NewsPage;
  newsDetailsPage: NewsDetailsPage;
  servicesPage: ServicesPage;
};

export const test = baseTest.extend<PageFixture>({
  challengePage: async ({ page }, use): Promise<void> => {
    const challengePage = new ChallengePage(page);
    await use(challengePage);
  },
  paymentPage: async ({ page }, use): Promise<void> => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
  clubPage: async ({ page }, use): Promise<void> => {
    const clubPage = new ClubPage(page);
    await use(clubPage);
  },
  homePage: async ({ page }, use): Promise<void> => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  clubDetailsPage: async ({ page }, use): Promise<void> => {
    const clubDetailsPage = new ClubDetailsPage(page);
    await use(clubDetailsPage);
  },
  newsPage: async ({ page }, use): Promise<void> => {
    const newsPage = new NewsPage(page);
    await use(newsPage);
  },
  newsDetailsPage: async ({ page }, use): Promise<void> => {
    const newsDetailsPage = new NewsDetailsPage(page);
    await use(newsDetailsPage);
  },
  servicesPage: async ({ page }, use): Promise<void> => {
    const servicesPage = new ServicesPage(page);
    await use(servicesPage);
  },
});
export { baseExpect as expect };
