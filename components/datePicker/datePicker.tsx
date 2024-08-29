import React, { useEffect, useState } from 'react';
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
  style?: React.CSSProperties;
  isContextMenu?: boolean;
}

function DatePickerModal({ onClose, style, isContextMenu = false }: Props) {
  const [value, setValue] = useState<Value>(new Date());
  const [dateInput, setDateInput] = useState<string>(
    new Date().toLocaleDateString('en-US'),
  );
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('downwards');

  useEffect(() => {
    // Calculate initial position when the component mounts
    const calculatePosition = () => {
      // eslint-disable-next-line no-undef
      const modalElement = document.querySelector('.modal-content');
      const rect = modalElement?.getBoundingClientRect();

      if (rect) {
        // eslint-disable-next-line no-undef
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < 300 && spaceAbove > 300) {
          setSubmenuPosition('upwards');
        } else {
          setSubmenuPosition('downwards');
        }
      }
    };

    calculatePosition();
  }, []);

  const handleDateChange = (date: Value) => {
    setValue(date);
    const formattedDate =
      date instanceof Date ? date.toLocaleDateString('en-US') : '';
    setDateInput(formattedDate);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <MainDiv onClick={handleModalClick} isContextMenu={isContextMenu}>
      <div
        className={`modal-content ${
          submenuPosition === 'upwards'
            ? 'submenu-upwards'
            : 'submenu-downwards'
        }`}
        style={style}
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
              onClick={onClose}
              variant='medium'
            />
            <Button title='Snooze' disabled={false} variant='medium' />
          </div>
        </InputMainDiv>
      </div>
    </MainDiv>
  );
}

export default DatePickerModal;
