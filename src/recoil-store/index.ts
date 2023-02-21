import {atom} from 'recoil';
import {Game} from '@/types';
import {localStorageEffect} from '@/utils/recoilUtils';
import {createGame} from '@/utils/gameUtils';

type Stats = {
  won: number;
  lost: number;
  fastest: number;
  fastestHardMode: number;
};

type Settings = {
  instructionShown: boolean;
};

// Atom for current game
export const currentGameState = atom<Game>({
  key: 'currentGame',
  default: {
    ...createGame(false, Date.now()),
    active: false,
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
    fastestHardMode: 0,
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
