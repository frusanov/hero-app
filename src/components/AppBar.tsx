import * as React from 'react';
import { useContext } from 'react';

import { Div, Container, Button, Image } from 'atomize';
import { ArrowLeftShort } from 'react-bootstrap-icons';

import { ThemeContext } from 'atomize/dist/core/ThemeContext';

import { useService } from '@xstate/react';
import { service } from '../stateMachine';

import logo from '../assets/logo.svg';

const appBarData = {
  idle: {
    title: 'You Are Hero!',
  },
  settings: {
    title: 'Settings',
  },
  add: {
    title: 'Add new feat',
  },
  edit: {
    title: 'Edit',
  },
};

export default function AppBar() {
  const [currentState, sendEvent] = useService(service);
  const stateValue: string = currentState?.value.toString();
  const title: string = appBarData[stateValue]?.title || appBarData.idle.title;
  const theme: any = useContext(ThemeContext);

  return (
    <Div
      bg="white"
      d="flex"
      pos="sticky"
      align="center"
      p="1rem 0"
      style={{ zIndex: '1' }}
    >
      <Container d="flex" flexDir="row" align="center">
        {/^(idle|remove)$/.test(stateValue) ? (
          <Image
            src={logo}
            w="2em"
            h="2em"
            m={{ t: '-1em', b: '-1em', r: '.5em' }}
          />
        ) : (
          <Button
            h="2.5rem"
            w="2.5rem"
            bg="white"
            rounded="circle"
            m={{ t: '-1em', b: '-1em', r: '0.25em' }}
            p="0"
            onClick={() => sendEvent('BACK')}
          >
            <ArrowLeftShort
              size="2rem"
              style={{ color: theme.colors.info700 }}
            />
          </Button>
        )}

        <h1>{title}</h1>
      </Container>
    </Div>
  );
}
