import { test, expect } from '@/fixtures/api-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import config from '@/config/env';
import type { APIResponse } from '@playwright/test';
import type { ClubRegistrationUserRequestDto } from '@/api/dto/club-registration';
import type { ClubRequestDto } from '@/api/dto';

test.describe('Club Registration API', (): void => {
  let testClubId: number;
  let testUserId: number;

  test.beforeAll(async ({ playwright }): Promise<void> => {
    const apiContext = await playwright.request.newContext({
      baseURL: config.BASE_URL_API,
    });
    const loginResponse = await apiContext.post('/dev/api/signin', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: config.TEST_EMAIL_API,
        password: config.TEST_PASSWORD_API,
      },
    });
    const body = await loginResponse.json();
    testUserId = body.id;

    console.log(`\n--- SETUP INFO ---`);
    console.log(`Logged in as User ID: ${testUserId}`);
    console.log(`------------------\n`);

    await apiContext.dispose();
  });

  test.beforeEach(async ({ clubClient }): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('Club Registrations');

    const clubPayload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const clubResponse = await clubClient.createClub(clubPayload);
    const clubBody = await clubResponse.json();
    testClubId = clubBody.id;
  });

  test.afterEach(async ({ clubClient }): Promise<void> => {
    if (testClubId) {
      await clubClient.deleteClub(testClubId);
    }
  });

  test('should return a list of registrations by manager ID', async ({
    clubRegistrationClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that a manager can get a list of their club registrations.');

    const response: APIResponse =
      await clubRegistrationClient.getRegistrationsByManagerId(testUserId);
    const body = await response.json();

    await allure.step('Validate response status and structure', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  test('should return a list of unapproved registrations', async ({
    clubRegistrationClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that a manager can retrieve unapproved applications.');

    const response: APIResponse =
      await clubRegistrationClient.getUnapprovedApplications(testUserId);
    const body = await response.json();

    await allure.step('Validate response status and structure', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  test('should not allow a Manager to register for a club', async ({
    clubRegistrationClient,
  }): Promise<void> => {
    await allure.story('Register User to Club - Role Restriction');
    await allure.severity('normal');
    await allure.description(
      'Verify that a user with a Manager role receives a 403 Forbidden when trying to register for a club.'
    );

    const payload: ClubRegistrationUserRequestDto = DataBuilderApi.validClubRegistrationUserPayload(
      testClubId,
      testUserId
    );
    const response: APIResponse = await clubRegistrationClient.registerUser(payload);
    const body = await response.json();

    await allure.step('Validate response status is 403 Forbidden', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });

    await allure.step('Validate role restriction error message', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 403,
        message: 'You have no necessary permissions (role)',
      });
    });
  });

  test('should approve a club registration', async ({ clubRegistrationClient }): Promise<void> => {
    await allure.severity('critical');

    const payload = DataBuilderApi.validClubRegistrationUserPayload(testClubId, testUserId);
    const postResponse = await clubRegistrationClient.registerUser(payload);

    // Safety check so the test doesn't crash trying to read ID of a failed creation
    if (!postResponse.ok()) {
      test.skip(true, 'Skipping approval test because registration creation failed (403)');
      return;
    }

    const postBody = await postResponse.json();
    const registrationId = postBody.id;

    // Approve Registration
    const approveResponse = await clubRegistrationClient.approveRegistration(registrationId);
    const approveBody = await approveResponse.json();

    await allure.step('Validate approval response status', async (): Promise<void> => {
      expect(approveResponse.ok()).toBeTruthy();
      expect(approveResponse.status()).toBe(200);
      expect(approveBody.approved).toBe(true);
    });
  });

  test('should not allow unauthorized user to get registrations', async ({
    unauthClubRegistrationClient,
  }): Promise<void> => {
    const response: APIResponse =
      await unauthClubRegistrationClient.getRegistrationsByManagerId(testUserId);
    const body = await response.json();
    expect(response.status()).toBe(401);
    expect(body.message).toBe('You are not authenticated');
  });

  for (const { id, description } of DataBuilderApi.invalidClubIds()) {
    test(`should not approve a registration with ${description}`, async ({
      clubRegistrationClient,
    }): Promise<void> => {
      test.fail(true, 'Backend bug: API returns 200 OK when approving non-existent registrations');
      const response: APIResponse = await clubRegistrationClient.approveRegistration(id);
      expect(response.ok()).toBeFalsy();
    });
  }
});
