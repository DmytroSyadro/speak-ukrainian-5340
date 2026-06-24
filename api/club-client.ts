import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './base-client';

export class ClubClient extends BaseClient {
  constructor(request: APIRequestContext, apiToken?: string | null) {
    super(request, apiToken);
  }

  async getClubs(): Promise<APIResponse> {
    const response = await this.get('/dev/api/clubs');
    return response;
  }
}
