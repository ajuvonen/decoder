import {Outlet} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

export default function Home() {
  return (
    <RecoilRoot>
      <Outlet />
    </RecoilRoot>
  );
}
