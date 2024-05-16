import {atom} from 'recoil';
import {Game, Stats, Settings} from '@/types';
import {localStorageEffect} from '@/utils/recoilUtils';
import {createGame} from '@/utils/gameUtils';

// Atom for current game
export const currentGameState = atom<Game>({
  key: 'currentGame',
  default: {
    ...createGame(false, Date.now()),
    active: false,
  },
  effects: [localStorageEffect('DECODER_CURRENT_GAME')],
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
  effects: [localStorageEffect('DECODER_STATS')],
});

// Atom for game settings
export const settingsState = atom<Settings>({
  key: 'settings',
  default: {
    instructionShown: false,
  },
  effects: [localStorageEffect('DECODER_SETTINGS')],
});
