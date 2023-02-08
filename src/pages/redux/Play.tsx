import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {GameBoard} from '@/components/redux/GameBoard';
import {InfoModal} from '@/components/InfoModal';
import {incrementLost} from '@/redux-store/statsSlice';
import {createNewGame} from '@/redux-store/gameSlice';
import {setInstructionShown} from '@/redux-store/settingsSlice';
import {useDispatch, useSelector} from '@/hooks/reduxHooks';
import { ConfirmationModal } from '@/components/ConfirmationModal';

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

    dispatch(
      createNewGame({
        hardMode: newGameHardMode.current,
        started: Date.now(),
      })
    );
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
        onCloseModal={handleCloseModal}
      >
        {t('play.infoModal')}
      </InfoModal>
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
