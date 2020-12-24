import * as React from 'react';
import { render } from 'react-dom';
import { StyleReset } from 'atomize';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import App from './App';

const engine = new Styletron();

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  try {
    navigator.serviceWorker.register('./serviceWorker.js').then((reg) => {
      reg.addEventListener('updatefound', () => {
        reg.update();
      });
    });
    console.debug('Service Worker Registered');
  } catch (error) {
    console.error('Service Worker Register Failed', error);
  }
}

render(
  <StyletronProvider value={engine} debugAfterHydration>
    <StyleReset />
    <App />
  </StyletronProvider>,
  document.getElementById('root')
);
