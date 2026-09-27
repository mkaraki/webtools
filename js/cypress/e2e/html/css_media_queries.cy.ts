describe('CSS media query tester', () => {
  beforeEach(() => {
    cy.visit('/pages/html/css_media_queries.html');
  })

  it('shows `unsupported` amzn-mobi', () => {
    cy.get('.chk-no.chk-amzn-mobi').should('be.visible');
  })

  it('shows passed on aspect-ratio', () => {
    cy.get('.chk-yes.chk-aspect-ratio').should('be.visible');
  })
})
