import { ReactNode, useEffect } from 'react';
import { setRefreshRequired } from '@/redux-store/settingsSlice';
import { refreshGameState } from '@/redux-store/gameSlice';
import { refreshStatsState } from '@/redux-store/statsSlice';
import { useDispatch, useSelector } from '@/hooks/reduxHooks';
import { loadLocalStorage } from '@/utils/localStorageUtils';
import { Game, Stats } from '@/types';

type LocalStorageSyncProps = {
  children: ReactNode;
};

export const LocalStorageSync = ({ children }: LocalStorageSyncProps) => {
  const refreshRequired = useSelector((state) => state.settings.refreshRequired);
  const dispatch = useDispatch();
  
  // If user navigates away from the Redux portion, there's a risk local storage features changes not included in the store
  // This is why a manual refresh must be done upon return
  useEffect(() => {
    if (refreshRequired) {
      const localStorageGame = loadLocalStorage<Game>('CURRENT_GAME', {} as Game)
      const localStorageStats = loadLocalStorage<Stats>('STATS', {} as Stats)
      dispatch(refreshGameState(localStorageGame));
      dispatch(refreshStatsState(localStorageStats));
      dispatch(setRefreshRequired(false));
    }
    return () => {
      dispatch(setRefreshRequired(true));
    };
  }, []);

  return <>{children}</>;
};
