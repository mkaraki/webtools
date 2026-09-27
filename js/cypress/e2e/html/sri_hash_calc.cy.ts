describe('SRI Hash Calc', () => {
  beforeEach(() => {
    cy.visit('/pages/html/sri_hash_calc.html');
    cy.intercept('GET', 'https://example.invalid/test.js', {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'test',
    }).as('sriWebRequest');
  })

  it('calculates SRI hash', () => {
    cy.get('#uri').type('https://example.invalid/test.js');
    cy.get('#btn-calc').click();

    cy.wait('@sriWebRequest');
    cy.wait(500);

    cy.get('.sri').each((e, i, l) => {
      expect(e).have.text('sha512-7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==');
    })
    cy.get('.uri').each((e, i, l) => {
      expect(e).have.text('https://example.invalid/test.js');
    })
  })
})
