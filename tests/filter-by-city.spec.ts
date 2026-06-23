import { test, expect } from '@/fixtures/modal-fixture';
import { CitiesUser } from '@/data';
import * as allure from 'allure-js-commons';


allure.feature('Club page');
allure.owner('Lesia Liashko');

test ('Filter clubs by city', async ({ clubPage }) => {
    
    allure.description('Filter clubs by city show appropriate results');
    
    const KharkivCity: CitiesUser = CitiesUser.KHARKIV;

    await allure.step('Navigate to the Clubs page', async () => {
        await clubPage.navigate();
        await clubPage.waitForPageLoad();
    });
    
    await allure.step('Click on the City selector dropdown', async () => {
        await clubPage.selectCity(KharkivCity);
    });

    await allure.step(`Select different city({KharkivCity})`, async () => {
        await clubPage.waitUntilCityLoads(KharkivCity);
        await clubPage.hasCitySelected(KharkivCity);
    });

    await allure.step('Verify the clubs displayed in the search results', async () => {
        const title = await clubPage.getBanner();
        expect(await title.getCityName()).toEqual(KharkivCity);

        const adresses = await clubPage.getAllAddresses();
        for (const address of adresses) {
            expect(address).toContain(KharkivCity);
            }
        });
})