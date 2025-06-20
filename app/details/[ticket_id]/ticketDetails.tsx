/* eslint-disable indent */
'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import {
  ChannelType,
  MessageType,
  PriorityLevels,
  TicketStatus,
  UserRole,
} from '@prisma/client';
import moment from 'moment';
import ProfileSection from '@/components/profileSection/profileSection';
import SVGIcon from '@/assets/icons/SVGIcon';
import Avatar from '@/components/avtar/Avtar';
import MessageCard from '@/components/messageCard/messageCard';
import { modeItem, priorityItem } from '@/helpers/raw';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { useStores } from '@/stores';
import {
  changeTicketStatus,
  getTicketDetails,
  updateAssignee,
  getTicketMessages,
  updateTicketPriority,
  sendMessage,
  deleteLabelFromTicket,
  addLabelToTicket,
} from '@/services/clientSide/ticketServices';
import {
  capitalizeString,
  generateRandomFilename,
  getFirebaseUrlFromFile,
  getUniqueId,
  isEmpty,
} from '@/helpers/common';
import Icon from '@/components/icon/icon';
import DropDown, { DropDownItem } from '@/components/dropDown/dropDown';
import Tag from '@/components/tag/tag';
import { MessageDetails } from '@/utils/dataTypes';
import AssigneeDropdown from '@/components/AssigneeDropdown/dropDownWithTag';
import SnoozeDropdown from '@/components/snoozeDropdown/snoozeDropdown';
import InternalMessageCard from '@/components/internalMessageCard/internalMessageCard';
import { messageStore } from '@/stores/messageStore';
import {
  HandleClickProps,
  MessageAttachment,
  Reaction,
  ReactionProps,
} from '@/utils/appTypes';
import LabelDropdown from '@/components/labelDropdown/labelDropdown';
import { getMacros } from '@/services/clientSide/settingServices';
import FileCard from '@/components/fileCard/fileCard';
import ResponsiveProfileSection from '@/components/profileSection/responsiveProfileSection';
import { getContactDetailById } from '@/services/clientSide/contactServices';
import TiptapEditor from '@/components/tiptapEditor';
import {
  ActivityDiv,
  BottomDiv,
  ButtonDiv,
  CenterDiv,
  CenterMainDiv,
  HeaderDiv,
  IconDiv,
  Input,
  InputDiv,
  InputIcon,
  LeftDiv,
  LineDiv,
  Main,
  MainDiv,
  Message,
  StatusDiv,
  Title,
  TopDiv,
} from '../style';

interface Props {
  ticket_id: string;
}

const useMediaQuery = (width: number): boolean => {
  // eslint-disable-next-line no-undef
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const handleResize = () => setMatches(window.innerWidth > width);
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', handleResize);
    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return matches;
};

