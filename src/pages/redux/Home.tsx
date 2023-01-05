import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '@/redux-store/store';

export default function Home() {
  return (
    <Provider store={store}>
      <Outlet/>
    </Provider>
  );
};
