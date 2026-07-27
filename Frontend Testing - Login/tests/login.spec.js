const { test, expect } = require('@playwright/test');

test.describe('ALDI Login', () => {

test('Login page should be displayed', async ({ page }) => {

    await page.goto(
        'https://account.aldi.us/s/login/'
    );

    await page.getByRole('button', {
        name:'Accept All'
    }).click();

    await expect(page)
        .toHaveURL(/login/);

    await expect(
        page.getByText('ALDI Account')
    ).toBeVisible();

});

});