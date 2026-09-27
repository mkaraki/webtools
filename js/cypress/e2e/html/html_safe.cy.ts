describe('HTML safe', () => {
  it('escape HTML', () => {
    cy.visit('/pages/html/html_safe.html');

    cy.get('#input').type(
      '<a href="test">Test</a>' + "\n" +
      '<p>P tag test</p>'
    );

    cy.get('#result').should('have.value',
      '&lt;a href="test"&gt;Test&lt;/a&gt;' + "\n" +
      '&lt;p&gt;P tag test&lt;/p&gt;'
    );
  })
})
