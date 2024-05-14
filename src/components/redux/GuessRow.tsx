import {useState, FC} from 'react';
import {useTranslation} from 'react-i18next';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {Color, Guess, GuessRowProps} from '@/types';
import {GuessResult} from '@/components/GuessResult';
import {addGuess, setInactive} from '@/redux-store/gameSlice';
import {useDispatch, useSelector} from '@/hooks/reduxHooks';
import {DraggableList} from '@/components/DraggableList';
import {ColorButton} from './ColorButton';
import {getResult} from '@/utils/gameUtils';
import {incrementLost, incrementWon} from '@/redux-store/statsSlice';

const defaultGuess = {} as Guess;

const GuessRow: FC<GuessRowProps> = ({guess = defaultGuess, disabled = false, ...rest}) => {
  const currentGame = useSelector((state) => state.currentGame);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [activeGuess, setActiveGuess] = useState<Color[]>(
    disabled ? guess.combination : new Array(4).fill(null)
  );

  const handleGuess = () => {
    const result = getResult(currentGame.combination, activeGuess);
    const won = result.correct === 4;
    const lost = !won && currentGame.guesses.length === currentGame.maxGuesses - 1;
    dispatch(addGuess({combination: activeGuess, result}));
    if (won) {
      const clearTime = Math.ceil((Date.now() - currentGame.started) / 1000);
      dispatch(incrementWon({clearTime, hardMode: currentGame.hardMode}));
    } else if (lost) {
      dispatch(incrementLost());
    }

    if (won || lost) {
      dispatch(setInactive());
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
