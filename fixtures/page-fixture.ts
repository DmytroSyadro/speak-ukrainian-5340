import { ChallengePage, ClubDetailsPage, ClubPage, HomePage } from '@/pages';
import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { PaymentPage } from '@/pages/payment-page';

type PageFixture = {
  challengePage: ChallengePage;
  paymentPage: PaymentPage;
  clubPage: ClubPage;
  homePage: HomePage;
  clubDetailsPage: ClubDetailsPage;
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
});
export { baseExpect as expect };
