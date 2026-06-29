import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from '@/api/clients/base-client';
import type { SignupRequestDto, SuccessRegistrationDto } from '@/api/dto/user-registration.dto';

export class UserClient extends BaseClient {
  async signup(payload: SignupRequestDto): Promise<APIResponse> {
    return allure.step('Register user via API', async () => {
      const response = await this.post('/dev/api/signup', payload);

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
