import { expect, test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ClubDetailsPage } from '@/pages';
import { TEST_CLUB_ID } from '@/data/';

test.describe('Club details page', () => {
  let clubDetailsPage: ClubDetailsPage;

  test.beforeEach(async ({ page }) => {
    clubDetailsPage = new ClubDetailsPage(page);
    await clubDetailsPage.navigateToClub(TEST_CLUB_ID);
    await clubDetailsPage.waitForPageLoad();
    await clubDetailsPage.waitForClubPageVisible();
  });

  test('should display main club details', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`/club/${TEST_CLUB_ID}`));

    expect(await clubDetailsPage.isClubDetailsDisplayed()).toBeTruthy();
    expect(await clubDetailsPage.getClubTitle()).toContain('American Gymnastics Club');
    expect(await clubDetailsPage.getClubDescription()).not.toHaveLength(0);
    expect(await clubDetailsPage.getClubRating()).toBeGreaterThan(0);
    expect(await clubDetailsPage.getClubAddress()).toContain('Київ');
  });

  test('should display club action buttons and comments section', async () => {
    expect(await clubDetailsPage.description.isEnrollButtonVisible()).toBeTruthy();
    expect(await clubDetailsPage.description.isDownloadButtonVisible()).toBeTruthy();
    expect(await clubDetailsPage.hero.isMessageManagerButtonVisible()).toBeTruthy();
    expect(await clubDetailsPage.comments.isCommentsSectionDisplayed()).toBeTruthy();
  });

  test('should display contact information', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`/club/${TEST_CLUB_ID}`));

    expect(await clubDetailsPage.contactInfo.isMapDisplayed()).toBeTruthy();
    expect(await clubDetailsPage.contactInfo.getAudienceAge()).toContain('Вік аудиторії');
    expect(await clubDetailsPage.contactInfo.getWebsiteLink()).toContain('agclub.com.ua');
    expect(await clubDetailsPage.contactInfo.getPhoneNumber()).toContain('+380');
  });

  test('should display comments section', async () => {
    expect(await clubDetailsPage.comments.isCommentsSectionDisplayed()).toBeTruthy();
  });

  test('TC-034: Verify that clicking "Залишити коментар" and "Відповісти" buttons show the authentication modal for unauthorized users', async () => {
    await allure.step('Step 1: Verify elements are visible', async () => {
      const isDisplayed = await clubDetailsPage.isClubDetailsDisplayed();
      expect(isDisplayed).toBe(true);

      const isCommentsVisible = await clubDetailsPage.comments.isCommentsSectionDisplayed();
      expect(isCommentsVisible).toBe(true);
    });

    await allure.step(
      'Step 2: Click the "Залишити коментар" button and verify notification appears',
      async () => {
        await clubDetailsPage.clickLeaveComment();
        await clubDetailsPage.waitForNotification();

        const isVisible = await clubDetailsPage.isNotificationVisible();
        expect(isVisible).toBe(true);

        const text = await clubDetailsPage.getNotificationText();
        expect(text).toContain('Увійдіть або зареєструйтеся');
      }
    );

    await allure.step(
      'Step 3: Click "Відповісти" on first comment and verify notification appears',
      async () => {
        await clubDetailsPage.clearNotification();

        const commentsCount = await clubDetailsPage.comments.getCommentsCount();
        expect(commentsCount).toBeGreaterThan(0);

        const firstComment = clubDetailsPage.comments.getCommentByIndex(0);
        await firstComment.clickReply();

        // Чекаємо на нову нотифікацію (вона з'явиться і зникне)
        await clubDetailsPage.waitForNotification();

        const isVisible = await clubDetailsPage.isNotificationVisible();
        expect(isVisible).toBe(true);

        const text = await clubDetailsPage.getNotificationText();
        expect(text).toContain('Увійдіть або зареєструйтеся');
      }
    );

    await allure.step(
      'Step 4: Click "Відповісти" on second comment and verify notification appears',
      async () => {
        await clubDetailsPage.clearNotification();

        const commentsCount = await clubDetailsPage.comments.getCommentsCount();
        expect(commentsCount).toBeGreaterThan(1);

        const secondComment = clubDetailsPage.comments.getCommentByIndex(1);
        await secondComment.clickReply();

        await clubDetailsPage.waitForNotification();

        const isVisible = await clubDetailsPage.isNotificationVisible();
        expect(isVisible).toBe(true);

        const text = await clubDetailsPage.getNotificationText();
        expect(text).toContain('Увійдіть або зареєструйтеся');
      }
    );
  });
});
