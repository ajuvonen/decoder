const testBasicPlay = (location:string) => () => {
  cy.visit(`/${location}/play`)
    .getByTestId('info-modal-continue-button').click()
    .getByTestId('new-game-dropdown').click()
    .getByTestId('easy-mode-button').click()
    .getByTestId('active-guess-row').should('exist');
  [0, 1, 2, 3].forEach((index) => {
    cy.getByTestId(`draggable-item-${index}`).click()
      .children().find('a:first-child').click()
      .should('contain.text', 'Red');
  });
  cy.getByTestId('check-button').click()
    .getByTestId('active-guess-row').should('exist')
    .getByTestId('guess-row-0').should('exist')
    .getByTestId('new-game-dropdown').click()
    .getByTestId('difficult-mode-button').click()
    .getByTestId('confirmation-modal-continue-button').click()
    .getByTestId('guess-row-0').should('not.exist')
    .getByTestId('active-guess-row').should('exist');
};

describe('Play', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByTestId('en-locale-button').click();
  });

  [
    'recoil',
    'redux',
    'context',
  ].forEach((location) => {
    it(`with ${location} starts a new game`, testBasicPlay(location));
  });

  it(`works in small screens`, () => {
    cy.viewport(550, 750);
    testBasicPlay('recoil')();
  });
});

export {};
