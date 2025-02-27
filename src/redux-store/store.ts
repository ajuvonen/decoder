import {configureStore} from '@reduxjs/toolkit';
import {omit} from 'ramda';
import deepEqual from 'deep-equal';
import watch from 'redux-watch';
import {gameReducer} from './gameSlice';
import {statsReducer} from './statsSlice';
import {settingsReducer} from './settingsSlice';
import {saveLocalStorage} from '@/utils/localStorageUtils';

export const getNewStore = () => {
  const newStore = configureStore({
    reducer: {
      currentGame: gameReducer,
      stats: statsReducer,
      settings: settingsReducer,
    },
  });

  newStore.subscribe(
    watch(
      newStore.getState,
      'currentGame',
      deepEqual
    )((newValue) => saveLocalStorage('DECODER_CURRENT_GAME', newValue))
  );

  newStore.subscribe(
    watch(
      newStore.getState,
      'stats',
      deepEqual
    )((newValue) => saveLocalStorage('DECODER_STATS', newValue))
  );

  // Omit Redux-only settings
  newStore.subscribe(
    watch(
      newStore.getState,
      'settings',
      deepEqual
    )((newValue) =>
      saveLocalStorage('DECODER_SETTINGS', omit(['refreshRequired'], newValue))
    )
  );

  return newStore;
};

export const store = getNewStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
