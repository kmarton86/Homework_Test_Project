class AccountDetailsPage {
 
    constructor(page) {
 
        this.page = page;
 
        this.detailsLabel = page.getByText('Details');
 
        this.nameLabel = page.getByText('Name');
 
        this.mobilePhoneNumberLabel = page.getByText('Mobile Phone Number');
 
        this.emailAddressLabel = page.getByText('Email Address');
 
        this.passwordLabel = page.getByText('Password');
    }
 
}
 
module.exports = {
    AccountDetailsPage
};