import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Color, Game} from '@/types';
import {getResult} from '@/utils/gameUtils';
import {createGame} from '@/utils/gameUtils';
import {loadLocalStorage} from '@/utils/localStorageUtils';

type NewGameSettings = {
  hardMode: boolean;
  started: number;
};

const initialState = loadLocalStorage<Game>('CURRENT_GAME', {
  active: false,
  hardMode: false,
  combination: [],
  guesses: [],
  maxGuesses: 0,
  started: 0,
});

const gameSlice = createSlice({
  name: 'currentGame',
  initialState,
  reducers: {
    createNewGame: (state, {payload}: PayloadAction<NewGameSettings>) =>
      createGame(payload.hardMode, payload.started),
    addGuess: (state, {payload}: PayloadAction<Color[]>) => {
      state.guesses.unshift({
        round: state.guesses.length + 1,
        combination: payload,
        result: getResult(state.combination, payload),
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
