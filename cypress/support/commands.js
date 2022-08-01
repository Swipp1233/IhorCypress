import {sign_in_page} from "../selectors/sign_in_page_selectors";
import {sign_up_page} from "../selectors/sign_up_page_selectors";
import {main_page} from "../selectors/main_page_selectors";
import {bank_accont_selectors} from "../selectors/bank_account_creation_selectors";

// SIGN UP COMMAND
Cypress.Commands.add('ui_signup_test_user', (first_name, last_name, username, password) => {
    cy.visit('/signup')
    cy.url().should('include', '/signup')
    cy.intercept('POST', '/users').as('signup')
    cy.get(sign_up_page.first_name).type(first_name).should('have.value', 'Ihor')
    cy.get(sign_up_page.last_name).type(last_name).should('have.value', 'Holubtsov')
    cy.get(sign_up_page.username).type(username)
    cy.get(sign_up_page.password).type(password).should('have.value', password)
    cy.get(sign_up_page.confirm_password).type(password).should('have.value', password)
    cy.get(sign_up_page.sign_up_button).click()
    cy.wait('@signup').its('response.statusCode').should('eq', 201)
    cy.url().should('include', '/signin')
})

// LOGIN COMMAND
Cypress.Commands.add('ui_login', (username, password) => {
    cy.intercept('POST', '/login').as('login')
    cy.get(sign_in_page.login_field).type(username)
    cy.get(sign_in_page.password_field).type(password)
    cy.get(sign_in_page.sign_in_button).click()
    cy.wait('@login').its('response.statusCode').should('eq', 200)
    cy.url().should("not.contain", "/signin")
})

//ONBOARDING
Cypress.Commands.add('ui_onboarding', () => {
    cy.get(main_page.onboarding_popup).should('be.visible')
    cy.get('[data-test="user-onboarding-next"]').click()
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
})

Cypress.Commands.add('ultimate_onboarding', (first_name, last_name, username, password, bank_name, routing_number, account_number) => {
    //sign up
    cy.visit('/signup')
    cy.url().should('include', '/signup')
    cy.intercept('POST', '/users').as('signup')
    cy.get(sign_up_page.first_name).type(first_name).should('have.value', 'Ihor')
    cy.get(sign_up_page.last_name).type(last_name).should('have.value', 'Holubtsov')
    cy.get(sign_up_page.username).type(username)
    cy.get(sign_up_page.password).type(password).should('have.value', password)
    cy.get(sign_up_page.confirm_password).type(password).should('have.value', password)
    cy.get(sign_up_page.sign_up_button).click()
    cy.wait('@signup').its('response.statusCode').should('eq', 201)
    cy.url().should('include', '/signin')
    //login
    cy.intercept('POST', '/login').as('login')
    cy.get(sign_in_page.login_field).type(username)
    cy.get(sign_in_page.password_field).type(password)
    cy.get(sign_in_page.sign_in_button).click()
    cy.wait('@login').its('response.statusCode').should('eq', 200)
    //onboarding
    cy.get(main_page.onboarding_popup).should('be.visible')
    cy.get('[data-test="user-onboarding-next"]').click()
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
    //bank acc creation
    cy.intercept('POST', '/graphql').as('graphql_request')
    cy.get(bank_accont_selectors.bank_name).type(bank_name)
    cy.get(bank_accont_selectors.routing_number).type(routing_number)
    cy.get(bank_accont_selectors.account_number).type(account_number)
    cy.get(bank_accont_selectors.bankaccount_submit_button).click()
    cy.wait('@graphql_request').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
    cy.get('[data-test="user-onboarding-next"]').click()
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
})

//BANKS ACCOUNT CREATION
Cypress.Commands.add('ui_bank_account_creation', (bank_name, routing_number, account_number) => {
    cy.intercept('POST', '/graphql').as('graphql_request')
    cy.get(bank_accont_selectors.bank_name).type(bank_name)
    cy.get(bank_accont_selectors.routing_number).type(routing_number)
    cy.get(bank_accont_selectors.account_number).type(account_number)
    cy.get(bank_accont_selectors.bankaccount_submit_button).click()
    cy.wait('@graphql_request').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
    cy.get('[data-test="user-onboarding-next"]').click()
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
})

// LOGOUT
Cypress.Commands.add('ui_logout', () => {
    cy.intercept('POST', '/logout').as('logout')
    cy.get(main_page.logout_button).click()
    cy.wait('@logout').its('response.statusCode').should('eq', 302)
    cy.url().should('include', '/signin')
})

Cypress.Commands.add('bank_acc_form_clearing', () => {
    cy.get(bank_accont_selectors.bank_name).clear().should('be.empty') //just to be sure xD
    cy.get(bank_accont_selectors.routing_number).clear().should('be.empty')
    cy.get(bank_accont_selectors.account_number).clear().should('be.empty')
})