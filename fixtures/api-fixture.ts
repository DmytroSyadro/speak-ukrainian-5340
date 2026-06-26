import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient, CategoryClient, DistrictClient } from '@/api/clients';
import config from '@/config/env';
import type { APIRequestContext, APIResponse } from '@playwright/test';

type ApiFixture = {
  clubClient: ClubClient;
  categoryClient: CategoryClient;
  districtClient: DistrictClient;
};
type ApiFixtureWorker = {
  apiAccessToken: string;
};

export const test = base.extend<ApiFixture, ApiFixtureWorker>({
  apiAccessToken: [
    async ({ playwright }, use): Promise<void> => {
      const apiContext: APIRequestContext = await playwright.request.newContext({
        baseURL: config.BASE_URL_API,
      });

      const loginResponse: APIResponse = await apiContext.post('/dev/api/signin', {
        headers: { 'Content-Type': 'application/json' },
        data: {
          email: config.TEST_EMAIL_API,
          password: config.TEST_PASSWORD_API,
        },
      });
      const { accessToken } = await loginResponse.json();
      await use(accessToken);
      await apiContext.dispose();
    },
    { scope: 'worker' },
  ],

  clubClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext: APIRequestContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const clubClient = new ClubClient(apiContext, apiAccessToken);

    await use(clubClient);

    await apiContext.dispose();
  },

  categoryClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const categoryClient = new CategoryClient(apiContext, apiAccessToken);

    await use(categoryClient);
    await apiContext.dispose();
  },

  districtClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext: APIRequestContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const districtClient = new DistrictClient(apiContext, apiAccessToken);

    await use(districtClient);

    await apiContext.dispose();
  },
});

export { baseExpect as expect };
