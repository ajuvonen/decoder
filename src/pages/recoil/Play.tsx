import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState, useSetRecoilState} from 'recoil';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {createGame} from '@/utils/gameUtils';
import {GameBoard} from '@/components/recoil/GameBoard';
import {InfoModal} from '@/components/InfoModal';
import {settingsState, currentGameState, statsState} from '@/recoil-store';
import {ConfirmationModal} from '@/components/ConfirmationModal';

export default function Play() {
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
  const [settings, setSettings] = useRecoilState(settingsState);
  const setStats = useSetRecoilState(statsState);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const newGameHardMode = useRef(false);
  const {t} = useTranslation();

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

  const handleCloseModal = () => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      instructionShown: true,
    }));
  };

  return (
    <>
      <h1 className="mt-5">{t('play.title')}</h1>
      <DropdownButton
        className="mt-3"
        title={t('play.createGame')}
        data-test="new-game-dropdown"
      >
        <Dropdown.Item
          onClick={() => confirmCreateGame(false)}
          data-test="easy-mode-button"
        >
          {t('play.easyMode')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => confirmCreateGame(true)}
          data-test="difficult-mode-button"
        >
          {t('play.difficultMode')}
        </Dropdown.Item>
      </DropdownButton>
      <InfoModal
        show={!settings.instructionShown}
        onClose={handleCloseModal}
        body={t('play.infoModal')}
      />
      <GameBoard />
      <ConfirmationModal
        show={showNewGameModal}
        header={t('play.newGameConfirmationTitle')}
        body={t('play.newGameConfirmationContent')}
        onClose={() => setShowNewGameModal(false)}
        onContinue={handleCreateGame}
      />
    </>
  );
}
