import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient } from '@/api/club-client';
import { CategoryClient } from '@/api/category-client';
import config from '@/config/env';

type ApiFixture = {
  ClubClient: ClubClient;
  categoryClient: CategoryClient;
};

type WorkerAuthFixture = {
  apiToken: string;
};

export const test = base.extend<ApiFixture, WorkerAuthFixture>({
  apiToken: [
    async ({ playwright }, use) => {
      const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });

      const response = await apiContext.post('/dev/api/signin', {
        data: { email: config.TEST_EMAIL, password: config.TEST_PASSWORD },
      });

      if (!response.ok()) {
        const errorBody = await response.text();
        throw new Error(
          `Login failed! Status: ${response.status()}\nServer response: ${errorBody}`
        );
      }

      const { accessToken } = await response.json();

      await use(accessToken);
      await apiContext.dispose();
    },
    { scope: 'worker' },
  ],
  ClubClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const clubClient = new ClubClient(apiContext);

    await use(clubClient);

    await apiContext.dispose();
  },
  categoryClient: async ({ playwright, apiToken }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const categoryClient = new CategoryClient(apiContext, apiToken);

    await use(categoryClient);
    await apiContext.dispose();
  },
});

export { baseExpect as expect };
