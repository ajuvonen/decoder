import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';

export const RecoilHome = React.lazy(() => import('./pages/recoil/Home'));
export const RecoilPlay = React.lazy(() => import('./pages/recoil/Play'));
export const RecoilStats = React.lazy(() => import('./pages/recoil/Stats'));
export const ReduxHome = React.lazy(() => import('./pages/redux/Home'));
export const ReduxPlay = React.lazy(() => import('./pages/redux/Play'));
export const ReduxStats = React.lazy(() => import('./pages/redux/Stats'));
export const ContextHome = React.lazy(() => import('./pages/context-api/Home'));
export const ContextPlay = React.lazy(() => import('./pages/context-api/Play'));
export const ContextStats = React.lazy(() => import('./pages/context-api/Stats'));

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container className="d-flex flex-column align-items-center">
        <Suspense fallback="Loading">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="recoil" element={<RecoilHome/>}>
              <Route path="/recoil/play" element={<RecoilPlay/>} />
              <Route path="/recoil/stats" element={<RecoilStats/>} />
            </Route>
            <Route path="redux" element={<ReduxHome/>}>
              <Route path="/redux/play" element={<ReduxPlay/>} />
              <Route path="/redux/stats" element={<ReduxStats/>} />
            </Route>
            <Route path="context" element={<ContextHome/>}>
              <Route path="/context/play" element={<ContextPlay/>} />
              <Route path="/context/stats" element={<ContextStats/>} />
            </Route>
          </Routes>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
};
