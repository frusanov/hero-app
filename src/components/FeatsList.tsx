import * as React from 'react';
import { useEffect, useState, useContext } from 'react';

import { useService } from '@xstate/react';
import { service } from '../stateMachine';

import { ThemeContext } from 'atomize/dist/core/ThemeContext';

import { Div, Container, Text } from 'atomize';

export default function FeatsList() {
  const [currentState, sendEvent] = useService(service);
  const [selected, setSelected] = useState(currentState.context['selected']);
  const { colors } = useContext(ThemeContext);
  const feats = currentState.context['feats'];

  const selectFeat = function (timestamp: number): Function {
    return () => sendEvent('SELECT', { timestamp });
  };

  const isLast = function (index: number) {
    return feats.length - 1 === index;
  };

  useEffect(() => {
    setSelected(currentState.context['selected']);
  }, [currentState.context['selected'].size]);

  return (
    <React.Fragment>
      {feats.map((feat, index) => (
        <Div
          p="1em 0"
          key={index}
          bg={selected.has(feat.date) ? 'info700' : 'white'}
          style={
            isLast(index)
              ? {}
              : {
                  borderBottom: `1px solid ${
                    selected.has(feat.date) ? colors.info600 : colors.gray300
                  }`,
                }
          }
          onClick={selectFeat(feat.date)}
          transition
        >
          <Container
            textColor={selected.has(feat.date) ? 'white' : 'dark'}
            transition
          >
            <Text>{feat.text}</Text>
          </Container>
        </Div>
      ))}
    </React.Fragment>
  );
}
