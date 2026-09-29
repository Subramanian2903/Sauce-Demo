const { expect } = require('@playwright/test');

class InventoryPage {
    constructor(page) {
        this.page = page;
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
            await expect(item.locator('.inventory_item_name')).toBeVisible();
            await expect(item.locator('.inventory_item_price')).toHaveText(/^\$\d+\.\d{2}$/);
            await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
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