import * as React from 'react';
import { useEffect } from 'react';

/**
 * State managment
 */
import { useService } from '@xstate/react';
import { service } from './stateMachine';

/**
 * Components
 */
import AppBar from './components/AppBar';

/**
 * Layouts
 */
import Idle from './layouts/Idle';
import Add from './layouts/Add';
import Edit from './layouts/Edit';
import Settings from './layouts/Settings';

export default function App() {
  const [currentState, sendEvent] = useService(service);

  const isLayout = (value) => currentState.value === value;

  useEffect(() => {
    const onPopState = function (e) {
      if (e.state.event === currentState?.history?.event?.type) {
        sendEvent('BACK');
      }
    };

    window.addEventListener('popstate', onPopState);

    return function () {
      window.removeEventListener('popstate', onPopState);
    };
  }, [currentState.value]);

  useEffect(() => {
    window.history.pushState(
      {
        value: currentState.value,
        event: currentState.event.type,
      },
      null
    );
  }, [currentState.value]);

  return (
    <React.Fragment>
      <AppBar />
      {(isLayout('idle') || isLayout('remove')) && <Idle />}
      {isLayout('add') && <Add />}
      {isLayout('edit') && <Edit />}
      {isLayout('settings') && <Settings />}
    </React.Fragment>
  );
}
