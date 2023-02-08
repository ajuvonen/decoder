import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadLocalStorage} from '@/utils/localStorageUtils';
import {Stats} from '@/types';

type FastestTimePayload = {
  clearTime: number;
  hardMode: boolean;
};

const initialState = loadLocalStorage<Stats>('STATS', {
  won: 0,
  lost: 0,
  fastest: 0,
  fastestHardmode: 0,
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementWon: (
      state,
      {payload: {hardMode, clearTime}}: PayloadAction<FastestTimePayload>
    ) => {
      const fastest = state.fastest
        ? Math.min(clearTime, state.fastest)
        : clearTime;
      const fastestHardmode = state.fastestHardmode
        ? Math.min(clearTime, state.fastestHardmode)
        : clearTime;
      return {
        ...state,
        won: state.won + 1,
        ...(!hardMode && {fastest}),
        ...(hardMode && {fastestHardmode}),
      };
    },
    incrementLost: (state) => {
      state.lost = state.lost + 1;
    },
    refreshStatsState: (state, {payload}: PayloadAction<Stats>) => {
      return payload;
    },
    resetStats: () => ({
      won: 0,
      lost: 0,
      fastest: 0,
      fastestHardmode: 0,
    }),
  },
});

export const {incrementLost, incrementWon, refreshStatsState, resetStats} =
  statsSlice.actions;

export const statsReducer = statsSlice.reducer;
