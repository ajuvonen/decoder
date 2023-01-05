import React, { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '@/hooks/localStorage';
import { Game } from '@/types';

type GameContextProps = {
  children: ReactNode;
};

type GameContext = {
  currentGame: Game;
  setCurrentGame: React.Dispatch<React.SetStateAction<Game>>;
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

type Stats = {
  won: number;
  lost: number;
  fastest: number;
  fastestHardmode: number;
};

type Settings = {
  instructionShown: boolean;
};

const GameContext = createContext({} as GameContext);

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }: GameContextProps) => {
  const [currentGame, setCurrentGame] = useLocalStorage<Game>('CURRENT_GAME', {
    active: false,
    hardMode: false,
    combination: [],
    guesses: [],
    maxGuesses: 0,
    started: 0,
  });

  const [stats, setStats] = useLocalStorage<Stats>('STATS', {
    won: 0,
    lost: 0,
    fastest: 0,
    fastestHardmode: 0,
  });

  const [settings, setSettings] = useLocalStorage<Settings>('SETTINGS', {
    instructionShown: false,
  });

  const context = {
    currentGame,
    setCurrentGame,
    stats,
    setStats,
    settings,
    setSettings,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
