import {Color} from '@/types';
import {
  createGame,
  getColor,
  getFastestTime,
  getResult,
} from '@/utils/gameUtils';

describe('gameUtils/createGame', () => {
  before(() => {
    chai.config.truncateThreshold = 0;
  });

  it('creates a game with easy mode', () => {
    const now = Date.now();
    const game = createGame(false, now);
    expect(game.combination.length).to.equal(4);
    cy.wrap(game).should('eql', {
      active: true,
      hardMode: false,
      combination: game.combination,
      guesses: [],
      maxGuesses: 10,
      started: now,
    });
  });

  it('creates a game with hard mode', () => {
    const now = Date.now();
    const game = createGame(true, now);
    expect(game.combination.length).to.equal(4);
    cy.wrap(game).should('eql', {
      active: true,
      hardMode: true,
      combination: game.combination,
      guesses: [],
      maxGuesses: 12,
      started: now,
    });
  });
});

describe('gameUtils/getColor', () => {
  Object.entries(Color).forEach(([key, value]) => {
    it(`works with ${key}`, () => {
      cy.wrap(getColor(value)).should('eq', key);
    });
  });
});

describe('gameUtils/getFastestTime', () => {
  [
    {value: 0, expect: '0m 0s'},
    {value: 1, expect: '0m 1s'},
    {value: 59, expect: '0m 59s'},
    {value: 60, expect: '1m 0s'},
    {value: 61, expect: '1m 1s'},
    {value: 97, expect: '1m 37s'},
  ].forEach(({value, expect}) => {
    it(`works with ${value}`, () => {
      cy.wrap(getFastestTime(value)).should('eq', expect);
    });
  });
});

describe('gameUtils/getResult', () => {
  it('all incorrect', () => {
    const combination = [Color.Red, Color.Red, Color.Red, Color.Red];
    const guess = [Color.Black, Color.Black, Color.Black, Color.Black];
    cy.wrap(getResult(combination, guess)).should('eql', {
      correct: 0,
      semiCorrect: 0,
    });
  });

  it('all correct', () => {
    const combination = [Color.Red, Color.Red, Color.Red, Color.Red];
    cy.wrap(getResult(combination, combination)).should('eql', {
      correct: 4,
      semiCorrect: 0,
    });
  });

  it('two correct, two incorrect', () => {
    const combination = [Color.Red, Color.Red, Color.Yellow, Color.Green];
    const guess = [Color.Red, Color.Red, Color.Green, Color.Yellow];
    cy.wrap(getResult(combination, guess)).should('eql', {
      correct: 2,
      semiCorrect: 2,
    });
  });

  it('should not mark semicorrect when that color is guessed correct', () => {
    const combination = [Color.Red, Color.Red, Color.Yellow, Color.Yellow];
    const guess = [Color.Red, Color.Red, Color.Red, Color.Red];
    cy.wrap(getResult(combination, guess)).should('eql', {
      correct: 2,
      semiCorrect: 0,
    });
  });

  it('should mark semicorrect when there is incorrect and correct guess for that color', () => {
    const combination = [Color.Red, Color.Red, Color.Yellow, Color.Yellow];
    const guess = [Color.Red, Color.Blue, Color.Red, Color.Red];
    cy.wrap(getResult(combination, guess)).should('eql', {
      correct: 1,
      semiCorrect: 2,
    });
  });
});
