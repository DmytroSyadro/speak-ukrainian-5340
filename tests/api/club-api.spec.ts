import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { APIResponse } from '@playwright/test';
import type { ClubRequestDto } from '@/api/dto';

test.describe('Club API', (): void => {
  const payload: ClubRequestDto = DataBuilderApi.validClubPayload();

  test.beforeEach(async (): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('Clubs');
  });

  test('should return a list of clubs', async ({ clubClient }): Promise<void> => {
    await allure.story('Get List of All Clubs');
    await allure.severity('critical');
    await allure.description(
      'Verify that the full list of clubs is retrieved successfully and check the total count.'
    );

    const response = await clubClient.getClubs();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const clubs = await response.json();

    await allure.step('Validate response structure and clubs count', async (): Promise<void> => {
      expect(Array.isArray(clubs)).toBe(true);
      expect(clubs.length).toBeGreaterThan(0);
    });
  });

  test('should create club and validate response', async ({ clubClient }) => {
    await allure.severity('critical');
    await allure.description(
      'Verify that a new club is created successfully and check the response structure.'
    );

    const response: APIResponse = await clubClient.createClub(payload);

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.name).toBe(payload.name);
    expect(body.description).toBe(payload.description);
  });

  for (const { id, description } of DataBuilderApi.invalidClubIds()) {
    test(`should not get club by ${description}`, async ({ clubClient }): Promise<void> => {
      await allure.severity('critical');
      await allure.description(
        'Verify that an error is returned when trying to get a club by an invalid ID.'
      );

      const response: APIResponse = await clubClient.getClubById(id);
      const body = await response.json();

      await allure.step('Validate response status', async () => {
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
      });

      await allure.step('Validate error response body', async () => {
        expect(body).toBeDefined();
        expect(body.status).toBe(404);
        expect(typeof body.message).toBe('string');
        expect(body.message.length).toBeGreaterThan(0);
      });
    });
  }
});
