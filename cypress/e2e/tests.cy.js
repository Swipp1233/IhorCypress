import {sign_in_page} from "../selectors/sign_in_page_selectors";

describe('cypress_loginPage_cases', () => {

  before(() => {
    cy.visit('/')
    cy.viewport(1920, 1080)
  })

  it('should show Username and Password placeholders', () => {
    cy.get(sign_in_page.username_placeholder).should('be.visible')
    cy.get(sign_in_page.password_placeholder).should('be.visible')
  })

  it('should show typeable Username field', () => {
    cy.get(sign_in_page.login_field).type('IhorHolubtsov')
    cy.get(sign_in_page.login_field).should('have.value', 'IhorHolubtsov')
    cy.get(sign_in_page.login_field).clear()
  })

  it('should show typeable Password field', () => {
    cy.get(sign_in_page.password_field).type('RestTest1!')
    cy.get(sign_in_page.password_field).should('have.value', 'RestTest1!')
    cy.get(sign_in_page.password_field).clear()
  })

  it('should show \'Username is required\' error if user clicks on it and then click outside this field and didn\'t enter any value', () => {
    cy.get(sign_in_page.username_error_message).should('be.visible')
  })

  it('check "Remember me" checkbox', () => {
    cy.get(sign_in_page.remember_me_checkbox).click()
    cy.get(sign_in_page.remember_me_checkbox).should('be.checked')
    cy.get(sign_in_page.remember_me_checkbox).click()
    cy.get(sign_in_page.remember_me_checkbox).should('be.not.checked')
  })

  it('should show disabled by default sign in btn', () => {
    cy.get(sign_in_page.login_field).should('have.value', '')
    cy.get(sign_in_page.sign_in_button).should('be.disabled')
  })

  it('should have \'Don\'t have an account? Sign Up\' clickable link under \'Sign in\' btn', () => {
    cy.get(sign_in_page.dont_have_acc_hyperlink).click()
    cy.url().should('be.equal', 'http://localhost:3000/signup')
    cy.go('back')
  })

  it('should show Cypress copyright link that leads to \'https://www.cypress.io/\'', () => {
    cy.get('[rel="noopener noreferrer"]').invoke('removeAttr', 'target').click()
    cy.get('[alt="Cypress.io"]').should('be.visible')
    cy.url().should('be.equal', 'https://www.cypress.io/')
    })
})