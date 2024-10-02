/* eslint-disable indent */
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { MessageType, PriorityLevels, TicketStatus } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import Avatar from '../avtar/Avtar';
import DropDownWithTag from '../dropDownWithTag/dropDownWithTag';
import AssigneeDropdown from '../AssigneeDropdown/dropDownWithTag';
import Icon from '../icon/icon';
import LabelDropdown from '../labelDropdown/labelDropdown';
import DropDown from '../dropDown/dropDown';
import DatePickerModal from '../datePicker/datePicker';
import RenderHtml from '../renderHtml';
import {
  CardDiv,
  Description,
  DesTitle,
  DotIcon,
  InternalMessageDiv,
  LeftDiv,
  LineDiv,
  NameText,
  ResponsiveTimeDiv,
  RightDiv,
  StatusMainDiv,
  TagDiv,
} from './style';
import { priorityItem, snoozeItem } from '@/helpers/raw';
import { capitalizeString } from '@/helpers/common';
import { useStores } from '@/stores';
import { HandleClickProps, TicketDetailsInterface } from '@/utils/appTypes';
import {
  updateAssignee,
  changeTicketStatus,
  updateTicketPriority,
  addLabelToTicket,
  deleteLabelFromTicket,
  snoozeTicket,
} from '@/services/clientSide/ticketServices';

interface Props {
  ticketDetail: TicketDetailsInterface;
  description: string;
  showDotIcon?: boolean;
  src: string;
  currentOpenDropdown: string | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
  loadData: () => void;
  ticketIndex: number;
  isShowNavbar: boolean;
}

