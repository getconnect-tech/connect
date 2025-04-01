import React from 'react';
import { TimePicker } from 'antd';
import { InputDiv, Label } from '../style';

interface Props {
  label: string;
  onChange: () => void;
}

function TimePickerSection({ label, onChange }: Props) {
  return (
    <InputDiv>
      <Label>{label}</Label>
      <TimePicker
        format='h:mm A'
        placeholder='HH:MM'
        onChange={onChange}
        disabled={false}
        className='time-picker'
      />
    </InputDiv>
  );
}

export default TimePickerSection;
