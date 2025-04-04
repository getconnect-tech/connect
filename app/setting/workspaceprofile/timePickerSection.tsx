import React from 'react';
import { TimePicker, TimePickerProps } from 'antd';
import { InputDiv, Label } from '../style';

interface Props {
  label: string;
  onChange: TimePickerProps['onChange'];
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
