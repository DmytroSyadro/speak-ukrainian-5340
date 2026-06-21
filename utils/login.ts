import { Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import env from '@/config/env';
import { HomePage } from '@/pages/home-page';
import { SignInModal } from '@/modals/sign-in-modal';

const { TEST_EMAIL, TEST_PASSWORD } = env;

export async function login(page: Page, email?: string, password?: string): Promise<void> {
  await allure.step(`Login to application`, async () => {
    const homePage = new HomePage(page);
    const signInModal = new SignInModal(page);

    const userEmail = email || TEST_EMAIL;
    const userPassword = password || TEST_PASSWORD;

    if (!userEmail || !userPassword) {
      throw new Error(
        'Email or password is not provided. Set TEST_EMAIL/TEST_PASSWORD in .env or pass as arguments.'
      );
    }

    await homePage.navigateTo('/');
    await homePage.waitForPageLoad();
    await homePage.header.clickUserMenuItem(/увійти/i);
    await signInModal.login(userEmail, userPassword);
  });
}
