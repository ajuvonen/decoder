import { createSlice } from '@reduxjs/toolkit';
import { loadLocalStorage } from '@/utils/reduxUtils';

type Settings = {
  instructionShown: boolean;
};

const initialState = loadLocalStorage<Settings>('SETTINGS', {
  instructionShown: false,
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setInstructionShown: (state) => {
      state.instructionShown = true;
    },
  },
});

export const { setInstructionShown } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
