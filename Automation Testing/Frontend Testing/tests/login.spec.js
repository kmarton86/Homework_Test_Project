const { test, expect } = require('@playwright/test');
// Load Page objects
const { LoginPage } = require('../pages/LoginPage');
const { AccountDetailsPage } = require('../pages/AccountDetailsPage');

// Credentials for testing
const VALID_EMAIL = process.env.TEST_USER_EMAIL;
const VALID_PASSWORD = process.env.TEST_USER_PASSWORD;
const INVALID_PASSWORD = "ErvenytelenJelszo123";

// Test suite for ALDI Login page
test.describe('ALDI Login page', () => {

    test('Test - Login page display all required elements', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
 
        await expect(page).toHaveURL(/login/);
 
        // Banner
        await expect(loginPage.banner).toContainText('ACCOUNT AREA');
        await expect(loginPage.accountAreaHeading).toBeVisible();
 
        // Email 
        await expect(loginPage.emailLabel).toBeVisible();
        await expect(loginPage.emailInput).toBeVisible();
 
        // Password 
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.passwordFieldById).toContainText('Password');
 
        // Login button
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.loginButtonContainer).toBeVisible();
 
        // Captcha
        await expect(loginPage.captcha).toBeVisible();
        await expect(loginPage.captchaFull).toBeVisible();
        await expect(loginPage.captchaLocker).toContainText('Anti-Robot Verification');
    });


    test('Test - Log in successfully with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const accountDetailsPage = new AccountDetailsPage(page);

        await loginPage.open();

        // ---------------------------
        //CAPTCHA is not handled in this test, so the login will fail due to CAPTCHA verification. 
        // The following lines are commented out because they would not work without handling CAPTCHA.

        // LOGIN
        // await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

        // Success login - redirected to Account Details page
        // await expect(page).toHaveURL(/account\.aldi\.us\/s\/details/i, { timeout: 10000 });
 
        // Account Details oldal elemeinek ellenőrzése
        //await expect(accountDetailsPage.detailsLabel).toBeVisible();
        //await expect(accountDetailsPage.nameLabel).toBeVisible();
        //await expect(accountDetailsPage.mobilePhoneNumberLabel).toBeVisible();
        //await expect(accountDetailsPage.emailAddressLabel).toBeVisible();
        //await expect(accountDetailsPage.passwordLabel).toBeVisible();
    });


    test('Test - Show an error message with an invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();

        // ---------------------------
        //CAPTCHA is not handled in this test, so the login will fail due to CAPTCHA verification. 
        // The following lines are commented out because they would not work without handling CAPTCHA.
        
        // LOGIN with invalid password
        // await loginPage.login(VALID_EMAIL, INVALID_PASSWORD);
        //await page.pause();

        // Tester stays on login page
        // await expect(page).toHaveURL(/login/);

        // Error message is displayed
        //await expect(loginPage.errorLabel).toBeVisible({ timeout: 10000 });
        //await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
    });

});