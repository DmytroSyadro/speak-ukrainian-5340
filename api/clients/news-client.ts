import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import { NewsRequestDto } from '@/api/dto/news/news-request.dto';

export class NewsClient extends BaseClient {
  async getAllNews(): Promise<APIResponse> {
    return allure.step('Get list of news via API', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.get('/dev/api/newslist');
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async createNews(payload: NewsRequestDto): Promise<APIResponse> {
    return allure.step('Create news via API (POST)', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.post('/dev/api/news', payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async updateNews(id: number, payload: NewsRequestDto): Promise<APIResponse> {
    return allure.step('Update news via API (PUT)', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.put(`/dev/api/news/${id}`, payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async deleteNews(id: number): Promise<APIResponse> {
    return allure.step('Delete news via API', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.delete(`/dev/api/news/${id}`);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }
}
