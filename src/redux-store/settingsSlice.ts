import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadLocalStorage} from '@/utils/localStorageUtils';
import {Settings} from '@/types';

type ReduxSettings = {
  refreshRequired: boolean;
} & Settings;

const initialState = loadLocalStorage<ReduxSettings>('SETTINGS', {
  instructionShown: false,
  refreshRequired: false,
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setInstructionShown: (state) => {
      state.instructionShown = true;
    },
    setRefreshRequired: (state, {payload}: PayloadAction<boolean>) => {
      state.refreshRequired = payload;
    },
  },
});

export const {setInstructionShown, setRefreshRequired} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
