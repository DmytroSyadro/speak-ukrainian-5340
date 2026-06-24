import { APIRequestContext, APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons'; // або 'allure-playwright'
import { BaseClient } from './base-client';

export class ClubClient extends BaseClient {
  constructor(request: APIRequestContext, apiToken?: string | null) {
    super(request, apiToken);
  }

  async getClubs(): Promise<APIResponse> {
    return await allure.step('Get list of clubs via API', async () => {
      const response = await this.get('/dev/api/clubs');
      await allure.description(`Response status: ${response.status()}`);
      return response;
    });
  }
}
