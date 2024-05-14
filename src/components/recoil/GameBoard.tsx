import {useEffect, useState, FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {currentGameState, statsState} from '@/recoil-store';
import {GuessRow} from './GuessRow';
import {InfoModal} from '@/components/InfoModal';
import {getColor, getFastestTime, getGameStatus} from '@/utils/gameUtils';

export const GameBoard: FC = () => {
  const setStats = useSetRecoilState(statsState);
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
  const [modalMsg, setModalMsg] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (currentGame.active) {
      const [won, lost] = getGameStatus(
        currentGame.guesses,
        currentGame.maxGuesses
      );
      if (won) {
        setStats((currentStats) => {
          const record = getFastestTime(
            currentGame.hardMode
              ? currentStats.fastestHardMode
              : currentStats.fastest,
            currentGame.started,
          );
          return {
            ...currentStats,
            won: currentStats.won + 1,
            ...(!currentGame.hardMode && {fastest: record}),
            ...(currentGame.hardMode && {fastestHardMode: record}),
          };
        });
        setModalMsg(t('gameBoard.congratulations'));
      } else if (lost) {
        setStats((currentStats) => ({
          ...currentStats,
          lost: currentStats.lost + 1,
        }));
        const combinationText = currentGame.combination
          .map(getColor)
          .join(', ');
        setModalMsg(t('gameBoard.gameOver', {combinationText}));
      }

      if (won || lost) {
        setCurrentGame((current) => ({...current, active: false}));
      }
    }
  }, [
    currentGame.active,
    currentGame.combination,
    currentGame.hardMode,
    currentGame.started,
    currentGame.guesses,
    currentGame.maxGuesses,
    setCurrentGame,
    setStats,
    t,
  ]);

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
        show={!!modalMsg}
        onClose={() => setModalMsg('')}
        body={modalMsg}
      />
    </div>
  );
};
