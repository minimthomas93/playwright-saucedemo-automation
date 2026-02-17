import { FooterPage } from "../pages/footer-page";
import { test, expect } from '@playwright/test';
import logger from '../utils/logger-util'
import { LoginPage } from "../pages/login-page";
import env from '../config/env';

test.beforeEach('Login to the application', async ({ page }) => {

    logger.info('Login started');
    const login = new LoginPage(page);
    await login.openApplication();
    await login.enterUsername(env.username);
    await login.enterPassword(env.password);
    await login.clickLoginButton();
})

test('TC1: Verify twitter Icon functionality', async ({ page }) => {
    const footer = new FooterPage(page);
    await footer.clickTwitterIcon();
    const newTwitterTab = await page.waitForEvent('popup');
    await newTwitterTab.waitForLoadState();
    await expect(newTwitterTab).toHaveURL('https://x.com/saucelabs');

})

test('TC2: Verify Facebook Icon functionality', async ({ page }) => {
    const footer = new FooterPage(page);
    await footer.clickFacebookIcon();
    const newFacebookTab = await page.waitForEvent('popup');
    await newFacebookTab.waitForLoadState();
    await expect(newFacebookTab).toHaveURL('https://www.facebook.com/saucelabs');

})

test('TC3: Verify linkedin Icon functionality', async ({ page }) => {
    const footer = new FooterPage(page);
    await footer.clickLinkedinIcon();
    const newLinkedinTab = await page.waitForEvent('popup');
    await newLinkedinTab.waitForLoadState();
    await expect(newLinkedinTab).toHaveURL('https://www.linkedin.com/company/sauce-labs/');

})