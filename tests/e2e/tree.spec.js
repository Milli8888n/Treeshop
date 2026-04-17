const { test, expect } = require('@playwright/test');

test.describe('TreeShop E2E User Flow', () => {

  test('should allow user to add a tree, view details, and then reset the collection', async ({ page }) => {
    // 1. Visit Home
    await page.goto('/');
    await expect(page).toHaveTitle(/TreeShop/);

    // 2. Navigate to Add Tree page
    await page.click('text=Add Tree');
    await expect(page).toHaveURL(/\/add/);

    // 3. Fill the form
    const uniqueName = `E2E Monstera ${Date.now()}`;
    await page.fill('#treename', uniqueName);
    await page.fill('#description', 'This tree was added during an E2E test to verify the full user journey.');
    await page.fill('#image', 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop');

    // 4. Submit the form
    await page.click('button:has-text("Catalogue Specimen")');

    // 5. Verify redirection and presence on home page
    await expect(page).toHaveURL('/');
    await expect(page.locator(`text=${uniqueName}`)).toBeVisible();

    // 6. Go to details page
    await page.click(`text=${uniqueName}`);
    await expect(page).toHaveURL(/\/details\//);
    await expect(page.locator('h1')).toContainText(uniqueName);
    await expect(page.locator('text=Botanical Description')).toBeVisible();

    // 7. Go back home
    await page.click('text=Back to Collection');
    await expect(page).toHaveURL('/');

    // 8. Reset the store
    await page.click('button:has-text("Reset Store")');
    
    // 9. Verify empty state
    await expect(page.locator('text=No specimens found')).toBeVisible();
  });

  test('should display about us page correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1')).toContainText('Cultivating');
    await expect(page.locator('text=Our Story')).toBeVisible();
  });
});
