import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {GameBoard} from '@/components/redux/GameBoard';
import {InfoModal} from '@/components/InfoModal';
import {incrementLost} from '@/redux-store/statsSlice';
import {setCurrentGame} from '@/redux-store/gameSlice';
import {setInstructionShown} from '@/redux-store/settingsSlice';
import {useDispatch, useSelector} from '@/hooks/reduxHooks';
import {ConfirmationModal} from '@/components/ConfirmationModal';
import {createGame} from '@/utils/gameUtils';

export default function Play() {
  const currentGame = useSelector((state) => state.currentGame);
  const settings = useSelector((state) => state.settings);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const dispatch = useDispatch();
  const newGameHardMode = useRef(false);
  const {t} = useTranslation();

  const handleCreateGame = () => {
    setShowNewGameModal(false);
    if (currentGame.active) {
      dispatch(incrementLost());
    }

    dispatch(setCurrentGame(createGame(newGameHardMode.current, Date.now())));
  };

  const confirmCreateGame = (hardMode: boolean) => {
    newGameHardMode.current = hardMode;
    if (currentGame.active) {
      setShowNewGameModal(true);
    } else {
      handleCreateGame();
    }
  };

  const handleCloseModal = () => dispatch(setInstructionShown());

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
