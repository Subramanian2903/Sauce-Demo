const { test } = require('@playwright/test');
const { DropdownPage } = require('../pages/dropdownpage');
const { URLS } = require('../utils/urls');
const { dropdownData } = require('../testData/dropdownData');

test.describe('Dropdown Practices', () => {
    
test.beforeEach(async ({page}) => {

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open(URLS.DROPDOWN);
});

test.afterEach(async ({page}) => {

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.closeBrowser();
});


test('Verify Dropdown first Selection', async ({ page }) => {

    const dropdownPage = new DropdownPage(page);

    await dropdownPage.selectOption('#dropdown', dropdownData.optionOne);
    
});


test('Verify Dropdown second Selection', async ({ page }) => {

    const dropdownPage = new DropdownPage(page);

    await dropdownPage.selectOption('#dropdown', dropdownData.optionTwo);

});


test('Print selected value', async ({ page }) => {

    const dropdownPage = new DropdownPage(page);

    await dropdownPage.selectOption('#dropdown', dropdownData.optionOne);
    const firstValue = await dropdownPage.getSelectedValue('#dropdown');
    console.log('First selected value is: ' + firstValue); 
    await dropdownPage.selectOption('#dropdown', dropdownData.optionTwo);
    const secondValue = await dropdownPage.getSelectedValue('#dropdown');
    console.log('Second selected value is: ' + secondValue); 

});
});