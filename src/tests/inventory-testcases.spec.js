import env from '../config/env';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import logger from '../utils/logger-util';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';

test.beforeEach('Login to the application', async ({ page }) => {

    logger.info('Login started');
    const login = new LoginPage(page);
    await login.openApplication();
    await login.enterUsername(env.username);
    await login.enterPassword(env.password);
    await login.clickLoginButton();

})


test('TC1: Verify the add to cart functionality and display of product count', async ({ page }) => {
    logger.info('TC1 started');
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart();
    const productcount = await inventory.productCountDisplay();
    expect(productcount).toContain('1');
    await expect(inventory.removeCartButton).toBeVisible();

})


test('TC2: Verify the remove from cart functionality and display of product count', async ({ page }) => {
    logger.info('TC2 started');
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart();
    await inventory.removeProductFromCart();
    await expect(inventory.addToCartBadge).toBeHidden();
    await expect(inventory.addToCartButton).toBeVisible();

})

test('TC3: Verify the navigation to Cart Page',async({page}) => {
    logger.info('TC5 started');
    const inventory = new InventoryPage(page);
    await inventory.navigationToCartPage();
    const cart = new CartPage(page);
    await expect(cart.titleText).toBeVisible();
})

test('TC4: Verify the display of all links in the Sidebar',async({page}) => {
    logger.info('TC3 started');
    const inventory = new InventoryPage(page);
    await inventory.openSidebar();
    const allItemsText = await inventory.displayOfAllItems();
    await expect(allItemsText).toContain('All Items');
    const aboutText = await inventory.displayOfAbout();
    await expect(aboutText).toContain('About');
    const logoutText = await inventory.displayOfLogout();
    await expect(logoutText).toContain('Logout');
    const resetText = await inventory.displayOfResetApp();
    await expect(resetText).toContain('Reset App State');
    await inventory.closeSidebar();

})


test('TC5: Verify the navigation of About link',async({page}) => {
    logger.info('TC5 started');
    const inventory = new InventoryPage(page);
    await inventory.openSidebar();
    await inventory.navigationOfAbout();
    await expect(page).toHaveURL('https://saucelabs.com/');
})

test('TC6: Verify the navigation of Logout link',async({page}) => {
    logger.info('TC5 started');
    const inventory = new InventoryPage(page);
    await inventory.openSidebar();
    await inventory.navigationOfLogout();
    const login = new LoginPage(page);
    await expect(login.loginButton).toBeVisible();
})

test('TC7: Verify the filter dropdown list',async({page}) => {
    logger.info('TC7 started');
    const inventory = new InventoryPage(page);
    await expect(inventory.filterDropdown).toBeVisible();
    //const dropdownValues = await inventory.displayofFilters();
    await expect(inventory.dropdownLists).toHaveText(['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']);
})

test('TC8: Verify whether products are filtered properly for A to Z @filter',async ({page}) => {
    logger.info('TC8 Started');
    const inventory = new InventoryPage(page);
    await inventory.chooseAtoZfilterOption();
    await expect(inventory.activeFilterOption).toHaveText('Name (A to Z)'); // Verify that the active filter option is displayed as "Name (A to Z)"
    const productNames = await inventory.getProductNames();
    logger.info(`Product names after applying A to Z filter: ${productNames.join(', ')}`);
    const sortedProductNames = [...productNames].sort(); //creating a copy of productNames array and sorting it in ascending order for A to Z
    logger.info(`Expected product names after sorting A to Z: ${sortedProductNames.join(', ')}`);
    await expect(productNames).toEqual(sortedProductNames);

})

test('TC9: Verify whether products are filtered properly for Z to A @filter',async ({page}) => {
    logger.info('TC9 Started');
    const inventory = new InventoryPage(page);
    await inventory.chooseZtoAfilterOption();
    await expect(inventory.activeFilterOption).toHaveText('Name (Z to A)'); // Verify that the active filter option is displayed as "Name (Z to A)"
    const productNames = await inventory.getProductNames();
    logger.info(`Product names after applying Z to A filter: ${productNames.join(', ')}`);
    const sortedProductNames = [...productNames].sort().reverse(); //creating a copy of productNames array and sorting it in reverse order for Z to A
    logger.info(`Expected product names after sorting Z to A: ${sortedProductNames.join(', ')}`);
    await expect(productNames).toEqual(sortedProductNames);

})


test('TC10: Verify whether products are filtered properly for low to high filter',async ({page}) => {
    logger.info('TC10 Started');
    const inventory = new InventoryPage(page);
    await inventory.chooseLowToHighfilterOption();
    await expect(inventory.activeFilterOption).toHaveText('Price (low to high)'); // Verify that the active filter option is displayed as "Price (low to high)"
    const productPrices = await inventory.getProductPrizes();
    logger.info(`Product prices after applying low to high filter: ${productPrices.join(', ')}`);
    const sortedProductPrices = [...productPrices].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''))); //creating a copy of productPrices array and sorting it in ascending order for low to high
    logger.info(`Expected product prices after sorting low to high: ${sortedProductPrices.join(', ')}`);
    await expect(productPrices).toEqual(sortedProductPrices);
})

test('TC11: Verify whether products are filtered properly for high to low filter',async ({page}) => {
    logger.info('TC11 Started');
    const inventory = new InventoryPage(page);
    await inventory.chooseHighToLowfilterOption();
    await expect(inventory.activeFilterOption).toHaveText('Price (high to low)'); // Verify that the active filter option is displayed as "Price (high to low)"
    const productPrices = await inventory.getProductPrizes();
    logger.info(`Product prices after applying high to low filter: ${productPrices.join(', ')}`);
    const sortedProductPrices = [...productPrices].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''))); //creating a copy of productPrices array and sorting it in descending order for high to low
    logger.info(`Expected product prices after sorting high to low: ${sortedProductPrices.join(', ')}`);
    await expect(productPrices).toEqual(sortedProductPrices);
})


test('TC12: Verify product title opens product detail page',async ({page}) => {
    logger.info('TC12 Started');
    const inventory = new InventoryPage(page);
    const productName = await inventory.inventoryNames.first().textContent(); // Get the name of the first product in the inventory
    await inventory.getProductByName(productName).click(); // Click on the product title to open the product detail page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); // Verify that clicking on the product title navigates to the correct product detail page
    await expect(inventory.inventoryNames).toHaveText(productName); // Verify that the product detail page displays the correct product name    
})

test('TC13: Verify Add to Cart button in product detail page',async ({page}) => {
    logger.info('TC13 Started');
    const inventory = new InventoryPage(page);
    const productName = await inventory.inventoryNames.first().textContent();   // Get the name of the first product in the inventory
    await inventory.getProductByName(productName).click();                      // Click on the product title to open the product detail page
    await expect(inventory.addToCartDetailPageButton).toBeVisible();
    await inventory.addToCartDetailPageButton.click();                          // Click on the Add to Cart button in the product detail page
    await expect(inventory.removeCartDetailPageButton).toBeVisible();           // Verify that the Add to Cart button is replaced with the Remove button after clicking
})