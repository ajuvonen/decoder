import {ReactNode, useEffect, FC} from 'react';
import {setRefreshRequired} from '@/redux-store/settingsSlice';
import {setCurrentGame} from '@/redux-store/gameSlice';
import {setStats} from '@/redux-store/statsSlice';
import {useDispatch, useSelector} from '@/hooks/reduxHooks';
import {loadLocalStorage} from '@/utils/localStorageUtils';
import {Game, Stats} from '@/types';

type LocalStorageSyncProps = {
  children: ReactNode;
};

export const LocalStorageSync: FC<LocalStorageSyncProps> = ({children}) => {
  const refreshRequired = useSelector(
    (state) => state.settings.refreshRequired
  );
  const dispatch = useDispatch();

  // If user navigates away from the Redux portion, there's a risk local storage features changes not included in the store
  // This is why a manual refresh must be done upon return
  useEffect(() => {
    if (refreshRequired) {
      const localStorageGame = loadLocalStorage<Game>(
        'CURRENT_GAME',
        {} as Game
      );
      const localStorageStats = loadLocalStorage<Stats>('STATS', {} as Stats);
      dispatch(setCurrentGame(localStorageGame));
      dispatch(setStats(localStorageStats));
    }
    return () => {
      dispatch(setRefreshRequired(true));
    };
  }, [dispatch, refreshRequired]);

  return <>{children}</>;
};
