import {ConfirmationModal} from '@/components/ConfirmationModal';

describe('<ConfirmationModal />', () => {
  it('renders', () => {
    cy.mount(
      <ConfirmationModal
        show
        header="Are you sure?"
        body="This is dangerous"
        onClose={() => false}
        onContinue={() => false}
      />
    )
      .getByTestId('confirmation-modal').should('be.visible')
      .getByTestId('confirmation-modal-header').should('have.text', 'Are you sure?')
      .getByTestId('confirmation-modal-body').should('have.text', 'This is dangerous')
      .getByTestId('confirmation-modal-cancel-button').should('be.visible')
      .getByTestId('confirmation-modal-continue-button').should('be.visible');
  });

  it('hides from view', () => {
    cy.mount(
      <ConfirmationModal
        show={false}
        header="Are you sure?"
        body="This is dangerous"
        onClose={() => false}
        onContinue={() => false}
      />
    )
      .getByTestId('confirmation-modal').should('not.exist');
  });

  it('calls handlers on button click', () => {
    const onClose = cy.spy().as('onCloseSpy');
    const onContinue = cy.spy().as('onContinueSpy');
    cy.mount(
      <ConfirmationModal
        show
        header="Are you sure?"
        body="This is dangerous"
        onClose={onClose}
        onContinue={onContinue}
      />
    )
      .getByTestId('confirmation-modal-cancel-button').click()
      .get('@onCloseSpy').should('have.been.calledOnce')
      .get('@onContinueSpy').should('not.have.been.called')
      .getByTestId('confirmation-modal-continue-button').click()
      .get('@onCloseSpy').should('have.been.calledOnce')
      .get('@onContinueSpy').should('have.been.calledOnce');
  });
});
