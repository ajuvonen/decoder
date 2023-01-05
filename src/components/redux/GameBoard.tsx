import { useEffect, useState } from 'react';
import { Color } from '@/types';
import { GuessRow } from './GuessRow';
import { InfoModal } from '@/components/InfoModal';
import { useWindowSize } from '@/hooks/windowSize';
import { setInactive } from '@/redux-store/gameSlice';
import { incrementWon, incrementLost } from '@/redux-store/statsSlice';
import { useDispatch, useSelector } from '@/hooks/reduxHooks';

export const GameBoard = () => {
  const currentGame = useSelector((state) => state.currentGame);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const vertical = useWindowSize().width < 1000;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGame.active) {
      const won = currentGame.guesses.some(
        ({ result }) => result.correct === 4
      );
      const lost = currentGame.guesses.length === currentGame.maxGuesses;
      if (won) {
        const clearTime = Math.ceil((Date.now() - currentGame.started) / 1000);
        dispatch(incrementWon(clearTime));
        setModalMsg(
          'Congratulations! You won the game! Start a new game from the dropdown menu.'
        );
      } else if (lost) {
        dispatch(incrementLost());
        const combinationText = currentGame.combination
          .map(
            (color) => Object.keys(Color)[Object.values(Color).indexOf(color)]
          )
          .join(', ');
        setModalMsg(
          `You failed to guess the correct combination, which was: ${combinationText}. Start a new game from the dropdown menu.`
        );
      }

      if (won || lost) {
        dispatch(setInactive());
      }
    }
  }, [currentGame.guesses]);

  useEffect(() => {
    if (modalMsg) {
      setShowModal(true);
    }
  }, [modalMsg]);

  return (
    <div className="mt-4 mb-5 w-100">
      {currentGame.active &&
        currentGame.guesses.length < currentGame.maxGuesses && (
          <GuessRow vertical={vertical}/>
        )}
      <InfoModal show={showModal} onCloseModal={() => setShowModal(false)}>
        {modalMsg}
      </InfoModal>
      {currentGame.guesses.map((guess) => (
        <GuessRow
          key={guess.round}
          guess={guess}
          disabled
          vertical={vertical}
        />
      ))}
    </div>
  );
};
