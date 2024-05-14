export type Guess = {
  combination: Color[];
  round: number;
  result: Result;
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
  color: Color;
  disabled: boolean;
  onChangeColor: (color: Color) => void;
};

export type GuessRowProps = {
  guess?: Guess;
  disabled?: boolean;
};

export type Stats = {
  won: number;
  lost: number;
  fastest: number;
  fastestHardMode: number;
};

export type Settings = {
  instructionShown: boolean;
};

export type ReduxSettings = {
  refreshRequired: boolean;
} & Settings;

export enum Color {
  Red = '#EE4035',
  Orange = '#F37021',
  Yellow = '#FCB711',
  Green = '#7BC043',
  Blue = '#0089D0',
  Black = '#2C3E50',
  Purple = '#6460AA',
}
