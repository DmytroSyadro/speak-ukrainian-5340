import { test, expect } from '@/fixtures';

test.describe('Club API', () => {
  test('should return a list of clubs', async ({ ClubClient }) => {
    const response = await ClubClient.getClubs();
    expect(response.status()).toBe(200);
    const clubs = await response.json();
    expect(Array.isArray(clubs)).toBe(true);
    expect(clubs).toHaveLength(390);
  });
});
