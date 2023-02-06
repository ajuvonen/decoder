import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ModalProps = {
  children: ReactNode;
  show: boolean;
  onCloseModal: () => void;
};

export const InfoModal = ({children, show, onCloseModal}: ModalProps) => {
  const {t} = useTranslation();
  return (
    <div aria-live="polite" aria-atomic="true">
      <Modal show={show}>
        <Modal.Header closeButton>Information</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => onCloseModal()}>
            {t('general.continue')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
