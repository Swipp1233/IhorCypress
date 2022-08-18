import {functions} from "../support/funcuntions";
import {main_page} from "../selectors/main_page_selectors";
import {bank_accont_selectors} from "../selectors/bank_account_creation_selectors";

//FOR SIGN UP AND LOGIN
const first_name = "Ihor"
const last_name = "Holubtsov"
const username = functions.generateUsername()
const password = "RestTest1"

//FOR BANK ACCOUNT
const bank_name = "Monobank"
const routing_number = "123123123"
const account_number = "123123123"


describe('bank account creation', () => {

    before('new account creation', () => {
        cy.ultimate_onboarding(first_name, last_name, username, password, bank_name, routing_number, account_number)
        cy.ui_logout()
    })

    beforeEach('',() => {
        cy.ui_login(username, password)
        cy.get(main_page.bank_accounts_tab).click()
        cy.url().should('contain', 'bankaccounts')
        cy.intercept("POST", "/graphql", (req) => {
            const { body } = req;

            if (
                body.hasOwnProperty("operationName") &&
                body.operationName === "ListBankAccount"
            ) {
                req.alias = "gqlListBankAccountQuery";
            }

            if (
                body.hasOwnProperty("operationName") &&
                body.operationName === "CreateBankAccount"
            ) {
                req.alias = "gqlCreateBankAccountMutation";
            }

            if (
                body.hasOwnProperty("operationName") &&
                body.operationName === "DeleteBankAccount"
            ) {
                req.alias = "gqlDeleteBankAccountMutation";
            }
        })
    })

    afterEach('', () => {
        cy.ui_logout()
    })

    it('should check the "Create Bank Account" form opening', () => {
        cy.get('[data-test="bankaccount-new"]').click()
        cy.url().should('include', '/bankaccounts/new')
    })

    it('should check the "enter..." messages', () => {
        cy.new_bank_acc_form_opening()
        //error messages triggering
        cy.get(bank_accont_selectors.bank_name).click()
        cy.get(bank_accont_selectors.routing_number).click()
        cy.get(bank_accont_selectors.account_number).click()
        cy.get(bank_accont_selectors.bank_name).click()
        //error messages checking
        cy.get('#bankaccount-bankName-input-helper-text').should('be.visible').and('have.text', 'Enter a bank name')
        cy.get('#bankaccount-routingNumber-input-helper-text').should('be.visible').and('have.text', 'Enter a valid bank routing number')
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('have.text', 'Enter a valid bank account number')
    })

    it('should check the "Bank Name" input field validation', () => {
        cy.new_bank_acc_form_opening()
        cy.get(bank_accont_selectors.bank_name).type('q')
        cy.get('#bankaccount-bankName-input-helper-text').should('be.visible').and('have.text', 'Must contain at least 5 characters')
        cy.get(bank_accont_selectors.bank_name).clear()
        cy.get(bank_accont_selectors.bank_name).type(bank_name)
        cy.get('#bankaccount-bankName-input-helper-text').should('not.exist')
    })

    it('should check the "routing number" input field validation', () => {
        cy.new_bank_acc_form_opening()
        cy.get(bank_accont_selectors.routing_number).type('1')
        cy.get('#bankaccount-routingNumber-input-helper-text').should('be.visible').and('have.text', "Must contain a valid routing number")
        cy.get(bank_accont_selectors.routing_number).clear()
        cy.get(bank_accont_selectors.routing_number).type(routing_number)
        cy.get('#bankaccount-routingNumber-input-helper-text').should('not.exist')
    })

    it('should check the "account number" input field validation', () => {
        cy.new_bank_acc_form_opening()
        cy.get(bank_accont_selectors.account_number).type('1')
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('have.text', "Must contain at least 9 digits")
        cy.get(bank_accont_selectors.account_number).clear()
        cy.get(bank_accont_selectors.account_number).type(account_number)
        cy.get('#bankaccount-accountNumber-input-helper-text').should('not.exist')
    })

    it('should check unsuccessful bank account creation (empty fields)', () => {
        cy.new_bank_acc_form_opening()
        cy.bank_acc_form_clearing()
        cy.get(bank_accont_selectors.bankaccount_submit_button).should('be.disabled')
    })

    it('should check unsuccessful bank account creation (without bank name)', () => {
        cy.new_bank_acc_form_opening()
        cy.get(bank_accont_selectors.bank_name).clear().should('be.empty') //just to be sure xD
        cy.get(bank_accont_selectors.routing_number).type(routing_number)
        cy.get(bank_accont_selectors.account_number).type(account_number)
        cy.get(bank_accont_selectors.bankaccount_submit_button).should('be.disabled')
        cy.bank_acc_form_clearing()
    })

    it('should check unsuccessful bank account creation (without routing number)', () => {
        cy.new_bank_acc_form_opening()
        cy.get(bank_accont_selectors.bank_name).type(bank_name)
        cy.get(bank_accont_selectors.routing_number).clear().should('be.empty')
        cy.get(bank_accont_selectors.account_number).type(account_number)
        cy.get(bank_accont_selectors.bankaccount_submit_button).should('be.disabled')
        cy.bank_acc_form_clearing()
    })

    it('should check unsuccessful bank account creation (without account number)', () => {
        cy.new_bank_acc_form_opening()
        cy.get(bank_accont_selectors.bank_name).type(bank_name)
        cy.get(bank_accont_selectors.routing_number).type(routing_number)
        cy.get(bank_accont_selectors.account_number).clear().should('be.empty')
        cy.get(bank_accont_selectors.bankaccount_submit_button).should('be.disabled')
        cy.bank_acc_form_clearing()
        cy.go('back')
    })

    it('creates a new bank account', () => {
        cy.new_bank_acc_form_opening()
        cy.intercept('POST', '/graphql').as('graphql_request')
        cy.get(bank_accont_selectors.bank_name).type(bank_name)
        cy.get(bank_accont_selectors.routing_number).type(routing_number)
        cy.get(bank_accont_selectors.account_number).type(account_number)
        cy.get(bank_accont_selectors.bankaccount_submit_button).click()
        cy.wait('@gqlCreateBankAccountMutation').its('response.statusCode').should('eq', 200)
        cy.get(bank_accont_selectors.bank_accounts_list).should("contain", bank_name)
    })

    it('should check deleting a bank account', () => {
        cy.visit('/bankaccounts')
        cy.get('[data-test="bankaccount-delete"]').first().click()
        cy.wait('@gqlDeleteBankAccountMutation').its('response.statusCode').should('eq', 200)
        cy.get(bank_accont_selectors.bank_accounts_list).children().contains('Deleted')
    })
})
