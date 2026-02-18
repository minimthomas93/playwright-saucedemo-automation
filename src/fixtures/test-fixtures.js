const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const { CartPage } = require('../pages/cart-page');
const { CheckoutPage } = require('../pages/checkout-page');
const { FooterPage } = require('../pages/footer-page');
const env = require('../config/env');

const test = base.extend({
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await login.openApplication();
        await login.enterUsername(env.username);
        await login.enterPassword(env.password);
        await login.clickLoginButton();
        await use(login);
    },

    inventoryPage: async ({ loginPage }, use) => {
        const inventory = new InventoryPage(loginPage.page);
        //await inventory.addProductToCart();
        //await inventory.navigationToCartPage();
        await use(inventory);
    },

    cartPage: async ({ loginPage }, use) => {
        const cart = new CartPage(loginPage.page);
        //await cart.navigateToCheckoutPage();
        await use(cart);
    },

    checkoutPage: async ({ loginPage }, use) => {
        const checkout = new CheckoutPage(loginPage.page);
        await use(checkout);
    },

    footerPage: async ({ loginPage }, use) => {
        const footer = new FooterPage(loginPage.page);
        await use(footer);
    },

    checkoutReady: async ({ loginPage }, use) => {
        const inventory = new InventoryPage(loginPage.page);
        const cart = new CartPage(loginPage.page);

        // Workflow steps
        await inventory.addProductToCart();
        await inventory.navigationToCartPage();
        await cart.navigateToCheckoutPage();

        await use({ inventoryPage: inventory, cartPage: cart });
    }
});

module.exports = {
    test,
    expect,
};
