describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  [
    {buttonName: 'Recoil', location: 'recoil'},
    {buttonName: 'Redux', location: 'redux'},
    {buttonName: 'Context API', location: 'context'},
  ].forEach(({buttonName, location}) => {
    it(`with ${buttonName} works`, () => {
      cy.getByTestId('version-selection').contains(buttonName).click()
        .location('pathname').should('contain', `${location}/play`)
        .getByTestId('info-modal-continue-button').click()
        .getByTestId('stats-link').click()
        .location('pathname').should('contain', 'stats')
        .go('back')
        .go('back')
        .location('pathname').should('not.contain', 'recoil');
    });
  });

  it('changing locale works', () => {
    cy.getByTestId('fi-locale-button').click()
      .get('h1').should('contain', 'Tervetuloa')
      .getByTestId('en-locale-button').click()
      .get('h1').should('contain', 'Welcome');
  });
});

export {};
