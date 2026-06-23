import { expect, test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import env from '@/config/env';
import { SignInModal } from '@/modals/authorization/sign-in-modal';
import { HomePage } from '@/pages/home-page';

test('Sign In - Successful Login', async ({ page }) => {
  await allure.epic('Speak Ukrainian');
  await allure.feature('Authentication');
  await allure.story(
    'As a registered user, I want to sign in with my credentials so I can access my account and platform features.'
  );
  await allure.severity('critical');
  await allure.tags('auth', 'sign-in', 'TC-24');
  await allure.displayName('Sign In - Successful Login');
  await allure.description(
    'Verify that a registered user with confirmed email can sign in from the main page, the modal closes, and the header reflects the logged-in state.'
  );

  const email = env.TEST_EMAIL;
  const password = env.TEST_PASSWORD;

  const homePage = new HomePage(page);
  const signInModal = new SignInModal(page);

  await allure.step('Precondition: Open the main page', async () => {
    await homePage.navigateTo('/');
  });

  await allure.step('Step 1: Click Sign In in the dropdown', async () => {
    await homePage.clickSignInButton();
    await expect(await signInModal.getRoot()).toBeVisible();
  });

  await allure.step('Step 2: Fill in the Email field', async () => {
    await signInModal.fillEmail(email);
    await expect.poll(async () => signInModal.getEmail()).toBe(email);
  });

  await allure.step('Step 3: Fill in the Password field', async () => {
    await signInModal.fillPassword(password);
    await expect.poll(async () => signInModal.getPassword()).toBe(password);
  });

  await allure.step('Step 4: Click Sign In button', async () => {
    await signInModal.submit();
    await expect(await signInModal.getRoot()).toBeHidden();
  });

  await allure.step('Step 5: Verify user is logged in', async () => {
    await homePage.header.expectUserIsLoggedIn();
  });

  await allure.step('Step 6: Verify auth buttons are hidden', async () => {
    await homePage.header.expectAuthButtonsHidden();
  });
});
