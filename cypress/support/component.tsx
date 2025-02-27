/* eslint-disable no-global-assign */
/* eslint-disable @typescript-eslint/no-namespace */
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {RecoilRoot} from 'recoil';
import {mount} from 'cypress/react';
import {getNewStore} from '@/redux-store/store';
import {GameProvider} from '@/context/GameContext';
import i18n from '@/i18n';

import '@/css/bootstrap.min.css';

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

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      contextMount: typeof mount;
      recoilMount: typeof mount;
      reduxMount: typeof mount;
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

Cypress.Commands.add('contextMount', (component, options) => {
  i18n.changeLanguage('en');
  return mount(
    <GameProvider>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </GameProvider>,
    options
  );
});

Cypress.Commands.add('recoilMount', (component, options) => {
  i18n.changeLanguage('en');
  return mount(
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </RecoilRoot>,
    options
  );
});

Cypress.Commands.add('reduxMount', (component, options) => {
  i18n.changeLanguage('en');
  const store = getNewStore();
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </Provider>,
    options
  );
});
