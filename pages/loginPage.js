const{expect} = require('@playwright/test');

import { URLS } from '../constants/urls';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigateToLogin() {
        await this.page.goto(URLS.SAUCEDEMO);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };