export type Guess = {
  combination: Color[];
  round: number;
  result: Result,
};

export type Game = {
  active: boolean;
  hardMode: boolean;
  combination: Color[];
  guesses: Guess[];
  maxGuesses: number;
  started: number;
};

export type Result = {
  correct: number;
  semiCorrect: number;
};

export type ColorButtonProps = {
  color: Color,
  disabled: boolean,
  onChangeColor: (color: Color) => void,
};

export type GuessRowProps = {
  guess: Guess;
  disabled: boolean;
};

export enum Color {
  Red = '#ee4035',
  Orange = '#f37021',
  Yellow = '#fcb711',
  Green = '#7bc043',
  Blue = '#0089d0',
  Black = '#343d46',
  Purple = '#6460aa',
}
