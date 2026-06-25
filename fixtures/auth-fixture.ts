import env from '@/config/env';
import type { HomePage } from '@/pages/home-page';
import type { SignInModal } from '@/modals/authorization/sign-in-modal';
import { test as modalTest, expect as baseExpect } from './modal-fixture';

export type TestCredentials = {
  email: string;
  password: string;
};

type AuthFixture = {
  testCredentials: TestCredentials;
  homePageOnMain: HomePage;
  loggedInUser: TestCredentials;
};

async function login(
  homePage: HomePage,
  signInModal: SignInModal,
  credentials: TestCredentials
): Promise<void> {
  await homePage.navigateTo('/');
  await homePage.header.clickUserMenuItem(/увійти/i);
  await signInModal.login(credentials.email, credentials.password);
}

export const test = modalTest.extend<AuthFixture>({
  // eslint-disable-next-line no-empty-pattern -- fixture without Playwright dependencies
  testCredentials: async ({}, use): Promise<void> => {
    const { TEST_EMAIL, TEST_PASSWORD } = env;

    if (!TEST_EMAIL || !TEST_PASSWORD) {
      throw new Error('Set TEST_EMAIL and TEST_PASSWORD in .env');
    }

    await use({ email: TEST_EMAIL, password: TEST_PASSWORD });
  },

  homePageOnMain: async ({ homePage }, use): Promise<void> => {
    await homePage.navigateTo('/');
    await homePage.waitForPageLoad();
    await use(homePage);
  },

  loggedInUser: async ({ homePage, signInModal, testCredentials }, use): Promise<void> => {
    await login(homePage, signInModal, testCredentials);
    await use(testCredentials);
  },
});

export { baseExpect as expect };
