import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import {
  ClubRegistrationRequestDto,
  ClubRegistrationUserRequestDto,
} from '@/api/dto/club-registration';

export class ClubRegistrationClient extends BaseClient {
  async registerChildren(payload: ClubRegistrationRequestDto): Promise<APIResponse> {
    return allure.step('Create children club registration via API', async () => {
      const response: APIResponse = await this.post('/dev/api/club-registration', payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async registerUser(payload: ClubRegistrationUserRequestDto): Promise<APIResponse> {
    return allure.step('Create user club registration via API', async () => {
      const response: APIResponse = await this.post('/dev/api/club-registration/user', payload);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getRegistrationsByManagerId(managerId: number): Promise<APIResponse> {
    return allure.step('Get club registrations by manager ID via API', async () => {
      const response: APIResponse = await this.get(`/dev/api/club-registration/${managerId}`);

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getIsUserRegisteredToClub(clubId: number, userId: number): Promise<APIResponse> {
    return allure.step('Check if user is registered to club via API', async () => {
      const response: APIResponse = await this.get(
        `/dev/api/club-registration/${clubId}/${userId}`
      );

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getUserChildrenByClub(clubId: number): Promise<APIResponse> {
    return allure.step('Get user children by club ID via API', async () => {
      const response: APIResponse = await this.get(
        `/dev/api/club-registration/user-children/${clubId}`
      );

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getUserApplications(userId: number): Promise<APIResponse> {
    return allure.step('Get user applications via API', async () => {
      const response: APIResponse = await this.get(
        `/dev/api/club-registration/user-applications/${userId}`
      );

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async getUnapprovedApplications(managerId: number): Promise<APIResponse> {
    return allure.step('Get unapproved applications by manager ID via API', async () => {
      const response: APIResponse = await this.get(
        `/dev/api/club-registration/unapproved/${managerId}`
      );

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async approveRegistration(clubRegistrationId: number): Promise<APIResponse> {
    return allure.step('Approve club registration via API (PATCH)', async () => {
      const response: APIResponse = await this.patch(
        `/dev/api/club-registration/approve/${clubRegistrationId}`,
        {}
      );

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async cancelRegistration(clubRegistrationId: number): Promise<APIResponse> {
    return allure.step('Cancel club registration via API (PATCH)', async () => {
      const response: APIResponse = await this.patch(
        `/dev/api/club-registration/cancel/${clubRegistrationId}`,
        {}
      );

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }
}
