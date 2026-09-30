const { expect } = require('@playwright/test');
const { CommonPage } = require('./commonpage.js');

class CheckoutPage extends CommonPage {
    constructor(page) {
        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.summaryInfo = page.locator('.summary_info');
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async verifyCheckoutPageVisible() {
        await expect(this.summaryInfo).toBeVisible();
    }
}

module.exports = { CheckoutPage };