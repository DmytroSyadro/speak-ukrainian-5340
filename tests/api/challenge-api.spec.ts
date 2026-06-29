import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { APIResponse } from '@playwright/test';
import type { ChallengeRequestDto } from '@/api/dto';
import type { ChallengeResponseDto } from '@/api/dto';

test.describe('Challenge API', (): void => {
  test.beforeEach(async (): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('Challenge');
  });

  test('should return a list of challenges', async ({ challengeClient }): Promise<void> => {
    await allure.story('Get List of All Challenges');
    await allure.severity('critical');
    await allure.description('Verify that the full list of challenges is retrieved successfully.');

    const response: APIResponse = await challengeClient.getChallenges();
    const challenges = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    await allure.step('Validate response structure', async (): Promise<void> => {
      expect(Array.isArray(challenges)).toBe(true);
    });
  });

  for (const { id, description } of DataBuilderApi.invalidChallengeIds()) {
    test(`should not get challenge by ${description}`, async ({
      challengeClient,
    }): Promise<void> => {
      await allure.severity('critical');
      await allure.description(
        'Verify that an error is returned when trying to get a challenge by an invalid ID.'
      );

      const response: APIResponse = await challengeClient.getChallengeById(id);
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

  test('should not create a challenge without admin permissions', async ({
    challengeClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description(
      'Verify that user without admin permissions cannot create a challenge.'
    );

    const payload: ChallengeRequestDto = DataBuilderApi.validChallengePayload();
    const response: APIResponse = await challengeClient.createChallenge(payload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    });

    await allure.step('Validate no challenge was created', async (): Promise<void> => {
      expect(body.id).toBeUndefined();
      expect(body.name).toBeUndefined();
    });
  });

  test('should not create a challenge with an unauthorized user', async ({
    unauthChallengeClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify that an unauthorized user cannot create a challenge.');

    const payload: ChallengeRequestDto = DataBuilderApi.validChallengePayload();
    const response: APIResponse = await unauthChallengeClient.createChallenge(payload);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(400);
    });

    await allure.step('Validate no challenge was created', async (): Promise<void> => {
      expect(body.id).toBeUndefined();
      expect(body.name).toBeUndefined();
    });
  });

  test('should get challenge by existing id from list', async ({
    challengeClient,
  }): Promise<void> => {
    await allure.severity('critical');
    await allure.description('Verify getting a challenge by existing ID from challenges list.');

    const listResponse: APIResponse = await challengeClient.getChallenges();
    const challenges = await listResponse.json();

    await allure.step('Validate challenges list is not empty', async (): Promise<void> => {
      expect(listResponse.ok()).toBeTruthy();
      expect(listResponse.status()).toBe(200);
      expect(Array.isArray(challenges)).toBe(true);
      expect(challenges.length).toBeGreaterThan(0);
    });

    const challengeId: number = challenges[0].id;

    const response: APIResponse = await challengeClient.getChallengeById(challengeId);
    const body = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await allure.step('Validate challenge id', async (): Promise<void> => {
      expect(body.id).toBe(challengeId);
      expect(Array.isArray(body.tasks)).toBe(true);
    });
  });

  test('should return challenges with required fields', async ({
    challengeClient,
  }): Promise<void> => {
    await allure.severity('normal');
    await allure.description('Verify that challenges list contains required fields.');

    const response: APIResponse = await challengeClient.getChallenges();
    const challenges: ChallengeResponseDto[] = await response.json();

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await allure.step('Validate challenge object structure', async (): Promise<void> => {
      expect(Array.isArray(challenges)).toBe(true);
      expect(challenges.length).toBeGreaterThan(0);

      challenges.forEach((challenge): void => {
        expect(challenge).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            title: expect.any(String),
            sortNumber: expect.any(Number),
          })
        );
      });
    });
  });
});
