import {
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import {AppDispatch, RootState} from '@/redux-store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = useDispatchRedux.withTypes<AppDispatch>();
export const useSelector = useSelectorRedux.withTypes<RootState>();
