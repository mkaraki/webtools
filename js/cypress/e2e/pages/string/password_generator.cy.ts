describe('Check landing state', () => {
  it('Symbols Count', () => {
    cy.visit('/pages/string/password_generator.html')
    cy.get('input.symbol-checkbox[type="checkbox"]').should('have.length', 29)
  })
})

describe('Check Symbol selection', () => {
  it('Select All', () => {
    cy.visit('/pages/string/password_generator.html')
    cy.get('#symbols-select-all').click()
    cy.get('input.symbol-checkbox[type="checkbox"]').each((el) => {
      expect(el).to.be.checked
    })
  })

  it('Select None', () => {
    cy.visit('/pages/string/password_generator.html')
    cy.get('#symbols-select-none').click()
    cy.get('input.symbol-checkbox[type="checkbox"]').each((el) => {
      expect(el).to.not.be.checked
    })
  })
});

describe('Check password generation', () => {
  it('Generate password without symbols', () => {
    cy.visit('/pages/string/password_generator.html')

    // Set 128 length
    cy.get('#digits').clear()
    cy.get('#digits').type('128')

    // No Symbols
    cy.get('#symbols-select-none').click()

    // Click Generate
    cy.get('#btn-generate').click()

    // Check password length for innerText
    cy.get('#output').invoke('text').should('have.length', 128)

    // Check Character
    cy.get('#output').invoke('text').should('match', /^[a-zA-Z0-9]{128}$/)
  })

  it('Generate password without numbers and symbols', () => {
    cy.visit('/pages/string/password_generator.html')

    // Set 128 length
    cy.get('#digits').clear()
    cy.get('#digits').type('128')

    // Turn on some chars
    cy.get('#lowercase').check()
    cy.get('#uppercase').check()
    cy.get('#number').check()

    // No Symbols
    cy.get('#symbols-select-none').click()

    // Click Generate
    cy.get('#btn-generate').click()

    // Check password length for innerText
    cy.get('#output').invoke('text').should('have.length', 128)

    // Check Character 
    cy.get('#output').invoke('text').should('match', /^[a-zA-Z0-9]{128}$/)
  });

  it('Generate password without uppercase and symbols', () => {
    cy.visit('/pages/string/password_generator.html')

    // Set 128 length
    cy.get('#digits').clear()
    cy.get('#digits').type('128')

    // Turn on some chars
    cy.get('#lowercase').check()
    cy.get('#uppercase').uncheck()
    cy.get('#number').check()

    // No Symbols
    cy.get('#symbols-select-none').click()

    // Click Generate
    cy.get('#btn-generate').click()

    // Check password length for innerText
    cy.get('#output').invoke('text').should('have.length', 128)

    // Check Character 
    cy.get('#output').invoke('text').should('match', /^[a-z0-9]{128}$/)
  });

  it('Generate password without lowercase and symbols', () => {
    cy.visit('/pages/string/password_generator.html')

    // Set 128 length
    cy.get('#digits').clear()
    cy.get('#digits').type('128')

    // Turn on some chars
    cy.get('#lowercase').uncheck()
    cy.get('#uppercase').check()
    cy.get('#number').check()

    // No Symbols
    cy.get('#symbols-select-none').click()

    // Click Generate
    cy.get('#btn-generate').click()

    // Check password length for innerText
    cy.get('#output').invoke('text').should('have.length', 128)

    // Check Character 
    cy.get('#output').invoke('text').should('match', /^[A-Z0-9]{128}$/)
  });
});