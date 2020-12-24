import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Div, Button, Icon, Container } from 'atomize';
import { CheckAll } from 'react-bootstrap-icons';

import { ThemeContext } from 'atomize/dist/core/ThemeContext';

import { useService } from '@xstate/react';
import { service } from '../stateMachine';

import Action from '../entities/Action';

const theme: any = ThemeContext.Consumer._currentValue;

const actionsSets = {
  idle: [
    new Action({ title: 'Settings', icon: 'Settings', event: 'SETTINGS' }),
    new Action({ title: 'Add', icon: 'Add', event: 'ADD' }),
    new Action({ title: 'Share', icon: 'Upload', event: 'SHARE' }),
  ],
  selected: [
    new Action({ title: 'Back', icon: 'LeftArrow', event: 'DESELECT_ALL' }),
    new Action({
      title: 'Edit',
      icon: 'Edit',
      event: 'EDIT',
    }),
    new Action({ title: 'Delete', icon: 'Delete', event: 'REMOVE' }),
  ],
  multiSelected: [
    new Action({ title: 'Back', icon: 'LeftArrow', event: 'DESELECT_ALL' }),
    new Action({
      title: 'Select All',
      icon: <CheckAll size="1.5rem" style={{ color: theme.colors.info700 }} />,
      event: 'SELECT_ALL',
    }),
    new Action({ title: 'Delete', icon: 'Delete', event: 'REMOVE' }),
  ],
};

export default function ActionBar() {
  const [currentState, sendEvent] = useService(service);
  const [currentActions, setCurrentActions] = useState(actionsSets.idle);
  const selected = currentState.context['selected'];

  useEffect(() => {
    if (selected.size >= 2) {
      setCurrentActions(actionsSets.multiSelected);
    } else if (selected.size) {
      setCurrentActions(actionsSets.selected);
    } else {
      setCurrentActions(actionsSets.idle);
    }
  }, [selected.size]);

  return (
    <Div pos="fixed" bottom="1.5rem" left="0" right="0">
      <Container d="flex" flexDir="row" justify="space-around">
        {currentActions &&
          currentActions.map((action, index) => (
            <Button
              h="3rem"
              w="3rem"
              bg="white"
              shadow="3"
              hoverBg="info400"
              rounded="lg"
              p="0"
              key={index}
              disabled={!!action.disabled}
              onClick={() => sendEvent(action.event)}
            >
              {typeof action.icon === 'string' ? (
                <Icon
                  name={action.icon}
                  size="1.5rem"
                  color={!!action.disabled ? 'light' : 'info700'}
                />
              ) : (
                action.icon
              )}
            </Button>
          ))}
      </Container>
    </Div>
  );
}
