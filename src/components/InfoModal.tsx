import {useTranslation} from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type InfoModalProps = {
  body: string;
  show: boolean;
  onClose: () => void;
};

export const InfoModal = ({body, show, onClose}: InfoModalProps) => {
  const {t} = useTranslation();
  return (
    <div aria-live="polite" aria-atomic="true">
      <Modal show={show} data-test="info-modal">
        <Modal.Header
          className="tektur"
          closeButton
          data-test="info-modal-header"
        >
          {t('general.information')}
        </Modal.Header>
        <Modal.Body data-test="info-modal-body">{body}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => onClose()}
            data-test="info-modal-continue-button"
          >
            {t('general.continue')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
