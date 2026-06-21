import env from '@/config/env';
import { test as base, expect as baseExpect } from '@playwright/test';

type BaseFixture = {
  baseUrl: string;
};

export const test = base.extend<BaseFixture>({
  baseUrl: async ({}, use): Promise<void> => {
    await use(env.BASE_URL);
  },
});

export { baseExpect as expect };
