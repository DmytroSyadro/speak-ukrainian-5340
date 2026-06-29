import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import { CreateStationDto, UpdateStationDto } from '@/api/dto';

export class StationClient extends BaseClient {
  async getAllStations(): Promise<APIResponse> {
    return allure.step('Get all stations', async () => {
      const response: APIResponse = await this.get('/dev/api/stations');

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getStationById(id: number): Promise<APIResponse> {
    return allure.step(`Get station by ID: ${id}`, async () => {
      const response: APIResponse = await this.get(`/dev/api/station/${id}`);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getStationsByCity(cityName: string): Promise<APIResponse> {
    return allure.step(`Get stations by city: ${cityName}`, async () => {
      const encodedCity = encodeURIComponent(cityName);
      const response: APIResponse = await this.get(`/dev/api/stations/${encodedCity}`);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async createStation(payload: CreateStationDto): Promise<APIResponse> {
    return allure.step('Create station', async () => {
      const response: APIResponse = await this.post('/dev/api/station', payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async updateStation(id: number, payload: UpdateStationDto): Promise<APIResponse> {
    return allure.step(`Update station by ID: ${id}`, async () => {
      const response: APIResponse = await this.put(`/dev/api/station/${id}`, payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async deleteStation(id: number): Promise<APIResponse> {
    return allure.step(`Delete station by ID: ${id}`, async () => {
      const response: APIResponse = await this.delete(`/dev/api/station/${id}`);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }
}
