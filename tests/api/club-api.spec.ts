import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { APIResponse } from '@playwright/test';
import type { ClubRequestDto, ClubUpdateRequestDto } from '@/api/dto';

test.describe('Club API', (): void => {
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

    const response: APIResponse = await clubClient.getClubs();
    const clubs = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    await allure.step('Validate response structure and clubs count', async (): Promise<void> => {
      expect(Array.isArray(clubs)).toBe(true);
      expect(clubs.length).toBeGreaterThan(0);
    });
  });

  test('should create club and validate response', async ({ clubClient }): Promise<void> => {
    await allure.severity('critical');
    await allure.description(
      'Verify that a new club is created successfully and check the response structure.'
    );

    const payload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const response: APIResponse = await clubClient.createClub(payload);
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    await allure.step('Validate created club fields', async (): Promise<void> => {
      expect(body).toMatchObject({
        name: payload.name,
        description: payload.description,
        ageFrom: payload.ageFrom,
        ageTo: payload.ageTo,
        isOnline: payload.isOnline,
        isApproved: payload.isApproved,
      });
      expect(body.id).toBeDefined();
      expect(typeof body.id).toBe('number');
      expect(Array.isArray(body.categories)).toBe(true);
      expect(body.categories.length).toBeGreaterThan(0);
    });

    await clubClient.deleteClub(body.id);
  });

  for (const { id, description } of DataBuilderApi.invalidClubIds()) {
    test(`should not get club by ${description}`, async ({ clubClient }): Promise<void> => {
      await allure.severity('critical');
      await allure.description(
        'Verify that an error is returned when trying to get a club by an invalid ID.'
      );

      const response: APIResponse = await clubClient.getClubById(id);
      const body = await response.json();

      await allure.step('Validate response status', async (): Promise<void> => {
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
      });

      await allure.step('Validate error response body', async (): Promise<void> => {
        expect(body).toMatchObject({
          status: 404,
          message: expect.any(String),
        });
        expect(body.message.length).toBeGreaterThan(0);
      });
    });
  }

  test('should not create a club with a higher early age than a late age', async ({
    clubClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify creating a club with a higher early age than a late age');

    const agePayload: ClubRequestDto = DataBuilderApi.invalidEarlyAgeClubPayload();
    const response: APIResponse = await clubClient.createClub(agePayload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    });

    await allure.step('Validate error response body structure', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 400,
        title: 'Bad Request',
        detail: expect.any(String),
        instance: '/dev/api/club',
      });
      expect(body.detail.length).toBeGreaterThan(0);
    });

    await allure.step('Validate no club was created', async (): Promise<void> => {
      expect(body.id).toBeUndefined();
      expect(body.name).toBeUndefined();
    });
  });

  test('should not create a club without the empty field "name"', async ({
    clubClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify creating a club without a required field "name"');

    const namePayload: ClubRequestDto = DataBuilderApi.invalidNameClubPayload();
    const response: APIResponse = await clubClient.createClub(namePayload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    });

    await allure.step('Validate error response body structure', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 400,
        title: 'Bad Request',
        detail: expect.any(String),
        instance: '/dev/api/club',
      });
      expect(body.detail.length).toBeGreaterThan(0);
    });

    await allure.step('Validate no club was created', async (): Promise<void> => {
      expect(body.id).toBeUndefined();
      expect(body.name).toBeUndefined();
    });
  });

  test('should update club with valid data', async ({ clubClient }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify updating a club with valid data');

    const payload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const postResponse: APIResponse = await clubClient.createClub(payload);
    const postBody = await postResponse.json();

    await allure.step('Validate club was created', async (): Promise<void> => {
      expect(postResponse.ok()).toBeTruthy();
      expect(postResponse.status()).toBe(201);
    });

    const updatePayload: ClubUpdateRequestDto = DataBuilderApi.validUpdateClubPayload({
      id: postBody.id,
    });

    const response: APIResponse = await clubClient.editClub(postBody.id, updatePayload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await allure.step('Validate updated club fields', async (): Promise<void> => {
      expect(body).toMatchObject({
        id: postBody.id,
        name: updatePayload.name,
        description: updatePayload.description,
        ageFrom: updatePayload.ageFrom,
      });
    });

    await clubClient.deleteClub(postBody.id);
  });

  test('should delete by existing id', async ({ clubClient }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify deleting a club by existing ID');

    const payload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const postResponse: APIResponse = await clubClient.createClub(payload);
    const postBody = await postResponse.json();

    await allure.step('Validate club was created', async (): Promise<void> => {
      expect(postResponse.ok()).toBeTruthy();
      expect(postResponse.status()).toBe(201);
    });

    const response: APIResponse = await clubClient.deleteClub(postBody.id);

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });

  for (const { id, description } of DataBuilderApi.invalidClubIds()) {
    test(`should not delete a club by ${description}`, async ({ clubClient }): Promise<void> => {
      await allure.severity('critical');
      await allure.description('Verify deleting a club by non-existing ID');

      const response: APIResponse = await clubClient.deleteClub(id);
      const body = await response.json();

      await allure.step('Validate response status', async (): Promise<void> => {
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
      });

      await allure.step('Validate error response body', async (): Promise<void> => {
        expect(body).toMatchObject({
          status: 404,
          message: expect.any(String),
        });
        expect(body.message.length).toBeGreaterThan(0);
      });
    });
  }

  test('should not create a club with an unauthorized user', async ({
    unauthClubClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that an unauthorized user cannot create a club');

    const payload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const response: APIResponse = await unauthClubClient.createClub(payload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(401);
    });

    await allure.step('Validate error response body', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 401,
        message: expect.any(String),
      });
      expect(body.message.length).toBeGreaterThan(0);
    });

    await allure.step('Validate no club was created', async (): Promise<void> => {
      expect(body.id).toBeUndefined();
      expect(body.name).toBeUndefined();
    });
  });

  test('should not update a club with an unauthorized user', async ({
    unauthClubClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that an unauthorized user cannot update a club');

    const updatePayload: ClubUpdateRequestDto = DataBuilderApi.validUpdateClubPayload({ id: 1 });
    const response: APIResponse = await unauthClubClient.editClub(1, updatePayload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(401);
    });

    await allure.step('Validate error response body', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 401,
        message: expect.any(String),
      });
      expect(body.message.length).toBeGreaterThan(0);
    });
  });

  test('should not delete a club with an unauthorized user', async ({
    unauthClubClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that an unauthorized user cannot delete a club');

    const response: APIResponse = await unauthClubClient.deleteClub(1);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(401);
    });

    await allure.step('Validate error response body', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 401,
        message: expect.any(String),
      });
      expect(body.message.length).toBeGreaterThan(0);
    });
  });

  test('should not adjust partially an early age older than a late age', async ({
    clubClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description(
      'Verify that partially updating a club with an early age older than a late age returns an error'
    );

    const postPayload: ClubRequestDto = DataBuilderApi.validClubPayload();
    const postResponse: APIResponse = await clubClient.createClub(postPayload);
    const postBody = await postResponse.json();

    await allure.step('Validate club was created', async (): Promise<void> => {
      expect(postResponse.ok()).toBeTruthy();
      expect(postResponse.status()).toBe(201);
    });

    const patchPayload = { ageFrom: 20, ageTo: 15 };
    const response: APIResponse = await clubClient.editClubPartially(postBody.id, patchPayload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    });

    await allure.step('Validate error response body structure', async (): Promise<void> => {
      expect(body).toMatchObject({
        status: 400,
        title: 'Bad Request',
        detail: expect.any(String),
      });
      expect(body.detail.length).toBeGreaterThan(0);
    });

    await allure.step('Validate club was not updated', async (): Promise<void> => {
      expect(body.ageFrom).toBeUndefined();
      expect(body.ageTo).toBeUndefined();
    });

    await clubClient.deleteClub(postBody.id);
  });
});
