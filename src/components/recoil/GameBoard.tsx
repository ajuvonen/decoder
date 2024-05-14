import {useEffect, useState, FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {currentGameState} from '@/recoil-store';
import {GuessRow} from './GuessRow';
import {InfoModal} from '@/components/InfoModal';
import {getColor} from '@/utils/gameUtils';

export const GameBoard: FC = () => {
  const [currentGame] = useRecoilState(currentGameState);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    const won = currentGame.guesses.some(({result}) => result.correct === 4);
    const lost = currentGame.guesses.length === currentGame.maxGuesses;
    if (won) {
      setModalMsg(t('gameBoard.congratulations'));
    } else if (lost) {
      const combinationText = currentGame.combination.map(getColor).join(', ');
      setModalMsg(t('gameBoard.gameOver', {combinationText}));
    }
  }, [currentGame.combination, currentGame.guesses, currentGame.maxGuesses, t]);

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
