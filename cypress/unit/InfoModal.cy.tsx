import {InfoModal} from '@/components/InfoModal';

describe('<InfoModal />', () => {
  it('renders', () => {
    cy.mount(
      <InfoModal
        show
        body="This is information"
        onClose={() => false}
      />
    )
      .getByTestId('info-modal').should('be.visible')
      .getByTestId('info-modal-header').should('have.text', 'general.information')
      .getByTestId('info-modal-body').should('have.text', 'This is information')
      .getByTestId('info-modal-continue-button').should('have.text', 'general.continue');
  });

  it('hides from view', () => {
    cy.mount(
      <InfoModal
        show={false}
        body="This is information"
        onClose={() => false}
      />
    )
      .getByTestId('info-modal').should('not.exist');
  });

  it('calls handlers on button click', () => {
    const onClose = cy.spy().as('onCloseSpy');
    cy.mount(
      <InfoModal
        show
        body="This is information"
        onClose={onClose}
      />
    )
      .getByTestId('info-modal-continue-button').click()
      .get('@onCloseSpy').should('have.been.calledOnce');
  });
});
