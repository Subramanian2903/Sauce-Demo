const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage.js');
const { InventoryPage } = require('../pages/inventoryPage.js');
const { LOGIN_DATA } = require('../testData/loginData.js');

test.describe('Veirfy Inventory Pages',() => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(LOGIN_DATA.USERNAME, LOGIN_DATA.PASSWORD);
    });

    test.afterEach(async ({ page }) => {
        console.log('Test completed for page:', page.url());
    });

    test('Verify Inventory item count has displayed six', async({page}) =>{
          
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.verifyInventoryItemcount();
    });

    test('Verify every inventory product shows its name, price, and Add to cart button', 
    async ({ page }) => {

	const inventoryPage = new InventoryPage(page);
	await inventoryPage.verifyInventoryItems();
});

    test('Verify inventory sorting options', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.verifyInventoryPageSorting();
    });
});
