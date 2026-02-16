import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import logger from '../utils/logger-util';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { LoginPage } from '../pages/login-page';
import { env } from '../config/env';

test.beforeEach('Login to the application', async ({ page }) => {

    logger.info('Login started');
    const login = new LoginPage(page);
    await login.openApplication();
    await login.enterUsername(env.username);
    await login.enterPassword(env.password);
    await login.clickLoginButton();
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart();
    await inventory.navigationToCartPage();
    const cart = new CartPage(page);
    await cart.navigateToCheckoutPage();

})

test('TC1: Verify the navigation to Checkout step two page', async ({ page }) => {
    logger.info('TC1 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await expect(checkout.checkoutSteptwoTitle).toBeVisible();
})

test('TC2: Verify the display of error message for empty firstname field', async ({ page }) => {
    logger.info('TC2 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await expect(checkout.firstnameErrorMessage).toBeVisible();
})

test('TC3: Verify the display of error message for empty lastname field', async ({ page }) => {
    logger.info('TC3 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await expect(checkout.lastnameErrorMessage).toBeVisible();
})

test('TC4: Verify the display of error message for empty postal code field', async ({ page }) => {
    logger.info('TC4 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('');
    await checkout.clickContinueButton();
    await expect(checkout.postalcodeErrorMessage).toBeVisible();
})

test('TC5: Verify the display of error message for all empty fields', async ({ page }) => {
    logger.info('TC5 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('');
    await checkout.enterLastName('');
    await checkout.enterPostalCode('');
    await checkout.clickContinueButton();
    await expect(checkout.firstnameErrorMessage).toBeVisible();
})

test('TC6: Verify the cancel button functionality in checkout step one page', async ({ page }) => {
    logger.info('TC6 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickCancelButton();
    const cart = new CartPage(page);
    await expect(cart.titleText).toBeVisible();
})

test('TC7: Verify the display of item total, tax and total price in checkout step two page', async ({ page }) => {
    logger.info('TC7 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    const itemTotalPrice = await checkout.getItemTotalPrice();
    const taxPrice = await checkout.getTaxPrice();
    const totalPrice = await checkout.getTotalPrice();
    expect(itemTotalPrice).toBeDefined();
    expect(taxPrice).toBeDefined();
    expect(totalPrice).toBeDefined();
})

test('TC8: Verify the total price calculation in checkout step two page', async ({ page }) => {
    logger.info('TC8 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    const itemTotalPriceText = await checkout.getItemTotalPrice();
    const taxPriceText = await checkout.getTaxPrice();
    const totalPriceText = await checkout.getTotalPrice();
    const itemTotalPrice = parseFloat(itemTotalPriceText.replace('Item total: $', ''));
    const taxPrice = parseFloat(taxPriceText.replace('Tax: $', ''));
    const totalPrice = parseFloat(totalPriceText.replace('Total: $', ''));
    const sumPrice = itemTotalPrice + taxPrice;
    expect(totalPrice).toEqual(sumPrice, 2);
})

test('TC9: Verify the finish button functionality in checkout step two page', async ({ page }) => {
    logger.info('TC9 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await checkout.clickFinishButton();
    await expect(checkout.successMessage).toBeVisible();
})

test('TC10: Verify the Cancel button functionality in checkout step two page', async ({ page }) => {
    logger.info('TC10 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await checkout.clickCancelButton();
    const inventory = new InventoryPage(page);
    await expect(inventory.homePageTitle).toBeVisible();
})

test('TC11: Verify the Back Home button functionality in checkout step two page', async ({ page }) => {
    logger.info('TC11 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await checkout.clickFinishButton();
    await checkout.clickBackHomeButton();
    const inventory = new InventoryPage(page);
    await expect(inventory.homePageTitle).toBeVisible();
})

test('TC12: Verify the success message display after order completion in checkout step two page', async ({ page }) => {
    logger.info('TC12 started');
    const checkout = new CheckoutPage(page);
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await checkout.clickFinishButton();
    const successMessage = await checkout.getSuccessMessage();
    expect(successMessage).toEqual('Thank you for your order!');
})