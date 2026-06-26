import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { CityRequestDto, CityResponseDto } from '@/api/dto';
import { NON_EXISTENT_CITY_ID, DataBuilderApi } from '@/data';

test.describe('City API', () => {
  test('GET /api/cities — should return a non-empty list of cities', async ({ cityClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Get List of All Cities');
    await allure.severity('critical');
    await allure.description(
      'Verify that GET /api/cities returns HTTP 200 and a non-empty array of CityResponseDto objects with valid structure.'
    );

    const response = await cityClient.getCities();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const cities: CityResponseDto[] = await response.json();

    await allure.step('Validate response is a non-empty array', async () => {
      expect(Array.isArray(cities)).toBe(true);
      expect(cities.length).toBeGreaterThan(0);
    });

    await allure.step('Validate structure of the first city object', async () => {
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

  test('GET /api/cities — each city id should be unique', async ({ cityClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Get List of All Cities');
    await allure.severity('normal');
    await allure.description('Verify that all city IDs in the response are unique.');

    const response = await cityClient.getCities();

    expect(response.ok()).toBeTruthy();

    const cities: CityResponseDto[] = await response.json();

    await allure.step('Check all IDs are unique', async () => {
      const ids = cities.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  test('GET /api/city/{id} — should return city by valid id', async ({ cityClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Get City By ID');
    await allure.severity('critical');
    await allure.description(
      'Verify that GET /api/city/{id} returns HTTP 200 and correct CityResponseDto structure for a valid id.'
    );

    const listResponse = await cityClient.getCities();
    const cities: CityResponseDto[] = await listResponse.json();
    const firstCity = cities[0];

    const response = await cityClient.getCityById(firstCity.id);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const city: CityResponseDto = await response.json();

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

  test('GET /api/city/{id} — should return 404 for non-existent id', async ({ cityClient }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Get City By ID');
    await allure.severity('normal');
    await allure.description(
      'Verify that GET /api/city/{id} returns HTTP 404 for an id that does not exist.'
    );

    const response = await cityClient.getCityById(NON_EXISTENT_CITY_ID);

    await allure.step('Validate response status is 404', async () => {
      expect(response.status()).toBe(404);
    });
  });

  test('POST /api/city — should return 403 for user without sufficient role', async ({
    cityClient,
  }) => {
    await allure.epic('API Infrastructure');
    await allure.feature('Cities');
    await allure.story('Create City - Authorization');
    await allure.severity('critical');
    await allure.description(
      'Verify that a user with insufficient role (ROLE_MANAGER) receives 403 Forbidden when attempting to create a city.'
    );

    const newCity: CityRequestDto = DataBuilderApi.validCityPayload();

    const response = await cityClient.createCity(newCity);
    const body = await response.json();

    await allure.step('Validate response is 403 Forbidden', async () => {
      expect(response.status()).toBe(403);
    });

    await allure.step('Validate error message mentions missing permissions', async () => {
      expect(body.status).toBe(403);
      expect(body.message).toContain('permissions');
    });
  });
});
