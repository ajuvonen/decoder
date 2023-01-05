import { Color, Game, Result } from '../types';

/**
 * Create a new game
 * @param {boolean}hardMode Set to true to create a harder version of the game
 * @param {number} started Date.now() when the game started
 * @returns {Game} New game with default properties
 */
export const createGame = (hardMode: boolean, started: number): Game => {
  const colorsArrayLimit = hardMode ? 6 : 4;
  const combination = Array.from(Array(4)).map(() => {
    return Object.values(Color)[Math.floor(Math.random() * colorsArrayLimit)];
  });
  return {
    active: true,
    hardMode,
    combination,
    guesses: [],
    maxGuesses: hardMode ? 12 : 10,
    started,
  };
};

/**
 * Compare a guess to a combination and return correct and semi-correct values
 * @param {Color[]} combination Secret combination
 * @param {Color[]} guessCombination Guess to verify
 * @returns {Result} Result from the guess
 */
export const getResult = (
  secretCombination: Color[],
  guessCombination: Color[]
): Result => {
  const correct = guessCombination.filter(
    (color, index) => secretCombination[index] === color
  ).length;
  const semiCorrect = guessCombination.filter((color, index) =>
    secretCombination.some((combinationColor, combinationIndex) => {
      return (
        guessCombination[index] !== secretCombination[index] &&
        combinationIndex !== index &&
        combinationColor === color &&
        guessCombination[combinationIndex] !== color
      );
    })
  ).length;

  return {
    correct,
    semiCorrect,
  };
};
