import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import logger from '../utils/logger-util';
import logindata from '../test-data/login-data.json';
import { InventoryPage } from '../pages/inventory-page'
import { decrypt,encrypt } from '../utils/cryptoJS-util';
import { encryptEnvFile, decryptEnvFile } from '../utils/EncryptEnvFile';

test.only('Sample encryption test ', async ({ page }) => {
    encryptEnvFile();
})


test('TC1 - verify whether user is landed on login page successfully ', async ({ page }) => {
    logger.info("TC1 Started");
    test.info().annotations.push(
        { type: 'feature', description: 'Navigation to Login Page' },
        { type: 'tag', description: '@smoke' },
        { type: 'severity', description: 'Critical' },
        { type: 'env', description: process.env.TEST_ENV || 'qa' }
    );
    const login = new LoginPage(page);
    await login.openApplication();
    await expect(login.loginPageTitle).toBeVisible();
    logger.info("Login page is displayed successfully");
})

test.describe('Smoke Tests - Positive Login', () => {

    for (const credential of logindata.validlogin) {
        test(`TC2 - verify whether user is able to login with valid username and valid password for ${credential.username}`, async ({ page }) => {
            logger.info(`TC2 started for user ${credential.username}`);
            test.info().annotations.push(
                { type: 'feature', description: 'Positive Logins' },
                { type: 'tag', description: '@smoke' },
                { type: 'severity', description: 'High' },
                { type: 'env', description: process.env.TEST_ENV || 'qa' }
            );
            const login = new LoginPage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const inventory = new InventoryPage(page);
            await expect(inventory.inventoryPageTitle).toBeVisible();
            logger.info(`login completed for user ${credential.username}`);

        })
    }

})

test.describe('Regression Tests - Invalid Login Scenarios', () => {
    for (const credential of logindata.lockedoutLogin) {
        test(`TC3 - verify whether user is able to login with credentials of a lockedout user`, async ({ page }) => {
            logger.info(`TC3 started for user ${credential.username}`);
            test.info().annotations.push(
                { type: 'feature', description: 'Negative Login-Lockedout User' },
                { type: 'tag', description: '@regression' },
                { type: 'severity', description: 'High' },
                { type: 'env', description: process.env.TEST_ENV || 'qa' }
            );
            const login = new LoginPage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showLockedoutErrorMessage();
            await expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
            logger.info(`login completed for user ${credential.username}`);

        })
    }

    for (const credential of logindata.invalidusername) {
        test(`TC4 - verify whether user is able to login with invalid username and valid password`, async ({ page }) => {
            logger.info(`TC4 started for user ${credential.username}`);
            test.info().annotations.push(
                { type: 'feature', description: 'Negative Login-Invalid Username' },
                { type: 'tag', description: '@regression' },
                { type: 'severity', description: 'High' },
                { type: 'env', description: process.env.TEST_ENV || 'qa' }
            );
            const login = new LoginPage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showUsernameErrorMessage();
            await expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
            logger.info(`login completed for user ${credential.username}`);

        })
    }


    for (const credential of logindata.invalidpassword) {
        test(`TC5 - verify whether user is able to login with valid username and invalid password`, async ({ page }) => {
            logger.info(`TC5 started for user ${credential.username}`);
            test.info().annotations.push(
                { type: 'feature', description: 'Negative Login-Invalid Password' },
                { type: 'tag', description: '@regression' },
                { type: 'severity', description: 'High' },
                { type: 'env', description: process.env.TEST_ENV || 'qa' }
            );
            const login = new LoginPage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showPasswordErrorMessage();
            await expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
            logger.info(`login completed for user ${credential.username}`);

        })
    }

    for (const credential of logindata.emptyusernamepassword) {
        test(`TC6 - verify whether user is able to login with blank username and blank password`, async ({ page }) => {
            logger.info(`TC6 started for user ${credential.username}`);
            test.info().annotations.push(
                { type: 'feature', description: 'Negative Login-Empty Username and Password' },
                { type: 'tag', description: '@regression' },
                { type: 'severity', description: 'High' },
                { type: 'env', description: process.env.TEST_ENV || 'qa' }
            );
            const login = new LoginPage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showEmptyUsernameErrorMessage();
            expect(errorText).toContain('Epic sadface: Username is required');
            logger.info(`login completed for user ${credential.username}`);

        })
    }

    for (const credential of logindata.emptyPassword) {
        test(`TC7 - verify whether user is able to login with valid username and empty password`, async ({ page }) => {
            logger.info(`TC7 started for user ${credential.username}`);
            test.info().annotations.push(
                { type: 'feature', description: 'Negative Login-Empty Password' },
                { type: 'tag', description: '@regression' },
                { type: 'severity', description: 'High' },
                { type: 'env', description: process.env.TEST_ENV || 'qa' }
            );
            const login = new LoginPage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showEmptyPasswordErrorMessage();
            expect(errorText).toContain('Epic sadface: Password is required');
            logger.info(`login completed for user ${credential.username}`);

        })
    }

})





