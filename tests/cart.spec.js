const { test } = require('@playwright/test');
const { CartPage } = require('../pages/cartPage.js');
const { LoginPage } = require('../pages/loginPage.js');
const { LOGIN_DATA } = require('../testData/loginData.js');
const { PRODUCT_DATA } = require('../testData/productData.js');
const productNames = Object.values(PRODUCT_DATA);

test.describe('Verify Cart pages', () => {
	
    test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.navigateToLogin();
		await loginPage.login(LOGIN_DATA.USERNAME, LOGIN_DATA.PASSWORD);
	});

    test.afterEach(async ({ page }) => {
        console.log('Test completed for page:', page.url());
    });

	for (const productName of productNames) {
		
        test(`Adding ${productName} updates the cart badge to one`, async ({ page }) => {
			const cartPage = new CartPage(page);
			await cartPage.addProduct(productName);
			await cartPage.verifyCartBadgeCount(1);
		});
	}

	    test('Adding two products updates the cart badge to two', async ({ page }) => {
		const cartPage = new CartPage(page);
		for (const productName of productNames.slice(0, 2)) {
			await cartPage.addProduct(productName);
		}
		await cartPage.verifyCartBadgeCount(2);
	});

	    test('Removing a product decreases the cart badge', async ({ page }) => {
		const cartPage = new CartPage(page);
		for (const productName of productNames) {
			await cartPage.addProduct(productName);
		}

		for (let index = productNames.length - 1; index >= 0; index--) {
			await cartPage.removeProduct(productNames[index]);
			await cartPage.verifyCartBadgeCount(index);
		}
	});

	    test('Opening the cart shows every selected product name and price', async ({ page }) => {
		const cartPage = new CartPage(page);

		for (const productName of productNames) {
			await cartPage.addProduct(productName);
		}

		await cartPage.openCart();
		await cartPage.verifyCartContainsProducts(productNames);
	});
});
