import { test as base, expect as baseExpect } from './base-fixture';
import { ClubClient, CategoryClient, DistrictClient, NewsClient, CityClient } from '@/api/clients';
import config from '@/config/env';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { ClubRegistrationClient } from '@/api/clients/club-registration-client';
import { CertificateByTemplateClient } from '@/api/clients/certificate-by-template-client';
import { ChallengeTaskClient } from '@/api/clients/challenge-task-client';

type ApiFixture = {
  clubClient: ClubClient;
  unauthClubClient: ClubClient;
  newsClient: NewsClient;
  categoryClient: CategoryClient;
  authCategoryClient: CategoryClient;
  clubRegistrationClient: ClubRegistrationClient;
  unauthClubRegistrationClient: ClubRegistrationClient;
  certificateClient: CertificateByTemplateClient;
  unauthCertificateClient: CertificateByTemplateClient;
  challengeTaskClient: ChallengeTaskClient;
  unauthChallengeTaskClient: ChallengeTaskClient;
  districtClient: DistrictClient;
  cityClient: CityClient;
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

  newsClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext: APIRequestContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const newsClient = new NewsClient(apiContext, apiAccessToken);

    await use(newsClient);

    await apiContext.dispose();
  },
  categoryClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const categoryClient = new CategoryClient(apiContext);

    await use(categoryClient);
    await apiContext.dispose();
  },
  authCategoryClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
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

  cityClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext: APIRequestContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const cityClient = new CityClient(apiContext, apiAccessToken);

    await use(cityClient);

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

  certificateClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const client = new CertificateByTemplateClient(apiContext, apiAccessToken);
    await use(client);
    await apiContext.dispose();
  },

  unauthCertificateClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const client = new CertificateByTemplateClient(apiContext);
    await use(client);
    await apiContext.dispose();
  },

  challengeTaskClient: async ({ playwright, apiAccessToken }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const client = new ChallengeTaskClient(apiContext, apiAccessToken);
    await use(client);
    await apiContext.dispose();
  },

  unauthChallengeTaskClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const client = new ChallengeTaskClient(apiContext);
    await use(client);
    await apiContext.dispose();
  },
});

export { baseExpect as expect };
