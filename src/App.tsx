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
    sendEvent('RESOLVE');
  }, []);

  useEffect(() => {
    console.log(currentState);
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
