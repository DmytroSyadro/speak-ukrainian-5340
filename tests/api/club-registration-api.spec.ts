import { test, expect } from '@/fixtures/api-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import config from '@/config/env';
import type { APIResponse } from '@playwright/test';
import type { ClubRegistrationUserRequestDto } from '@/api/dto/club-registration';
import type { ClubRequestDto } from '@/api/dto';
import { ClubRegistrationClient } from '@/api/clients/club-registration-client';

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
    await apiContext.dispose();
  });

  test.beforeEach(async ({ clubClient }): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('Club Registrations');

    const clubPayload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const clubResponse = await clubClient.createClub(clubPayload);

    expect(clubResponse.ok()).toBeTruthy();

    const clubBody = await clubResponse.json();
    testClubId = clubBody.id;
    expect(testClubId).toBeTruthy();
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

  test('should approve a club registration', async ({
    playwright,
    clubRegistrationClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description(
      'Verify that a manager can approve a club registration created by a standard user.'
    );

    // Step 1: Authenticate as a standard user
    const userContext = await playwright.request.newContext({ baseURL: config.BASE_URL_API });
    const loginResponse = await userContext.post('/dev/api/signin', {
      headers: { 'Content-Type': 'application/json' }, // Added required header
      data: { email: config.TEST_EMAIL, password: config.TEST_PASSWORD },
    });

    // Fail gracefully if the standard UI user doesn't exist in the DEV API database
    if (!loginResponse.ok()) {
      const errorText = await loginResponse.text();
      console.log(`\n--- SETUP SKIPPED ---`);
      console.log(`Failed to log in with TEST_EMAIL (${config.TEST_EMAIL}).`);
      console.log(`API Response: ${loginResponse.status()} - ${errorText}`);
      console.log(`---------------------\n`);

      test.skip(
        true,
        'Skipping approval test: TEST_EMAIL cannot authenticate in the Dev API environment.'
      );
      return;
    }

    await allure.step('Setup: Create Registration as Standard User', async (): Promise<void> => {
      const userBody = await loginResponse.json();
      const standardUserId = userBody.id;
      const userToken = userBody.accessToken;

      // Create a local client for the standard user
      const userRegistrationClient = new ClubRegistrationClient(userContext, userToken);

      // Create Registration
      const payload = DataBuilderApi.validClubRegistrationUserPayload(testClubId, standardUserId);
      const postResponse = await userRegistrationClient.registerUser(payload);

      // If even the standard user gets a 403, another business rule is blocking it
      if (!postResponse.ok()) {
        console.log(`Standard user registration failed: `, await postResponse.text());
      }
      expect(postResponse.ok()).toBeTruthy();

      const postBody = await postResponse.json();
      const registrationId = postBody.id;

      // Step 2: Approve Registration as Manager (using the injected fixture)
      const approveResponse = await clubRegistrationClient.approveRegistration(registrationId);
      const approveBody = await approveResponse.json();

      await allure.step('Validate approval response status', async (): Promise<void> => {
        expect(approveResponse.ok()).toBeTruthy();
        expect(approveResponse.status()).toBe(200);
      });

      await allure.step('Validate registration is approved', async (): Promise<void> => {
        expect(approveBody).toMatchObject({
          id: registrationId,
          approved: true,
        });
      });

      await userContext.dispose();
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
