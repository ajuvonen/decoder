import {addGuess, setCurrentGame, setInactive} from '@/redux-store/gameSlice';
import {getNewStore, store} from '@/redux-store/store';
import {createGame} from '@/utils/gameUtils';
import {Color} from '@/types';

const initialState = {
  currentGame: {
    active: false,
    guesses: [],
    hardMode: false,
    maxGuesses: 10,
  },
  stats: {
    won: 0,
    lost: 0,
    fastest: 0,
    fastestHardmode: 0,
  },
  settings: {
    instructionShown: false,
    refreshRequired: false,
  },
};

let testStore: typeof store;
describe('Redux', () => {
  beforeEach(() => {
    testStore = getNewStore(true);
    chai.config.truncateThreshold = 0;
  });

  it('initializes store', () => {
    cy.wrap(testStore.getState()).should('eql', {
      ...initialState,
      currentGame: {
        ...initialState.currentGame,
        combination: testStore.getState().currentGame.combination,
        started: testStore.getState().currentGame.started,
      },
    });
  });

  it('sets current game', () => {
    const newGame = createGame(true, Date.now());
    testStore.dispatch(setCurrentGame(newGame));
    cy.wrap(testStore.getState()).should('eql', {
      ...initialState,
      currentGame: {
        ...initialState.currentGame,
        active: true,
        combination: newGame.combination,
        hardMode: true,
        maxGuesses: 12,
        started: newGame.started,
      },
    });
  });

  it('adds a guess', () => {
    const guess = {
      combination: [Color.Black, Color.Red, Color.Green, Color.Orange],
      result: {
        correct: 1,
        semiCorrect: 3,
      },
    };
    testStore.dispatch(addGuess(guess));
    cy.wrap(testStore.getState().currentGame.guesses).should('eql', [
      {round: 1, ...guess},
    ]);
  });

  it('sets game to inactive state', () => {
    testStore.dispatch(setCurrentGame(createGame(false, Date.now())));
    testStore.dispatch(setInactive());
    cy.wrap(testStore.getState().currentGame.active).should('eq', false);
  });
});
