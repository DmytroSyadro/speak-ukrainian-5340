import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';
import { StationResponse } from '@/api/dto/';
import {
  FIRST_STATION,
  NON_EXISTENT_ID,
  CITIES,
  TEST_STATION,
  UPDATED_STATION,
  INVALID_STATION_PAYLOADS,
} from '@/data/stations';

test.describe('Station API Tests', () => {
  test('GET /api/stations - should return list of all stations', async ({ stationClient }) => {
    await allure.step('Get all stations', async () => {
      const response = await stationClient.getAllStations();

      expect(response.status()).toBe(200);

      const data = (await response.json()) as StationResponse[];
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      const firstStation = data[0];
      expect(firstStation).toHaveProperty('id');
      expect(firstStation).toHaveProperty('name');
      expect(firstStation).toHaveProperty('cityName');
      expect(firstStation).toHaveProperty('districtName');
    });
  });

  test('GET /api/station/{id} - should return specific station by ID', async ({
    stationClient,
  }) => {
    await allure.step(`Get station by ID: ${FIRST_STATION.id}`, async () => {
      const response = await stationClient.getStationById(FIRST_STATION.id);

      expect(response.status()).toBe(200);

      const data = (await response.json()) as StationResponse;
      expect(data.id).toBe(FIRST_STATION.id);
      expect(data.name).toBe(FIRST_STATION.name);
      expect(data.cityName).toBe(FIRST_STATION.cityName);
    });
  });

  test('GET /api/station/{id} - should return error for non-existent ID', async ({
    stationClient,
  }) => {
    await allure.step(`Get station with non-existent ID: ${NON_EXISTENT_ID}`, async () => {
      const response = await stationClient.getStationById(NON_EXISTENT_ID);
      expect(response.status()).toBe(500);
    });
  });

  test('GET /api/stations/{name} - should return stations by city name', async ({
    stationClient,
  }) => {
    await allure.step(`Get stations by city: ${CITIES.KYIV}`, async () => {
      const response = await stationClient.getStationsByCity(CITIES.KYIV);

      expect(response.status()).toBe(200);

      const data = (await response.json()) as StationResponse[];
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      data.forEach((station) => {
        expect(station.cityName).toBe(CITIES.KYIV);
      });
    });
  });

  test('GET /api/stations/{name} - should return empty array for non-existent city', async ({
    stationClient,
  }) => {
    await allure.step(`Get stations by non-existent city: ${CITIES.NON_EXISTENT}`, async () => {
      const response = await stationClient.getStationsByCity(CITIES.NON_EXISTENT);

      expect(response.status()).toBe(200);

      const data = (await response.json()) as StationResponse[];
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(0);
    });
  });

  test('GET /api/stations - should have unique station IDs', async ({ stationClient }) => {
    await allure.step('Verify all stations have unique IDs', async () => {
      const response = await stationClient.getAllStations();
      const data = (await response.json()) as StationResponse[];

      const ids = data.map((station) => station.id);
      const uniqueIds = new Set(ids);

      expect(ids).toHaveLength(uniqueIds.size);
    });
  });
});

test.describe('Station CRUD API Tests (Unauthorized)', () => {
  test('POST /api/station - should return 403 for unauthorized user', async ({ stationClient }) => {
    await allure.step('Attempt to create station without admin rights', async () => {
      const response = await stationClient.createStation(TEST_STATION);
      expect(response.status()).toBe(403);
    });
  });

  test('PUT /api/station/{id} - should return 403 for unauthorized user', async ({
    stationClient,
  }) => {
    await allure.step('Attempt to update station without admin rights', async () => {
      const response = await stationClient.updateStation(FIRST_STATION.id, UPDATED_STATION);
      expect(response.status()).toBe(403);
    });
  });

  test('DELETE /api/station/{id} - should return 403 for unauthorized user', async ({
    stationClient,
  }) => {
    await allure.step('Attempt to delete station without admin rights', async () => {
      const response = await stationClient.deleteStation(FIRST_STATION.id);
      expect(response.status()).toBe(403);
    });
  });

  test('POST /api/station - should return 400 for invalid station data', async ({
    stationClient,
  }) => {
    await allure.step('Attempt to create station with invalid data', async () => {
      for (const { payload } of INVALID_STATION_PAYLOADS) {
        const response = await stationClient.createStation(payload);
        expect(response.status()).toBe(400);
      }
    });
  });
});
