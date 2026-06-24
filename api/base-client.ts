import { APIRequestContext, APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons'; // або 'allure-playwright', залежно від вашої версії

export class BaseClient {
  private readonly request: APIRequestContext;
  private readonly apiToken: string | null;

  constructor(request: APIRequestContext, apiToken?: string | null) {
    this.request = request;
    this.apiToken = apiToken || null;
  }

  protected async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await allure.step(`GET: ${url}`, async () => {
      return await this.request.get(url, {
        headers: {
          Accept: 'application/json',
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
          ...headers,
        },
      });
    });
  }

  protected async post<D = unknown>(
    url: string,
    data: D,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return await allure.step(`POST: ${url}`, async () => {
      if (data) {
        await allure.attachment('Request Payload', JSON.stringify(data, null, 2), {
          contentType: 'application/json',
        });
      }

      return await this.request.post(url, {
        headers: {
          Accept: 'application/json',
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
          ...headers,
        },
        data: data,
      });
    });
  }
}
