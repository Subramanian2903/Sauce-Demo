const { expect } = require('@playwright/test');
const { URLS } = require('../utils/urls');

class CommonPage {
    constructor(page) {
        this.page = page;
    }

    async waitForVisible(locator) {
    await locator.waitFor({
        state: 'visible'
    });
    }

    async waitForHidden(locator) {
    await locator.waitFor({
        state: 'hidden'
    });
    }
    
    async open(url) {
        await this.page.goto(url);
    }

    async verifyTitle(titleText) {
        await expect(this.page).toHaveTitle(new RegExp(titleText));
    }

    async verifyExactTitle(title) {
        await expect(this.page).toHaveTitle(title);
    }

    async printTitle() {
        console.log(await this.page.title());
    }
}

module.exports = { CommonPage };