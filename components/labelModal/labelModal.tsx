import React, { useState } from 'react';
import ModalComponent from '../modalComponent/modalComponent';

interface Props {
  onClose: () => void;
}
function LabelModal({ onClose }: Props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <ModalComponent
      onClose={onClose}
      onSubmit={() => {}}
      loading={false}
      buttonTitle='Create'
      isIcon={false}
      title={'Create new label'}
      inputFirstLabel={'Label Name'}
      firstPlaceholder='Enter label Name'
      buttonCancel='Cancel'
      isDropdown={true}
      dropdownVisible={dropdownVisible}
      onDropdownClick={toggleDropdown}
    />
  );
}

export default LabelModal;
