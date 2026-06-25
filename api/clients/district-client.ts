import { SuccessCreatedDistrictDto } from '@/api/dto';
import { APIResponse, test } from '@playwright/test';
import { BaseClient } from './base-client';

export class DistrictClient extends BaseClient {
  async DeleteDistrict(id: number): Promise<APIResponse> {
    return test.step('Delete district by ID', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.delete(`/dev/api/district/${id}`);

      return response;
    });
  }

  async getDistrictById(id: number): Promise<APIResponse> {
    return test.step('Get district by ID', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.get(`/dev/api/district/${id}`);

      return response;
    });
  }

  async getDistrcits(): Promise<APIResponse> {
    return test.step('Get all districts', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.get(`/dev/api/districts`);

      return response;
    });
  }

  async getDistrictByName(name: string): Promise<APIResponse> {
    return test.step('Get district by its name', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.get(`/dev/api/district/${name}`);

      return response;
    });
  }

  async createDistrict(data: SuccessCreatedDistrictDto): Promise<APIResponse> {
    return test.step('Post new district', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.post(`/dev/api/district`, data);

      return response;
    });
  }

  async editDistrcit(id: number, data: SuccessCreatedDistrictDto): Promise<APIResponse> {
    return test.step('Post new district', async (): Promise<APIResponse> => {
      const response: APIResponse = await this.put(`/dev/api/district/${id}`, data);

      return response;
    });
  }
}
