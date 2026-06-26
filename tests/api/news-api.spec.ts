import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import type { APIResponse } from '@playwright/test';
import type { NewsRequestDto } from '@/api/dto/news/news-request.dto';
import type { NewsResponseDto } from '@/api/dto/news/news-response.dto';
import type { NewsProfileDto } from '@/api/dto/news/news-profile.dto';
import { DataBuilderApi } from '@/data/data-builder-api';

test.describe('News API', (): void => {
  const payload: NewsRequestDto = DataBuilderApi.validNewsPayload();

  test.beforeEach(async (): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('News');
  });

  test('should return a list of news', async ({ newsClient }): Promise<void> => {
    await allure.story('Get List of All News');
    await allure.severity('critical');
    await allure.description(
      'Verify that the full list of news is retrieved successfully and check the basic structure.'
    );

    const response: APIResponse = await newsClient.getAllNews();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const news: NewsResponseDto[] = await response.json();

    await allure.step('Validate response structure and news count', async (): Promise<void> => {
      expect(Array.isArray(news)).toBe(true);
      expect(news.length).toBeGreaterThan(0);
      expect(news[0].title).toBeDefined();
    });
  });

  test('should create news and validate response', async ({ newsClient }): Promise<void> => {
    await allure.story('Create News');
    await allure.severity('critical');
    await allure.description(
      'Verify that a new news item is created successfully and check the response data.'
    );

    const response: APIResponse = await newsClient.createNews(payload);

    await allure.step('Validate response status is 200 OK', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    const body: NewsProfileDto = await response.json();

    await allure.step('Validate created news matches payload', async () => {
      expect(body.title).toBe(payload.title);
      expect(body.description).toBe(payload.description);
      expect(body.date).toBe(payload.date);
      expect(body.id).toBeDefined();
    });
  });

  test('should update news and validate response', async ({ newsClient }): Promise<void> => {
    await allure.story('Update News');
    await allure.severity('critical');
    await allure.description(
      'Verify that an existing news item is updated successfully with new data.'
    );

    const response: APIResponse = await newsClient.updateNews(27, payload);

    await allure.step('Validate response status is 200 OK', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    const body: NewsProfileDto = await response.json();

    await allure.step('Validate updated news matches new payload', async () => {
      expect(body.title).toBe(payload.title);
      expect(body.description).toBe(payload.description);
      expect(body.id).toBe(27);
    });
  });

  test('should delete news successfully', async ({ newsClient }): Promise<void> => {
    await allure.story('Delete News');
    await allure.severity('critical');
    await allure.description('Verify that a news item can be deleted successfully.');

    const response: APIResponse = await newsClient.deleteNews(27);

    await allure.step('Validate response status is 200 OK', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });
});
