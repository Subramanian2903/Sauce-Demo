const { test } = require('@playwright/test');
const { PlaywrightPage } = require('../pages/playwrightpage');

test.describe('Wait Practices', () => {

test.beforeEach(async ({page}) => {

    const playwrightPage = new PlaywrightPage(page);
    await playwrightPage.openHomePage();
});

test.afterEach(async ({page}) => {

    const playwrightPage = new PlaywrightPage(page);
    await playwrightPage.closeBrowser();
});

test('Verify wait functionality', async ({ page }) => {

    const playwrightPage = new PlaywrightPage(page);
    
    await playwrightPage.verifyGetStartedVisible();
    await playwrightPage.openDocs();
    await playwrightPage.verifyUrl('docs');
    
});
});