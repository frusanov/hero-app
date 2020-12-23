import * as React from 'react';
import { render } from 'react-dom';
import { StyleReset } from 'atomize';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import App from './App';

const engine = new Styletron();

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  try {
    navigator.serviceWorker.register('./serviceWorker.js');
    console.log('Service Worker Registered');
  } catch (error) {
    console.log('Service Worker Register Failed');
  }
}

render(
  <StyletronProvider value={engine} debugAfterHydration>
    <StyleReset />
    <App />
  </StyletronProvider>,
  document.getElementById('root')
);
