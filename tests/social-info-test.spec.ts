import { test, expect } from '@playwright/test';
import { ChallengePage } from '@/pages/challenge-page';

test.describe('Check Social Media and Donation links routing on the Challenge page', () => {
  test('[TC-043] Verify Social Media and Donation links routing on the Challenge page', async ({
    page,
  }) => {
    const challengePage = new ChallengePage(page);
    const challengeId = 5;

    await challengePage.goto(challengeId);

    const socialInfoComponent = challengePage.getSocialInfoComponent();
    await expect(socialInfoComponent.getSocialLinkHref('facebook')).resolves.toBe(
      'https://www.facebook.com/teach.in.ukrainian'
    );
    await expect(socialInfoComponent.getSocialLinkHref('youtube')).resolves.toBe(
      'https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw'
    );
    await expect(socialInfoComponent.getSocialLinkHref('instagram')).resolves.toBe(
      'https://www.instagram.com/yedyni.ruh/'
    );
    await expect(socialInfoComponent.getSocialLinkHref('mail')).resolves.toBe(
      'mailto:teach.in.ukrainian@gmail.com'
    );

    await challengePage.clickHelpButton();
    const challengePageURL = await challengePage.switchToNewTab();
    await expect(challengePageURL).toBe('https://secure.wayforpay.com/payment/s0f2891d77061');
  });
});
