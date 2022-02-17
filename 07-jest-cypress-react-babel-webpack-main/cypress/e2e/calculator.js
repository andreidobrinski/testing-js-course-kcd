describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
    // click on 1
    cy.findByText(/^1$/).click()
    // click on +
    cy.findByText(/^\+$/).click()
    // click on 2
    cy.findByText(/^2$/).click()
    // click on =
    cy.findByText(/^=$/).click()
    cy.findByTestId('total').should('have.text', '3')
  })
})

describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/')
      cy.findByTestId('username-display').should('have.text', user.username)
      cy.findByText(/logout/i).click()
      cy.findByTestId('username-display', {timeout: 300}).should('not.exist')
    })
  })
})
