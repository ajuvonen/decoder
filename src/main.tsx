import ReactDOM from 'react-dom/client';
import {App} from './App';
import './css/App.css';
import './css/bootstrap.min.css';
import './i18n';

import '@fontsource/tektur';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
