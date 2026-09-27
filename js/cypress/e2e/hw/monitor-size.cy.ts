describe('Monitor size', () => {
  beforeEach(() => {
    cy.visit('/pages/hw/monitor-size.html');
  })

  it('Calcs width->inch+height', () => {
    cy.get('#mode').select('3'); // To auto form adjust check

    cy.get('#aspect-w').clear().type('16');
    cy.get('#aspect-h').clear().type('9');
    cy.get('#mode').select('1');
    cy.get('#size').clear().type('1920');
    cy.get('#unit').select('cm')

    cy.get('#size-in').should('not.be.visible');

    cy.get('#calc').click();

    cy.get('#res').should('contain.text', 'Width: 1920 cm');
    cy.get('#res').should('contain.text', 'Height: 1080 cm');
    cy.get('#res').should('contain.text', 'Inch: 867.2862874339758');
  })

  it('Calcs height->inch+width', () => {
    cy.get('#mode').select('3'); // To auto form adjust check

    cy.get('#aspect-w').clear().type('16');
    cy.get('#aspect-h').clear().type('9');
    cy.get('#mode').select('2');
    cy.get('#size').clear().type('1080');
    cy.get('#unit').select('cm')

    cy.get('#size-in').should('not.be.visible');

    cy.get('#calc').click();

    cy.get('#res').should('contain.text', 'Width: 1920 cm');
    cy.get('#res').should('contain.text', 'Height: 1080 cm');
    cy.get('#res').should('contain.text', 'Inch: 867.2862874339758');
  })

  it('Calcs inch->width+height', () => {
    cy.get('#mode').select('1'); // To auto form adjust check

    cy.get('#aspect-w').clear().type('16');
    cy.get('#aspect-h').clear().type('9');
    cy.get('#mode').select('3');
    cy.get('#size-in').clear().type('100');

    cy.get('#size').should('not.be.visible');
    cy.get('#unit').should('not.be.visible');

    cy.get('#calc').click();

    cy.get('#res').should('contain.text', 'Width: 2213.8018642963552 mm');
    cy.get('#res').should('contain.text', 'Height: 1245.2635486666998 mm');
  })
})
