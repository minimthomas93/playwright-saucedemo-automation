export class FooterPage {

    constructor(page) {
        this.page = page
        this.twitterIcon = page.locator('[data-test="social-twitter"]');
        this.facebookIcon = page.locator('[data-test="social-facebook"]');
        this.linkedinIcon = page.locator('[data-test="social-linkedin"]');
        this.footerMessage = page.locator('[data-test="footer-copy"]');
        

    }

    async clickTwitterIcon() {
        await this.twitterIcon.click();
    }

    async clickFacebookIcon() {
        await this.facebookIcon.click();
    }

    async clickLinkedinIcon() {
        await this.linkedinIcon.click();
    }

    async getFooterMessage() {
        return await this.footerMessage.textContent();
    }
}