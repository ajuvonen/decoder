import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Color, Game, Result} from '@/types';
import {createGame} from '@/utils/gameUtils';
import {loadLocalStorage} from '@/utils/localStorageUtils';

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
    setCurrentGame: (state, {payload}: PayloadAction<Game>) => payload,
    addGuess: (
      state,
      {payload: {combination, result}}: PayloadAction<GuessPayload>
    ) => {
      state.guesses.unshift({
        round: state.guesses.length + 1,
        combination,
        result,
      });
    },
    setInactive: (state) => {
      state.active = false;
    },
  },
});

export const {addGuess, setInactive, setCurrentGame} =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;
