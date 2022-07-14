describe('shopSimpleAuto', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://stg.fastshoppingstore.com/')
    cy.get('.sc-140x2dx-1').click()
  })
  it('policies', () => {
    cy.get('[href=\'/documents/terms_of_use\']').click()
    cy.url().should('include', '/documents/terms_of_use')

  })
  /* it('Registration', () => {
     cy.visit('https://stg.fastshoppingstore.com/shopping-cart')
     cy.get('.grid-cols-1 > div:nth-of-type(2) .sc-1ko2uzt-7 > .flex > .sc-mxebdw-0').click()
     cy.get('.flex-grow.sc-mxebdw-0', {timeout: 10000}).click() //pop-up
     cy.get('.cmruOP').click()
     cy.get('.content .col-span-12 > .sc-1cynnh3-2 > .sc-1cynnh3-0 > div div:nth-of-type(2)').click()
     cy.get('[href=\'/signup\']').click()
     cy.get('[name="firstName"]').type("auto")
     cy.get('[name="lastName"]').type("test")
     cy.get('[name="birthDate"]').type("11112000")
     cy.get('[name="enrollerId"]').type("yafe")
     cy.get('//div[@class=\'w-full px-2 sm:px-0 py-4\']//div[@class=\'col-span-2 sm:col-span-1\']//div[@class=\' css-1bkdpnc-placeholder\']').click() //не ебу как взять локатор для дропдауна COUNTRY

   })
   it('Log in', () => {
     cy.get(`.sc-1kt4fbx-5 > .relative [height='24px']`).click()
     cy.get(`.sc-hk7xrv-7[href='/login']`).click()
     cy.get(`[name="username"]`).type(`italy1107`)
     cy.get(`[name='password']`).type(`RestTest1!`)
     cy.get(`[type="submit"]`).click()
     cy.get(`[class="jsx-889649720 font-bold py-1"`, {timeout: 10000}).should("be.visible")
   })
   //it('Log out', () => {
     cy.get(`.sc-1kt4fbx-5 > .relative [height='24px']`).click()
     cy.get(`.sc-hk7xrv-7[href='/login']`).click()
     cy.get(`[name="username"]`).type(`italy1107`)
     cy.get(`[name='password']`).type(`RestTest1!`)
     cy.get(`[type="submit"]`).click()
     cy.get(`[class="jsx-889649720 font-bold py-1"`, {timeout: 10000}).should("be.visible")
     cy.get(`[data-test-id="CircularProgressbarWithChildren"`, {timeout: 10000 }).click()
     cy.get(`//a[.='Log out']`).click()
   })*/
})