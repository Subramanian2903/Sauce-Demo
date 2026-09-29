const {expect} = require('@playwright/test');

class CommonPage {
    constructor(page) {
        this.page = page;
    }   

    async verifyLoginSuccess() {
          
        await expect(this.page).toHaveURL(/inventory.html/);
    }
async verifyErrorMessage(text) {

        await expect(this.errorMessage).toHaveText(text);
}

}

module.exports = { CommonPage };