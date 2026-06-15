import { expect, test } from '@playwright/test';

import { ClubDetailsPage } from '../pages/club-details-page';

test.describe('Club details page', () => {
  test('should display main club details', async ({ page }) => {
    const clubDetailsPage = new ClubDetailsPage(page);

    await clubDetailsPage.navigateToClub(26);

    await expect(page).toHaveURL(/\/club\/26/);

    expect(await clubDetailsPage.isClubDetailsDisplayed()).toBeTruthy();
    expect(await clubDetailsPage.getClubTitle()).toContain('American Gymnastics Club');
    expect(await clubDetailsPage.getClubDescription()).not.toHaveLength(0);
    expect(await clubDetailsPage.getClubRating()).toBeGreaterThan(0);
    expect(await clubDetailsPage.getClubAddress()).toContain('Київ');
  });

  test('should display club action buttons and comments section', async ({ page }) => {
    const clubDetailsPage = new ClubDetailsPage(page);

    await clubDetailsPage.navigateToClub(26);

    expect(await clubDetailsPage.description.isEnrollButtonVisible()).toBeTruthy();
    expect(await clubDetailsPage.description.isDownloadButtonVisible()).toBeTruthy();
    expect(await clubDetailsPage.hero.isMessageManagerButtonVisible()).toBeTruthy();
    expect(await clubDetailsPage.comments.isCommentsSectionDisplayed()).toBeTruthy();
  });

  test('should display contact information', async ({ page }) => {
    const clubDetailsPage = new ClubDetailsPage(page);

    await clubDetailsPage.navigateToClub(26);

    expect(await clubDetailsPage.contactInfo.isMapDisplayed()).toBeTruthy();
    expect(await clubDetailsPage.contactInfo.getAudienceAge()).toContain('Вік аудиторії');
    expect(await clubDetailsPage.contactInfo.getWebsiteLink()).toContain('agclub.com.ua');
    expect(await clubDetailsPage.contactInfo.getPhoneNumber()).toContain('+380');
  });

  test('should display comments section', async ({ page }) => {
    const clubDetailsPage = new ClubDetailsPage(page);

    await clubDetailsPage.navigateToClub(26);

    expect(await clubDetailsPage.comments.isCommentsSectionDisplayed()).toBeTruthy();
  });
});
