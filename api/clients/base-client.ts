import { APIRequestContext, APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';

export class BaseClient {
  private readonly request: APIRequestContext;
  private readonly apiToken: string | null;

  constructor(request: APIRequestContext, apiToken?: string | null) {
    this.request = request;
    this.apiToken = apiToken || null;
  }

  // Helper для формування та логування заголовків
  private async buildAndLogHeaders(
    customHeaders?: Record<string, string>,
    contentType?: string
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(contentType && { 'Content-Type': contentType }),
      ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
      ...customHeaders,
    };

    // Маскуємо токен для безпеки в Allure звітах
    const headersForReport = { ...headers };
    if (headersForReport['Authorization']) {
      headersForReport['Authorization'] = 'Bearer **********';
    }

    // Додаємо заголовки як атачмент в Allure
    await allure.attachment('Request Headers', JSON.stringify(headersForReport, null, 2), {
      contentType: 'application/json',
    });

    return headers;
  }

  protected async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await allure.step(`GET: ${url}`, async () => {
      const computedHeaders = await this.buildAndLogHeaders(headers);

      return await this.request.get(url, {
        headers: computedHeaders,
      });
    });
  }

  protected async post<D = unknown>(
    url: string,
    data: D,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return await allure.step(`POST: ${url}`, async () => {
      const computedHeaders = await this.buildAndLogHeaders(headers, 'application/json');

      if (data) {
        await allure.attachment('Request Payload', JSON.stringify(data, null, 2), {
          contentType: 'application/json',
        });
      }

      return await this.request.post(url, {
        headers: computedHeaders,
        data: data,
      });
    });
  }

  protected async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await allure.step(`DELETE: ${url}`, async () => {
      const computedHeaders = await this.buildAndLogHeaders(headers);

      return await this.request.delete(url, {
        headers: computedHeaders,
      });
    });
  }

  protected async put<D = unknown>(
    url: string,
    data: D,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return await allure.step(`PUT: ${url}`, async () => {
      const computedHeaders = await this.buildAndLogHeaders(headers, 'application/json');

      if (data) {
        await allure.attachment('Request Payload', JSON.stringify(data, null, 2), {
          contentType: 'application/json',
        });
      }

      return await this.request.put(url, {
        headers: computedHeaders,
        data: data,
      });
    });
  }

  protected async patch<D = unknown>(
    url: string,
    data: D,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return await allure.step(`PATCH: ${url}`, async () => {
      const computedHeaders = await this.buildAndLogHeaders(headers, 'application/json');

      if (data) {
        await allure.attachment('Request Payload', JSON.stringify(data, null, 2), {
          contentType: 'application/json',
        });
      }

      return await this.request.patch(url, {
        headers: computedHeaders,
        data: data,
      });
    });
  }
}
