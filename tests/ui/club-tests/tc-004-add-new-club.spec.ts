import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilder } from '@/data/data-builders/data-builder';

allure.epic('Speak Ukrainian');
allure.owner('Nikita Muntianov');
allure.feature('Add Club');

test.describe('tc-004-add-new-club', (): void => {
  test.beforeEach(async ({ homePage, signInModal, addClubModal }): Promise<void> => {
    await addClubModal.setupPayloadSanitizer();

    await homePage.goto();

    await homePage.header.clickAddClubButton();
    await signInModal.waitForVisible();
    await signInModal.login(process.env.TEST_EMAIL as string, process.env.TEST_PASSWORD as string);
    await signInModal.waitForHidden();

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
    test.setTimeout(90000);

    const clubData = DataBuilder.getAddClubData();

    // Steps 2-5: Basic Information
    await addClubModal.fillClubName(clubData.clubName);
    await addClubModal.checkCategory(clubData.category);
    await addClubModal.fillAgeBounds(clubData.ageFrom, clubData.ageTo);
    await addClubModal.selectCenter(clubData.center);

    // Step 6: Proceed to Contacts
    await addClubModal.clickNextStep(clubData.stepContactsTitle);

    // Step 7: Open Nested Location Modal
    await addClubModal.clickAddLocationButton();
    await addLocationModal.waitForVisible();

    // Steps 8-12: Fill Location Details
    await addLocationModal.fillLocationName(clubData.locationName);
    await addLocationModal.selectCity(clubData.city);
    await addLocationModal.fillAddress(clubData.address);
    await addLocationModal.fillCoordinates(clubData.coordinates);
    await addLocationModal.fillPhone(clubData.phone);

    // Step 13: Save Location
    await addLocationModal.clickAddButton();

    // Steps 14-16: Fill Workdays and Contact Phone
    await addClubModal.checkWorkday(clubData.workDay);
    await addClubModal.selectWorkingHours(
      clubData.startHour,
      clubData.startMinute,
      clubData.endHour,
      clubData.endMinute
    );
    await addClubModal.fillContactPhone(clubData.phone);

    // Step 17: Proceed to Description
    await addClubModal.clickNextStep(clubData.stepDescriptionTitle);

    // Steps 18-19: Upload Logo and Fill Description
    await addClubModal.uploadLogo(clubData.logoPath);
    await addClubModal.fillDescription(clubData.description);

    await homePage.message.expectNoValidationErrors();

    await homePage.message.expectNoValidationErrors();

    await addClubModal.clickFinish();

    await homePage.message.expectSuccessMessageVisible(clubData.successMessage);
    // Postcondition: Teardown (Clean up Database);
    await expect(page).toHaveURL(clubData.profileUrlRegex);

    await profilePage.userItemsLocator.waitFor({ state: 'visible' });
    await profilePage.userItems.deleteClubByTitle(
      clubData.clubName,
      clubData.deleteOptionText,
      clubData.deleteSuccessMessage
    );
  });
});
