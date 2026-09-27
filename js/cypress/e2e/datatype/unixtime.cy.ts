describe('UnixTime convertion', () => {
  beforeEach(() => {
    cy.visit('/pages/datatype/unixtime.html');
  })

  it('Shows current time', () => {
    cy.clock(new Date('2026-01-01T12:34:56.123Z').getTime());
    cy.get('#current-time').should('contain.text', '2026-01-01T12:34:56.123Z');
  })

  it('Parses FortiGate log picosec', () => {
    cy.get('#from-unix-time-input').type('1790507694793476877');

    cy.get('#from-unix-time-output-picosec').should('contain.text', '2026-09-27T11:14:54.793Z');
  })

  it('Parses UnixTime', () => {
    cy.get('#from-unix-time-input').type('1790511991');

    cy.get('#from-unix-time-output-sec').should('contain.text', '2026-09-27T12:26:31.000Z');
  })

  it('Get UnixTime with UTC', () => {
    cy.get('#to-unix-time-input').type('2026-01-01T12:34:56');
    cy.get('#to-unix-time-tz-override-h').clear().type('0');
    cy.get('#to-unix-time-tz-override-m').clear().type('0');
    cy.get('#to-unix-time-submit').click();

    // 2026-01-01T12:34:56Z is 1767270896

    cy.get('#to-unix-time-output-sec').should('have.text', '1767270896')
  })

  it('Get UnixTime with JST', () => {
    cy.get('#to-unix-time-input').type('2026-01-01T12:34:56');
    cy.get('#to-unix-time-tz-override-h').clear().type('9');
    cy.get('#to-unix-time-tz-override-m').clear().type('0');
    cy.get('#to-unix-time-submit').click();

    // 2026-01-01T03:34:56Z is 1767238496

    cy.get('#to-unix-time-output-sec').should('have.text', '1767238496')
  })

  it('Get UnixTime with PST', () => {
    cy.get('#to-unix-time-input').type('2026-01-01T12:34:56');
    cy.get('#to-unix-time-tz-override-h').clear().type('-8');
    cy.get('#to-unix-time-tz-override-m').clear().type('0');
    cy.get('#to-unix-time-submit').click();

    // 2026-01-01T20:34:56Z is 1767299696

    cy.get('#to-unix-time-output-sec').should('have.text', '1767299696')
  })

  it('Get UnixTime with IST', () => {
    cy.get('#to-unix-time-input').type('2026-01-01T12:34:56');
    cy.get('#to-unix-time-tz-override-h').clear().type('5');
    cy.get('#to-unix-time-tz-override-m').clear().type('30');
    cy.get('#to-unix-time-submit').click();

    // 2026-01-01T07:04:56Z is 1767251096

    cy.get('#to-unix-time-output-sec').should('have.text', '1767251096')
  })

  it('Get UnixTime with NST', () => {
    cy.get('#to-unix-time-input').type('2026-01-01T12:34:56');
    cy.get('#to-unix-time-tz-override-h').clear().type('-3');
    cy.get('#to-unix-time-tz-override-m').clear().type('30');
    cy.get('#to-unix-time-submit').click();

    // 2026-01-01T16:04:56 is 1767283496

    cy.get('#to-unix-time-output-sec').should('have.text', '1767283496')
  })

  it('Could get current time', () => {
    cy.clock(new Date('2026-01-01T12:34:56').getTime());
    cy.get('#to-unix-time-now').click();
    cy.get('#to-unix-time-input').should('have.value', '2026-01-01T12:34:56');
  })

  it('Could get current timezone', () => {
    const offsetMinutes = -(new Date().getTimezoneOffset());
    const tzH = Math.floor(offsetMinutes / 60);
    const tzM = (offsetMinutes % 60).toString().padStart(2, '0');

    cy.get('#to-unix-time-tz-override-h').should('have.value', tzH);
    cy.get('#to-unix-time-tz-override-m').should('have.value', tzM);
  })
})
