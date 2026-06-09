import { test, expect } from '@playwright/test';
import  BASE_URL from '../config/env';

test('has title', async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Навчай українською/);
});

test('get started link', async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await page.getByRole('link', { name: 'Гуртки', exact: true }).click();

  const cityHeader = page.locator('h2.city-name', { hasText: 'Гуртки в місті Київ' });
  await expect(cityHeader).toBeVisible();
});
