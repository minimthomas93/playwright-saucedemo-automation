const { test, expect } = require('../fixtures/test-fixtures');
const logger = require('../utils/logger-util');

test('TC1: Verify the add to cart functionality and display of product count', async ({ inventoryPage }) => {
    logger.info('TC1 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Add to Cart Functionality' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.addProductToCart();
    const productcount = await inventoryPage.productCountDisplay();
    expect(productcount).toContain('1');
    await expect(inventoryPage.removeCartButton).toBeVisible();
    logger.info('Product added to cart and product count is displayed successfully');

})


test('TC2: Verify the remove from cart functionality and display of product count', async ({ inventoryPage }) => {
    logger.info('TC2 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Remove from Cart Functionality' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.addProductToCart();
    await inventoryPage.removeProductFromCart();
    await expect(inventoryPage.addToCartBadge).toBeHidden();
    await expect(inventoryPage.addToCartButton).toBeVisible();
    logger.info('Product removed from cart and product count is updated successfully');

})

test('TC3: Verify the navigation to Cart Page', async ({ inventoryPage, cartPage }) => {
    logger.info('TC3 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Navigation to Cart Page' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.navigationToCartPage();
    await expect(cartPage.titleText).toBeVisible();
    logger.info('Navigation to cart page is successful');
})

test('TC4: Verify the display of all links in the Sidebar', async ({ inventoryPage }) => {
    logger.info('TC4 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Display of Sidebar Links' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.openSidebar();
    const allItemsText = await inventoryPage.displayOfAllItems();
    await expect(allItemsText).toContain('All Items');
    const aboutText = await inventoryPage.displayOfAbout();
    await expect(aboutText).toContain('About');
    const logoutText = await inventoryPage.displayOfLogout();
    await expect(logoutText).toContain('Logout');
    const resetText = await inventoryPage.displayOfResetApp();
    await expect(resetText).toContain('Reset App State');
    await inventoryPage.closeSidebar();
    logger.info('All links in the sidebar are displayed successfully');

})


test('TC5: Verify the navigation of About link', async ({ inventoryPage }) => {
    logger.info('TC5 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Navigation to About Page' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.openSidebar();
    await inventoryPage.navigationOfAbout();
    await expect(inventoryPage.page).toHaveURL('https://saucelabs.com/');
    logger.info('Navigation to about page is successful');
})

test('TC6: Verify the navigation of Logout link', async ({ inventoryPage, loginPage }) => {
    logger.info('TC6 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Logout Functionality' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.openSidebar();
    await inventoryPage.navigationOfLogout();
    await expect(loginPage.loginButton).toBeVisible();
    logger.info('Logout is successful and login page is displayed');
})

test('TC7: Verify the filter dropdown list', async ({ inventoryPage }) => {
    logger.info('TC7 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Filter Dropdown List' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await expect(inventoryPage.filterDropdown).toBeVisible();
    await expect(inventoryPage.dropdownLists).toHaveText(['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']);
    logger.info('Filter dropdown list is displayed successfully with all options');
})

test('TC8: Verify whether products are filtered properly for A to Z @filter', async ({ inventoryPage }) => {
    logger.info('TC8 Started');
    test.info().annotations.push(
        { type: 'feature', description: 'Filtering Products by A to Z' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.chooseAtoZfilterOption();
    await expect(inventoryPage.activeFilterOption).toHaveText('Name (A to Z)'); // Verify that the active filter option is displayed as "Name (A to Z)"
    const productNames = await inventoryPage.getProductNames();
    logger.info(`Product names after applying A to Z filter: ${productNames.join(', ')}`);
    const sortedProductNames = [...productNames].sort(); //creating a copy of productNames array and sorting it in ascending order for A to Z
    logger.info(`Expected product names after sorting A to Z: ${sortedProductNames.join(', ')}`);
    await expect(productNames).toEqual(sortedProductNames);
    logger.info('Products are filtered properly for A to Z filter option');

})

test('TC9: Verify whether products are filtered properly for Z to A @filter', async ({ inventoryPage }) => {
    logger.info('TC9 Started');
    test.info().annotations.push(
        { type: 'feature', description: 'Inventory Sorting' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Critical' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.chooseZtoAfilterOption();
    await expect(inventoryPage.activeFilterOption).toHaveText('Name (Z to A)'); // Verify that the active filter option is displayed as "Name (Z to A)"
    const productNames = await inventoryPage.getProductNames();
    logger.info(`Product names after applying Z to A filter: ${productNames.join(', ')}`);
    const sortedProductNames = [...productNames].sort().reverse(); //creating a copy of productNames array and sorting it in reverse order for Z to A
    logger.info(`Expected product names after sorting Z to A: ${sortedProductNames.join(', ')}`);
    await expect(productNames).toEqual(sortedProductNames);
    logger.info('Products are filtered properly for Z to A filter option');

})


test('TC10: Verify whether products are filtered properly for low to high filter', async ({ inventoryPage }) => {
    logger.info('TC10 Started');
    test.info().annotations.push(
        { type: 'feature', description: 'Filtering Products by Price Low to High' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.chooseLowToHighfilterOption();
    await expect(inventoryPage.activeFilterOption).toHaveText('Price (low to high)'); // Verify that the active filter option is displayed as "Price (low to high)"
    const productPrices = await inventoryPage.getProductPrizes();
    logger.info(`Product prices after applying low to high filter: ${productPrices.join(', ')}`);
    const sortedProductPrices = [...productPrices].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''))); //creating a copy of productPrices array and sorting it in ascending order for low to high
    logger.info(`Expected product prices after sorting low to high: ${sortedProductPrices.join(', ')}`);
    await expect(productPrices).toEqual(sortedProductPrices);
    logger.info('Products are filtered properly for low to high filter option');
})

test('TC11: Verify whether products are filtered properly for high to low filter', async ({ inventoryPage }) => {
    logger.info('TC11 Started');
    test.info().annotations.push(
        { type: 'feature', description: 'Filtering Products by Price High to Low' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    await inventoryPage.chooseHighToLowfilterOption();
    await expect(inventoryPage.activeFilterOption).toHaveText('Price (high to low)'); // Verify that the active filter option is displayed as "Price (high to low)"
    const productPrices = await inventoryPage.getProductPrizes();
    logger.info(`Product prices after applying high to low filter: ${productPrices.join(', ')}`);
    const sortedProductPrices = [...productPrices].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''))); //creating a copy of productPrices array and sorting it in descending order for high to low
    logger.info(`Expected product prices after sorting high to low: ${sortedProductPrices.join(', ')}`);
    await expect(productPrices).toEqual(sortedProductPrices);
    logger.info('Products are filtered properly for high to low filter option');
})


test('TC12: Verify product title opens product detail page', async ({ inventoryPage }) => {
    logger.info('TC12 Started');
    test.info().annotations.push(
        { type: 'feature', description: 'Product Detail Page Navigation' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    const productName = await inventoryPage.inventoryNames.first().textContent(); // Get the name of the first product in the inventory
    await inventoryPage.getProductByName(productName).click(); // Click on the product title to open the product detail page
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); // Verify that clicking on the product title navigates to the correct product detail page
    await expect(inventoryPage.inventoryNames).toHaveText(productName); // Verify that the product detail page displays the correct product name   
    logger.info('Product detail page is opened successfully with correct product information');
})

test('TC13: Verify Add to Cart button in product detail page', async ({ inventoryPage }) => {
    logger.info('TC13 Started');
    test.info().annotations.push(
        { type: 'feature', description: 'Add to Cart in Product Detail Page' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'High' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    const productName = await inventoryPage.inventoryNames.first().textContent();   // Get the name of the first product in the inventory
    await inventoryPage.getProductByName(productName).click();                      // Click on the product title to open the product detail page
    await expect(inventoryPage.addToCartDetailPageButton).toBeVisible();
    await inventoryPage.addToCartDetailPageButton.click();                          // Click on the Add to Cart button in the product detail page
    await expect(inventoryPage.removeCartDetailPageButton).toBeVisible();           // Verify that the Add to Cart button is replaced with the Remove button after clicking
    logger.info('Add to Cart functionality in product detail page is working successfully');
})