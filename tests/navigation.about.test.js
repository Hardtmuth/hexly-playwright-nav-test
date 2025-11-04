import { test, expect } from '@playwright/test';
import { pElementContent } from './fixtures.js'

test.describe('Site navigation from index page', () => {
  let h1Element;
  let pElement;

  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    h1Element = page.locator('h1');
    pElement = page.locator('p');
  });

  test('About page shows About <h1>', async ({ page }) => {
    await expect(page).toHaveTitle('About');
    await expect(h1Element).toHaveText('About');
    await expect(h1Element).toHaveCount(1);
    await expect(pElement).toHaveText(pElementContent.about);
  });

  test('Home link navigates to Home and H1 updates', async ({ page }) => {
    await page.click('a[href="index.html"]');
    await expect(page).toHaveURL(/index\.html$/);
    await expect(page).toHaveTitle('Home');
    await expect(h1Element).toHaveText('Home');
    await expect(h1Element).toHaveCount(1);
    await expect(pElement).toHaveText(pElementContent.home);
  });

  test('Contact link navigates to Contact and H1 updates', async ({ page }) => {
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html$/);
    await expect(page).toHaveTitle('Contact');
    await expect(h1Element).toHaveText('Contact');
    await expect(h1Element).toHaveCount(1);
    await expect(pElement).toHaveText(pElementContent.contact);
  });
});