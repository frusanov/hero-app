import * as React from 'react';
import { useState, useEffect } from 'react';

import { useService } from '@xstate/react';
import { service } from '../stateMachine';

import { Container, Textarea, Button, Text } from 'atomize';

export default function Edit(props) {
  const [currentState, sendEvent] = useService(service);
  const [text, setText] = useState(props.text || '');
  const selectedDate = Array.from(currentState.context['selected'])[0];

  useEffect(() => {
    const selectedFeat = currentState.context['feats'].find(
      (feat) => feat.date === selectedDate
    );

    setText(selectedFeat.text);
  }, []);

  return (
    <Container d="flex" flexDir="column" justify="flex-end">
      <Textarea
        shadow="4"
        fontFamily="primary"
        textSize="subheader"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        bg="info700"
        shadow="4"
        m={{ t: '1em' }}
        disabled={!text.length}
        onClick={() =>
          text.length && sendEvent('UPDATE', { text, date: selectedDate })
        }
      >
        <Text textSize="subheader">Save</Text>
      </Button>
    </Container>
  );
}
