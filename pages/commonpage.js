const {expect} = require('@playwright/test');

class CommonPage {
    constructor(page) {
        this.page = page;
    }   

    async verifyLoginSuccess() {
          
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    async verifyElementVisible(locator) {
        await expect(locator).toBeVisible();
    }

    async verifyPriceTextVisible(locator) {
        await expect(locator).toHaveText(/^\$\d+\.\d{2}$/);
    }

    async verifyErrorMessage(text) {
        await expect(this.errorMessage).toHaveText(text);
}

}

module.exports = { CommonPage };