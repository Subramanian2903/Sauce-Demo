const { expect } = require('@playwright/test');
const { CommonPage } = require('./commonpage.js');

class InventoryPage extends CommonPage {
    constructor(page) {
        super(page);
        this.products = page.locator('.inventory_item');
        this.sortDropDown = page.locator('.product_sort_container');
        this.productNames = this.products.locator('.inventory_item_name');
        this.productPrices = this.products.locator('.inventory_item_price');
    }

    async verifyInventoryItemcount() {
        await expect(this.products).toHaveCount(6);
    }

    async verifyInventoryItems() {
        for (const item of await this.products.all()) {
            const productName = item.locator('.inventory_item_name');
            const productPrice = item.locator('.inventory_item_price');
            const addButton = item.getByRole('button', { name: 'Add to cart' });

            await this.verifyElementVisible(productName);
            await this.verifyElementVisible(productPrice);
            await this.verifyPriceTextVisible(productPrice);
            await this.verifyElementVisible(addButton);
        }
    }

    async verifyInventoryPageSorting() {
        const initialNames = await this.productNames.allTextContents();
        const initialPrices = await this.productPrices.allTextContents();
        const ascendingPrices = [...initialPrices].sort((left, right) =>
            Number(left.slice(1)) - Number(right.slice(1))
        );
        const descendingPrices = [...ascendingPrices].reverse();

        await this.sortDropDown.selectOption('az');
        await expect(this.sortDropDown).toHaveValue('az');
        await expect(this.productNames).toHaveText([...initialNames].sort((a, b) => a.localeCompare(b)));

        await this.sortDropDown.selectOption('za');
        await expect(this.sortDropDown).toHaveValue('za');
        await expect(this.productNames).toHaveText([...initialNames].sort((a, b) => b.localeCompare(a)));

        await this.sortDropDown.selectOption('lohi');
        await expect(this.sortDropDown).toHaveValue('lohi');
        await expect(this.productPrices).toHaveText(ascendingPrices);

        await this.sortDropDown.selectOption('hilo');
        await expect(this.sortDropDown).toHaveValue('hilo');
        await expect(this.productPrices).toHaveText(descendingPrices);
    }

    async addProduct(productName) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeProduct(productName) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        await product.getByRole('button', { name: 'Remove' }).click();
    }
}

module.exports = { InventoryPage };