import {LoginPage} from '../pages/loginPage.js';
import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {

    test('Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.clickLoginButton();
    });

    test('Unsuccessful login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login('invalid_user', 'invalid_password');
        await loginPage.clickLoginButton();
        await expect(loginPage.errorMessage).toBeVisible();
        console.log('loginpage.errorMessage:', await loginPage.errorMessage.textContent());
    });

    test('Logout after successful login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.clickLoginButton();
    });

});