import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadLocalStorage} from '@/utils/localStorageUtils';
import {Stats} from '@/types';
import {getFastestTime} from '@/utils/gameUtils';

type FastestTimePayload = {
  startTime: number;
  hardMode: boolean;
};

const initialState = loadLocalStorage<Stats>('DECODER_STATS', {
  won: 0,
  lost: 0,
  fastest: 0,
  fastestHardMode: 0,
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementWon: (
      state,
      {payload: {hardMode, startTime}}: PayloadAction<FastestTimePayload>
    ) => {
      const record = getFastestTime(
        hardMode ? state.fastestHardMode : state.fastest,
        startTime,
      );
      return {
        ...state,
        won: state.won + 1,
        ...(!hardMode && {fastest: record}),
        ...(hardMode && {fastestHardMode: record}),
      };
    },
    incrementLost: (state) => {
      state.lost = state.lost + 1;
    },
    setStats: (_state, {payload}: PayloadAction<Stats>) => {
      return payload;
    },
    resetStats: () => ({
      won: 0,
      lost: 0,
      fastest: 0,
      fastestHardMode: 0,
    }),
  },
});

export const {incrementLost, incrementWon, setStats, resetStats} =
  statsSlice.actions;

export const statsReducer = statsSlice.reducer;
