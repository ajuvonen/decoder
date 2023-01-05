import styled, { keyframes } from 'styled-components';
import { Guess } from '@/types';

type GuessResultProps = {
  guess: Guess,
  maxGuesses: number,
};

type ResultBlockProps = {
  round: number;
  maxGuesses: number;
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
  border: 1px solid #222;
  border-radius: 6px;
  margin-top: 1rem;

  :before {
    position: absolute;
    content: '';
    border: 0.5px solid #222;
    top: 0;
    bottom: 0;
    left: 50%;
  }

  :after {
    content: 'Round ${(props: ResultBlockProps) => props.round + '/' + props.maxGuesses}';
    font-size: 1rem;
    position: absolute;
    top: 0;
    border-bottom: 1px solid #222;
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

export const GuessResult = ({ guess, maxGuesses }: GuessResultProps) => {
  return (
    <ResultBlock round={guess.round} maxGuesses={maxGuesses} className={`${guess.result.correct === 4 ? 'win' : ''}`}>
      <span title="Correct color and slot">{guess.result.correct}</span>
      <span title="Correct color, wrong slot">{guess.result.semiCorrect}</span>
    </ResultBlock>
  );
};
