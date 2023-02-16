/* eslint-disable no-global-assign */
/* eslint-disable @typescript-eslint/no-namespace */

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import {mount} from 'cypress/react18';
import {I18nextProvider} from 'react-i18next';
import i18n from '@/i18n';

import '@/css/bootstrap.min.css';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', (component, options) => {
  i18n.changeLanguage('en');
  return mount(
    <I18nextProvider i18n={i18n}>{component}</I18nextProvider>,
    options
  );
});

process = process || {env: {}};
process.env = process.env || {};

// Example use:
// cy.mount(<MyComponent />)
