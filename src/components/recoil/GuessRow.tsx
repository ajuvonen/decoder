import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Color, Guess } from '@/types';
import { currentGameState } from '@/recoil-store';
import { GuessResult } from '@/components/GuessResult';
import { getResult } from '@/utils/gameUtils';
import { DraggableList } from '@/components/DraggableList';
import { ColorButton } from './ColorButton';

type GuessRowProps = {
  guess: Guess;
  disabled: boolean;
};

const defaultProps: GuessRowProps = {
  guess: {} as Guess,
  disabled: false,
};

const GuessRow = ({ guess, disabled }: GuessRowProps) => {
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
  const [activeGuess, setActiveGuess] = useState<Color[]>(
    disabled ? guess.combination : new Array(4).fill(null)
  );

  const handleGuess = () => {
    setCurrentGame((current) => {
      return {
        ...current,
        guesses: [
          {
            round: currentGame.guesses.length + 1,
            combination: activeGuess,
            result: getResult(currentGame.combination, activeGuess),
          },
          ...current.guesses,
        ],
      };
    });
  };

  return (
    <Stack direction="horizontal" className="justify-content-center" gap={3}>
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
          disabled={activeGuess.some((color) => color === null)}
          variant="outline-primary"
          style={{
            width: '150px',
            height: '150px',
            fontSize: '1.5rem',
            marginTop: '1rem',
          }}
          onClick={() => handleGuess()}
        >
          Check
        </Button>
      )}
    </Stack>
  );
};

GuessRow.defaultProps = defaultProps;

export { GuessRow };
