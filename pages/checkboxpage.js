const { expect } = require('@playwright/test');
const { CommonPage } = require('./commonpage');
const { URLS } = require('../utils/urls');

class CheckboxPage extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.checkboxInputs = page.locator('input[type="checkbox"]');
    }

    async openCheckboxPage() {
        await this.open(URLS.CHECKBOX);
    }

    async check(index) {
        await this.checkboxInputs.nth(index).check();
    }

    async uncheck(index) {
        await this.checkboxInputs.nth(index).uncheck();
    }

    async verifyChecked(index) {
        await expect(this.checkboxInputs.nth(index)).toBeChecked();
    }

    async verifyUnchecked(index) {
        await expect(this.checkboxInputs.nth(index)).not.toBeChecked();
    }

    async openDemoQaCheckboxPage() {
        await this.open(URLS.DEMOQA_CHECKBOX);
    }

    async expandHome() {
        await this.page.locator('.rc-tree-switcher').first().click();
    }

    checkboxByName(name) {
        return this.page.getByRole('checkbox', { name });
    }

    async checkByName(name) {
        await this.checkboxByName(name).check();
    }

    async verifyCheckedByName(name) {
        await expect(this.checkboxByName(name)).toBeChecked();
    }
}

module.exports = { CheckboxPage };