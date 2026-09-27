describe('Elapsed Days', () => {
  beforeEach(() => {
    cy.visit('/pages/datetime/elapsed_days.html');
  })

  it('Varidate 30th anniversary', () => {
    cy.get('#start-date-input').type('1996-02-27');
    cy.get('#end-date-input').type('2026-02-27');

    cy.get('#start-calc').click();

    cy.get('#elapsed-ymd-output').should('have.text', '30 years, 0 months, 0 days')
    cy.get('#elapsed-weeks-output').should('have.text', '1565 weeks')
  })

  it('Fails on future date', () => {
    cy.get('#start-date-input').type('2030-02-27');
    cy.get('#end-date-input').type('2026-02-27');

    // Check alert dialog
    cy.on('window:alert', (text) => {
      expect(text).to.equal('End date must be after start date.');
    });

    cy.get('#start-calc').click();
  })

  // Currently (2026-09-28), Cypress does not support Temporal.Now.
  //it('Could get current time on click', () => {
  //  cy.clock(new Date('2026-01-01T12:34:56').getTime());
  //  cy.get('#end-date-today').click();
  //  cy.get('#end-date-input').should('have.value', '2026-01-01');
  //})
})
