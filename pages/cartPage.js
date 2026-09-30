const { expect } = require('@playwright/test');
const { InventoryPage } = require('./inventoryPage.js');

class CartPage extends InventoryPage {
    constructor(page) {
        super(page);
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = this.cartItems.locator('.inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async verifyCartBadgeCount(count) {
        if (count === 0) {
            await expect(this.cartBadge).toHaveCount(0);
            return;
        }

        await expect(this.cartBadge).toHaveText(String(count));
    }

    async openCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async verifyCartContainsProducts(productNames) {
        await expect(this.cartItems).toHaveCount(productNames.length);
        await expect(this.cartItemNames).toHaveText(productNames);
    }
}

module.exports = { CartPage };
