import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

/**
 * State managment
 */
import { useService } from '@xstate/react';
import { service } from './stateMachine';

/**
 * Components
 */
import { Div } from 'atomize';
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
  const [appBarShadow, setAppBarShadow] = useState(false);
  const contentRef = useRef(null);

  const isLayout = (value) => currentState.value === value;

  useEffect(() => {
    const onPopState = function (e) {
      if (e.state.event === currentState?.history?.event?.type) {
        sendEvent('BACK');
      }
    };

    window.history.pushState(
      {
        value: currentState.value,
        event: currentState.event.type,
      },
      null
    );

    window.addEventListener('popstate', onPopState);

    return function () {
      window.removeEventListener('popstate', onPopState);
    };
  }, [currentState.value]);

  useEffect(() => {
    console.log(contentRef);
    window.addEventListener('scroll', () => {
      setAppBarShadow(!!window.pageYOffset);
    });
  }, []);

  return (
    <React.Fragment>
      <AppBar shadow={appBarShadow ? '4' : '0'} />
      <Div p={{ t: '64px' }} ref={contentRef}>
        {(isLayout('idle') || isLayout('remove')) && <Idle />}
        {isLayout('add') && <Add />}
        {isLayout('edit') && <Edit />}
        {isLayout('settings') && <Settings />}
      </Div>
    </React.Fragment>
  );
}
