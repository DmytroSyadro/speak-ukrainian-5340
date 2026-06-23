import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';

allure.feature('Challenge Page');
allure.owner('Lesia Liashko');

test('[TC-044]', async ({ challengePage }) => {
  allure.description('Verify the "Зареєструватись" button visibility and routing');

  await allure.step('Navigate to the challenge page and ', async () => {
    await challengePage.goto(4);
  });

  await allure.step('Scroll down to the action buttons section', async () => {
    await expect(challengePage.isRegisterButtonVisible()).resolves.toBeTruthy();
    await challengePage.waitForPageLoad();
  });

  await allure.step('Click the "Зареєструватись" button', async () => {
    await challengePage.clickRegisterButton();
  });

  await allure.step('Verify the redirection', async () => {
    await expect(challengePage.getCurrentUrl()).resolves.toContain(
      'https://speak-ukrainian.org.ua/challenges/registration/4'
    );
  });
});
