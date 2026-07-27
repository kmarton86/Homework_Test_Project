const { test } = require('@playwright/test');


test('Open Aldi login page', async ({ page }) => {

    await page.goto('https://account.aldi.us/s/login/');

});