import {sign_in_page} from "../selectors/sign_in_page_selectors";
import {sign_up_page} from "../selectors/sign_up_page_selectors";


describe('cypress_loginPage_cases', () => {
  before(() => {
    cy.visit('/')
    cy.viewport(1920, 1080)
    cy.get(sign_in_page.dont_have_acc_hyperlink).click().url().should('include', '/signup')

  })
    it('should check help messages next to the fields', () => {
      // triggering messages
      cy.get(sign_up_page.last_name).click()
      cy.get(sign_up_page.username).click()
      cy.get(sign_up_page.password).click()
      cy.get(sign_up_page.confirm_password).click()
      cy.get(sign_up_page.first_name).click()
      //checking helper texts
      cy.get(sign_up_page.first_name_required).should('be.visible')
      cy.get(sign_up_page.last_name_required).should('be.visible')
      cy.get(sign_up_page.username_required).should('be.visible')
      cy.get(sign_up_page.password_required).should('be.visible')
      cy.get(sign_up_page.confirm_password_required).should('be.visible')
    })

    it('should check the "Have an account? Sign In" hyperlink', () => {
      cy.get(sign_up_page.have_an_accont_hyperlink).click()
      cy.url().should('include', '/signin')
      cy.go('back')
    })

})
2