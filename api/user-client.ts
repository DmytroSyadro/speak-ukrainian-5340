import { APIRequestContext, APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import type { SignupRequestDto, SuccessRegistrationDto } from '@/api/models/user-registration.dto';

export class UserClient extends BaseClient {
  constructor(request: APIRequestContext, apiToken?: string | null) {
    super(request, apiToken);
  }

  async signup(payload: SignupRequestDto): Promise<APIResponse> {
    return await allure.step('Register user via API', async () => {
      const response = await this.post('/dev/api/signup', payload, {
        'Content-Type': 'application/json',
      });

      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });

      return response;
    });
  }

  async parseSuccessRegistration(response: APIResponse): Promise<SuccessRegistrationDto> {
    return (await response.json()) as SuccessRegistrationDto;
  }
}
