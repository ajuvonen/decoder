import {Color, Game, Guess, Result} from '@/types';
import i18next from '@/i18n';

/**
 * Format fastest time to a string of minutes and seconds
 * @param {number} totalSeconds Time in seconds
 * @returns {string} [minutes]m [seconds]s
 */
export const formatFastestTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds - minutes * 60;
  return `${minutes}m ${remainder}s`;
};

/**
 * Get localized color name
 * @param {Color} color Value to look up and translate
 * @returns {string} Localized value
 */
export const getColor = (color: Color) => {
  const colorName = Object.keys(Color)[Object.values(Color).indexOf(color)];
  return i18next.t(`general.colors.${colorName}`);
};

/**
 * Create a new game
 * @param {boolean} hardMode Set to true to create a harder version of the game
 * @param {number} started Date.getTime() when the game started
 * @returns {Game} New game with default properties
 */
export const createGame = (hardMode: boolean, started: number): Game => {
  const colorsArrayLimit = hardMode ? 6 : 4;
  const combination = Array.from(Array(4)).map(() => {
    return Object.values(Color)[
      Math.floor(Math.random() * (colorsArrayLimit + 1))
    ];
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
 * @param {Color[]} secretCombination Secret combination
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

/**
 * Get the game status
 * @param guesses {Guess[]} Current guesses
 * @param maxGuesses {number} Max guesses in this game
 * @returns {[boolean, boolean]} [won, lost]
 */
export const getGameStatus = (
  guesses: Guess[],
  maxGuesses: number
): [boolean, boolean] => {
  const won = guesses.some(({result}) => result.correct === 4);
  const lost = guesses.length === maxGuesses;
  return [won, lost];
};

/**
 * Get fastest time, either current record or clear time
 * @param currentRecord {number} Current record in seconds
 * @param startTime  {number} Current game start time in milliseconds
 * @returns {number} Faster of the two, or clear time in case current record was 0
 */
export const getFastestTime = (currentRecord: number, startTime: number) => {
  const clearTime = Math.ceil((Date.now() - startTime) / 1000);
  return currentRecord ? Math.min(currentRecord, clearTime) : clearTime;
};
