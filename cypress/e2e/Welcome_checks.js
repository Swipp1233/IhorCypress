import {sign_in_page} from "../selectors/sign_in_page_selectors";
import {main_page} from "../selectors/main_page_selectors";
import {sign_up_page} from "../selectors/sign_up_page_selectors";


const uuid = () => Cypress._.random(111111111, 99999999)
const id = uuid()
const randomNumber = `${id}`


describe('Checks of the artifacts on a page', () => {

  before(() => {
    cy.visit('/')
  })

  //MINOR CHECKS
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
    cy.get(sign_in_page.password_field).click()
    cy.get(sign_in_page.username_error_message).should('be.visible')
  })

  it('check "Remember me" checkbox', () => {
    cy.get(sign_in_page.remember_me_checkbox).click().should('be.checked').click().should('be.not.checked')
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
    cy.get(sign_in_page.copyright).invoke('removeAttr', 'target').click()
    cy.get('[alt="Cypress.io"]').should('be.visible') //cypress logo on the cypress website
    cy.url().should('be.equal', 'https://www.cypress.io/')
    cy.go('back')
  })
})

  //SIGNUP, LOGIN, ONBOARDING AND LOGOUT FLOWS
describe('Checking signup, login, onboarding and logout flows', () => {

  before(() => {
    cy.visit('/')
    cy.viewport(1920, 1080)
  })


  it('should check unsuccessful login (no password)', () => {
    cy.get(sign_in_page.login_field).type('IhorCypress322')
    cy.get(sign_in_page.password_field).should('be.empty')
    cy.get(sign_in_page.sign_in_button).should('be.disabled')
    cy.get(sign_in_page.login_field).clear()
  })

  it('should check unsuccessful login (no username)', () => {
    cy.get(sign_in_page.password_field).type('RestTest1!')
    cy.get(sign_in_page.login_field).should('be.empty')
    cy.get(sign_in_page.sign_in_button).should('be.disabled')
    cy.get(sign_in_page.password_field).clear()
    })

  it('should check login with invalid credentials', () => {
    cy.clearCookies()
    cy.intercept('POST', '/login').as('login')
    cy.get(sign_in_page.login_field).type('notExistingUsername1')
    cy.get(sign_in_page.password_field).type('notExistingPassword123!')
    cy.get(sign_in_page.sign_in_button).click()
    cy.wait('@login').its('response.statusCode').should('eq', 401)
    cy.get(sign_in_page.signin_error).should('be.visible')
  })

  it('should check correct sign up flow', () => {

    cy.get(sign_in_page.dont_have_acc_hyperlink).click()
    cy.url().should('include', '/signup')
    cy.intercept('POST', '/users').as('signup')
    cy.get(sign_up_page.first_name).type('Ihor').should('have.value', 'Ihor')
    cy.get(sign_up_page.last_name).type('Holubtsov').should('have.value', 'Holubtsov')
    // cy.get(sign_up_page.username).type(testUserName) I've used this for generating unique usernames, but I have to register a new user with a specific username because the system clears DB every day
    cy.get(sign_up_page.username).type("IhorCypress322")
    cy.get(sign_up_page.password).type('RestTest1!').should('have.value', 'RestTest1!')
    cy.get(sign_up_page.confirm_password).type('RestTest1!').should('have.value', 'RestTest1!')
    cy.get(sign_up_page.sign_up_button).click()
    cy.wait('@signup').its('response.statusCode').should('eq', 201)
    cy.url().should('include', '/signin') //A user gets redirect after successful registration
  })

    it('should check ability to successful login', () => {
      cy.clearCookies()
      cy.intercept('POST', '/login').as('login')
      cy.get(sign_in_page.login_field).type('IhorCypress322')
      cy.get(sign_in_page.password_field).type('RestTest1!')
      cy.get(sign_in_page.sign_in_button).click()
      cy.wait('@login').its('response.statusCode').should('eq', 200)
    })

    it('should successful onboarding', () => {
      cy.get(main_page.onboarding_popup).should('be.visible')
      cy.get('[data-test="user-onboarding-next"]').click()
      cy.get(main_page.bank_name).type('Monobank')
      cy.get(main_page.routing_number).type(randomNumber)
      cy.get(main_page.account_number).type(`${randomNumber}` - 1)
      cy.get(main_page.bankaccount_submit_button).click()
      cy.get('[data-test="user-onboarding-next"]').click()

  })

    it('should check logout flow', () => {
      cy.intercept('POST', '/logout').as('logout')
      cy.get(main_page.logout_button).should('be.visible').click()
      cy.wait('@logout').its('response.statusCode').should('eq', 302)
      cy.url().should('include', '/signin')

    })
})

