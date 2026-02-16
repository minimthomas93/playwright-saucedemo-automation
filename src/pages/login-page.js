import 'dotenv/config';
import { env } from '../config/env.example';

export class LoginPage {
    constructor(page) {
        this.page = page
        this.loginPageTitle = page.locator('text = Swag Labs');
        this.usernameTextbox = page.locator('[data-test = "username"]');
        this.passwordTextbox = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.usernameErrorMessage = page.locator('text = Epic sadface: Username and password do not match any user in this service');//blank or username issue
        this.passwordErrorMessage = page.locator('text = Epic sadface: Username and password do not match any user in this service');
        this.lockedoutErrorMessage = page.locator('text = Epic sadface: Sorry, this user has been locked out.');
        this.emptyusernameErrorMessage = page.locator('text = Epic sadface: Username is required')
        this.emptyPasswordErrorMessage = page.locator('text = Epic sadface: Password is required')
        //this.homePageTitle = page.locator('[data-test="title"]');
    }

    async openApplication() {
        await this.page.goto(env.baseURL);
    }

    async enterUsername(username) {
        await this.usernameTextbox.fill(username);
    }

    async enterPassword(password) {
        await this.passwordTextbox.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async showUsernameErrorMessage() {
        return await this.usernameErrorMessage.textContent();
    }

    async showEmptyUsernameErrorMessage() {
        return await this.emptyusernameErrorMessage.textContent();
    }

    async showEmptyPasswordErrorMessage() {
        return await this.emptyPasswordErrorMessage.textContent();
    }

    async showPasswordErrorMessage() {
        return await this.passwordErrorMessage.textContent();
    }

    async showLockedoutErrorMessage() {
        return await this.lockedoutErrorMessage.textContent();
    }

    // async openLandingPage() {
    //     return await this.homePageTitle();
    // }

}