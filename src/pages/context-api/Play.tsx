import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '@/context/GameContext';
import { createGame } from '@/utils/gameUtils';
import { GameBoard } from '@/components/context-api/GameBoard';
import { InfoModal } from '@/components/InfoModal';

export default function Play() {
  const { currentGame, setCurrentGame, setStats, settings, setSettings } =
    useGameContext();
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const newGameHardMode = useRef(false);
  const { t } = useTranslation();

  const handleCreateGame = () => {
    setShowNewGameModal(false);
    if (currentGame.active) {
      setStats((current) => ({
        ...current,
        lost: current.lost + 1,
      }));
    }

    setCurrentGame(createGame(newGameHardMode.current, Date.now()));
  };

  const confirmCreateGame = (hardMode: boolean) => {
    newGameHardMode.current = hardMode;
    if (currentGame.active) {
      setShowNewGameModal(true);
    } else {
      handleCreateGame();
    }
  };

  return (
    <>
      <h1 className="mt-5">{t('play.title')}</h1>
      <DropdownButton className="mt-3" title={t('play.createGame')}>
        <Dropdown.Item onClick={() => confirmCreateGame(false)}>
          {t('play.easyMode')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => confirmCreateGame(true)}>
          {t('play.difficultMode')}
        </Dropdown.Item>
      </DropdownButton>
      <InfoModal
        show={!settings.instructionShown}
        onCloseModal={() =>
          setSettings((currentSettings) => ({
            ...currentSettings,
            instructionShown: true,
          }))
        }
      >
        {t('play.infoModal')}
      </InfoModal>
      <GameBoard />
      <Modal show={showNewGameModal}>
        <Modal.Header>{t('play.newGameConfirmationTitle')}</Modal.Header>
        <Modal.Body>{t('play.newGameConfirmationContent')}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowNewGameModal(false)}
          >
            {t('general.cancel')}
          </Button>
          <Button variant="danger" onClick={() => handleCreateGame()}>
            {t('general.continue')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
