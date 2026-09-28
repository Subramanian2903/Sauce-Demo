const { expect } = require('@playwright/test');
const { CommonPage } = require('./commonpage');
const { URLS } = require('../utils/urls');

class PlaywrightPage extends CommonPage {
    constructor(page) {
        super(page);
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.searchButton = page.getByRole('button', { name: 'Search' }).first();
        this.installationHeading = page.getByRole('heading', { name: 'Installation' });
    }

    async openHomePage() {
        await this.open(URLS.PLAYWRIGHT);
    }

    async openDocs() {
        await this.waitForVisible(this.getStartedLink);
        await this.getStartedLink.click();
    }

    async verifyUrl(urlText) {
        await expect(this.page).toHaveURL(new RegExp(urlText));
    }

    async verifyGetStartedVisible() {
        await this.waitForVisible(this.getStartedLink);
    }

    async verifyInstallationVisible() {
        await this.waitForVisible(this.installationHeading);
    }

    async verifyInstallationText(text) {
        await expect(this.installationHeading).toHaveText(text);
    }

    async verifyInstallationContainsText(text) {
        await expect(this.installationHeading).toContainText(text);
    }

    async openSearch() {
        await this.searchButton.click();
    }

    async verifyLinkLocators() {
        const links = this.page.getByRole('link');
        await this.waitForVisible(links.first());
        await this.waitForVisible(links.last());
        await this.waitForVisible(links.nth(2));
    }
}

module.exports = { PlaywrightPage };