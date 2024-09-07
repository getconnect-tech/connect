import React, { useCallback, useState } from 'react';
import { MessageType, TicketStatus, User } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import DropDown from '../dropDown/dropDown';
import Tag from '../tag/tag';
import DatePickerModal from '../datePicker/datePicker';
import { HandleClickProps, TicketDetailsInterface } from '@/utils/appTypes';
import { snoozeTicket } from '@/services/clientSide/ticketServices';
import { getUniqueId } from '@/helpers/common';
import { MessageDetails } from '@/utils/dataTypes';
import { ticketStore } from '@/stores/ticketStore';
import { snoozeItem } from '@/helpers/raw';

interface Props {
  onClick: () => void;
  dropdownOpen: boolean;
  onClose: () => void;
  isActive?: boolean;
  iconSize?: string;
  selectedValue?: User;
  className?: string;
  onMouseEnter?: any;
  tagStyle?: React.CSSProperties;
  ticketDetails: TicketDetailsInterface | null;
  user: User | null;
}

const SnoozeDropdown = ({
  onClick,
  dropdownOpen,
  onClose,
  isActive = false,
  iconSize = '12',
  className,
  onMouseEnter,
  ticketDetails,
  user,
}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  /*
   * @desc update ticket snooze
   */
  const handleChangeSnooze = useCallback(
    async (props: HandleClickProps) => {
      const { item } = props;
      const payload = { snoozeUntil: item?.value };
      const newMessage = {
        assignee: null,
        author: user,
        author_id: user!.id,
        content: moment(item?.value).format('DD MMMM LT'),
        id: getUniqueId(),
        created_at: new Date(),
        label: null,
        reference_id: 'SNOOZE',
        ticket_id: ticketDetails?.id,
        type: MessageType.CHANGE_STATUS,
      } as MessageDetails;
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...(ticketDetails || {}),
            status: TicketStatus.OPEN,
            snooze_until: new Date(item?.value || ''),
          };
          // add data in mobX store
          ticketStore.addTicketMessage(newMessage);
          ticketStore.setTicketDetails(updatedTicketDetails);
          // api call for change ticket status
          await snoozeTicket(ticketDetails?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetails],
  );

  return (
    <div onMouseEnter={onMouseEnter}>
      <Tag
        isActive={isActive}
        onClick={(e: { stopPropagation: () => void }) => {
          e.stopPropagation(); // Stop event propagation
          onClick(); // Handle the click action
        }}
        isName={false}
        iconName={'context-snooze-icon'}
        title={'Snooze'}
      />
      {dropdownOpen && (
        <DropDown
          items={snoozeItem}
          iconSize={iconSize}
          iconViewBox={`0 0 ${iconSize} ${iconSize}`}
          onClose={onClose}
          handleClick={handleChangeSnooze}
          onChange={(item) => {
            if (item?.name === 'date&time') setShowDatePicker(true);
          }}
          isSearch={true}
          className={className}
          isSnooze={true}
          style={{ right: 20, maxWidth: 260, width: '100%', maxHeight: 'none' }}
        />
      )}
      {showDatePicker && (
        <DatePickerModal
          ticketDetails={ticketDetails}
          onClose={() => setShowDatePicker(false)}
          style={{ top: 4 }}
        />
      )}
    </div>
  );
};
export default observer(SnoozeDropdown);