const InboxCard = ({
  ticketDetail,
  description,
  showDotIcon,
  src,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
  ticketIndex,
  isShowNavbar,
}: Props) => {
  const { title, source, contact, priority, assigned_to, last_message } =
    ticketDetail;
  const router = useRouter();
  const { ticketStore, workspaceStore, settingStore } = useStores();
  const [snoozeDropdown, setSnoozeDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showResponsiveDatePicker, setShowResponsiveDatePicker] =
    useState(false);
  const [snoozeResponsiveDropdown, setSnoozeResponsiveDropdown] =
    useState(false);

  const { currentWorkspace } = workspaceStore || {};
  const { labels } = settingStore || {};

  const handleDropdownClick = (dropdown: string) => {
    const identifier = `${dropdownIdentifier}-${dropdown}`;
    setCurrentOpenDropdown(
      currentOpenDropdown === identifier ? null : identifier,
    );
  };

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

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(currentWorkspace?.users?.map((user) => ({
      name: user.display_name || '',
      src: user.profile_url || '',
      isName: true,
      user_id: user.id,
    })) || []),
  ];

  const onClickTicket = useCallback(() => {
    ticketStore.setTicketDetails(ticketDetail);
    router.push(`/details/${ticketDetail?.id}`);
  }, []);

  /*
   * @desc Update ticket details priority in inbox card
   */
  const onChangePriority = useCallback(
    async (item: { value: PriorityLevels }) => {
      const payload = { priority: item?.value };
      try {
        const updatedTicketDetails = {
          ...(ticketDetail || {}),
          priority: item?.value,
        };
        ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
        await updateTicketPriority(ticketDetail?.id, payload);
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [],
  );

  /*
   * @desc Update ticket details assign user in inbox card
   */
  const onChangeAssign = useCallback(async (item: { user_id: string }) => {
    const payload = { assignee: item?.user_id || null };
    try {
      const updatedTicketDetails = {
        ...(ticketDetail || {}),
        assigned_to: item?.user_id || null,
      };
      ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
      await updateAssignee(ticketDetail?.id, payload);
    } catch (e) {
      console.log('Error : ', e);
    }
  }, []);

  const assignedUser = currentWorkspace?.users?.find(
    (user: { id: string | null }) => user.id === assigned_to,
  );

  /*
   * @desc Close ticket
   */
  const handleCloseTicket = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const payload = { status: TicketStatus.CLOSED };
      try {
        if (ticketDetail?.id) {
          ticketStore.updateTicketListItem(ticketIndex, {
            ...ticketDetail,
            status: TicketStatus.CLOSED,
          });
          await changeTicketStatus(ticketDetail?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetail],
  );

  // add/remove label to ticket
  const handleTicketLabel = useCallback(
    async (props: HandleClickProps) => {
      const { isChecked, labelId } = props;
      try {
        if (ticketDetail?.id && labelId) {
          if (isChecked) {
            const newLabel =
              ticketDetail.labels.filter((item) => item.id !== labelId) || [];
            ticketStore.updateTicketListItem(ticketIndex, {
              ...(ticketDetail || {}),
              labels: newLabel,
            });
            await deleteLabelFromTicket(ticketDetail?.id, labelId);
          } else {
            const newLabel = labels?.find((item) => item.id === labelId);
            const ticketLabels = ticketDetail.labels || [];
            if (newLabel) ticketLabels.push(newLabel);
            ticketStore.updateTicketListItem(ticketIndex, {
              ...(ticketDetail || {}),
              labels: ticketLabels,
            });
            await addLabelToTicket(ticketDetail?.id, labelId);
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetail],
  );

  const onSnoozeIconClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
    setSnoozeDropdown(true);
    setSnoozeResponsiveDropdown(true);
  }, []);

  const handleChangeSnooze = useCallback(
    async (props: HandleClickProps) => {
      const { item } = props;
      const payload = { snoozeUntil: item?.value };
      try {
        if (ticketDetail?.id) {
          const updatedTicketDetails = {
            ...(ticketDetail || {}),
            status: TicketStatus.OPEN,
            snooze_until: new Date(item?.value || ''),
          };
          // add data in mobX store
          ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
          // api call for change ticket status
          await snoozeTicket(ticketDetail?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetail],
  );

  const getCombinedDescription = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    return Array.from(paragraphs)
      .map((p) => p.textContent)
      .join(' ');
  };

  const combinedDescription = getCombinedDescription(description);

  return (
    <CardDiv
      isShowHoverItems={snoozeDropdown || showDatePicker}
      onClick={onClickTicket}
      isShowNavbar={isShowNavbar}
    >
      {showDotIcon && <DotIcon />}
      <LeftDiv>
        <div>
          <Avatar
            size={28}
            imgSrc={src}
            name={contact?.name || ''}
            isShowBorder={true}
          />
          <NameText>
            {contact?.name} from {capitalizeString(source)}
          </NameText>
        </div>
        <NameText className='time-text'>
          {moment(last_message && last_message.created_at).fromNow()}
        </NameText>
      </LeftDiv>
      <RightDiv>
        <DesTitle>{title}</DesTitle>
        {last_message?.type === MessageType.EMAIL ||
        last_message?.type === MessageType.FROM_CONTACT ? (
          <NameText className='description'>
            <RenderHtml isSpreadIcon={false} htmlstring={combinedDescription} />
          </NameText>
        ) : (
          <InternalMessageDiv>
            <Avatar
              // eslint-disable-next-line max-len
              imgSrc={last_message?.author?.profile_url || ''}
              name={last_message?.author.display_name || ''}
              size={24}
            />
            <Description>
              <RenderHtml
                isSpreadIcon={false}
                htmlstring={combinedDescription}
              />
            </Description>
          </InternalMessageDiv>
        )}

        <StatusMainDiv>
          <div className='statusDiv'>
            <LabelDropdown
              handleClick={handleTicketLabel}
              iconTitlePairs={
                ticketDetail?.labels?.map((label) => ({
                  iconName: label.icon,
                  title: label.name,
                })) || []
              } // Updated to pass an array of icon-title pairs
              onClose={() => {
                setCurrentOpenDropdown(null);
              }}
              dropDown={currentOpenDropdown === `${dropdownIdentifier}-label`}
              onClick={() => handleDropdownClick('label')}
              ticketLabelData={ticketDetail?.labels}
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
            <DropDownWithTag
              onClick={() => handleDropdownClick('priority')}
              title={'Priority'}
              iconName={`priority-${priority}`}
              dropdownOpen={
                currentOpenDropdown === `${dropdownIdentifier}-priority`
              }
              onClose={() => setCurrentOpenDropdown(null)}
              items={priorityItem}
              onChange={onChangePriority}
              isTag={true}
              isActive={true}
              selectedValue={{ name: priority }}
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
            <AssigneeDropdown
              onClick={() => handleDropdownClick('assign')}
              selectedValue={assignedUser}
              dropdownOpen={
                currentOpenDropdown === `${dropdownIdentifier}-assign`
              }
              onClose={() => setCurrentOpenDropdown(null)}
              items={assignItem}
              onChange={onChangeAssign}
              isActive={true}
              iconSize='20'
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
          </div>
          {ticketDetail.status !== TicketStatus.CLOSED && (
            <TagDiv className='tagDiv'>
              <div onClick={handleCloseTicket}>
                <Icon
                  iconName='close-icon'
                  iconSize='12'
                  iconViewBox='0 0 12 12'
                  onClick={() => {}}
                  size={true}
                />
              </div>
              <LineDiv />
              <div
                onMouseEnter={(e: any) =>
                  handleMouseEnter(e, setSubmenuPosition)
                }
              >
                <Icon
                  iconName='context-snooze-icon'
                  iconSize='12'
                  iconViewBox='0 0 12 12'
                  onClick={onSnoozeIconClick}
                  size={true}
                />
                {snoozeDropdown && (
                  <DropDown
                    isSnooze={true}
                    items={snoozeItem}
                    iconSize={''}
                    iconViewBox={''}
                    handleClick={handleChangeSnooze}
                    onChange={(item) => {
                      if (item?.name === 'date&time') setShowDatePicker(true);
                    }}
                    onClose={() => {
                      setSnoozeDropdown(false);
                    }}
                    style={{
                      right: 0,
                      maxWidth: 260,
                      width: '100%',
                      maxHeight: 'none',
                    }}
                    className={
                      submenuPosition === 'upwards'
                        ? 'submenu-upwards'
                        : 'submenu-downwards'
                    }
                  />
                )}
                {showDatePicker && (
                  <DatePickerModal
                    ticketIndex={ticketIndex}
                    ticketDetails={ticketDetail}
                    onClose={() => setShowDatePicker(false)}
                    style={{ right: 0, top: 4, position: 'relative' }}
                  />
                )}
              </div>
            </TagDiv>
          )}
          <ResponsiveTimeDiv>
            <NameText>
              {moment(last_message && last_message.created_at).fromNow()}
            </NameText>
            {ticketDetail.status !== TicketStatus.CLOSED && (
              <TagDiv>
                <div onClick={handleCloseTicket}>
                  <Icon
                    iconName='close-icon'
                    iconSize='12'
                    iconViewBox='0 0 12 12'
                    onClick={() => {}}
                    size={true}
                  />
                </div>
                <LineDiv />
                <div
                  onMouseEnter={(e: any) =>
                    handleMouseEnter(e, setSubmenuPosition)
                  }
                >
                  <Icon
                    iconName='context-snooze-icon'
                    iconSize='12'
                    iconViewBox='0 0 12 12'
                    onClick={onSnoozeIconClick}
                    size={true}
                  />
                  {snoozeResponsiveDropdown && (
                    <DropDown
                      isSnooze={true}
                      items={snoozeItem}
                      iconSize={''}
                      iconViewBox={''}
                      handleClick={handleChangeSnooze}
                      onChange={(item) => {
                        if (item?.name === 'date&time')
                          setShowResponsiveDatePicker(true);
                      }}
                      onClose={() => {
                        setSnoozeResponsiveDropdown(false);
                      }}
                      style={{
                        right: 0,
                        maxWidth: 260,
                        width: '100%',
                        maxHeight: 'none',
                      }}
                      className={
                        submenuPosition === 'upwards'
                          ? 'submenu-upwards'
                          : 'submenu-downwards'
                      }
                    />
                  )}
                  {showResponsiveDatePicker && (
                    <DatePickerModal
                      ticketIndex={ticketIndex}
                      ticketDetails={ticketDetail}
                      onClose={() => setShowResponsiveDatePicker(false)}
                      style={{ right: 0, top: 4, position: 'relative' }}
                    />
                  )}
                </div>
              </TagDiv>
            )}
          </ResponsiveTimeDiv>
        </StatusMainDiv>
      </RightDiv>
    </CardDiv>
  );
};
export default observer(InboxCard);
