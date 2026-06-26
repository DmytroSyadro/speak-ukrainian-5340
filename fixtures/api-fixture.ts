import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient } from '@/api/club-client';
import { CityClient } from '@/api/city-client';
import config from '@/config/env';

type ApiFixture = {
  ClubClient: ClubClient;
  CityClient: CityClient;
};

export const test = base.extend<ApiFixture>({
  ClubClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const clubClient = new ClubClient(apiContext);

    await use(clubClient);

    await apiContext.dispose();
  },

  CityClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const cityClient = new CityClient(apiContext);

    await use(cityClient);

    await apiContext.dispose();
  },
});

export { baseExpect as expect };
