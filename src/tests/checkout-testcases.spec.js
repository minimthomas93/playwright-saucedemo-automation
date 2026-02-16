import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import logger from '../utils/logger-util';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

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

})