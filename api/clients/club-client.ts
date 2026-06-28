import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import { ClubRequestDto } from '@/api/dto';
import { ClubUpdateRequestDto } from '@/api/dto/club/club-update-request.dto';

export class ClubClient extends BaseClient {
  async getClubs(): Promise<APIResponse> {
    return allure.step('Get list of clubs via API', async () => {
      const response: APIResponse = await this.get('/dev/api/clubs');

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getClubById(id: number): Promise<APIResponse> {
    return allure.step('Get club by ID', async () => {
      const response: APIResponse = await this.get(`/dev/api/club/${id}`);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async createClub(payload: ClubRequestDto): Promise<APIResponse> {
    return allure.step('Create club via API', async () => {
      const response: APIResponse = await this.post('/dev/api/club', payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async editClub(id: number, payload: ClubUpdateRequestDto): Promise<APIResponse> {
    return allure.step('Update club via API (PUT)', async () => {
      const response: APIResponse = await this.put(`/dev/api/club/${id}`, payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async deleteClub(id: number): Promise<APIResponse> {
    return allure.step('Delete club via API', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.delete(`/dev/api/club/${id}`);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }
  async editClubPartially(id: number, payload: unknown): Promise<APIResponse> {
    return allure.step('Edit partially club via API', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.patch(`/dev/api/club/${id}`, payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }
}
