const { test } = require('@playwright/test');
const { DropdownPage } = require('../pages/dropdownpage');
const { URLS } = require('../utils/urls');
const { dropdownData } = require('../testData/dropdownData');

test.describe('DropdowncheckBox Practices', () => {

test.beforeEach(async ({page}) => {

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open(URLS.EXPANDTESTING_DROPDOWN);
});

test.afterEach(async ({page}) => {

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.closeBrowser();
});

test ('Validate Dropdown and assertion selection', async ({page}) => {

    const dropdownPage = new DropdownPage(page);

    await dropdownPage.selectOption('#dropdown', dropdownData.optionOne);
    await dropdownPage.selectOption('#dropdown', dropdownData.optionTwo);
    const value = await dropdownPage.getSelectedValue('#dropdown');
    console.log(value);

});
});