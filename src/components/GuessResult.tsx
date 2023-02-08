import {useTranslation} from 'react-i18next';
import styled, {keyframes} from 'styled-components';
import {Guess} from '@/types';

type GuessResultProps = {
  guess: Guess;
  maxGuesses: number;
};

type ResultBlockProps = {
  info: string;
};

const rotate = keyframes`
  from {
    transform: rotate(-6deg);
  }

  to {
    transform: rotate(6deg);
  }
`;

const ResultBlock = styled('div')`
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 4rem;
  border: 1px solid #2C3E50;
  border-radius: 6px;
  margin-top: 1rem;

  :before {
    position: absolute;
    content: '';
    border: 0.5px solid #2C3E50;
    top: 0;
    bottom: 0;
    left: 50%;
  }

  :after {
    content: '${(props: ResultBlockProps) => props.info}';
    font-size: 1rem;
    position: absolute;
    top: 0;
    border-bottom: 1px solid #2C3E50;
    width: 100%;
    text-align: center;
    background: white;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &.win {
    animation-name: ${rotate};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  > span:first-child {
    color: green;
  }

  > span:last-child {
    color: orange;
  }
`;

export const GuessResult = ({guess, maxGuesses}: GuessResultProps) => {
  const {t} = useTranslation();
  return (
    <ResultBlock
      info={t('guessResult.info', {round: guess.round, maxGuesses})}
      className={`${guess.result.correct === 4 ? 'win' : ''}`}
    >
      <span title={t('guessResult.correct')}>{guess.result.correct}</span>
      <span title={t('guessResult.semiCorrect')}>
        {guess.result.semiCorrect}
      </span>
    </ResultBlock>
  );
};
