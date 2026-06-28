import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { CategoryRequestDto } from '@/api/dto'; // Імпортуємо ваш DTO для суворої типізації

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

  test('should create a new category', async ({ categoryClient }) => {
    await allure.description(
      'Verify that an authorized user can create a new category using a valid payload.'
    );

    const uniqueSuffix = Date.now().toString().slice(-6);

    const newCategoryData: CategoryRequestDto = {
      id: 0,
      sortby: 1,
      name: `Auto Test Category ${uniqueSuffix}`,
      description: 'Category created by Playwright API test',
      urlLogo: 'https://example.com/logo.png',
      backgroundColor: '#FFFFFF',
      tagBackgroundColor: '#000000',
      tagTextColor: '#FF0000',
    };

    const response = await categoryClient.createCategory(newCategoryData);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const { id, name, description } = await response.json();

    await test.step('Validate created category data', async () => {
      expect(id).toBeGreaterThan(0);
      expect(name).toBe(newCategoryData.name);
      expect(description).toBe(newCategoryData.description);
    });
  });
});
