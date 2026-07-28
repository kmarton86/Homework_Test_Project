const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('ALDI Login page', () => {

    test('Login page should display all required elements', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.open();

        // Verify page URL
        await expect(page).toHaveURL(/login/);

        // Verify login form elements
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();

        // Verify CAPTCHA is displayed
        await expect(loginPage.captcha).toBeVisible();

    });

});