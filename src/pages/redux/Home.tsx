import {Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '@/redux-store/store';
import {LocalStorageSync} from '@/components/redux/LocalStorageSync';

export default function Home() {
  return (
    <Provider store={store}>
      <LocalStorageSync>
        <Outlet />
      </LocalStorageSync>
    </Provider>
  );
}
