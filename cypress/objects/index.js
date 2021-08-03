const Index = {
  literals: {
    PAGE_URL: '/',
    HEADER_TEXT: 'AlayaCare Cypress - Automation Challenge'
  },

  elements: {
    hdrIndex: 'h1:first'
  },

  actions: {

    assertLoaded() {
      const url = `${Cypress.config().baseUrl}${Index.literals.PAGE_URL}`
      cy.url()
        .should('be.equals', url)
      cy.get(Index.elements.hdrIndex)
        .should('contains.text', Index.literals.HEADER_TEXT)
    }

  },
}

module.exports = { Index }
