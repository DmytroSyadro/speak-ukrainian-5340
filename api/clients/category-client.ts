import { APIRequestContext, APIResponse, test } from '@playwright/test';

import { BaseClient } from './base-client';
import { CategoryRequestDto } from '@/api/dto';

export class CategoryClient extends BaseClient {
  constructor(request: APIRequestContext, apiToken?: string | null) {
    super(request, apiToken);
  }

  async getCategories(): Promise<APIResponse> {
    return await test.step('Get list of categories via API', async () => {
      const response = await this.get('/dev/api/categories');

      return response;
    });
  }

  async getCategoryByID(id: number): Promise<APIResponse> {
    return await test.step('Get specific category by ID', async () => {
      const response = await this.get(`/dev/api/category/${id}`);

      return response;
    });
  }

  async createCategory(payload: CategoryRequestDto): Promise<APIResponse> {
    return await test.step('Create a new category via POST', async () => {
      const response = await this.post('/dev/api/category', payload);

      return response;
    });
  }
}
