describe('UnixTime convertion', () => {
  beforeEach(() => {
    cy.visit('/pages/datatype/json_pretty.html');
  })

  it('Fails on invalid JSON on Pretty', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.get('#json-str').type('invalid');
    cy.get('button').contains('Pretty').click()
    cy.get('#error-log')
      .should('contain.text', 'Failed to parse JSON')
      .should('be.visible');
  })

  it('Fails on invalid JSON on Compress', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.get('#json-str').type('invalid');
    cy.get('button').contains('Compress').click()
    cy.get('#error-log')
      .should('contain.text', 'Failed to parse JSON')
      .should('be.visible');
  })

  it('Pretty JSON with non ASCII escape', () => {
    cy.get('#json-str').type(`{"bookName": "\\u30b9\\u30ed\\u30fc\\u30eb\\u30fc\\u30d7. 1"}`, {parseSpecialCharSequences: false});
    cy.get('button').contains('Pretty').click()
    cy.get('#json-output').should('have.value', `{
  "bookName": "スローループ. 1"
}`);
    cy.get('#error-log')
      .should('not.be.visible');
  })

  it('Compress JSON with non ASCII escape', () => {
    cy.get('#json-str').type(`{
  "bookName": "スローループ. 1"
}`, {parseSpecialCharSequences: false});
    cy.get('button').contains('Compress').click()
    cy.get('#json-output').should('have.value', `{"bookName":"スローループ. 1"}`);
    cy.get('#error-log')
      .should('not.be.visible');
  })
})
