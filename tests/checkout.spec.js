const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage.js');
const { CartPage } = require('../pages/cartPage.js');
const { CheckoutPage } = require('../pages/checkoutPage.js');
const { LOGIN_DATA } = require('../testData/loginData.js');
const { PRODUCT_DATA } = require('../testData/productData.js');
const productNames = Object.values(PRODUCT_DATA);

test.describe('Checkout flow', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(LOGIN_DATA.USERNAME, LOGIN_DATA.PASSWORD);
    });

    test.afterEach(async ({ page }) => {
        console.log('Test completed for page:', page.url());
    });

    for (const productName of productNames) {
        test(`Complete checkout with one product: ${productName}`, async ({ page }) => {
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);

            await cartPage.addProduct(productName);
            await cartPage.openCart();
            await cartPage.goToCheckout();

            await checkoutPage.fillCheckoutForm('Test', 'User', '12345');
            await checkoutPage.verifyCheckoutPageVisible();
            await checkoutPage.finishCheckout();
        });
    }

    test('Complete checkout with two products', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        for (const productName of productNames.slice(0, 2)) {
            await cartPage.addProduct(productName);
        }

        await cartPage.openCart();
        await cartPage.goToCheckout();

        await checkoutPage.fillCheckoutForm('Test', 'User', '12345');
        await checkoutPage.verifyCheckoutPageVisible();
        await checkoutPage.finishCheckout();
    });
});