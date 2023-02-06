import {atom} from 'recoil';
import {Game} from '@/types';
import {localStorageEffect} from '@/utils/recoilUtils';

type Stats = {
  won: number;
  lost: number;
  fastest: number;
  fastestHardmode: number;
};

type Settings = {
  instructionShown: boolean;
};

// Atom for current game
export const currentGameState = atom<Game>({
  key: 'currentGame',
  default: {
    active: false,
    hardMode: false,
    combination: [],
    guesses: [],
    maxGuesses: 0,
    started: 0,
  },
  effects: [localStorageEffect('CURRENT_GAME')],
});

// Atom for game stats
export const statsState = atom<Stats>({
  key: 'stats',
  default: {
    won: 0,
    lost: 0,
    fastest: 0,
    fastestHardmode: 0,
  },
  effects: [localStorageEffect('STATS')],
});

// Atom for game settings
export const settingsState = atom<Settings>({
  key: 'settings',
  default: {
    instructionShown: false,
  },
  effects: [localStorageEffect('SETTINGS')],
});
