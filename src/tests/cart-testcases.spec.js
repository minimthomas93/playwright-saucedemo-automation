const { test, expect } = require('../fixtures/test-fixtures');
import logger from '../utils/logger-util';

test('TC1: Verify the products added to Cart', async ({ inventoryPage, cartPage }) => {
    logger.info('TC1 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Product Cart Verification' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.addProductToCart();
    await inventoryPage.navigationToCartPage();
    const productNameInventory = await inventoryPage.getProductNames();
    const productPriceInventory = await inventoryPage.getProductPrizes();
    const productNameCart = await cartPage.getProductNames();
    const productPriceCart = await cartPage.getProductPrizes();
    await expect(productNameInventory).toEqual(productNameCart);
    await expect(productPriceInventory).toEqual(productPriceCart);
    logger.info('Products are added to cart successfully and product details are correct in cart page');

})

test('TC2: Verify the products are removed from the Cart using remove button', async ({ inventoryPage, cartPage }) => {
    logger.info('TC2 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Product Removal from Cart' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    const productName = await inventoryPage.inventoryNames.first().textContent(); // Get the name of the first product in the inventory
    await inventoryPage.addProductToCart();
    await inventoryPage.navigationToCartPage();
    await expect(cartPage.getProductByName(productName)).toBeVisible(); // Verify that the product is added to the cart by checking that the product name is visible in the cart
    await cartPage.removeProductFromCart(productName);
    await expect(cartPage.getProductByName(productName)).toHaveCount(0); // Verify that the product is removed from the cart by checking that the count of product names is 0
    logger.info('Product is removed from cart successfully using remove button');
})

test('TC3: Verify the navigation for Continue Shopping button', async ({ inventoryPage, cartPage }) => {
    logger.info('TC3 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Continue Shopping Navigation' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.addProductToCart();
    await inventoryPage.navigationToCartPage();
    await cartPage.navigateToContinueShopping();
    await expect(inventoryPage.inventoryPageTitle).toBeVisible();
    logger.info('Continue shopping button is working successfully and navigated back to inventory page');
})

test('TC4: Verify the navigation to Checkout page ', async ({ inventoryPage, cartPage, checkoutPage }) => {
    test.info().annotations.push(
        { type: 'feature', description: 'Checkout Page Navigation' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.addProductToCart();
    await inventoryPage.navigationToCartPage();
    await cartPage.navigateToCheckoutPage();
    await expect(checkoutPage.checkoutPageTitle).toBeVisible();
    logger.info('Navigation to checkout page is successful');
})


