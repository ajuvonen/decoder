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

export const ConfirmationModal = ({
  show,
  header,
  body,
  onClose,
  onContinue,
}: ConfirmationModalProps) => {
  const {t} = useTranslation();

  return (
    <Modal show={show}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
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
  );
};
