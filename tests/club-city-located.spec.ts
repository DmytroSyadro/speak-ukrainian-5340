import { CitiesUser } from '@/data';
import { ClubBannerTitleComponent } from '@/components/club/club-banner-title-component';
import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';

allure.epic('Speak Ukrainian');
allure.owner('Dmytro Syadro');
allure.feature('Club page');

test.describe('club-city-located', (): void => {
  const kharkiv: CitiesUser = CitiesUser.KHARKIV;

  test.beforeEach(async ({ clubPage }): Promise<void> => {
    await clubPage.navigate();
    await clubPage.waitForPageLoad();
  });

  allure.severity('critical');
  allure.description('Verify that the clubs are located in the city selected in the City dropdown');
  allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/32');

  test('should display clubs in the particular city', async ({
    clubPage,
    mapModal,
  }): Promise<void> => {
    await allure.step(`Select city "${kharkiv}" in the City dropdown`, async (): Promise<void> => {
      await clubPage.selectCity(kharkiv);
      await clubPage.waitUntilCityLoads(kharkiv);
      await clubPage.hasCitySelected(kharkiv);
    });

    const banner: ClubBannerTitleComponent = await clubPage.getBanner();

    await allure.step(
      'Verify banner displays selected city and open map',
      async (): Promise<void> => {
        expect(await banner.getCityName()).toEqual(kharkiv);
        await banner.clickMapButton();
      }
    );

    await allure.step(
      'Verify map modal is visible with category and city filters',
      async (): Promise<void> => {
        await expect(await mapModal.getRoot()).toBeVisible();
        expect(await (await mapModal.getFilter()).isCategoryFieldVisible()).toBeTruthy();
        expect(await (await mapModal.getFilter()).isCityFieldVisible()).toBeTruthy();
        expect(await (await mapModal.getFilter()).getCityFieldText()).toEqual(kharkiv);
      }
    );

    await allure.step('Click cluster marker and verify club address', async (): Promise<void> => {
      await mapModal.clickClusterMarkerByIndex(0);
      await mapModal.clickClusterByIndex(0);
      expect(await (await mapModal.getClubInfoPopup()).getAddressText()).toContain(kharkiv);
    });

    await allure.step('Close map modal', async (): Promise<void> => {
      await mapModal.clickCloseButton();
      await clubPage.waitForPageLoad();
      await expect(await mapModal.getRoot()).toBeHidden();
    });

    await allure.step('Verify all displayed clubs match selected city', async (): Promise<void> => {
      expect(await clubPage.getClubCount()).toBeGreaterThan(0);
      await clubPage.hasCitySelected(kharkiv);

      const addresses: string[] = await clubPage.getAllAddresses();

      for (const address of addresses) {
        expect(address).toContain(kharkiv);
      }
    });
  });
});
