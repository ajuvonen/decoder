import {useEffect, useState, FC} from 'react';
import {useTranslation} from 'react-i18next';
import {incrementLost, incrementWon} from '@/redux-store/statsSlice';
import {setInactive} from '@/redux-store/gameSlice';
import {useDispatch, useSelector} from '@/hooks/reduxHooks';
import {getColor, getGameStatus} from '@/utils/gameUtils';
import {InfoModal} from '@/components/InfoModal';
import {GuessRow} from './GuessRow';

export const GameBoard: FC = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.currentGame);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (currentGame.active) {
      const [won, lost] = getGameStatus(
        currentGame.guesses,
        currentGame.maxGuesses
      );
      if (won) {
        dispatch(incrementWon({startTime: currentGame.started, hardMode: currentGame.hardMode}));
        setModalMsg(t('gameBoard.congratulations'));
      } else if (lost) {
        dispatch(incrementLost());
        const combinationText = currentGame.combination
          .map(getColor)
          .join(', ');
        setModalMsg(t('gameBoard.gameOver', {combinationText}));
      }

      if (won || lost) {
        dispatch(setInactive());
      }
    }
  }, [
    currentGame.active,
    currentGame.started,
    currentGame.hardMode,
    currentGame.combination,
    currentGame.guesses,
    currentGame.maxGuesses,
    dispatch,
    t,
  ]);

  useEffect(() => {
    if (modalMsg) {
      setShowModal(true);
    }
  }, [modalMsg]);

  return (
    <div className="mt-4 mb-5 w-100">
      {currentGame.active && <GuessRow data-test="active-guess-row" />}
      {currentGame.guesses.map((guess, index) => (
        <GuessRow
          key={guess.round}
          guess={guess}
          disabled
          data-test={`guess-row-${index}`}
        />
      ))}
      <InfoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        body={modalMsg}
      />
    </div>
  );
};
