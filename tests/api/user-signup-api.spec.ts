import { test, expect } from '@/fixtures/user-api-fixture';
import * as allure from 'allure-js-commons';
import type { SuccessRegistrationDto } from '@/api/dto/user-registration.dto';

test.describe('User Registration API', () => {
  test('POST /api/signup should register a new user and return SuccessRegistration', async ({
    userClient,
    signupPayload,
  }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('User Registration');
    await allure.story('Register a new user via signup endpoint');
    await allure.severity('critical');
    await allure.description(
      'Verify that POST /api/signup creates a new user and returns SuccessRegistration with id, email, and roleName.'
    );

    const response = await userClient.signup(signupPayload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body: SuccessRegistrationDto = await userClient.parseSuccessRegistration(response);

    await allure.step('Validate SuccessRegistration response', async () => {
      expect(body).toMatchObject({
        id: expect.any(Number),
        email: signupPayload.email,
        roleName: signupPayload.roleName,
      });
      expect(body.id).toBeGreaterThan(0);
    });
  });
});
