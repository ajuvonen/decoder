/// <reference types="cypress"/>

const testInitialNavigation = (buttonName: string, location: string) => {
  cy.getByTestId('version-selection').contains(buttonName).click();
  cy.location('pathname').should('contain', `${location}/play`);
  cy.getByTestId('information-modal').getByTestId('continue-button').click();
};

const testStatsNavigation = () => {
  cy.getByTestId('stats-link').click();
  cy.location('pathname').should('contain', 'stats');
  cy.go('back');
};

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('to recoil works', () => {
    testInitialNavigation('Recoil', 'recoil')
    testStatsNavigation();
    cy.go('back');
    cy.location('pathname').should('not.contain', 'recoil');
  });

  it('to redux works', () => {
    testInitialNavigation('Redux', 'redux')
    testStatsNavigation();
    cy.go('back');
    cy.location('pathname').should('not.contain', 'redux');
  });

  it('to context-api works', () => {
    testInitialNavigation('Context API', 'context')
    testStatsNavigation();
    cy.go('back');
    cy.location('pathname').should('not.contain', 'context');
  });

  it('changing locale works', () => {
    cy.getByTestId('fi-locale-button').click();
    cy.get('h1').should('contain', 'Tervetuloa');
    cy.getByTestId('en-locale-button').click();
    cy.get('h1').should('contain', 'Welcome');
  });
});

export {};
