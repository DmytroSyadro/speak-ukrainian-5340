import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient } from '@/api/clients/club-client';
import config from '@/config/env';
import type { APIRequestContext, APIResponse } from '@playwright/test';

type ApiFixture = {
  apiAccessToken: string;
  clubClient: ClubClient;
};

export const test = base.extend<ApiFixture>({
  apiAccessToken: async ({ playwright }, use): Promise<void> => {
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

  clubClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext: APIRequestContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });

    const clubClient = new ClubClient(apiContext, apiAccessToken);

    await use(clubClient);

    await apiContext.dispose();
  },
});

export { baseExpect as expect };
