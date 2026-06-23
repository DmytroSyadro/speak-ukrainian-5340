import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';

allure.feature('Challenge Page');
allure.owner('Lesia Liashko');

test('TC-043', async ({
    challengePage
  }) => {
    allure.description('Verify Social Media and Donation links routing on the Challenge page');
    
    const challengeId = 5;

    allure.step('Navigate to the Challenge page and verify social media links', async () => {
      await challengePage.goto(challengeId);
    });

    const socialInfoComponent = challengePage.getSocialInfoComponent();
    
    allure.step('Check the Facebook link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('facebook')).resolves.toBe(
        'https://www.facebook.com/teach.in.ukrainian'
      );
    });
    
    allure.step('Check the YouTube link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('youtube')).resolves.toBe(
        'https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw'
      );
    });
    
    allure.step('Check the Instagram link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('instagram')).resolves.toBe(
        'https://www.instagram.com/yedyni.ruh/'
      );
    });
   
    allure.step('Check the Mail link', async () => {
      await expect(socialInfoComponent.getSocialLinkHref('mail')).resolves.toBe(
        'mailto:teach.in.ukrainian@gmail.com'
    );
    });

    allure.step('Click the "Допомогти проєкту" button', async () => {
      await challengePage.clickHelpButton();
      const challengePageURL = await challengePage.switchToNewTab();
      expect(challengePageURL).toBe('https://secure.wayforpay.com/payment/s0f2891d77061');
    });
})
