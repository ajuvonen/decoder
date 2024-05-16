import React, {createContext, ReactNode, useContext} from 'react';
import {useLocalStorage} from '@/hooks/localStorage';
import {Game, Settings, Stats} from '@/types';
import {createGame} from '@/utils/gameUtils';

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

const GameContext = createContext({} as GameContext);

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({children}: GameContextProps) => {
  const [currentGame, setCurrentGame] = useLocalStorage<Game>('DECODER_CURRENT_GAME', {
    ...createGame(false, Date.now()),
    active: false,
  });

  const [stats, setStats] = useLocalStorage<Stats>('DECODER_STATS', {
    won: 0,
    lost: 0,
    fastest: 0,
    fastestHardMode: 0,
  });

  const [settings, setSettings] = useLocalStorage<Settings>('DECODER_SETTINGS', {
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
