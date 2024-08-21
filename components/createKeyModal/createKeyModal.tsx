import React from 'react';
import ModalComponent from '../modalComponent/modalComponent';

interface Props {
  onClose: () => void;
}

function CreateKeyModal({ onClose }: Props) {
  return (
    <ModalComponent
      onClose={onClose}
      onSubmit={() => {}}
      loading={false}
      buttonTitle='Create'
      title={'Create API key'}
      inputFirstLabel={'Name'}
      firstPlaceholder='Enter your key name'
      buttonCancel='Cancel'
      span='(This is just for your reference)'
      
    />
  );
}

export default CreateKeyModal;
