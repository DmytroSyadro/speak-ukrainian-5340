import {
  ChallengePage,
  ClubDetailsPage,
  ClubPage,
  HomePage,
  NewsPage,
  NewsDetailsPage,
  ChallengeTaskPage,
  AboutUsPage,
  ServicesPage,
  ProfilePage,
} from '@/pages';
import { test as baseTest, expect as baseExpect } from './api-fixture';
import { PaymentPage } from '@/pages/payment-page';

type PageFixture = {
  challengePage: ChallengePage;
  paymentPage: PaymentPage;
  clubPage: ClubPage;
  homePage: HomePage;
  clubDetailsPage: ClubDetailsPage;
  newsPage: NewsPage;
  newsDetailsPage: NewsDetailsPage;
  challengeTaskPage: ChallengeTaskPage;
  aboutUsPage: AboutUsPage;
  servicesPage: ServicesPage;
  profilePage: ProfilePage;
};

export const test = baseTest.extend<PageFixture>({
  challengePage: async ({ page }, use): Promise<void> => {
    await use(new ChallengePage(page));
  },
  paymentPage: async ({ page }, use): Promise<void> => {
    await use(new PaymentPage(page));
  },
  clubPage: async ({ page }, use): Promise<void> => {
    await use(new ClubPage(page));
  },
  homePage: async ({ page }, use): Promise<void> => {
    await use(new HomePage(page));
  },
  clubDetailsPage: async ({ page }, use): Promise<void> => {
    await use(new ClubDetailsPage(page));
  },
  newsPage: async ({ page }, use): Promise<void> => {
    await use(new NewsPage(page));
  },
  newsDetailsPage: async ({ page }, use): Promise<void> => {
    await use(new NewsDetailsPage(page));
  },
  challengeTaskPage: async ({ page }, use): Promise<void> => {
    await use(new ChallengeTaskPage(page));
  },
  aboutUsPage: async ({ page }, use): Promise<void> => {
    await use(new AboutUsPage(page));
  },
  servicesPage: async ({ page }, use): Promise<void> => {
    await use(new ServicesPage(page));
  },
  profilePage: async ({ page }, use): Promise<void> => {
    await use(new ProfilePage(page));
  },
});
export { baseExpect as expect };
