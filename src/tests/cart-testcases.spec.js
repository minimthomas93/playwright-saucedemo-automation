import env from '../config/env';
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import logger from '../utils/logger-util';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { LoginPage } from '../pages/login-page';

test.beforeEach('Login to the application', async ({ page }) => {

    logger.info('Login started');
    const login = new LoginPage(page);
    await login.openApplication();
    await login.enterUsername(env.username);
    await login.enterPassword(env.password);
    await login.clickLoginButton();

})

test('TC1: Verify the products added to Cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart();
    await inventory.navigationToCartPage();
    const productNameInventory = await inventory.getProductNames();
    const productPriceInventory = await inventory.getProductPrizes();
    const cart = new CartPage(page);
    const productNameCart = await cart.getProductNames();
    const productPriceCart = await cart.getProductPrizes();
    await expect(productNameInventory).toEqual(productNameCart);
    await expect(productPriceInventory).toEqual(productPriceCart);

})

test('TC2: Verify the products are removed from the Cart using remove button', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const productName = await inventory.inventoryNames.first().textContent(); // Get the name of the first product in the inventory
    await inventory.addProductToCart();
    await inventory.navigationToCartPage();
    const cart = new CartPage(page);
    await expect(cart.getProductByName(productName)).toBeVisible(); // Verify that the product is added to the cart by checking that the product name is visible in the cart
    await cart.removeProductFromCart(productName);
    await expect(cart.getProductByName(productName)).toHaveCount(0); // Verify that the product is removed from the cart by checking that the count of product names is 0

})

test('TC3: Verify the navigation for Continue Shopping button', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart();
    await inventory.navigationToCartPage();
    const cart = new CartPage(page);
    await cart.navigateToContinueShopping();
    await expect(inventory.inventoryPageTitle).toBeVisible();
})

test('TC4: Verify the navigation to Checkout page ', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart();
    await inventory.navigationToCartPage();
    const cart = new CartPage(page);
    await cart.navigateToCheckoutPage();
    const checkout = new CheckoutPage(page);
    await expect(checkout.checkoutPageTitle).toBeVisible();
})


