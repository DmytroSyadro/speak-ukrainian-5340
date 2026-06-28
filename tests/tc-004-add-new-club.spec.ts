import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilder } from '@/data/data-builder';

allure.epic('Speak Ukrainian');
allure.owner('Nikita Muntianov');
allure.feature('Add Club');

test.describe('tc-004-add-new-club', (): void => {
  test.beforeEach(async ({ homePage, signInModal, addClubModal }): Promise<void> => {
    await addClubModal.form.setupPayloadSanitizer();

    await homePage.goto();

    await homePage.header.clickAddClubButton();
    await signInModal.waitForVisible();
    await signInModal.login(process.env.TEST_EMAIL as string, process.env.TEST_PASSWORD as string);
    await signInModal.waitForHidden();

    await homePage.goto();
    await homePage.header.clickAddClubButton();
    await addClubModal.waitForVisible();
  });

  allure.severity('critical');
  allure.description('Add a New Club with required data');

  test('should add a new club with required data', async ({
    page,
    homePage,
    profilePage,
    addClubModal,
    addLocationModal,
  }): Promise<void> => {
    test.setTimeout(60000);

    const clubData = DataBuilder.getAddClubData();

    await addClubModal.form.fillClubName(clubData.clubName);
    await addClubModal.form.checkCategory(clubData.category);
    await addClubModal.form.fillAgeBounds(clubData.ageFrom, clubData.ageTo);
    await addClubModal.form.selectCenter(clubData.center);

    await addClubModal.form.clickNextStep(clubData.stepContactsTitle);

    await addClubModal.form.clickAddLocationButton();
    await addLocationModal.waitForVisible();

    await addLocationModal.form.fillLocationName(clubData.locationName);
    await addLocationModal.form.selectCity(clubData.city);
    await addLocationModal.form.fillAddress(clubData.address);
    await addLocationModal.form.fillCoordinates(clubData.coordinates);
    await addLocationModal.form.fillPhone(clubData.phone);

    await addLocationModal.form.clickAddButton();
    await addLocationModal.waitForHidden();

    await addClubModal.form.checkWorkday(clubData.workDay);
    await addClubModal.form.selectWorkingHours(
      clubData.startHour,
      clubData.startMinute,
      clubData.endHour,
      clubData.endMinute
    );
    await addClubModal.form.fillContactPhone(clubData.phone);

    await addClubModal.form.clickNextStep(clubData.stepDescriptionTitle);

    await addClubModal.form.uploadLogo(clubData.logoPath);
    await addClubModal.form.fillDescription(clubData.description);

    await homePage.message.expectNoValidationErrors();
    await addClubModal.form.clickFinish();

    await homePage.message.expectSuccessMessageVisible(clubData.successMessage);
    await expect(page).toHaveURL(clubData.profileUrlRegex);

    await profilePage.userItems.waitForVisible();
    await profilePage.userItems.deleteClubByTitle(
      clubData.clubName,
      clubData.deleteOptionText,
      clubData.deleteSuccessMessage
    );
  });
});
