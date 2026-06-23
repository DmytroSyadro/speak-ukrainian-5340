import { test, expect } from '@/fixtures/modal-fixture';
import { CitiesUser } from '@/data';

test ('Filter clubs by city show appropriate results', async ({ clubPage }) => {
    const KharkivCity: CitiesUser = CitiesUser.KHARKIV;

    await clubPage.navigate();
    await clubPage.waitForPageLoad();
    
    await clubPage.selectCity(KharkivCity);
    await clubPage.waitUntilCityLoads(KharkivCity);
    await clubPage.hasCitySelected(KharkivCity);

    const title = await clubPage.getBanner();
    await expect(await title.getCityName()).toEqual(KharkivCity);

    const adresses = await clubPage.getAllAddresses();
    for (const address of adresses) {
        await expect(address).toContain(KharkivCity);
    }

})