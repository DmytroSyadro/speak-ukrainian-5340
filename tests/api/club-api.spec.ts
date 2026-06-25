import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';

test.describe('Club API', () => {
  test('should return a list of clubs', async ({ ClubClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Clubs');
    await allure.story('Get List of All Clubs');
    await allure.severity('critical');
    await allure.description(
      'Verify that the full list of clubs is retrieved successfully and check the total count.'
    );

    const response = await ClubClient.getClubs();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const clubs = await response.json();

    await allure.step('Validate response structure and clubs count', async () => {
      expect(Array.isArray(clubs)).toBe(true);
      expect(clubs).toHaveLength(390);
    });
  });
});
