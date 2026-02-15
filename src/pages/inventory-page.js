exports.inventorypage = class inventoryPage {

    constructor(page){
        this.page = page
        this.filterDropdown = page.locator('[data-test="product-sort-container"]');
        this.nameZtoAOption = page.selectOption(this.filterDropdown, 'za');
        this.lowtohighOption = page.selectOption(this.filterDropdown, 'lohi');
        this.hightolowOption = page.selectOption(this.filterDropdown, 'hilo');
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addToCartIcon =  page.locator('[data-test="shopping-cart-link"]');
        this.hamburgerIcon = page.locator('[id="react-burger-menu-btn"]');
        this.removeCartButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.allItemsLink = page.locator('[id="inventory_sidebar_link"]');
        


    }
}