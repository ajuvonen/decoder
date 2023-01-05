import { Outlet } from 'react-router-dom';
import { GameProvider } from '@/context/GameContext';

export default function Home() {
  return (
    <GameProvider>
      <Outlet/>
    </GameProvider>
  );
};
