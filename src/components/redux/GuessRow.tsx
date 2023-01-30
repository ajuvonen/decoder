import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Color, Guess } from '@/types';
import { GuessResult } from '@/components/GuessResult';
import { addGuess } from '@/redux-store/gameSlice';
import { useDispatch, useSelector } from '@/hooks/reduxHooks';
import { DraggableList } from '@/components/DraggableList';
import { ColorButton } from './ColorButton';

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
  const currentGame = useSelector((state) => state.currentGame);
  const dispatch = useDispatch();
  const [activeGuess, setActiveGuess] = useState<Color[]>(
    disabled ? guess.combination : new Array(4).fill(null)
  );

  return (
    <Stack direction="horizontal" className="justify-content-center" gap={3}>
      <DraggableList list={activeGuess} setList={setActiveGuess} vertical={vertical} disabled={disabled} ButtonComponent={ColorButton}/>
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
          onClick={() => dispatch(addGuess(activeGuess))}
        >
          Check
        </Button>
      )}
    </Stack>
  );
};

GuessRow.defaultProps = defaultProps;

export { GuessRow };
