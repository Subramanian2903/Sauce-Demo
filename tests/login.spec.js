const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage.js');
const { LOGIN_DATA } = require('../testData/loginData.js');

test.describe('Login tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test.afterEach(async ({ page }) => {
        console.log('Test completed for page:', page.url());
    });

    test('Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(LOGIN_DATA.USERNAME, LOGIN_DATA.PASSWORD);
        await loginPage.verifyLoginSuccess();
    });

    test('Unsuccessful login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(LOGIN_DATA.INVALID_USERNAME, LOGIN_DATA.INVALID_PASSWORD);

        await expect(loginPage.errorMessage).toBeVisible();
        await loginPage.verifyErrorMessage(
            loginPage.errorMessage,
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('Login with empty username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(LOGIN_DATA.EMPTY_USERNAME, LOGIN_DATA.PASSWORD);

        await expect(loginPage.errorMessage).toBeVisible();
        await loginPage.verifyErrorMessage(loginPage.errorMessage, 'Epic sadface: Username is required');
    });
});