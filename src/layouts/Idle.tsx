import * as React from 'react';

import { useService } from '@xstate/react';
import { service } from '../stateMachine';

import { Container, Text } from 'atomize';

import ActionBar from '../components/ActionBar';
import FeatsList from '../components/FeatsList';
import ConfirmModal from '../components/ConfirmModal';

export default function Idle() {
  const [currentState, sendEvent] = useService(service);
  const hasFeats = !!currentState.context['feats'].length;

  const isLayout = (value) => currentState.value === value;

  return (
    <React.Fragment>
      {isLayout('remove') && (
        <ConfirmModal
          text="Do you really want to delete selected feats?"
          acceptBg="danger700"
          acceptText="Delete"
          onCancel={() => sendEvent('CANCEL')}
          onAccept={() => sendEvent('REMOVE')}
        />
      )}
      {hasFeats ? (
        <FeatsList />
      ) : (
        <Container>
          <Text p={{ y: '4em' }} textAlign="center" textColor="light">
            Start track your feats!
          </Text>
        </Container>
      )}
      <ActionBar />
    </React.Fragment>
  );
}
