const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage.js');
const { CartPage } = require('../pages/cartPage.js');
const { CheckoutPage } = require('../pages/checkoutPage.js');
const { LOGIN_DATA } = require('../testData/loginData.js');
const { PRODUCT_DATA } = require('../testData/productData.js');

test.describe('Checkout flow', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(LOGIN_DATA.USERNAME, LOGIN_DATA.PASSWORD);
    });

    test('Complete checkout with one product', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await cartPage.addProduct(PRODUCT_DATA.BACKPACK);
        await cartPage.openCart();
        await cartPage.goToCheckout();

        await checkoutPage.fillCheckoutForm('Test', 'User', '12345');
        await checkoutPage.verifyCheckoutPageVisible();
        await checkoutPage.finishCheckout();
    });
});