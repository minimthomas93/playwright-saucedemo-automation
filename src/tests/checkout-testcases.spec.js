const { test, expect } = require('../fixtures/test-fixtures');
import logger from '../utils/logger-util';

test('TC1: Verify the navigation to Checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC1 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Checkout Step Two Navigation' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.checkoutSteptwoTitle).toBeVisible();
    logger.info('Navigation to checkout step two page is successful');
})

test('TC2: Verify the display of error message for empty firstname field', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC2 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Empty Firstname Error Message' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.firstnameErrorMessage).toBeVisible();
    logger.info('Error message is displayed successfully for empty firstname field');
})

test('TC3: Verify the display of error message for empty lastname field', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC3 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Empty Lastname Error Message' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.lastnameErrorMessage).toBeVisible();
    logger.info('Error message is displayed successfully for empty lastname field');
})

test('TC4: Verify the display of error message for empty postal code field', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC4 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Empty Postal Code Error Message' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.postalcodeErrorMessage).toBeVisible();
    logger.info('Error message is displayed successfully for empty postal code field');
})

test('TC5: Verify the display of error message for all empty fields', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC5 started');
    test.info().annotations.push(
        { type: 'feature', description: 'All Empty Fields Error Message' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('');
    await checkoutPage.enterLastName('');
    await checkoutPage.enterPostalCode('');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.firstnameErrorMessage).toBeVisible();
    logger.info('Error message is displayed successfully for all empty fields');
})

test('TC6: Verify the cancel button functionality in checkout step one page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC6 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Cancel Button Functionality' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickCancelButton();
    await expect(cartPage.titleText).toBeVisible();
    logger.info('Cancel button functionality is working successfully and navigated back to cart page');
})

test('TC7: Verify the display of item total, tax and total price in checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC7 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Item Total, Tax and Total Price Display' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    const itemTotalPrice = await checkoutPage.getItemTotalPrice();
    const taxPrice = await checkoutPage.getTaxPrice();
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(itemTotalPrice).toBeDefined();
    expect(taxPrice).toBeDefined();
    expect(totalPrice).toBeDefined();
    logger.info('Item total, tax and total price are displayed successfully in checkout step two page');
})

test('TC8: Verify the total price calculation in checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC8 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Total Price Calculation' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'Critical' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    const itemTotalPriceText = await checkoutPage.getItemTotalPrice();
    const taxPriceText = await checkoutPage.getTaxPrice();
    const totalPriceText = await checkoutPage.getTotalPrice();
    const itemTotalPrice = parseFloat(itemTotalPriceText.replace('Item total: $', ''));
    const taxPrice = parseFloat(taxPriceText.replace('Tax: $', ''));
    const totalPrice = parseFloat(totalPriceText.replace('Total: $', ''));
    const sumPrice = itemTotalPrice + taxPrice;
    expect(totalPrice).toEqual(sumPrice, 2);
    logger.info('Total price is calculated correctly in checkout step two page');
})

test('TC9: Verify the finish button functionality in checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC9 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Finish Button Functionality' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    await expect(checkoutPage.successMessage).toBeVisible();
    logger.info('Finish button functionality is working successfully and order is completed');
})

test('TC10: Verify the Cancel button functionality in checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC10 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Cancel Button Functionality' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickCancelButton();
    await expect(inventoryPage.homePageTitle).toBeVisible();
    logger.info('Cancel button functionality is working successfully and navigated back to inventory page');
})

test('TC11: Verify the Back Home button functionality in checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC11 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Back Home Button Functionality' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    await checkoutPage.clickBackHomeButton();
    await expect(inventoryPage.homePageTitle).toBeVisible();
    logger.info('Back Home button functionality is working successfully and navigated back to inventory page');
})

test('TC12: Verify the success message display after order completion in checkout step two page', async ({ checkoutReady,checkoutPage }) => {
    logger.info('TC12 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Success Message Display' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const { inventoryPage, cartPage } = checkoutReady;
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).toEqual('Thank you for your order!');
    logger.info('Success message is displayed correctly after order completion');
})
