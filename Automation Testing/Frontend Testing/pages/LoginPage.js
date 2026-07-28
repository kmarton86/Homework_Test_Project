class LoginPage {

   constructor(page) {

        this.page = page;

        this.banner = page.getByRole('banner');

        this.accountAreaHeading = page.getByRole('heading', {
            name: 'ALDI Account'
        });

        this.emailInput = page.getByRole('textbox', {
            name: 'Email Address'
        });

        this.emailLabel = page.getByText('Email Address');

        this.passwordInput = page.getByRole('textbox', {
            name: 'Password'
        });

        this.passwordFieldById = page.locator('#Password-4');

        this.loginButton = page.getByRole('button', {
            name: 'Log In'
        });

        this.loginButtonContainer = page.locator('lightning-layout-item').filter({
            hasText: 'Log In'
        });

        this.captcha = page.getByText('Anti-Robot Verification');

        this.captchaFull = page.getByText(
            'Anti-Robot Verification Click to start verification FriendlyCaptcha ⇗'
        );

        this.captchaLocker = page.locator('c-ciam-friendly-captcha-locker-enabled');
    }


    async open() {

        await this.page.goto(
            'https://account.aldi.us/s/login/'
        );

        // Handle cookie consent if present
        const acceptButton = this.page.getByRole('button', {
            name: 'Accept All'
        });

        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }

    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}

module.exports = {
    LoginPage
};