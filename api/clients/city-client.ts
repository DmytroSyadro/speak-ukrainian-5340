import { APIRequestContext, APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import { CityRequestDto } from '@/api/dto';

export class CityClient extends BaseClient {
  constructor(request: APIRequestContext, apiToken?: string | null) {
    super(request, apiToken);
  }

  async getCities(): Promise<APIResponse> {
    return await allure.step('Get list of cities via API', async () => {
      const response = await this.get('/dev/api/cities');
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async getCityById(id: number): Promise<APIResponse> {
    return await allure.step(`Get city by id: ${id}`, async () => {
      const response = await this.get(`/dev/api/city/${id}`);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async createCity(data: CityRequestDto): Promise<APIResponse> {
    return await allure.step('Create city via API', async () => {
      const response = await this.post('/dev/api/city', data);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async updateCity(id: number, data: CityRequestDto): Promise<APIResponse> {
    return await allure.step(`Update city by id: ${id}`, async () => {
      const response = await this.put(`/dev/api/city/${id}`, data);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async deleteCity(id: number): Promise<APIResponse> {
    return await allure.step(`Delete city by id: ${id}`, async () => {
      const response = await this.delete(`/dev/api/city/${id}`);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }
}
