import { expect, test } from '@playwright/test';
import env from '@/config/env';

import { AboutUsPage } from '@/pages/about-us-page';
import { SignInModal } from '@/modals/sign-in-modal';

test.describe('AboutUs team verification', () => {
  let aboutUsPage: AboutUsPage;

  test.beforeEach(async ({ page }) => {
    const email = env.TEST_EMAIL;
    const password = env.TEST_PASSWORD;

    aboutUsPage = new AboutUsPage(page);

    await test.step('Navigate to the About Us page', async () => {
      await aboutUsPage.navigateToAboutPage();
      await aboutUsPage.waitForPageLoad();
    });

    await test.step('Log in with credentials', async () => {
      await aboutUsPage.header.clickUserMenuItem(/увійти/i);
      const signInModal = new SignInModal(page);
      await signInModal.login(email!, password!);
    });
  });

  test('Verify that team member names and roles are displayed correctly for all team members', async () => {
    let teamMembersCount = 0;

    await test.step('Verify that at least 2 team members are displayed', async () => {
      teamMembersCount = await aboutUsPage.getTeamMembersCount();
      expect(teamMembersCount).toBeGreaterThanOrEqual(2);
    });

    await test.step('Verify the name and role of the first team member', async () => {
      const firstMemberName = await aboutUsPage.getTeamMemberName(0);
      const firstMemberRole = await aboutUsPage.getTeamMemberRole(0);

      expect(firstMemberName.trim()).toBe('Наталка Федечко');
      expect(firstMemberRole.trim()).toBe(
        'Співзасновниця та координаторка Ініціативи "Навчай українською"'
      );
    });

    await test.step('Verify the name and role of the second team member', async () => {
      const secondMemberName = await aboutUsPage.getTeamMemberName(1);
      const secondMemberRole = await aboutUsPage.getTeamMemberRole(1);

      expect(secondMemberName.trim()).toBe('Іванна Кобєлєва');
      expect(secondMemberRole.trim()).toBe(
        'Комунікаційна менеджерка Ініціативи "Навчай українською"'
      );
    });

    await test.step('Verify that all displayed team members have non-empty names and roles', async () => {
      for (let i = 0; i < teamMembersCount; i++) {
        const name = await aboutUsPage.getTeamMemberName(i);
        const role = await aboutUsPage.getTeamMemberRole(i);

        expect(name.trim()).not.toBe('');
        expect(role.trim()).not.toBe('');
      }
    });
  });
});
