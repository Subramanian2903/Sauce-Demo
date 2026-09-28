const { test } = require('@playwright/test');
const { PlaywrightPage } = require('../pages/playwrightpage');

test.describe('Locator Practices', () => {
   
test.beforeEach(async ({page}) => {

    const playwrightPage = new PlaywrightPage(page);
    await playwrightPage.openHomePage();
});

test.afterEach(async ({page}) => {

    const playwrightPage = new PlaywrightPage(page);
    await playwrightPage.closeBrowser();
});


test('Locator practice session', async ({ page }) => {

    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.openDocs();
    await playwrightPage.verifyExactTitle('Installation | Playwright');
    await playwrightPage.printTitle();
    await playwrightPage.verifyLinkLocators();
    await playwrightPage.openSearch();

});


test('Locator practice session two', async ({ page }) => {

    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.openDocs();
    await playwrightPage.verifyUrl('/docs/');
    await playwrightPage.verifyInstallationVisible();

});
});