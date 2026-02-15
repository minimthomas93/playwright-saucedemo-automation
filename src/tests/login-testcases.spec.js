//verify whether user is landed on login page successfully
//verify whether user is able to login with valid credentials - 4 users
//verify whether user is able to login with invalid username and valid password 
//verify whether user is able to login with valid username and invalid password
//verify whether user is able to login with blank credentials
//verify whether user is able to login with locked out user credentials
//verify whether user is able to login with invalid username and invalid password

import { test, expect } from '@playwright/test';
import { loginpage } from '../pages/login-page';
import logger from '../utils/logger-util';
import { env } from '../config/env';
import logindata from '../test-data/login-data.json';

test('TC1 - verify whether user is landed on login page successfully ', async ({ page }) => {
    logger.info("TC1 Started");
    const login = new loginpage(page);
    await login.openApplication();
    await expect(login.loginPageTitle).toBeVisible();
})

test.describe('Positive Login', () => {

    for (const credential of logindata.validlogin) {

        test(`TC2 - verify whether user is able to login with valid username and valid password for ${credential.username}`, async ({ page }) => {
            const login = new loginpage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            await expect(login.homePageTitle).toBeVisible();
            logger.info(`login completed for user ${credential.username}`);

        })
    }

})

test.describe('Invalid Login Scenarios @smoke', () => {
    for (const credential of logindata.lockedoutLogin) {
        test(`TC3 - verify whether user is able to login with credentials of a lockedout user`, async ({ page }) => {
            const login = new loginpage(page);
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
            const login = new loginpage(page);
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
            const login = new loginpage(page);
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
            const login = new loginpage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showEmptyUsernameErrorMessage();
            await expect(errorText).toContain('Epic sadface: Username is required');
            logger.info(`login completed for user ${credential.username}`);

        })
    }

    for (const credential of logindata.emptyPassword) {
        test(`TC7 - verify whether user is able to login with valid username and empty password`, async ({ page }) => {
            const login = new loginpage(page);
            await login.openApplication();
            await login.enterUsername(credential.username);
            await login.enterPassword(credential.password);
            await login.clickLoginButton();
            const errorText = await login.showEmptyPasswordErrorMessage();
            await expect(errorText).toContain('Epic sadface: Password is required');
            logger.info(`login completed for user ${credential.username}`);

        })
    }

})





