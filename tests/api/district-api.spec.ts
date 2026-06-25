import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { APIResponse } from '@playwright/test';

test.describe('District API', (): void => {
  const { existingId } = DataBuilderApi.validDistrictIds();

  test('should return a list of districts', async ({ districtClient }): Promise<void> => {
    await allure.description('Verify that the list of districts is retrieved successfully');

    const response = await districtClient.getDistrcits();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const districts = await response.json();

    expect(Array.isArray(districts)).toBe(true);
    expect(districts.length).toBeGreaterThan(0);
  });

  test('should get district by id', async ({ districtClient }): Promise<void> => {
    await allure.description('Verify that a specific district can be found by id');

    const response: APIResponse = await districtClient.getDistrictById(existingId);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(existingId);
  });

  for (const { id } of DataBuilderApi.invalidDistrictIds()) {
    test(`should not get district by id=${id}`, async ({ districtClient }): Promise<void> => {
      await allure.description('Verify that 404 is returned when trying to get a district by an invalid id');

      const response: APIResponse = await districtClient.getDistrictById(id);
      
      await allure.step('Validate response status', async () => {
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
      });
    });
  }

  test('should get district by name', async ({ districtClient }): Promise<void> => {
    await allure.description('Verify that a specific district can be found by its name');
    
    const { existingName } = DataBuilderApi.validDistrictName();

    const response: APIResponse = await districtClient.getDistrictByName(existingName);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(existingName);
  });
});