function TicketDetails(props: Props) {
  const { ticket_id } = props;
  const isLargeScreen = useMediaQuery(449);
  const router = useRouter();
  const [labelDropdown, setLabelDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [messageModeDropdown, setMessageModeDropdown] = useState(false);
  const [isSignatureSection, setIsSignatureSection] = useState(false);
  const [assignDropdown, setAssignDropdown] = useState(false);
  const [snoozeDropdown, setSnoozeDropdown] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [messageRefId, setMessageRefId] = useState('');
  const [commentValue, setCommentValue] = useState<string>('');
  // eslint-disable-next-line max-len
  const signatureFormat = `<p>-<br/>Yours truly,<br/>Sanjay M.</p><p>Sent from <a target="_blank" href="https://www.getconnect.tech/">Connect</a></p>`;
  const [signatureValue, setSignatureValue] = useState<string>(signatureFormat);
  const [attachFile, setAttachFiels] = useState<MessageAttachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const {
    ticketStore,
    workspaceStore,
    userStore,
    settingStore,
    appStore,
    contactStore,
  } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { ticketDetails, messages } = ticketStore || {};
  const { labels, macros } = settingStore || {};
  const { user } = userStore || {};
  const { uploadLoading } = appStore || {};
  const { priority, assigned_to } = ticketDetails || {};
  const { contactDetails } = contactStore || {};
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [macroDropdown, setMacroDropdown] = useState(false);
  const [isProfileSection, setIsProfileSection] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [modeSelectedItem, setModeSelectedItem] = useState<DropDownItem>({
    name: 'Email',
    icon: 'email-icon',
  });
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleModeItemChange = (item: DropDownItem) => {
    setModeSelectedItem(item);
  };

  const onClickIcon = useCallback(() => {
    setIsProfileSection((prevState) => !prevState); // Toggle the state
  }, []);

  const handleMacroSelect = useCallback(
    (selectedMacro: { content: string; name: string }) => {
      if (selectedMacro.name === 'manage-macros') {
        router.push('/setting/macros');
        return;
      }
      setCommentValue((prevValue) => {
        return prevValue
          ? `${prevValue}\n${selectedMacro.content}`
          : selectedMacro.content;
      });
      editorRef.current.addContent(selectedMacro.content || '');
      setMacroDropdown(false);
    },
    [router],
  );

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

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      setMessageRefId(`${generateRandomFilename()}`);
      await Promise.all([
        getTicketDetails(ticket_id),
        getTicketMessages(ticket_id),
        getMacros(),
      ]);
      if (ticketDetails?.contact_id)
        await getContactDetailById(ticketDetails?.contact_id);
    }
  }, [currentWorkspace?.id, ticketDetails?.contact_id, ticket_id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleScroll = (e: Event) => {
    const element = e.target as HTMLDivElement;
    const atBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    setIsUserScrolling(!atBottom);
  };

  useEffect(() => {
    const element = messagesEndRef.current?.parentElement;
    if (!element) return;

    const scrollToBottom = () => {
      if (isUserScrolling) return;
      element.scrollTop = element.scrollHeight;
    };
    const resizeObserver = new ResizeObserver(() => {
      scrollToBottom();
    });
    resizeObserver.observe(element);

    setTimeout(() => scrollToBottom(), 0);

    element.addEventListener('scroll', handleScroll as EventListener);
    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', handleScroll as EventListener);
    };
  }, [messages, isUserScrolling]);

  useEffect(() => {
    return () => {
      ticketStore.setTicketDetails(null);
      ticketStore.setTicketMessages([]);
    };
  }, [ticketStore]);

  const handlePriorityTag = useCallback(() => {
    setPriorityDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  }, []);

  const handleSnoozeTag = useCallback(() => {
    setSnoozeDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setPriorityDropdown(false);
  }, []);

  const handleMessageModeTag = useCallback(() => {
    setMessageModeDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setPriorityDropdown(false);
    setSnoozeDropdown(false);
    setMacroDropdown(false);
  }, []);

  const handleLabelTag = useCallback(() => {
    setLabelDropdown((prev) => !prev);
    setAssignDropdown(false);
    setPriorityDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  }, []);

  const handleAssignTag = useCallback(() => {
    setAssignDropdown((prev) => !prev);
    setPriorityDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  }, []);

  const handleMacroItem = useCallback(() => {
    setMacroDropdown((prevState) => !prevState);
    setPriorityDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  }, []);

  const handleOutsideClick = useCallback(() => {
    setMacroDropdown(false);
  }, []);

  const handleSignature = useCallback(() => {
    setIsSignatureSection(true);
  }, []);

  // On click cross icon
  const handleSignatureClose = useCallback(() => {
    setIsSignatureSection(false);
    setSignatureValue(signatureFormat);
  }, [signatureFormat]);

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(currentWorkspace?.users?.map((user) => ({
      name: user.display_name || '',
      src: user.profile_url || '',
      isName: true,
      user_id: user.id,
    })) || []),
  ];

  /*
   * @desc Update ticket details priority in ticket details
   */
  const onChangePriority = useCallback(
    async (item: { name: string; icon: string; value: PriorityLevels }) => {
      if (ticketDetails?.priority === item?.value) return;
      const payload = { priority: item?.value };
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...ticketDetails,
            priority: item?.value,
          };
          ticketStore.setTicketDetails(updatedTicketDetails);
          const result = await updateTicketPriority(ticketDetails?.id, payload);
          if (result) {
            loadData();
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [loadData, ticketDetails, ticketStore],
  );

  /*
   * @desc Update ticket details assign user in ticket details
   */
  const onChangeAssign = useCallback(
    async (item: {
      name: string;
      icon: string;
      value: PriorityLevels;
      user_id: string;
    }) => {
      const payload = { assignee: item?.user_id || null };
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...ticketDetails,
            assigned_to: item?.user_id || null,
          };
          ticketStore.setTicketDetails(updatedTicketDetails);
          const result = await updateAssignee(ticketDetails?.id, payload);
          if (result) {
            loadData();
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [loadData, ticketDetails, ticketStore],
  );
  const assignedUser = currentWorkspace?.users?.find(
    (user: { id: string | null | undefined }) => user.id === assigned_to,
  );

  /*
   * @desc Close ticket
   */
  const handleTicketStatus = useCallback(
    async (status: TicketStatus) => {
      try {
        const payload = { status };
        const newMessage = {
          assignee: null,
          author: user,
          author_id: user!.id,
          content: '',
          created_at: new Date(),
          id: getUniqueId(),
          label: null,
          reference_id: status,
          ticket_id: ticketDetails?.id,
          type: MessageType.CHANGE_STATUS,
        } as MessageDetails;
        if (ticketDetails?.id) {
          const updatedTicketDetails = { ...ticketDetails, status };
          ticketStore.addTicketMessage(newMessage);
          ticketStore.setTicketDetails(updatedTicketDetails);
          await changeTicketStatus(ticketDetails?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetails, ticketStore, user],
  );
  /*
   * @desc Send comment
   */
  const handleCommentSend = useCallback(
    async (content: string, mode: string) => {
      if (!content || content === '' || content === null) {
        messageStore.setErrorMessage('Please add message');
        return;
      }
      let type;
      if (mode !== 'Email') {
        type = MessageType.REGULAR;
      } else {
        type = MessageType.EMAIL;
      }
      const updatedAttachments = attachFile?.map((file, index) => ({
        ...(file || {}),
        contentId: `cid:${Date.now() + index}`, // Generating a unique contentId
        size: file.size?.toString(),
        contentType: file?.contentType ?? '',
      }));
      const payload = {
        content: isSignatureSection ? `${content} ${signatureValue}` : content,
        type,
        attachmentToken: attachFile?.length > 0 ? messageRefId : undefined,
      };
      const newMessage = {
        assignee: null,
        author: user,
        attachments: updatedAttachments,
        author_id: user!.id,
        content: isSignatureSection ? `${content} ${signatureValue}` : content,
        id: getUniqueId(),
        created_at: new Date(),
        label: null,
        reference_id: '',
        ticket_id,
        type,
        reactions: [] as Reaction[],
        // add default ready_by field
      } as MessageDetails;

      try {
        if (ticket_id) {
          setCommentValue('');
          editorRef?.current?.clearEditor();
          setAttachFiels([]);
          setIsSignatureSection(false);
          ticketStore.addTicketMessage(newMessage);
          const res = await sendMessage(ticket_id, payload);
          ticketStore.updateMessageId(res.id, newMessage.id);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [
      attachFile,
      isSignatureSection,
      signatureValue,
      messageRefId,
      user,
      ticket_id,
      ticketStore,
    ],
  );

  /*
   * @desc add/remove label to ticket
   */
  const handleTicketLabel = useCallback(
    async (props: HandleClickProps) => {
      const { isChecked, labelId } = props;
      try {
        if (ticketDetails?.id && labelId) {
          if (isChecked) {
            const result = await deleteLabelFromTicket(
              ticketDetails?.id,
              labelId,
            );
            if (result) {
              const newLabel = ticketDetails.labels.filter(
                (item) => item.id !== labelId,
              );
              ticketStore.setTicketDetails({
                ...(ticketDetails || {}),
                labels: newLabel,
              });
            }
          } else {
            const result = await addLabelToTicket(ticketDetails?.id, labelId);
            if (result) {
              const newLabel = labels?.find((item) => item.id === labelId);
              const ticketLabels = ticketDetails.labels || [];
              if (newLabel) ticketLabels.push(newLabel);
              ticketStore.setTicketDetails({
                ...(ticketDetails || {}),
                labels: ticketLabels,
              });
            }
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [labels, ticketDetails, ticketStore],
  );

  /*
   * @desc Render message based on message type
   */
  const renderActivityMessage = useCallback(
    (message: MessageDetails, hideAvatarLine: boolean) => {
      switch (message.type) {
        case MessageType.REGULAR: {
          const reactionData = message?.reactions.reduce(
            (acc: ReactionProps[], { reaction, author }) => {
              const existing = acc.find((item) => item.emoji === reaction);
              if (existing) {
                existing.count++;
                existing.author.push(author);
              } else {
                acc.push({ emoji: reaction, count: 1, author: [author] });
              }
              return acc;
            },
            [],
          );
          return (
            <ActivityDiv>
              <div className='avtar-internal'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <InternalMessageCard
                title={message?.content || ''}
                time={message?.created_at}
                reactions={reactionData}
                showReactions={reactionData?.length > 0}
                attachments={message?.attachments}
                messageId={message.id}
                message={message?.author?.profile_url || ''}
                messageName={message?.author?.display_name || ''}
              />
            </ActivityDiv>
          );
        }
        case MessageType.FROM_CONTACT:
          return (
            <ActivityDiv>
              <div className='avtar'>
                <Avatar
                  imgSrc={''}
                  name={contactDetails?.name || ''}
                  size={20}
                />
              </div>
              <MessageCard
                title={`${contactDetails?.name} sent ${message.channel === ChannelType.WEB ? 'a message' : 'an email'}`}
                time={message?.created_at}
                subTitle={'To Teamcamp Support '}
                message={message.content || ''}
                attachments={message?.attachments}
                messageImg={''}
                messageName={contactDetails?.name || ''}
              />
            </ActivityDiv>
          );
        case MessageType.EMAIL:
          return (
            <ActivityDiv>
              <div className='avtar'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <MessageCard
                // eslint-disable-next-line max-len
                title={`${message?.author?.display_name} sent ${message.channel === ChannelType.WEB ? 'a message' : 'an email'}`}
                time={message?.created_at}
                subTitle={`To ${contactDetails?.email}`}
                message={message.content || ''}
                readBy={message.read_by}
                attachments={message?.attachments}
                messageImg={message?.author?.profile_url || ''}
                messageName={message?.author?.display_name || ''}
              />
            </ActivityDiv>
          );
        case MessageType.CHANGE_PRIORITY:
          return (
            <ActivityDiv>
              <div className='avtar-activity'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <Message hideAvatarLine={hideAvatarLine}>
                {message?.author?.display_name || ''}{' '}
                <span>set priority to</span>{' '}
                {capitalizeString(message?.reference_id)}
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>{moment(message?.created_at).fromNow()}</span>
              </Message>
            </ActivityDiv>
          );
        case MessageType.CHANGE_ASSIGNEE:
          return (
            <ActivityDiv>
              <div className='avtar-activity'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <Message hideAvatarLine={hideAvatarLine}>
                {message?.author?.display_name || ''}{' '}
                <span>
                  {message?.assignee?.display_name
                    ? 'assigned this ticket to'
                    : 'unassigned this ticket'}
                </span>{' '}
                {message?.assignee?.display_name || ''}
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>{moment(message?.created_at).fromNow()}</span>
              </Message>
            </ActivityDiv>
          );
        case MessageType.CHANGE_STATUS:
          return (
            <ActivityDiv>
              <div className='avtar-activity'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <Message hideAvatarLine={hideAvatarLine}>
                {message?.author?.display_name || ''}{' '}
                <span>
                  {message?.reference_id === 'SNOOZE'
                    ? 'snooze this ticket till'
                    : 'changed ticket status to '}
                </span>{' '}
                {message?.reference_id === 'SNOOZE'
                  ? `${message?.content}`
                  : capitalizeString(message.reference_id)}
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>{moment(message?.created_at).fromNow()}</span>
              </Message>
            </ActivityDiv>
          );
        default:
          return <>{message.content}</>;
      }
    },
    [contactDetails?.name, contactDetails?.email],
  );

  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const convertBase64 = useCallback((file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      const dynamicFilename = `cid:${generateRandomFilename()}+${file?.name}`;
      fileReader.onload = () => {
        const item = {
          fileContent: fileReader.result,
          fileType: file?.type,
          name: dynamicFilename,
          size: file?.size,
          file: file,
        };
        resolve(item);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }, []);

  const handleFileRead = useCallback(
    async (file: File) => {
      const newPromise = convertBase64(file);
      try {
        const value = await Promise.all([newPromise]);
        return value[0];
      } catch (error) {
        console.log('error', error);
      }
    },
    [convertBase64],
  );

  const onFileUpload = useCallback(
    async (event: { target: { files: FileList | null } }) => {
      try {
        if (event.target.files && event.target.files?.length > 0) {
          const fileObj = event.target.files[0];
          if (fileObj?.size > 2.5e8) {
            messageStore.setErrorMessage(
              'Please upload a file smaller than 250 MB.',
            );
            return false;
          }
          const fileData: any = await handleFileRead(fileObj);
          if (!isEmpty(fileData?.fileContent)) {
            if (
              ['image/jpeg', 'image/jpg', 'image/png']?.includes(
                fileData?.fileType,
              )
            ) {
              editorRef?.current?.uploadFile(
                fileData?.file,
                `tickets/${ticket_id}/temp/${messageRefId}/attachments`,
                fileData?.name,
              );
              return;
            }

            const fileUrl = await getFirebaseUrlFromFile(
              fileData?.file,
              `tickets/${ticket_id}/temp/${messageRefId}/attachments`,
              fileData?.name,
            );
            if (fileUrl) {
              // if (
              //   ['image/jpeg', 'image/jpg', 'image/png']?.includes(
              //     fileData?.fileType,
              //   )
              // ) {
              //   editorRef?.current?.uploadFile(fileUrl);
              // }
              setAttachFiels([
                ...(attachFile || []),
                {
                  fileName: fileData?.file?.name,
                  contentType: fileData?.fileType,
                  size: fileData?.size,
                  downloadUrl: fileUrl,
                },
              ]);
            }
          }
        }
      } catch (e) {
        console.log('Error while uploading file : ', e);
      }
    },
    [handleFileRead, ticket_id, messageRefId, attachFile],
  );

  useEffect(() => {
    const handleResize = () => {
      // eslint-disable-next-line no-undef
      setScreenWidth(window.innerWidth);
    };

    // eslint-disable-next-line no-undef
    window.addEventListener('resize', handleResize);
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect to manage the height of the top div and update the CSS variable accordingly
  useEffect(() => {
    // Function to update the CSS variable '--top-div-height' based on the top div's height
    const updateTopDivHeight = () => {
      const topDiv = document.querySelector('.top-div') as HTMLElement;
      if (topDiv) {
        const topDivHeight = topDiv.offsetHeight;
        // Update the CSS variable with the current height
        document.documentElement.style.setProperty(
          '--top-div-height',
          `${topDivHeight}px`,
        );
      }
    };

    // Perform an initial height calculation
    updateTopDivHeight();
    // Add event listener to recalculate height on window resize
    window.addEventListener('resize', updateTopDivHeight);

    // Cleanup: remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateTopDivHeight);
    };
  }, []);

  return (
    <Main isProfileSection={isProfileSection}>
      <MainDiv>
        <TopDiv className='top-div'>
          <HeaderDiv>
            <LeftDiv>
              <Icon
                onClick={() => {
                  router.push('/');
                }}
                iconName='back-icon'
                iconSize='12'
                iconViewBox='0 0 16 16'
                size={true}
              />
              <Title>{ticketDetails?.title || ''}</Title>
            </LeftDiv>
            {/* Remove three dot icon from header */}
            {/* <Icon
              onClick={() => messageStore.setErrorMessage('hello demo')}
              iconName='three-dot-icon'
              iconSize='16'
              iconViewBox='0 0 16 16'
            /> */}
            <Icon
              iconName={
                isProfileSection
                  ? 'profile-sidebar-active-icon'
                  : 'profile-sidebar-icon'
              }
              iconSize='16'
              iconViewBox='0 0 16 16'
              className='sidebar-icon'
              onClick={onClickIcon}
            />
            {/* <Icon
              iconName='profile-sidebar-active-icon'
              iconSize='16'
              iconViewBox='0 0 16 16'
              className='sidebar-icon'
              onClick={onClickIcon}
            /> */}
          </HeaderDiv>
          <StatusDiv isProfileSection={isProfileSection}>
            <ButtonDiv>
              <LabelDropdown
                handleClick={handleTicketLabel}
                iconTitlePairs={
                  ticketDetails?.labels?.map((label) => ({
                    iconName: label.icon,
                    title: label.name,
                  })) || []
                } // Updated to pass an array of icon-title pairs
                onClose={() => {
                  setLabelDropdown(false);
                }}
                dropDown={labelDropdown}
                onClick={handleLabelTag}
                ticketLabelData={ticketDetails?.labels}
                onMouseEnter={(e: any) =>
                  handleMouseEnter(e, setSubmenuPosition)
                }
              />
              <DropDownWithTag
                onClick={handlePriorityTag}
                title={'Priority'}
                iconName={`priority-${priority || 'NONE'}`}
                dropdownOpen={priorityDropdown}
                onClose={() => setPriorityDropdown(false)}
                items={priorityItem}
                onChange={onChangePriority}
                selectedValue={{ name: priority || 'NONE' }}
                isTag={true}
                isActive={true}
              />
              <AssigneeDropdown
                onClick={handleAssignTag}
                selectedValue={assignedUser}
                dropdownOpen={assignDropdown}
                onClose={() => setAssignDropdown(false)}
                items={assignItem}
                onChange={onChangeAssign}
                isActive={true}
                iconSize='20'
              />
            </ButtonDiv>
            <ButtonDiv>
              {ticketDetails?.status !== TicketStatus.CLOSED ? (
                <Tag
                  title='Close'
                  iconName='close-icon'
                  isActive={false}
                  onClick={() => handleTicketStatus(TicketStatus.CLOSED)}
                  isName={false}
                />
              ) : (
                <Tag
                  title='Re-Open'
                  iconName='close-icon'
                  isActive={false}
                  onClick={() => handleTicketStatus(TicketStatus.OPEN)}
                  isName={false}
                />
              )}
              <SnoozeDropdown
                onClick={handleSnoozeTag}
                dropdownOpen={snoozeDropdown}
                onClose={() => setSnoozeDropdown(false)}
                user={user}
                ticketDetails={ticketDetails}
                isActive={snoozeDropdown ? true : false}
              />
            </ButtonDiv>
          </StatusDiv>
        </TopDiv>
        {isProfileSection && screenWidth <= 768 ? (
          <ResponsiveProfileSection />
        ) : (
          <CenterMainDiv>
            <BottomDiv>
              <CenterDiv ref={messagesEndRef}>
                {messages?.map((message, index) => {
                  const hideAvatarLine =
                    index === messages?.length - 1 ||
                    (messages?.[index + 1] &&
                      (messages?.[index + 1]?.type === MessageType.EMAIL ||
                        messages?.[index + 1]?.type ===
                          MessageType.FROM_CONTACT ||
                        messages?.[index + 1]?.type === MessageType.REGULAR));
                  return (
                    <div key={index}>
                      {renderActivityMessage(message, hideAvatarLine)}
                      {isLargeScreen && index !== messages?.length - 1 && (
                        <LineDiv />
                      )}
                      {!isLargeScreen &&
                        !hideAvatarLine &&
                        (message.type === MessageType.CHANGE_ASSIGNEE ||
                          message.type === MessageType.CHANGE_LABEL ||
                          message.type === MessageType.CHANGE_PRIORITY ||
                          message.type === MessageType.CHANGE_STATUS) && (
                          <LineDiv />
                        )}
                    </div>
                  );
                })}
              </CenterDiv>
            </BottomDiv>
            <InputDiv>
              <div className='input-main-div'>
                <div className='line' />
                <div className='avtar'>
                  <Avatar
                    imgSrc={user?.profile_url || ''}
                    size={20}
                    name={user?.display_name || ''}
                  />
                </div>
                <Input modeSelectedItem={modeSelectedItem}>
                  <TiptapEditor
                    ref={editorRef}
                    valueContent={commentValue}
                    setValueContent={setCommentValue}
                    placeHolder='Write a message'
                    isInternalDiscussion={modeSelectedItem.name !== 'Email'}
                    handleFileInput={handleFileInput}
                  />
                  <div className='attach-file-div'>
                    {/* Attached Files render */}
                    {attachFile?.map((fileData, index: number) => (
                      <FileCard
                        key={index}
                        documentText={fileData?.fileName || 'Uploaded file'}
                        fileSize={`${fileData?.size}`}
                        fileName={fileData?.fileName}
                        url={fileData?.downloadUrl}
                        type={fileData?.contentType}
                      />
                    ))}
                  </div>
                  {uploadLoading !== null && (
                    <p className='loading-text'>
                      Loading...({Math.floor(uploadLoading)}%)
                    </p>
                  )}
                  {isSignatureSection && (
                    <TiptapEditor
                      valueContent={signatureValue}
                      setValueContent={setSignatureValue}
                      isSignature={true}
                      handleClickCross={handleSignatureClose}
                    />
                  )}
                  <InputIcon modeSelectedItem={modeSelectedItem}>
                    <div className='drop-tag'>
                      <DropDownWithTag
                        onClick={handleMessageModeTag}
                        selectedValue={modeSelectedItem}
                        dropdownOpen={messageModeDropdown}
                        title='Email'
                        onClose={() => {
                          setMessageModeDropdown(false);
                        }}
                        items={modeItem}
                        onChange={handleModeItemChange}
                        isTag={true}
                        iconName={modeSelectedItem?.icon}
                        iconSize='12'
                        iconViewBox='0 0 12 12'
                        isActive={messageModeDropdown ? true : false}
                        className={
                          submenuPosition === 'upwards'
                            ? 'submenu-upwards'
                            : 'submenu-downwards'
                        }
                        onMouseEnter={(e: any) =>
                          handleMouseEnter(e, setSubmenuPosition)
                        }
                        dropDownStyle={{ maxWidth: 142, width: '100%' }}
                        tagStyle={{
                          backgroundColor: (() => {
                            if (modeSelectedItem?.name === 'Email') {
                              return `var(--bg-surface-secondary)`;
                            } else if (modeSelectedItem?.name === 'Internal') {
                              return `var(--bg-surface-secondary-hover)`;
                            } else {
                              return undefined;
                            }
                          })(),
                        }}
                      />
                      {(macros.length > 0 ||
                        currentWorkspace?.role === UserRole.OWNER ||
                        currentWorkspace?.role === UserRole.ADMIN) && (
                        <div className='tag-div'>
                          <Icon
                            iconName='sticky-note-icon'
                            iconSize='12'
                            iconViewBox='0 0 12 12'
                            size={true}
                            onClick={handleMacroItem}
                            isActive={true}
                            className='icon'
                          />
                          {macroDropdown && (
                            <DropDown
                              items={macros}
                              labelField='title'
                              onClose={handleOutsideClick}
                              onChange={handleMacroSelect}
                              iconSize={''}
                              iconViewBox={''}
                              style={{
                                bottom: 52,
                                maxWidth: 146,
                                width: '100%',
                              }}
                              isMacro={
                                currentWorkspace?.role === UserRole.OWNER ||
                                currentWorkspace?.role === UserRole.ADMIN
                              }
                            />
                          )}
                        </div>
                      )}
                      <Icon
                        iconName='email-signature-icon'
                        iconSize='12'
                        iconViewBox='0 0 12 12'
                        size={true}
                        isActive={true}
                        onClick={handleSignature}
                        className='icon'
                      />
                    </div>
                    <IconDiv modeSelectedItem={modeSelectedItem}>
                      <Icon
                        iconName='attach-icon'
                        iconSize='12'
                        iconViewBox='0 0 12 12'
                        size={true}
                        onClick={handleFileInput}
                      />
                      <Icon
                        onClick={() =>
                          handleCommentSend(commentValue, modeSelectedItem.name)
                        }
                        iconName='send-icon'
                        iconSize='12'
                        iconViewBox='0 0 12 12'
                        size={true}
                        isActive={true}
                        className='icon'
                      />
                    </IconDiv>
                  </InputIcon>
                  <input
                    type='file'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onFileUpload}
                    multiple
                  />
                </Input>
              </div>
            </InputDiv>
          </CenterMainDiv>
        )}
      </MainDiv>
      <ProfileSection />
    </Main>
  );
}

export default observer(TicketDetails);
