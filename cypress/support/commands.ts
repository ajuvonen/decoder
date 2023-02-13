/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;}
  }
}

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

export {};
