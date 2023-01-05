import { useRef, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GameBoard } from '@/components/redux/GameBoard';
import { InfoModal } from '@/components/InfoModal';
import { incrementLost } from '@/redux-store/statsSlice';
import { createNewGame } from '@/redux-store/gameSlice';
import { setInstructionShown } from '@/redux-store/settingsSlice';
import { useDispatch, useSelector } from '@/hooks/reduxHooks';

export default function Play() {
  const currentGame = useSelector((state) => state.currentGame);
  const settings = useSelector((state) => state.settings);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const dispatch = useDispatch();
  const newGameHardMode = useRef(false);

  const handleCreateGame = () => {
    setShowNewGameModal(false);
    if (currentGame.active) {
      dispatch(incrementLost());
    }

    dispatch(createNewGame({
      hardMode: newGameHardMode.current,
      started: Date.now(),
    }));
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
      <h1 className="mt-5">Become a Mastermind</h1>
      <DropdownButton className="mt-3" title="Create Game">
        <Dropdown.Item onClick={() => confirmCreateGame(false)}>
          Easy (five colors)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => confirmCreateGame(true)}>
          Difficult (seven colors)
        </Dropdown.Item>
      </DropdownButton>
      <InfoModal
        show={!settings.instructionShown}
        onCloseModal={() => dispatch(setInstructionShown())}
      >
        Welcome to Mastermind! To begin, choose the difficulty with the "Create Game" dropdown.
        Your difficulty setting will affect the number of tries you have.
      </InfoModal>
      <GameBoard />
      <Modal show={showNewGameModal}>
        <Modal.Header>Are you sure?</Modal.Header>
        <Modal.Body>
          Creating a new game will end the current one. This will count as a
          loss in your stats.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowNewGameModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleCreateGame()}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
