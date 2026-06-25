import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';

test.describe('Category API', () => {
  test('should return a list of categories', async ({ categoryClient }) => {
    await allure.description(
      'Verify that the categories endpoint returns a valid list of categories with status 200.'
    );
    const response = await categoryClient.getCategories();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const categories = await response.json();

    await test.step('Validate response structure is an array', async () => {
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });
  });

  test('should return a specific category by ID', async ({ categoryClient }) => {
    await allure.description(
      'Verify that the endpoint returns the correct category object when queried by a valid ID.'
    );

    const allCategoriesResponse = await categoryClient.getCategories();
    expect(allCategoriesResponse.status()).toBe(200);
    const allCategories = await allCategoriesResponse.json();

    expect(allCategories.length).toBeGreaterThan(0);
    const targetId = allCategories[0].id;
    const categoryName = allCategories[0].name;

    const response = await categoryClient.getCategoryByID(targetId);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const category = await response.json();

    await test.step('Validate response contains correct category data', async () => {
      expect(category).toHaveProperty('id', targetId);
      expect(category).toHaveProperty('name', categoryName);
    });
  });
});
