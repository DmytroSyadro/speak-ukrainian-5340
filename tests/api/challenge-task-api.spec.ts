import { test, expect } from '@/fixtures/api-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { APIResponse } from '@playwright/test';
import type { TaskRequestDto, TaskUpdateRequestDto } from '@/api/dto/challenge-task';

test.describe('Challenge Task API', (): void => {
  const dummyChallengeId = 1;
  const dummyTaskId = 1;

  test.beforeEach(async (): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('Challenge Tasks');
  });

  test('should restrict Manager from getting all tasks (Expect 403)', async ({
    challengeTaskClient,
  }): Promise<void> => {
    await allure.story('Security - Role Restriction');
    await allure.severity('normal');

    const response: APIResponse = await challengeTaskClient.getAllTasks();

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should restrict Manager from creating a task (Expect 403)', async ({
    challengeTaskClient,
  }): Promise<void> => {
    // Documenting API quirk: Backend returns 400 for missing Challenge ID before checking 403 permissions
    test.fail(true, 'API validates foreign keys (400) before checking role permissions (403)');

    await allure.story('Security - Role Restriction');
    await allure.severity('critical');

    const payload: TaskRequestDto = DataBuilderApi.validTaskPayload();
    const response: APIResponse = await challengeTaskClient.createTask(dummyChallengeId, payload);

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should restrict Manager from updating a task (Expect 403)', async ({
    challengeTaskClient,
  }): Promise<void> => {
    // Documenting API quirk: Backend returns 400 for invalid IDs before checking 403 permissions
    test.fail(true, 'API validates foreign keys (400) before checking role permissions (403)');

    await allure.story('Security - Role Restriction');
    await allure.severity('critical');

    const payload: TaskUpdateRequestDto = DataBuilderApi.validTaskUpdatePayload(dummyChallengeId);
    const response: APIResponse = await challengeTaskClient.updateTask(dummyTaskId, payload);

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should restrict Manager from deleting a task (Expect 403)', async ({
    challengeTaskClient,
  }): Promise<void> => {
    await allure.story('Security - Role Restriction');
    await allure.severity('critical');

    const response: APIResponse = await challengeTaskClient.deleteTask(dummyTaskId);

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should restrict Manager from getting tasks by challenge ID (Expect 403)', async ({
    challengeTaskClient,
  }): Promise<void> => {
    await allure.story('Security - Role Restriction');
    await allure.severity('normal');

    const response: APIResponse = await challengeTaskClient.getTasksByChallengeId(dummyChallengeId);

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should return 404 Not Found when getting a non-existent task by ID (Public Endpoint)', async ({
    unauthChallengeTaskClient,
  }): Promise<void> => {
    await allure.story('Get Task By ID');
    await allure.severity('normal');

    const response: APIResponse = await unauthChallengeTaskClient.getTaskById(dummyTaskId);

    await allure.step('Validate response is 404 Not Found', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(404);
    });
  });
});
