import { expect, test } from '@playwright/test';
import { ClubPage } from '@/pages';
import { CitiesUser } from '@/data';
import { ClubBannerTitleComponent } from '@/components/club/club-banner-title-component';
import { MapModal } from '@/modals';
import * as allure from 'allure-js-commons';

allure.epic('Speak Ukrainian');
allure.owner('Dmytro Syadro');
allure.feature('Club page');

test.describe('club-city-located', (): void => {
  let clubPage: ClubPage;
  let mapModal: MapModal;

  const kharkiv: CitiesUser = CitiesUser.KHARKIV;

  test.beforeEach(async ({ page }): Promise<void> => {
    clubPage = new ClubPage(page);
    mapModal = new MapModal(page);
    await clubPage.navigate();
    await clubPage.waitForPageLoad();
  });

  allure.severity('critical');
  allure.description('Verify that the clubs are located in the city selected in the City dropdown');
  allure.issue('https://github.com/UA-5340-TAQC/speak-ukrainian-5340/issues/32');

  test('should display clubs in the particular city', async ({ page }): Promise<void> => {
    await clubPage.selectCity(kharkiv);
    await clubPage.waitUntilCityLoads(kharkiv);
    await clubPage.hasCitySelected(kharkiv);

    const banner: ClubBannerTitleComponent = await clubPage.getBanner();
    expect(await banner.getCityName()).toEqual(kharkiv);
    await banner.clickMapButton();

    await expect(await mapModal.getRoot()).toBeVisible();
    expect(await (await mapModal.getFilter()).isCategoryFieldVisible()).toBeTruthy();
    expect(await (await mapModal.getFilter()).isCityFieldVisible()).toBeTruthy();

    expect(await (await mapModal.getFilter()).getCityFieldText()).toEqual(kharkiv);
    await mapModal.clickClusterMarkerByIndex(0);
    await mapModal.clickClusterByIndex(0);
    expect(await (await mapModal.getClubInfoPopup()).getAddressText()).toContain(kharkiv);

    await mapModal.clickCloseButton();
    await clubPage.waitForPageLoad();

    await expect(await mapModal.getRoot()).toBeHidden();
    expect(await clubPage.getClubCount()).toBeGreaterThan(0);
    await clubPage.hasCitySelected(kharkiv);

    const addresses: string[] = await clubPage.getAllAddresses();

    for (const address of addresses) {
      expect(address).toContain(kharkiv);
    }
  });
});
