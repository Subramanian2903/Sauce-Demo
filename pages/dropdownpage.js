const { expect } = require('@playwright/test');
const { CommonPage } = require('./commonpage');


class DropdownPage extends CommonPage {
    async selectOption(dropdownLocator, optionValue) {
        const dropdown = this.page.locator(dropdownLocator);
        await dropdown.selectOption(optionValue);
        await expect(dropdown).toHaveValue(optionValue);
    }

    async getSelectedValue(dropdownLocator) {
        return this.page.locator(dropdownLocator).inputValue();
    }

   
}

module.exports = { DropdownPage };