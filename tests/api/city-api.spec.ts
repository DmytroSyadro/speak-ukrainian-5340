import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { CityProfile, CityResponse } from '@/api/city-client';

test.describe('City API', () => {
  test('GET /api/cities — should return a non-empty list of cities', async ({ CityClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Get List of All Cities');
    await allure.severity('critical');
    await allure.description(
      'Verify that GET /api/cities returns HTTP 200 and a non-empty array of CityResponse objects with valid structure.'
    );

    const response = await CityClient.getCities();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const cities: CityResponse[] = await response.json();

    await allure.step('Validate response is a non-empty array', async () => {
      expect(Array.isArray(cities)).toBe(true);
      expect(cities.length).toBeGreaterThan(0);
    });

    await allure.step('Validate structure of first city object', async () => {
      const city = cities[0];

      expect(typeof city.id).toBe('number');
      expect(typeof city.name).toBe('string');
      expect(city.name.trim().length).toBeGreaterThan(0);
      expect(typeof city.latitude).toBe('number');
      expect(typeof city.longitude).toBe('number');
    });

    await allure.step('Validate all cities have required fields', async () => {
      for (const city of cities) {
        expect(city).toHaveProperty('id');
        expect(city).toHaveProperty('name');
        expect(city).toHaveProperty('latitude');
        expect(city).toHaveProperty('longitude');
      }
    });

    await allure.attachment('Total cities count', String(cities.length), {
      contentType: 'text/plain',
    });
  });

  test('GET /api/cities — each city id should be unique', async ({ CityClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Get List of All Cities');
    await allure.severity('normal');
    await allure.description(
      'Verify that all city IDs in the response are unique (no duplicates).'
    );

    const response = await CityClient.getCities();

    expect(response.ok()).toBeTruthy();

    const cities: CityResponse[] = await response.json();

    await allure.step('Check all IDs are unique', async () => {
      const ids = cities.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});

test('GET /api/city/{id} — should return city by valid id', async ({ CityClient }) => {
  await allure.epic('API Infrastructure');
  await allure.feature('Cities');
  await allure.story('Get City By ID');
  await allure.severity('critical');
  await allure.description(
    'Verify that GET /api/city/{id} returns HTTP 200 and correct CityResponse structure for a valid id.'
  );

  // спочатку отримуємо список щоб взяти реальний id
  const listResponse = await CityClient.getCities();
  const cities: CityResponse[] = await listResponse.json();
  const firstCity = cities[0];

  const response = await CityClient.getCityById(firstCity.id);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const city: CityResponse = await response.json();

  await allure.step('Validate response structure', async () => {
    expect(typeof city.id).toBe('number');
    expect(typeof city.name).toBe('string');
    expect(city.name.trim().length).toBeGreaterThan(0);
    expect(typeof city.latitude).toBe('number');
    expect(typeof city.longitude).toBe('number');
  });

  await allure.step('Validate returned city matches requested id', async () => {
    expect(city.id).toBe(firstCity.id);
  });

  await allure.attachment('City data', JSON.stringify(city, null, 2), {
    contentType: 'application/json',
  });
});

test('GET /api/city/{id} — should return 404 for non-existent id', async ({ CityClient }) => {
  await allure.epic('API Infrastructure');
  await allure.feature('Cities');
  await allure.story('Get City By ID');
  await allure.severity('normal');
  await allure.description(
    'Verify that GET /api/city/{id} returns HTTP 404 for an id that does not exist.'
  );

  const nonExistentId = 999999;
  const response = await CityClient.getCityById(nonExistentId);

  await allure.step('Validate response status is 404', async () => {
    expect(response.status()).toBe(404);
  });
});
