import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Color, Game, Result} from '@/types';
import {createGame} from '@/utils/gameUtils';
import {loadLocalStorage} from '@/utils/localStorageUtils';

type NewGamePayload = {
  hardMode: boolean;
  started: number;
};

type GuessPayload = {
  combination: Color[];
  result: Result;
};

const initialState = loadLocalStorage<Game>('CURRENT_GAME', {
  ...createGame(false, Date.now()),
  active: false,
});

const gameSlice = createSlice({
  name: 'currentGame',
  initialState,
  reducers: {
    createNewGame: (state, {payload}: PayloadAction<NewGamePayload>) =>
      createGame(payload.hardMode, payload.started),
    addGuess: (state, {payload: {combination, result}}: PayloadAction<GuessPayload>) => {
      state.guesses.unshift({
        round: state.guesses.length + 1,
        combination,
        result,
      });
    },
    setInactive: (state) => {
      state.active = false;
    },
    refreshGameState: (state, {payload}: PayloadAction<Game>) => {
      return payload;
    },
  },
});

export const {addGuess, setInactive, createNewGame, refreshGameState} =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;
