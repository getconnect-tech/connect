import React, { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { TimePicker, TimePickerProps } from 'antd';
import moment from 'moment';
import { MessageType, TicketStatus } from '@prisma/client';
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
import { ticketStore } from '@/stores/ticketStore';
import { getUniqueId } from '@/helpers/common';
import { MessageDetails } from '@/utils/dataTypes';
import { snoozeTicket } from '@/services/clientSide/ticketServices';
import { useStores } from '@/stores';
import { TicketDetailsInterface } from '@/utils/appTypes';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  onClose: () => void;
  style?: React.CSSProperties;
  isContextMenu?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChangeSnooze?: ({ item }: any) => void;
  ticketDetails?: TicketDetailsInterface | null;
  className?: string;
  ticketIndex?: number;
}

function DatePickerModal({
  onClose,
  style,
  isContextMenu = false,
  ticketDetails,
  className,
  ticketIndex,
}: Props) {
  const [dateValue, setDateValue] = useState<Value>(new Date());
  const [dateInput, setDateInput] = useState<string>(
    new Date().toLocaleDateString('en-US'),
  );
  const [timeValue, setTimeValue] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('downwards');
  const { userStore } = useStores();
  const { user } = userStore || {};

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
    setDateValue(date);
    const formattedDate =
      date instanceof Date ? date.toLocaleDateString('en-US') : '';
    setDateInput(formattedDate);
  };

  const onChange: TimePickerProps['onChange'] = (time, timeString) => {
    if (typeof timeString === 'string') {
      setTimeValue(timeString);
    } else {
      setTimeValue(null);
    }
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (dateValue instanceof Date && timeValue) {
        try {
          //handle AM/PM
          const timeMoment = moment(timeValue, ['h:mm A']);

          if (!timeMoment.isValid()) {
            console.error('Invalid time format');
            return;
          }
          // handle date formate
          const formattedDate = new Date(dateValue);
          formattedDate.setHours(timeMoment.hours(), timeMoment.minutes());

          const isoString = formattedDate.toISOString();

          const payload = { snoozeUntil: isoString };
          const newMessage = {
            assignee: null,
            author: user,
            author_id: user!.id,
            content: moment(isoString).format('DD MMMM LT'),
            id: getUniqueId(),
            created_at: new Date(),
            label: null,
            reference_id: 'SNOOZE',
            ticket_id: ticketDetails?.id,
            type: MessageType.CHANGE_STATUS,
          } as MessageDetails;
          if (ticketDetails?.id) {
            const updatedTicketDetails = {
              ...(ticketDetails || {}),
              status: TicketStatus.OPEN,
              snooze_until: new Date(isoString || ''),
            };
            // add data in mobX store
            if (typeof ticketIndex === 'number') {
              ticketStore.updateTicketListItem(
                ticketIndex,
                updatedTicketDetails,
              );
            }
            ticketStore.addTicketMessage(newMessage);
            ticketStore.setTicketDetails(updatedTicketDetails);
            // api call for change ticket status
            await snoozeTicket(ticketDetails?.id, payload);
            onClose();
          }
        } catch (e) {
          console.log('Error : ', e);
        }
      } else {
        console.error('Invalid date or time');
      }
    },
    [ticketDetails, timeValue, dateValue],
  );

  return (
    <MainDiv onClick={handleModalClick} isContextMenu={isContextMenu}>
      <div
        className={`modal-content ${
          submenuPosition === 'upwards'
            ? 'submenu-upwards'
            : 'submenu-downwards'
        } ${className || ''}`}
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
            value={dateValue}
            defaultActiveStartDate={new Date()}
            minDate={new Date()}
          />
        </CalendarDiv>
        <InputMainDiv onSubmit={handleSubmit}>
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
                  borderColor: 'var(--border)',
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
            <Button
              type='submit'
              title='Snooze'
              disabled={false}
              variant='medium'
            />
          </div>
        </InputMainDiv>
      </div>
    </MainDiv>
  );
}

export default DatePickerModal;
