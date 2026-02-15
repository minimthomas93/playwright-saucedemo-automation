// @ts-check
import { test, expect } from '@playwright/test';
import logger from '../src/utils/logger-util';
import env from '../src/config/env';

test('has title', async ({ page }) => {
  await logger.info("Test started")
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/,{timeout: 5000});
  await logger.info("Logged in to Swag labs")
  
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
