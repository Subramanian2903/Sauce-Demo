const { test } = require('@playwright/test');
const { CommonPage } = require('../pages/commonpage');
const { URLS } = require('../utils/urls');

test.describe('URL Practices', () => {
    
test.afterEach(async ({page}) => {

    const commonPage = new CommonPage(page);
    await commonPage.closeBrowser();
});


test('Verify Google website', async ({ page }) => {
    const commonPage = new CommonPage(page);

    await commonPage.open(URLS.GOOGLE);
    await commonPage.verifyTitle('Google');
});


test('Verify Playwright website', async ({ page }) => {
    const commonPage = new CommonPage(page);

    await commonPage.open(URLS.PLAYWRIGHT);
    await commonPage.verifyTitle('Playwright');
});


test('Verify Github website', async ({ page }) => {
    const commonPage = new CommonPage(page);

    await commonPage.open(URLS.GITHUB);
    await commonPage.printTitle();
});
});