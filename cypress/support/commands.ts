/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
