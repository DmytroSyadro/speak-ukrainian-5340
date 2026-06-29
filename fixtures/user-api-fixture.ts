import { test as base, expect as baseExpect } from './base-fixture';
import { UserClient } from '@/api/user-client';
import { DataBuilderApi } from '@/data/data-builders/data-builder-api';
import type { SignupRequestDto } from '@/api/dto/user-registration.dto';
import env from '@/config/env';

type UserApiFixture = {
  userClient: UserClient;
  signupPayload: SignupRequestDto;
};

export const test = base.extend<UserApiFixture>({
  userClient: async ({ playwright }, use): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: env.BASE_URL_API,
    });

    await use(new UserClient(apiContext));

    await apiContext.dispose();
  },

  // eslint-disable-next-line no-empty-pattern -- fixture without Playwright dependencies
  signupPayload: async ({}, use): Promise<void> => {
    await use(DataBuilderApi.signupPayload());
  },
});

export { baseExpect as expect };
