import { test, expect } from '@playwright/test';
import { testTargetData } from './fixtures.js';

testTargetData.forEach(item => {
  test.describe(`${item.title} page test`, () => {
    let h1Element;
    let pElement;

    test.beforeEach(async ({ page }) => {
      await page.goto(`${item.url}`);
      h1Element = page.locator('h1');
      pElement = page.locator('p');
    });

    test('Current page content', async ({ page }) => {
      await expect(page).toHaveTitle(item.title);
      await expect(h1Element).toHaveText(item.title);
      await expect(h1Element).toHaveCount(1);
      await expect(pElement).toHaveText(item.content);
    });

    const otherPages = testTargetData.map(i => i.title.toLowerCase())
      .filter(i => i !== item.title.toLowerCase());

    otherPages.forEach(otherPage => {
      const otherPageData = testTargetData.filter(i => i.title.toLowerCase() === otherPage)[0];

      test(`From ${item.title} to ${otherPage} page content`, async ({ page }) => {
        await page.locator(`a[href*="${otherPageData.href}"]`).click();
        await expect(page).toHaveURL(`/${otherPageData.href}`);

        await expect(page).toHaveTitle(otherPageData.title);
        await expect(h1Element).toHaveText(otherPageData.title);
        await expect(h1Element).toHaveCount(1);
        await expect(pElement).toHaveText(otherPageData.content);

        await page.goBack();
      });
    });
  });
});
