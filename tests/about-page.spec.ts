import { expect, test } from '@playwright/test';
import env from '@/config/env';

import { AboutUsPage } from '@/pages/about-us-page';
import { SignInModal } from '@/modals/sign-in-modal';

test.describe('AboutUs team verification', () => {
  let aboutUsPage: AboutUsPage;

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const email = env.TEST_EMAIL;
    const password = env.TEST_PASSWORD;
    if (!email || !password) {
      throw new Error(
        'TEST_EMAIL and TEST_PASSWORD environment variables must be set for this test.'
      );
    }

    aboutUsPage = new AboutUsPage(page);
    await aboutUsPage.navigateToAboutPage();
    await aboutUsPage.waitForPageLoad();

    await aboutUsPage.header.clickUserMenuItem(/увійти/i);

    const signInModal = new SignInModal(page);
    await signInModal.login(email, password);
  });

  test('Verify that team member names and roles are displayed correctly for all team members', async () => {
    const teamMembersCount = await aboutUsPage.getTeamMembersCount();
    expect(teamMembersCount).toBeGreaterThanOrEqual(2);

    const firstMemberName = await aboutUsPage.getTeamMemberName(0);
    const firstMemberRole = await aboutUsPage.getTeamMemberRole(0);

    expect(firstMemberName.trim()).toBe('Наталка Федечко');
    expect(firstMemberRole.trim()).toBe(
      'Співзасновниця та координаторка Ініціативи "Навчай українською"'
    );

    const secondMemberName = await aboutUsPage.getTeamMemberName(1);
    const secondMemberRole = await aboutUsPage.getTeamMemberRole(1);

    expect(secondMemberName.trim()).toBe('Іванна Кобєлєва');
    expect(secondMemberRole.trim()).toBe(
      'Комунікаційна менеджерка Ініціативи "Навчай українською"'
    );

    for (let i = 0; i < teamMembersCount; i++) {
      const name = await aboutUsPage.getTeamMemberName(i);
      const role = await aboutUsPage.getTeamMemberRole(i);

      expect(name.trim()).not.toBe('');
      expect(role.trim()).not.toBe('');
    }
  });
});
