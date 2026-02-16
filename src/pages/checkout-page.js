import 'dotenv/config';
export class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.checkoutPageTitle = page.locator('text = Checkout: Your Information');
        this.firstnameInput = page.locator('[data-test="firstName"]');
        this.lastnameInput = page.locator('[data-test="lastName"]');
        this.postalcodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.firstnameErrorMessage = page.locator('text = Error: First Name is required');
        this.lastnameErrorMessage = page.locator('text = Error: Last Name is required');
        this.postalcodeErrorMessage = page.locator('text = Error: Postal Code is required');
        this.checkoutSteptwoTitle = page.locator('text = Checkout: Overview');
        this.itemTotalPrice = page.locator('[data-test="subtotal-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.taxPrice = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.successMessage = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

    }

    async enterFirstName(firstname) {
        await this.firstnameInput.fill(firstname);
    }

    async enterLastName(lastname) {
        await this.lastnameInput.fill(lastname);
    }

    async enterPostalCode(postalcode) {
        await this.postalcodeInput.fill(postalcode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async getfirstNameErrorMessage() {
        await this.firstnameErrorMessage.textContent();
    }

    async getlastNameErrorMessage() {
        await this.lastnameErrorMessage.textContent();
    }

    async getpostalcodeErrorMessage() {
        await this.postalcodeErrorMessage.textContent();
    }

    async getCheckoutStepTwoTitle() {
        await this.checkoutSteptwoTitle.textContent();
    }

    async getItemTotalPrice() {
        return await this.itemTotalPrice.textContent();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async getTaxPrice() {
        return await this.taxPrice.textContent();
    }   

    async getTotalPrice() {
        return await this.totalPrice.textContent();
    }   

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }
}