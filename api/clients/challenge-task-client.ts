import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import type { TaskRequestDto, TaskUpdateRequestDto } from '@/api/dto/challenge-task';

export class ChallengeTaskClient extends BaseClient {
  async getTaskById(id: number): Promise<APIResponse> {
    return allure.step('Get task by ID via API', async () => {
      const response = await this.get(`/dev/api/challenge/task/${id}`);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async getAllTasks(): Promise<APIResponse> {
    return allure.step('Get all tasks despite challenge via API', async () => {
      const response = await this.get('/dev/api/tasks');
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async getTasksByChallengeId(challengeId: number): Promise<APIResponse> {
    return allure.step('Get all tasks of challenge via API (Admin)', async () => {
      const response = await this.get(`/dev/api/challenge/${challengeId}/tasks`);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async createTask(challengeId: number, payload: TaskRequestDto): Promise<APIResponse> {
    return allure.step('Create and add new task to challenge via API', async () => {
      const response = await this.post(`/dev/api/challenge/${challengeId}/task`, payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async updateTask(taskId: number, payload: TaskUpdateRequestDto): Promise<APIResponse> {
    return allure.step('Update task via API', async () => {
      const response = await this.put(`/dev/api/challenge/task/${taskId}`, payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async deleteTask(taskId: number): Promise<APIResponse> {
    return allure.step('Delete (archive) task via API', async () => {
      const response = await this.delete(`/dev/api/challenge/task/${taskId}`);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }
}
