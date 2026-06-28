import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient } from '@/api/clients/club-client';
import { CategoryClient } from '@/api/clients/category-client';
import config from '@/config/env';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { ClubRegistrationClient } from '@/api/clients/club-registration-client';

type ApiFixture = {
  clubClient: ClubClient;
  unauthClubClient: ClubClient;
  categoryClient: CategoryClient;
  clubRegistrationClient: ClubRegistrationClient;
  unauthClubRegistrationClient: ClubRegistrationClient;
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

  unauthClubClient: async ({ playwright }, use): Promise<void> => {
    const apiContext: APIRequestContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const clubClient = new ClubClient(apiContext);

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
  clubRegistrationClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const client = new ClubRegistrationClient(apiContext, apiAccessToken);
    await use(client);
    await apiContext.dispose();
  },

  unauthClubRegistrationClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const client = new ClubRegistrationClient(apiContext);
    await use(client);
    await apiContext.dispose();
  },
});

export { baseExpect as expect };
