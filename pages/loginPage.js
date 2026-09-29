const{ URLS } = require ('../constants/urls');
const { CommonPage } = require('./commonpage.js');

class LoginPage extends CommonPage{
    constructor(page) {
        super(page);
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
        await this.loginButton.click();
    }

}

module.exports = { LoginPage };