import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './base-client';
import type { ChallengeRequestDto } from '@/api/dto';

export class ChallengeClient extends BaseClient {
  constructor(request: APIRequestContext, apiToken?: string | null) {
    super(request, apiToken);
  }

  async getChallenges(): Promise<APIResponse> {
    return await this.get('/dev/api/challenges');
  }

  async getChallengeById(id: number): Promise<APIResponse> {
    return await this.get(`/dev/api/challenge/${id}`);
  }

  async createChallenge(payload: ChallengeRequestDto): Promise<APIResponse> {
    return await this.post('/dev/api/challenge', payload);
  }

  async deleteChallenge(id: number): Promise<APIResponse> {
    return await this.delete(`/dev/api/challenge/${id}`);
  }
}
