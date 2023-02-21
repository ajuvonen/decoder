import {Navbar} from '@/components/Navbar';
import {MemoryRouter} from 'react-router-dom';

describe('<Navbar />', () => {
  it('hides links on main page', () => {
    cy.mount(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    ).getByTestId('navbar-links').should('not.exist');
  });

  [
    '/recoil/play',
    '/redux/stats',
    '/context/play'
  ].forEach((path) => {
    it(`shows links on ${path}`, () => {
      cy.mount(
        <MemoryRouter initialEntries={[path]}>
          <Navbar />
        </MemoryRouter>
      ).getByTestId('navbar-links').should('exist');
    });
  });

  it('hides links on small screen', () => {
    cy.viewport(575, 1000).mount(
      <MemoryRouter initialEntries={['/recoil/stats']}>
        <Navbar />
      </MemoryRouter>
    )
      .getByTestId('navbar-links').should('exist').should('not.be.visible')
      .getByTestId('language-selector').should('not.be.visible')
      .getByTestId('navbar-toggler').should('be.visible').click()
      .getByTestId('navbar-links').should('exist').should('be.visible')
      .getByTestId('language-selector').should('be.visible');
  });
});
