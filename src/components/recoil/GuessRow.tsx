import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {Color, Guess, GuessRowProps} from '@/types';
import {currentGameState, statsState} from '@/recoil-store';
import {GuessResult} from '@/components/GuessResult';
import {getResult} from '@/utils/gameUtils';
import {DraggableList} from '@/components/DraggableList';
import {ColorButton} from './ColorButton';

const defaultGuess = {} as Guess;

const GuessRow = ({guess = defaultGuess, disabled = false, ...rest}: GuessRowProps) => {
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
  const setStats = useSetRecoilState(statsState);
  const {t} = useTranslation();
  const [activeGuess, setActiveGuess] = useState<Color[]>(
    disabled ? guess.combination : new Array(4).fill(null)
  );

  const handleGuess = () => {
    const result = getResult(currentGame.combination, activeGuess);
    const won = result.correct === 4;
    const lost = !won && currentGame.guesses.length === currentGame.maxGuesses - 1;
    setCurrentGame((current) => {
      return {
        ...current,
        guesses: [
          {
            round: current.guesses.length + 1,
            combination: activeGuess,
            result,
          },
          ...current.guesses,
        ],
        active: !(lost || won),
      };
    });
    if (won) {
      const clearTime = Math.ceil((Date.now() - currentGame.started) / 1000);
      setStats((currentStats) => {
        const fastest = currentStats.fastest
          ? Math.min(clearTime, currentStats.fastest)
          : clearTime;
        const fastestHardMode = currentStats.fastestHardMode
          ? Math.min(clearTime, currentStats.fastestHardMode)
          : clearTime;
        return {
          ...currentStats,
          won: currentStats.won + 1,
          ...(!currentGame.hardMode && {fastest}),
          ...(currentGame.hardMode && {fastestHardMode}),
        };
      });
    } else if (lost) {
      setStats((currentStats) => ({
        ...currentStats,
        lost: currentStats.lost + 1,
      }));
    }
  };

  return (
    <Stack
      direction="horizontal"
      className="justify-content-center"
      gap={3}
      {...rest}
    >
      <DraggableList
        list={activeGuess}
        setList={setActiveGuess}
        disabled={disabled}
        ButtonComponent={ColorButton}
      />
      {disabled ? (
        <GuessResult maxGuesses={currentGame.maxGuesses} guess={guess} />
      ) : (
        <Button
          className="tektur"
          disabled={activeGuess.some((color) => color === null)}
          variant="outline-primary"
          style={{
            width: '150px',
            height: '150px',
            fontSize: '1.5rem',
            marginTop: '1rem',
          }}
          onClick={handleGuess}
          data-test="check-button"
        >
          {t('guessRow.check')}
        </Button>
      )}
    </Stack>
  );
};

export {GuessRow};
