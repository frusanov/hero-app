import * as React from 'react';
import { useState } from 'react';

import { useService } from '@xstate/react';
import { service } from '../stateMachine';

import { Container, Input, Text } from 'atomize';

export default function Settings() {
  const [currentState, sendEvent] = useService(service);
  const [bullet, setBullet] = useState(currentState.context['bullet']);

  const updateBullet = function (event) {
    const value = event.target.value;
    setBullet(value);
    sendEvent('UPDATE_BULLET', { bullet: value });
  };

  return (
    <Container d="flex" flexDir="column" justify="flex-end">
      <Text textSize="caption" textColor="gray900">
        Feats list bullet:
      </Text>
      <Input
        fontFamily="primary"
        placeholder="Enter your favorite emoji"
        value={bullet}
        onChange={updateBullet}
      />
    </Container>
  );
}
