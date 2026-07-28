const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const VALID_EMAIL = process.env.TEST_USER_EMAIL;
const VALID_PASSWORD = process.env.TEST_USER_PASSWORD;
const INVALID_PASSWORD = "ErvenytelenJelszo123";

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
 
        // Jelszó 
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.passwordFieldById).toContainText('Password');
 
        // Login gomb
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.loginButtonContainer).toBeVisible();
 
        // Captcha
        await expect(loginPage.captcha).toBeVisible();
        await expect(loginPage.captchaFull).toBeVisible();
        await expect(loginPage.captchaLocker).toContainText('Anti-Robot Verification');
    });


    test('Test - Log in successfully with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();

        // NOTE: A FriendlyCaptcha miatt a Log In gomb automatizált
        // kitöltés/kattintás esetén disabled marad, ezért a login
        // lépéseket kikommentezve hagytam. Manuális megoldáshoz
        // futtasd headed/debug módban, és oldd fel a captchát kézzel,
        // mielőtt a script továbbmegy.

        // await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

        // Ha manuálisan szeretnéd megoldani a captchát futás közben,
        // vedd ki a kommentet az alábbi sorból - a teszt megáll, amíg
        // az Inspectorban rá nem nyomsz a "Resume"-ra:
        // await page.pause();

        // Sikeres login ellenőrzése: URL váltás és/vagy fiók-specifikus elem megjelenése
        // await expect(page).toHaveURL(/account|dashboard/i, { timeout: 10000 });
        // await expect(loginPage.accountMenu).toBeVisible();
    });


    test('Test - Show an error message with an invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();


        // await loginPage.login(VALID_EMAIL, INVALID_PASSWORD);
        // await page.pause();

        // A felhasználó a login oldalon marad
        // await expect(page).toHaveURL(/login/);

        // Hibaüzenet megjelenik
        // await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
    });

});