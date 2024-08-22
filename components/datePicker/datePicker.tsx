import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import {
  CalendarDiv,
  Header,
  InputMainDiv,
  Inputs,
  Label,
  MainDiv,
} from './style';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  onClose: () => void;
}

function DatePickerModal({ onClose }: Props) {
  const [value, setValue] = useState<Value>(new Date());
  const [dateInput, setDateInput] = useState<string>(
    new Date().toLocaleDateString('en-US'),
  );

  const handleDateChange = (date: Value) => {
    setValue(date);
    const formattedDate =
      date instanceof Date ? date.toLocaleDateString('en-US') : '';
    setDateInput(formattedDate);
  };

  const handleSnooze = useCallback(() => {
    // Only close the modal when Snooze is clicked
    onClose();
  }, [onClose]);

  const handleCancel = useCallback(() => {
    // Close the modal when Cancel is clicked
    onClose();
  }, [onClose]);

  // Prevent modal from closing on clicks inside the modal
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <MainDiv onClick={handleModalClick}>
      <Header>
        <Icon
          onClick={onClose}
          iconName='back-icon'
          iconSize='12'
          iconViewBox='0 0 16 16'
          size={true}
        />
        <p>Snooze</p>
      </Header>
      <CalendarDiv>
        <Calendar
          onChange={handleDateChange}
          value={value}
          defaultActiveStartDate={new Date()}
          minDate={new Date()}
        />
      </CalendarDiv>
      <InputMainDiv>
        <Inputs>
          <div>
            <Label>Date</Label>
            <Input
              placeholder={'MM/DD/YYYY'}
              className='input'
              value={dateInput}
              // onClick={handleModalClick} // Prevent close on date input click
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              placeholder={'HH:MM'}
              className='input'
              // onClick={handleModalClick} // Prevent close on time input click
            />
          </div>
        </Inputs>
        <div className='buttons'>
          <Button title='Cancel' secondary={true} onClick={handleCancel} />
          <Button title='Snooze' disabled={false} onClick={handleSnooze} />
        </div>
      </InputMainDiv>
    </MainDiv>
  );
}

export default DatePickerModal;
