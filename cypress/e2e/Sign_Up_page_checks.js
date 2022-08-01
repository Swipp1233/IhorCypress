import {sign_up_page} from "../selectors/sign_up_page_selectors";
import {user_info} from "../support/user_info";


describe('cypress_loginPage_cases', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/signup')
    })
    it('should check help messages next to the fields', () => {
        // triggering messages
        cy.get(sign_up_page.last_name).click()
        cy.get(sign_up_page.username).click()
        cy.get(sign_up_page.password).click()
        cy.get(sign_up_page.confirm_password).click()
        cy.get(sign_up_page.first_name).click()
        //checking helper texts
        cy.get(sign_up_page.first_name_required_message).should('be.visible')
        cy.get(sign_up_page.last_name_required_message).should('be.visible')
        cy.get(sign_up_page.username_required_message).should('be.visible')
        cy.get(sign_up_page.password_required_message).should('be.visible')
        cy.get(sign_up_page.confirm_password_required_message).should('be.visible')
    })

    it('should check the "Password does not match" error message', () => {
        cy.get(sign_up_page.password).type(user_info.password)
        cy.get(sign_up_page.confirm_password).type(user_info.password + 1)
        cy.get(sign_up_page.password_not_mutch_message).should('be.visible')
    })

    it('should check the account creating with empty fields', () => {
        cy.get(sign_up_page.password).clear()
        cy.get(sign_up_page.sign_up_button).should('be.disabled')

    })

    it('should check the "Have an account? Sign In" hyperlink', () => {
        cy.get(sign_up_page.have_an_accont_hyperlink).click()
        cy.url().should('include', '/signin')
        cy.go('back')
    })

})