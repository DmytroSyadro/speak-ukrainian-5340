import { CitiesUser } from '@/data';
import type { ClubBannerTitleComponent } from '@/components/club/club-banner-title-component';
import { test, expect } from '@/fixtures/modal-fixture';
import * as allure from 'allure-js-commons';

test.describe('club-city-located', (): void => {
  const kharkiv: CitiesUser = CitiesUser.KHARKIV;

  test.beforeEach(async ({ clubPage }): Promise<void> => {
    await allure.epic('Speak Ukrainian');
    await allure.owner('Dmytro Syadro');
    await allure.feature('Club page');
    await allure.severity('critical');
    await allure.description(
      'Verify that the clubs are located in the city selected in the City dropdown'
    );
    await allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/32');

    await clubPage.navigate();
    await clubPage.waitForPageLoad();
  });

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
