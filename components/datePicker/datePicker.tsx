import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import { TimePicker, TimePickerProps } from 'antd';
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

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

interface Props {
  onClose: () => void;
}

function DatePickerModal({ onClose }: Props) {
  const [value, setValue] = useState<Value>(new Date());
  const [dateInput, setDateInput] = useState<string>(
    new Date().toLocaleDateString('en-US'),
  );
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line no-unused-vars
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();
    // eslint-disable-next-line no-undef
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > 200) {
      setPosition('upwards');
    } else {
      setPosition('downwards');
    }
  };

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
    <MainDiv
      onClick={handleModalClick}
      onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
    >
      <div
        className={
          submenuPosition === 'upwards'
            ? 'submenu-upwards'
            : 'submenu-downwards'
        }
      >
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
              <TimePicker
                format='h:00 A'
                placeholder='HH:MM'
                onChange={onChange}
                disabled={false}
                popupStyle={{
                  border: '1px solid',
                  borderRadius: 8,
                  borderColor: '#E3E8EA',
                }}
              />
            </div>
          </Inputs>
          <div className='buttons'>
            <Button
              title='Cancel'
              secondary={true}
              onClick={handleCancel}
              variant='medium'
            />
            <Button
              title='Snooze'
              disabled={false}
              onClick={handleSnooze}
              variant='medium'
            />
          </div>
        </InputMainDiv>
      </div>
    </MainDiv>
  );
}

export default DatePickerModal;
