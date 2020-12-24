import * as React from 'react';

import { Div, Button, Modal, Text } from 'atomize';

export default function ConfirmModal({
  onClose = null,
  onCancel = null,
  onAccept = null,
  text,
  acceptText = 'Accept',
  cancelText = 'Cancel',
  acceptBg = 'info700',
  cancelBg = 'gray300',
}) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose || onCancel}
      align="start"
      p="1.5em"
      rounded="lg"
    >
      <Div d="flex" m={{ b: '2em' }}>
        <Text textSize="subheader">{text}</Text>
      </Div>
      <Div d="flex" justify="flex-end">
        <Button
          bg={cancelBg}
          textColor="medium"
          m={{ r: '1rem' }}
          onClick={onCancel || onClose}
        >
          <Text textSize="subheader">{cancelText}</Text>
        </Button>
        <Button bg={acceptBg} onClick={onAccept}>
          <Text textSize="subheader"> {acceptText}</Text>
        </Button>
      </Div>
    </Modal>
  );
}
