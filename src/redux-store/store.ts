import {configureStore} from '@reduxjs/toolkit';
import {omit} from 'ramda';
import deepEqual from 'deep-equal';
import watch from 'redux-watch';
import {gameReducer} from './gameSlice';
import {statsReducer} from './statsSlice';
import {settingsReducer} from './settingsSlice';
import {saveLocalStorage} from '@/utils/localStorageUtils';

export const store = configureStore({
  reducer: {
    currentGame: gameReducer,
    stats: statsReducer,
    settings: settingsReducer,
  },
});

store.subscribe(
  watch(
    store.getState,
    'currentGame',
    deepEqual
  )((newValue) => saveLocalStorage('CURRENT_GAME', newValue))
);

store.subscribe(
  watch(
    store.getState,
    'stats',
    deepEqual
  )((newValue) => saveLocalStorage('STATS', newValue))
);

// Omit Redux-only settings
store.subscribe(
  watch(
    store.getState,
    'settings',
    deepEqual
  )((newValue) =>
    saveLocalStorage('SETTINGS', omit(['refreshRequired'], newValue))
  )
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
