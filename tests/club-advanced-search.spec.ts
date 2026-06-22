import { expect, test } from '@playwright/test';
import { ClubPage } from '@/pages';
import { SignInModal } from '../modals/sign-in-modal';
import env from '../config/env';
import * as allure from 'allure-js-commons';
import { CitiesUser } from '@/data/cities-user';

test.describe('club-advanced-search', (): void => {
  let clubPage: ClubPage;
  let signInModal: SignInModal;

  const email = env.TEST_EMAIL!;
  const password = env.TEST_PASSWORD!;

  test.beforeEach(async ({ page }): Promise<void> => {
    clubPage = new ClubPage(page);
    signInModal = new SignInModal(page);

    await clubPage.navigate();
    await clubPage.waitForPageLoad();

    await clubPage.header.clickUserMenuItem(/увійти/i);

    const signInRoot = await signInModal.getRoot();
    await signInModal.fillCredentials(email, password);
    await signInModal.submit();
    await expect(signInRoot).toBeHidden();
  });

  test('should display centres in the particular city', async (): Promise<void> => {
    test.fail(true, 'Known bug #31');
    
    await allure.epic('Speak Ukrainian');
    await allure.owner('Petro Derlytsia');
    await allure.feature('Club page');
    await allure.story('Advanced Search for Centres');
    await allure.severity('high');
    await allure.tags('UI', 'Search', 'Centres', 'Filters');
    await allure.description('Verify that the user can select a location in the advanced search for a centre type and filter by city and district.');
    await allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/31');

    await allure.step('Step 1: Open Advanced Search sidebar', async () => {
        await clubPage.header.clickAdvancedSearch();
    });

    await allure.step('Step 2: Verify that all advanced search elements are present', async () => {
        await expect(clubPage.waitForPageLoad()).toBeTruthy();

        expect(await clubPage.isCityDropdownVisible()).toBeTruthy();
        expect(await clubPage.isDistrictDropdownVisible()).toBeTruthy();
        expect(await clubPage.isStationDropdownVisible()).toBeTruthy();

        expect(await clubPage.isAgeFieldVisible()).toBeTruthy();
        expect(await clubPage.isAgeLabelVisible()).toBeTruthy();
        expect(await clubPage.isCategoryLabelVisible()).toBeTruthy();

        expect(await clubPage.isOnlineLabelVisible()).toBeTruthy();
    });

    await allure.step('Step 3: Click on the radio button "Центр"', async () => {
        await clubPage.switchToCentreMode();
    });

    await allure.step('Step 4: Verify that elements disappear in the advanced search', async () => {
        expect(await clubPage.isCategoryLabelVisible()).toBeFalsy();
        expect(await clubPage.isOnlineLabelVisible()).toBeFalsy();
        expect(await clubPage.isAgeFieldVisible()).toBeFalsy();
        expect(await clubPage.isAgeLabelVisible()).toBeFalsy();
    });

    await allure.step('Step 5: Select the city "Київ"', async () => {
        await clubPage.filterByCity(CitiesUser.KYIV);
        await clubPage.waitForPageLoad();
    });

    await allure.step('Step 6: Verify that it is filtered by the city', async () => {
        const clubs = await clubPage.getClubList();
        for (const club of clubs) {
            const address = await club.getClubAddress();
            expect(address).toMatch(/Київ|Київська область/i);
        }
    });

    await allure.step('Step 7: Select the district "Святошинський"', async () => {
        await clubPage.filterByDistrict('Святошинський');
        await clubPage.waitForPageLoad();
    });

    await allure.step('Step 8: Verify that it is filtered by the district', async () => {
        const clubs = await clubPage.getClubList();
        for (const club of clubs) {
            const address = await club.getClubAddress();
            expect(address).toContain('Святошинський');
        }
    });

    await allure.step('Step 9: Close Advanced Search sidebar', async () => {
        await clubPage.header.clickAdvancedSearch();
    });

    await allure.step('Step 10: Refresh the page', async () => {
        await clubPage.reloadPage();
        expect(await clubPage.isClubModeSelected()).toBeTruthy();
    });
  });
});