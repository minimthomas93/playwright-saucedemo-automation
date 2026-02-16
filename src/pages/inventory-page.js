import 'dotenv/config';
export class InventoryPage {

    constructor(page) {
        this.page = page
        this.filterDropdown = page.locator('[data-test="product-sort-container"]');
        //this.nameZtoAOption = page.selectOption('[data-test="product-sort-container"]', 'za');
        //this.lowtohighOption = page.selectOption('[data-test="product-sort-container"]', 'lohi');
        //this.hightolowOption = page.selectOption('[data-test="product-sort-container"]', 'hilo');
        this.dropdownLists = page.locator('[data-test="product-sort-container"] option');
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addToCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.addToCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.hamburgerIcon = page.locator('[id="react-burger-menu-btn"]');
        this.removeCartButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.allItemsLink = page.locator('[id="inventory_sidebar_link"]');
        this.aboutLink = page.locator('[id="about_sidebar_link"]');
        this.logoutLink = page.locator('[id="logout_sidebar_link"]');
        this.resetAppLink = page.locator('[id="reset_sidebar_link"]');
        this.sidebarCloseIcon = page.locator('[id="react-burger-cross-btn"]');
        this.inventoryPageTitle = page.locator('[data-test="title"]');
        this.inventoryNames = page.locator('[data-test="inventory-item-name"]');
        this.inventoryPrices = page.locator('[data-test="inventory-item-price"]');
        this.activeFilterOption = page.locator('[data-test="active-option"]');
        this.homePageTitle = page.locator('[data-test="title"]');
        this.addToCartDetailPageButton = page.locator('[data-test="add-to-cart"]');
        this.removeCartDetailPageButton = page.locator('[data-test="remove"]');
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

    async removeProductFromCart() {
        await this.removeCartButton.click();
    }

    async productCountDisplay() {
        return await this.addToCartBadge.textContent();
    }

    async openSidebar() {
        await this.hamburgerIcon.click();
    }

    async displayOfAllItems() {
        return await this.allItemsLink.textContent();
    }

    async displayOfAbout() {
        return await this.aboutLink.textContent();
    }

    async displayOfLogout() {
        return await this.logoutLink.textContent();
    }

    async displayOfResetApp() {
        return await this.resetAppLink.textContent();
    }

    async navigationOfAbout() {
        await this.aboutLink.click();
    }


    async navigationOfLogout() {
        await this.logoutLink.click();
    }

    async closeSidebar() {
        await this.sidebarCloseIcon.click();
    }

    async chooseZtoAfilterOption() {
        await this.filterDropdown.selectOption('za');
    }

    async chooseLowToHighfilterOption() {
        await this.filterDropdown.selectOption('lohi');
    }

    async chooseHighToLowfilterOption() {
        await this.filterDropdown.selectOption('hilo');
    }

    async chooseAtoZfilterOption() {
        await this.filterDropdown.selectOption('az');
    }

    async displayofFilters() {
        return await this.dropdownLists.allTextContents();
    }

    async navigationToCartPage() {
        await this.addToCartIcon.click();
    }

    async getProductNames() {
        return await this.inventoryNames.allTextContents();
    }

    async getProductPrizes() {
        return await this.inventoryPrices.allTextContents();
    }

    async getactiveFilter() {
        return await this.activeFilterOption.textContent();
    }

    getProductByName(productName) {
        return this.page.locator(
            '[data-test="inventory-item-name"]',
            { hasText: productName }
        );
    }

}