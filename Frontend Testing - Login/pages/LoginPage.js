class LoginPage {

    constructor(page) {

        this.page = page;


        this.emailInput =
            page.locator('#Email-4');


        this.passwordInput =
            page.locator('#Password-4');


        this.loginButton =
            page.getByText('Log In');

    }


    async open() {

        await this.page.goto(
            'https://account.aldi.us/s/login/'
        );


        const acceptButton =
            this.page.getByRole(
                'button',
                { name: 'Accept All' }
            );


        if(await acceptButton.isVisible()) {

            await acceptButton.click();

        }

    }


    async login(email, password) {

        await this.emailInput.fill(email);

        await this.passwordInput.fill(password);

        await this.loginButton.click();

    }

}


module.exports = { LoginPage };