const { test } = require('@playwright/test');
const { PlaywrightPage } = require('../pages/playwrightpage');

test.describe('Assertion Practices', () => {
    
test.beforeEach(async ({page}) => {

    const playwrightPage = new PlaywrightPage(page);
    await playwrightPage.openHomePage();
});

test.afterEach(async ({page}) => {

    const playwrightPage = new PlaywrightPage(page);
    await playwrightPage.closeBrowser();
});


test('Validate Playwright Home Page', async ({ page }) => {

    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.verifyTitle('Playwright');
    await playwrightPage.verifyUrl('playwright.dev');
    await playwrightPage.verifyGetStartedVisible();

});

test('Validate Playwright Home Page two', async ({ page }) => {

    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.openDocs();
    await playwrightPage.verifyUrl('/docs/');
    await playwrightPage.verifyInstallationVisible();

});

test('Validate Playwright Home Page three', async ({ page }) => {

    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.openDocs();
    await playwrightPage.verifyUrl('/docs/');
    await playwrightPage.verifyInstallationVisible();
    await playwrightPage.verifyInstallationText('Installation');
    await playwrightPage.verifyInstallationContainsText('Install');
});
});

