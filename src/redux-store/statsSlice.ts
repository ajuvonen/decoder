import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadLocalStorage } from '@/utils/reduxUtils';

type Stats = {
  won: number;
  lost: number;
  fastest: number;
};

const initialState = loadLocalStorage<Stats>('STATS', {
  won: 0,
  lost: 0,
  fastest: 0,
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementWon: (state, {payload}: PayloadAction<number>) => {
      state.won = state.won + 1;
      state.fastest = state.fastest && state.fastest > payload ? payload: state.fastest;
    },
    incrementLost: (state) => {
      state.lost = state.lost + 1;
    },
  },
});

export const { incrementLost, incrementWon } = statsSlice.actions;

export const statsReducer = statsSlice.reducer;
