import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useGameContext } from '@/context/GameContext';
import { ColorButton } from './ColorButton';
import { GuessResult } from '@/components/GuessResult';
import { Color, Guess } from '@/types';
import { getResult } from '@/utils/gameUtils';

type GuessRowProps = {
  guess: Guess;
  disabled: boolean;
  vertical: boolean,
};

const defaultProps: GuessRowProps = {
  guess: {} as Guess,
  disabled: false,
  vertical: false,
};

const GuessRow = ({ guess, disabled, vertical }: GuessRowProps) => {
  const { currentGame, setCurrentGame } = useGameContext();
  const [activeGuess, setActiveGuess] = useState(
    disabled ? guess.combination : new Array(4).fill(null)
  );

  const handleChangeColor = (index: number) => (color: Color) => {
    setActiveGuess((current) => [
      ...current.slice(0, index),
      color,
      ...current.slice(index + 1),
    ]);
  };

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
      <Stack
        direction={vertical ? 'vertical' : 'horizontal'}
        gap={vertical ? 1 : 3}
        className="mt-3 justify-content-center"
      >
        {activeGuess.map((color, index) => (
          <ColorButton
            key={index}
            color={color}
            disabled={disabled}
            onChangeColor={handleChangeColor(index)}
          />
        ))}
      </Stack>
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
