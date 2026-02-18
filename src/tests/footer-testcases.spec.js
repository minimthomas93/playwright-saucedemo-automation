const { test, expect } = require('../fixtures/test-fixtures');
const logger = require('../utils/logger-util');

test('TC1: Verify twitter Icon functionality', async ({ footerPage, page }) => {
    logger.info('TC1 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Twitter Icon Functionality' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    const [twitterPage] = await Promise.all([
        page.waitForEvent('popup'),
        footerPage.clickTwitterIcon()
    ]);
    await twitterPage.waitForLoadState();
    await expect(twitterPage).toHaveURL('https://x.com/saucelabs');

    logger.info('Twitter icon is working successfully and navigated to correct URL');

})

test('TC2: Verify Facebook Icon functionality', async ({ footerPage, page }) => {
    logger.info('TC2 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Facebook Icon Functionality' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    const [facebookPage] = await Promise.all([
        page.waitForEvent('popup'),
        footerPage.clickFacebookIcon()
    ]);
    await facebookPage.waitForLoadState();
    await expect(facebookPage).toHaveURL('https://www.facebook.com/saucelabs');
    logger.info('Facebook icon is working successfully and navigated to correct URL');

})

test('TC3: Verify linkedin Icon functionality', async ({ footerPage, page }) => {
    logger.info('TC3 started');
    test.info().annotations.push(
        { type: 'feature', description: 'Linkedin Icon Functionality' },
        { type: 'tag', description: '@regression' },
        { type: 'severity', description: 'Low' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );

    const [linkedinPage] = await Promise.all([
        page.waitForEvent('popup'),
        footerPage.clickLinkedinIcon()
    ])
    await linkedinPage.waitForLoadState();
    await expect(linkedinPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
    logger.info('Linkedin icon is working successfully and navigated to correct URL');

})