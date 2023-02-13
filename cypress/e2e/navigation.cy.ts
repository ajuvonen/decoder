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
      cy.getByTestId('version-selection').contains(buttonName).click();
      cy.location('pathname').should('contain', `${location}/play`);
      cy.getByTestId('information-modal').getByTestId('continue-button').click();
      cy.getByTestId('stats-link').click();
      cy.location('pathname').should('contain', 'stats');
      cy.go('back');
      cy.go('back');
      cy.location('pathname').should('not.contain', 'recoil');
    });
  });

  it('changing locale works', () => {
    cy.getByTestId('fi-locale-button').click();
    cy.get('h1').should('contain', 'Tervetuloa');
    cy.getByTestId('en-locale-button').click();
    cy.get('h1').should('contain', 'Welcome');
  });
});

export {};
