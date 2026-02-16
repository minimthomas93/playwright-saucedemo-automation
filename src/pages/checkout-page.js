import 'dotenv/config';
export class CheckoutPage{

    constructor(page) {
        this.page = page;
        this.checkoutPageTitle = page.locator('text = Checkout: Your Information');

    }


}