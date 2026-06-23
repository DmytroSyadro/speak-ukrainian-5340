import { test as base, expect as baseExpect } from '@playwright/test';
import env from '@/config/env';

type BaseFixture = {
  baseUrl: string;
};

export const test = base.extend<BaseFixture>({
  // eslint-disable-next-line no-empty-pattern
  baseUrl: async ({}, use): Promise<void> => {
    await use(env.BASE_URL);
  },
});

export { baseExpect as expect };
