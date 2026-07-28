class LoginPage {

    constructor(page) {

        this.page = page;

        this.emailInput = page.getByRole('textbox', {
            name: 'Email Address'
        });

        this.passwordInput = page.getByRole('textbox', {
            name: 'Password'
        });

        this.loginButton = page.getByRole('button', {
            name: 'Log In'
        });

        this.captcha = page.getByText('Anti-Robot Verification');

    }

    async open() {

        await this.page.goto(
            'https://account.aldi.us/s/login/'
        );

        const acceptButton = this.page.getByRole('button', {
            name: 'Accept All'
        });

        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }

    }

}

module.exports = {
    LoginPage
};