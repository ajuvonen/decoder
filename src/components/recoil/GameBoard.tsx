import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {Color} from '@/types';
import {currentGameState, statsState} from '@/recoil-store';
import {GuessRow} from './GuessRow';
import {InfoModal} from '@/components/InfoModal';

export const GameBoard = () => {
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
  const setStats = useSetRecoilState(statsState);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (currentGame.active) {
      const won = currentGame.guesses.some(({result}) => result.correct === 4);
      const lost = currentGame.guesses.length === currentGame.maxGuesses;
      if (won) {
        setStats((currentStats) => {
          const clearTime = Math.ceil(
            (Date.now() - currentGame.started) / 1000
          );
          const fastest = currentStats.fastest
            ? Math.min(clearTime, currentStats.fastest)
            : clearTime;
          const fastestHardmode = currentStats.fastestHardmode
            ? Math.min(clearTime, currentStats.fastestHardmode)
            : clearTime;
          return {
            ...currentStats,
            won: currentStats.won + 1,
            ...(!currentGame.hardMode && {fastest}),
            ...(currentGame.hardMode && {fastestHardmode}),
          };
        });
        setModalMsg(() => t('gameBoard.congratulations'));
      } else if (lost) {
        setStats((currentStats) => ({
          ...currentStats,
          lost: currentStats.lost + 1,
        }));
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
        setCurrentGame((current) => ({
          ...current,
          active: false,
        }));
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
