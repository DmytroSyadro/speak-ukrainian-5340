import { test, expect } from '@/fixtures/api-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { SuccessRegistrationDto } from '@/api/models/user-registration.dto';

test.describe('User Registration API', () => {
  test('POST /api/signup should register a new user and return SuccessRegistration', async ({
    UserClient,
  }) => {
    const payload = DataBuilderApi.signupPayload();

    await allure.epic('API Infrastructure');
    await allure.feature('User Registration');
    await allure.story('Register a new user via signup endpoint');
    await allure.severity('critical');
    await allure.description(
      'Verify that POST /api/signup creates a new user and returns SuccessRegistration with id, email, and roleName.'
    );

    const response = await UserClient.signup(payload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body: SuccessRegistrationDto = await UserClient.parseSuccessRegistration(response);

    await allure.step('Validate SuccessRegistration response', async () => {
      expect(body).toMatchObject({
        id: expect.any(Number),
        email: payload.email,
        roleName: payload.roleName,
      });
      expect(body.id).toBeGreaterThan(0);
    });
  });
});
