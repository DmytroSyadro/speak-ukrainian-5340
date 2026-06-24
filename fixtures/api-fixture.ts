import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient } from '@/api/club-client';
import config from '@/config/env';

type ApiFixture = {
  ClubClient: ClubClient;
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
});

export { baseExpect as expect };
