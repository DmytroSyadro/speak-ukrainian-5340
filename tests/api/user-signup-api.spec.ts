import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import config from '@/config/env';
import { UserClient } from '@/api/user-client';
import { DataBuilderApi } from '@/data/data-builders/data-builder-api';
import type { SuccessRegistrationDto } from '@/api/dto/user-registration.dto';

test.describe('User Registration API', () => {
  test('POST /api/signup should register a new user and return SuccessRegistration', async ({
    playwright,
  }) => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const userClient = new UserClient(apiContext);

    try {
      const payload = DataBuilderApi.signupPayload();

      await allure.epic('API Infrastructure');
      await allure.feature('User Registration');
      await allure.story('Register a new user via signup endpoint');
      await allure.severity('critical');
      await allure.description(
        'Verify that POST /api/signup creates a new user and returns SuccessRegistration with id, email, and roleName.'
      );

      const response = await userClient.signup(payload);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const body: SuccessRegistrationDto = await userClient.parseSuccessRegistration(response);

      await allure.step('Validate SuccessRegistration response', async () => {
        expect(body).toMatchObject({
          id: expect.any(Number),
          email: payload.email,
          roleName: payload.roleName,
        });
        expect(body.id).toBeGreaterThan(0);
      });
    } finally {
      await apiContext.dispose();
    }
  });
});
