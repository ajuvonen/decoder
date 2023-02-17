import {LanguageSelector} from '@/components/LanguageSelector';

describe('<LanguageSelector />', () => {
  it('renders locale buttons', () => {
    cy.mount(<LanguageSelector/>)
      .getByTestId('language-selector')
      .find('> a')
      .should('have.length', 2)
      .getByTestId('en-locale-button')
      .should('be.visible')
      .getByTestId('fi-locale-button')
      .should('be.visible');
  });

  it('changes HTML lang on click', () => {
    cy.mount(<LanguageSelector/>)
      .getByTestId('en-locale-button').click()
      .get('html').invoke('attr', 'lang')
      .should('eq', 'en')
      .getByTestId('fi-locale-button').click()
      .get('html').invoke('attr', 'lang')
      .should('eq', 'fi');
  });
});
