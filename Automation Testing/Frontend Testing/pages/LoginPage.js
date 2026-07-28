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

        // TODO: pontosítsd a valós DOM alapján (pl. role="alert" vagy specifikus class)
        this.errorMessage = page.getByText(/invalid|incorrect|hibás/i);

        // TODO: cseréld olyan elemre, ami csak sikeres login után jelenik meg
        // (pl. "My Account", "Log Out" gomb, üdvözlő szöveg)
        this.accountMenu = page.getByRole('button', { name: /account|log out/i });
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

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}

module.exports = {
    LoginPage
};