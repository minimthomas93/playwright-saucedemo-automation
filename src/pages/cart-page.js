export class CartPage {

    constructor(page) {
        this.page = page
        this.titleText = page.locator('text = Your Cart');
        this.inventoryNames = page.locator('[data-test="inventory-item-name"]');
        this.inventoryPrices = page.locator('[data-test="inventory-item-price"]');
        this.removeCartButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

    }

    async getProductNames() {
        return await this.inventoryNames.allTextContents();
    }

    async getProductPrizes() {
        return await this.inventoryPrices.allTextContents();
    }

    async removeProductFromCart(productName) {
        await this.removeCartButton.click();

    }

    async navigateToContinueShopping() {
        await this.continueShoppingButton.click();

    }

    async navigateToCheckoutPage() {
        await this.checkoutButton.click();

    }

    getProductByName(productName) {
        return this.page.locator(
            '[data-test="inventory-item-name"]',
            { hasText: productName }
        );
    }


}

