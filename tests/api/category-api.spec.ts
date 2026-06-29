import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { CategoryBuilder } from '@/data';
import { CategoryResponseDto } from '@/api/dto';

test.describe('Category API', () => {
  test.describe('GET /categories', () => {
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

      const { id: targetId, name: categoryName } = allCategories[0];

      const response = await categoryClient.getCategoryByID(targetId);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const category: CategoryResponseDto = await response.json();

      await test.step('Validate response contains correct category data', async () => {
        expect(category.id).toBe(targetId);
        expect(category.name).toBe(categoryName);
      });
    });
  });

  test.describe('POST /category', () => {
    test('should create a new category', async ({ authCategoryClient }) => {
      await allure.description(
        'Verify that an authorized user can create a new category using a valid payload.'
      );

      const payload = CategoryBuilder.validPayload();
      const response = await authCategoryClient.createCategory(payload);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const { id, name, description }: CategoryResponseDto = await response.json();

      await test.step('Validate created category data', async () => {
        expect(id).toBeGreaterThan(0);
        expect(name).toBe(payload.name);
        expect(description).toBe(payload.description);
      });

      await test.step('Delete the created category', async () => {
        const deleteResponse = await authCategoryClient.deleteCategory(id);
        expect(deleteResponse.ok()).toBeTruthy();
      });
    });

    test('should NOT create a category with an empty name', async ({ authCategoryClient }) => {
      await allure.description(
        'Verify that the API rejects category creation when the name field is empty.'
      );

      const invalidPayload = CategoryBuilder.invalidNamePayload();
      const response = await authCategoryClient.createCategory(invalidPayload);
      const responseText = await response.text();

      await test.step('Validate response is an error (Bad Request)', async () => {
        expect(
          response.ok(),
          `Expected failure, but request succeeded!\nResponse: ${responseText}`
        ).toBeFalsy();
        expect(response.status()).toBe(400);
      });
    });
  });

  test.describe('DELETE /category/{id}', () => {
    test('should delete an existing category', async ({ authCategoryClient }) => {
      await allure.description(
        'Verify that an authorized user can delete a category and it is removed from the system.'
      );

      const payload = CategoryBuilder.validPayload();
      const createResponse = await authCategoryClient.createCategory(payload);
      expect(createResponse.ok()).toBeTruthy();

      const { id }: CategoryResponseDto = await createResponse.json();

      await test.step('Send DELETE request', async () => {
        const deleteResponse = await authCategoryClient.deleteCategory(id);

        expect(deleteResponse.ok()).toBeTruthy();
        expect(deleteResponse.status()).toBe(200);
      });

      await test.step('Verify category is actually removed from DB', async () => {
        const getResponse = await authCategoryClient.getCategoryByID(id);

        expect(getResponse.status()).toBe(404);
      });
    });
  });

  test.describe('PUT /category/{id}', () => {
    test('should update an existing category', async ({ authCategoryClient }) => {
      await allure.description(
        'Verify that an authorized user can successfully update an existing category.'
      );

      const initialPayload = CategoryBuilder.validPayload();
      const createResponse = await authCategoryClient.createCategory(initialPayload);
      expect(createResponse.ok()).toBeTruthy();

      const { id }: CategoryResponseDto = await createResponse.json();

      const updatePayload = CategoryBuilder.validUpdatePayload({ id });

      await test.step('Send PUT request with updated data', async () => {
        const updateResponse = await authCategoryClient.updateCategory(id, updatePayload);

        expect(updateResponse.ok()).toBeTruthy();
        expect(updateResponse.status()).toBe(200);

        const updatedCategory: CategoryResponseDto = await updateResponse.json();

        expect(updatedCategory.id).toBe(id);
        expect(updatedCategory.name).toBe(updatePayload.name);
        expect(updatedCategory.description).toBe(updatePayload.description);
        expect(updatedCategory.sortby).toBe(updatePayload.sortby);
      });

      await test.step('Delete the updated category', async () => {
        const deleteResponse = await authCategoryClient.deleteCategory(id);
        expect(deleteResponse.ok()).toBeTruthy();
      });
    });
  });
});
