import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Color} from '@/types';
import {GuessRow} from './GuessRow';
import {InfoModal} from '@/components/InfoModal';
import {setInactive} from '@/redux-store/gameSlice';
import {incrementWon, incrementLost} from '@/redux-store/statsSlice';
import {useDispatch, useSelector} from '@/hooks/reduxHooks';

export const GameBoard = () => {
  const currentGame = useSelector((state) => state.currentGame);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    if (currentGame.active) {
      const won = currentGame.guesses.some(({result}) => result.correct === 4);
      const lost = currentGame.guesses.length === currentGame.maxGuesses;
      if (won) {
        const clearTime = Math.ceil((Date.now() - currentGame.started) / 1000);
        dispatch(incrementWon({clearTime, hardMode: currentGame.hardMode}));
        setModalMsg(() => t('gameBoard.congratulations'));
      } else if (lost) {
        dispatch(incrementLost());
        const combinationText = currentGame.combination
          .map((color) =>
            t(
              `general.colors.${
                Object.keys(Color)[Object.values(Color).indexOf(color)]
              }`
            )
          )
          .join(', ');
        setModalMsg(() => t('gameBoard.gameOver', {combinationText}));
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
          <GuessRow data-test="active-guess-row" />
        )}
      {currentGame.guesses.map((guess, index) => (
        <GuessRow
          key={guess.round}
          guess={guess}
          disabled
          data-test={`guess-row-${index}`}
        />
      ))}
      <InfoModal show={showModal} onCloseModal={() => setShowModal(false)}>
        {modalMsg}
      </InfoModal>
    </div>
  );
};
