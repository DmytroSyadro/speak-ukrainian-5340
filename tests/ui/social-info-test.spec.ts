import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';

test.describe('TC-043', () => {
  test('Verify Social Media and Donation links routing on the Challenge page', async ({
    challengePage,
  }) => {
    allure.feature('Challenge Page');
    allure.owner('Lesia Liashko');
    allure.description('Verify Social Media and Donation links routing on the Challenge page');

    const challengeId = 5;

    await allure.step('Navigate to the Challenge page and verify social media links', async () => {
      await challengePage.goto(challengeId);
    });

    const socialInfoComponent = challengePage.getSocialInfoComponent();

    await allure.step('Check the Facebook link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('facebook')).resolves.toBe(
        'https://www.facebook.com/teach.in.ukrainian'
      );
    });

    await allure.step('Check the YouTube link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('youtube')).resolves.toBe(
        'https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw'
      );
    });

    await allure.step('Check the Instagram link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('instagram')).resolves.toBe(
        'https://www.instagram.com/yedyni.ruh/'
      );
    });

    await allure.step('Check the Mail link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('mail')).resolves.toBe(
        'mailto:teach.in.ukrainian@gmail.com'
      );
    });

    await allure.step('Click the "Допомогти проєкту" button', async () => {
      await challengePage.clickHelpButton();
      const challengePageURL = (await challengePage.switchToNewTab()).url();
      expect(challengePageURL).toBe('https://secure.wayforpay.com/payment/s0f2891d77061');
    });
  });
});
