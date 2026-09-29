const { expect } = require('@playwright/test');
const { CommonPage } = require('./commonpage.js');

class InventoryPage extends CommonPage {
    constructor(page) {
        super(page);
        this.inventoryContainer = page.locator('.inventory_item');
        this.sortDropDown = page.locator('.product_sort_container');
        this.productNames = this.inventoryContainer.locator('.inventory_item_name');
        this.productPrices = this.inventoryContainer.locator('.inventory_item_price');
    }

    async verifyInventoryItemcount() {
        await expect(this.inventoryContainer).toHaveCount(6);
    }

    async verifyInventoryItems() {

        for (const item of await this.inventoryContainer.all()) {
            const productName = item.locator('.inventory_item_name');
            const productPrice = item.locator('.inventory_item_price');
            const addToCartButton = item.getByRole('button', { name: 'Add to cart' });

            await this.verifyElementVisible(productName);
            await this.verifyElementVisible(productPrice);
            await this.verifyPriceTextVisible(productPrice);
            await this.verifyElementVisible(addToCartButton);
        }
    }

    async verifyInventoryPageSorting() {
        const initialNames = await this.productNames.allTextContents();
        const initialPrices = await this.productPrices.allTextContents();
        const ascendingPrices = [...initialPrices].sort((left, right) =>
            Number(left.slice(1)) - Number(right.slice(1)));
        const descendingPrices = [...ascendingPrices].reverse();

        await this.sortDropDown.selectOption('az');
        await expect(this.sortDropDown).toHaveValue('az');
        await expect(this.productNames).
        toHaveText([...initialNames].sort((left, right) => left.localeCompare(right)));

        await this.sortDropDown.selectOption('za');
        await expect(this.sortDropDown).toHaveValue('za');
        await expect(this.productNames).
        toHaveText([...initialNames].sort((left, right) => right.localeCompare(left)));

        await this.sortDropDown.selectOption('lohi');
        await expect(this.sortDropDown).toHaveValue('lohi');
        await expect(this.productPrices).toHaveText(ascendingPrices);

        await this.sortDropDown.selectOption('hilo');
        await expect(this.sortDropDown).toHaveValue('hilo');
        await expect(this.productPrices).toHaveText(descendingPrices);
    }
}

module.exports = { InventoryPage };