import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { login } from '@/utils/login';
import { ProfilePage } from '@/pages/profile-page';

test.describe('Profile Page Tests', () => {
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    await allure.step('Setup: Login and navigate to Profile page', async () => {
      await login(page);

      profilePage = new ProfilePage(page);
      const userId = await profilePage.getUserIdFromUrl();

      await profilePage.navigateToProfile(userId);
      await profilePage.waitForPageLoad();
    });
  });

  test('TC-90: Verify that user profile information is displayed correctly', async () => {
    await allure.step('Step 1: Verify that profile page is opened successfully', async () => {
      const isDisplayed = await profilePage.isProfilePageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await allure.step('Step 2: Verify that the profile card is displayed', async () => {
      const isVisible = await profilePage.profileCard.isVisible();
      expect(isVisible).toBe(true);
    });

    await allure.step('Step 3: Verify that user name is displayed correctly', async () => {
      const userName = await profilePage.getUserName();
      expect(userName).toBeTruthy();
      expect(userName.length).toBeGreaterThan(0);
    });

    await allure.step('Step 4: Verify that user role is displayed correctly', async () => {
      const userRole = await profilePage.getUserRole();
      expect(userRole).toBeTruthy();
      expect(userRole.length).toBeGreaterThan(0);
    });

    await allure.step('Step 5: Verify that email is displayed correctly', async () => {
      const email = await profilePage.getEmail();
      expect(email).toBeTruthy();
      expect(email).toContain('@');
    });

    await allure.step('Step 6: Verify that phone number section is displayed', async () => {
      const phone = await profilePage.getPhone();
      expect(phone).toBeDefined();
    });

    await allure.step('Step 7: Verify that Edit Profile button is visible', async () => {
      const isVisible = await profilePage.profileCard.isEditProfileButtonVisible();
      expect(isVisible).toBe(true);
    });
  });

  test('TC-91: Verify that Edit Profile button is displayed and clickable', async () => {
    await allure.step('Step 1: Verify that profile page is opened successfully', async () => {
      const isDisplayed = await profilePage.isProfilePageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await allure.step('Step 2: Verify that the Edit Profile button is visible', async () => {
      const isVisible = await profilePage.profileCard.isEditProfileButtonVisible();
      expect(isVisible).toBe(true);
    });

    await allure.step('Step 3: Click the Edit Profile button', async () => {
      await profilePage.clickEditProfile();
    });

    await allure.step('Step 4: Verify that profile editing page or form is opened', async () => {
      const isVisible = await profilePage.isEditFormVisible();
      expect(isVisible).toBe(true);
    });
  });

  test('TC-92: Verify navigation through sidebar tabs', async () => {
    await allure.step('Step 1: Verify that profile page is opened successfully', async () => {
      expect(await profilePage.isProfilePageDisplayed()).toBe(true);
    });

    await allure.step('Step 2: Click the Messages tab in the sidebar', async () => {
      await profilePage.clickMessagesTab();
    });

    await allure.step('Step 3: Verify that Messages section is displayed', async () => {
      await profilePage.waitForSection('messages');
      const title = await profilePage.getMessagesTitle();
      expect(title).toContain('Мої повідомлення');
    });

    await allure.step('Step 4: Click the Complaints tab in the sidebar', async () => {
      await profilePage.clickComplaintsTab();
    });

    await allure.step('Step 5: Verify that Complaints section is displayed', async () => {
      await profilePage.waitForSection('complaints');
      const title = await profilePage.getComplaintsTitle();
      expect(title).toContain('Скарги');
    });

    await allure.step('Step 6: Click the Applications tab in the sidebar', async () => {
      await profilePage.clickApplicationsTab();
    });

    await allure.step('Step 7: Verify that Applications section is displayed', async () => {
      await profilePage.waitForSection('applications');
      const title = await profilePage.getApplicationsTitle();
      expect(title).toContain('Заявки');
    });

    await allure.step('Step 8: Click the Certificates tab in the sidebar', async () => {
      await profilePage.clickCertificatesTab();
    });

    await allure.step('Step 9: Verify that Certificates section is displayed', async () => {
      await profilePage.waitForSection('certificates');
      const title = await profilePage.getCertificatesTitle();
      expect(title).toContain('Мої сертифікати');
    });

    await allure.step('Step 10: Click the Profile tab in the sidebar to return', async () => {
      await profilePage.clickProfileTab();
    });

    await allure.step('Step 11: Verify that Profile page is displayed again', async () => {
      expect(await profilePage.isProfilePageDisplayed()).toBe(true);
    });
  });

  test('TC-93: Verify that Add button is displayed in My Clubs section', async () => {
    await allure.step('Step 1: Verify that profile page is opened successfully', async () => {
      expect(await profilePage.isProfilePageDisplayed()).toBe(true);
    });

    await allure.step('Step 2: Verify that My Clubs section is displayed', async () => {
      const isVisible = await profilePage.userItems.isUserItemsSectionDisplayed();
      expect(isVisible).toBe(true);
    });

    await allure.step('Step 3: Verify that the Add button is visible', async () => {
      const isVisible = await profilePage.userItems.isAddButtonVisible();
      expect(isVisible).toBe(true);
    });

    await allure.step('Step 4: Click the Add button and select "Додати гурток"', async () => {
      await profilePage.clickAddClubAndWaitForModal();
    });

    await allure.step('Step 5: Verify that club creation form or modal is opened', async () => {
      const isVisible = await profilePage.isCreationFormVisible();
      expect(isVisible).toBe(true);
    });
  });
});
