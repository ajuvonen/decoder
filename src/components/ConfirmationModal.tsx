import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ConfirmationModalProps = {
  show: boolean;
  header: string;
  body: string;
  onClose: () => void;
  onContinue: () => void;
};

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  header,
  body,
  onClose,
  onContinue,
}) => {
  const {t} = useTranslation();

  return (
    <div aria-live="polite" aria-atomic="true">
      <Modal show={show} data-test="confirmation-modal">
        <Modal.Header data-test="confirmation-modal-header">
          {header}
        </Modal.Header>
        <Modal.Body data-test="confirmation-modal-body">{body}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onClose}
            data-test="confirmation-modal-cancel-button"
          >
            {t('general.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={onContinue}
            data-test="confirmation-modal-continue-button"
          >
            {t('general.continue')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
