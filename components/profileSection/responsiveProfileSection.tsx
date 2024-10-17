/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import {
  DetailsDiv,
  DetailsProfileDiv,
  LeftDiv,
  ProfileDiv,
  ResponsiveMainDiv,
  Title,
  TopDiv,
} from './styles';
import WorkDetails from './workDetails';
import RecentEvent from './recentEvent';
import AIBlock from './aiBlock';
import { useStores } from '@/stores';
import { capitalizeString, isEmpty } from '@/helpers/common';
import { ContactGroups } from '@/utils/dataTypes';
import {
  getContactDetailById,
  getContactGroups,
  refreshContact,
} from '@/services/clientSide/contactServices';

interface ContactInfo {
  label: string;
  value: string;
  link?: string;
}

const ResponsiveProfileSection = () => {
  const { ticketStore, contactStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact_id } = ticketDetails || {};
  const { contactDetails: contact } = contactStore || {};
  const [displayContactInfo, setDisplayContactInfo] = useState<ContactInfo[]>(
    [],
  );
  const [workInfo, setWorkInfo] = useState<ContactGroups[]>([]);
  const [rotation, setRotation] = useState(0); // Manage rotation state
  const [loading, setLoading] = useState(false);

  const createContactInfo = useCallback(() => {
    const contactArray: ContactInfo[] = [];
    if (contact?.email) {
      contactArray.push({ label: 'Email', value: contact.email });
    }

    if (contact?.title) {
      contactArray.push({ label: 'Title', value: contact.title });
    }

    if (contact?.description) {
      contactArray.push({ label: 'Description', value: contact.description });
    }

    if (contact?.username) {
      contactArray.push({ label: 'Username', value: contact.username });
    }

    if (contact?.name) {
      contactArray.push({ label: 'Name', value: contact.name });
    }

    if (contact?.first_name) {
      contactArray.push({ label: 'First Name', value: contact.first_name });
    }

    if (contact?.last_name) {
      contactArray.push({ label: 'Last Name', value: contact.last_name });
    }

    if (contact?.age) {
      contactArray.push({ label: 'Age', value: contact.age.toString() });
    }
    if (contact?.birthday) {
      contactArray.push({
        label: 'Birthday',
        value: moment(contact.birthday).format('DD/MM/YYYY'),
      });
    }
    if (contact?.gender) {
      contactArray.push({
        label: 'Gender',
        value: capitalizeString(contact.gender),
      });
    }
    if (contact?.phone) {
      contactArray.push({
        label: 'Phone',
        value: contact.phone,
      });
    }
    if (contact?.website) {
      contactArray.push({
        label: 'Website',
        value: 'Link',
        link: contact.website,
      });
    }

    if (contact?.address) {
      Object.entries(contact.address).forEach(([key, value]) => {
        if (value) {
          // Convert the key to a human-readable label
          const label = key
            .replace(/_/g, ' ')
            .replace(/^./, (str) => str.toUpperCase());
          contactArray.push({
            label,
            value,
          });
        }
      });
    }

    // For custom traits
    // if (contact?.custom_traits) {
    //   Object.entries(contact.custom_traits).forEach(([key, value]) => {
    //     if (value) {
    //       // Convert the key to a human-readable label
    //       const label = key
    //         .replace(/([A-Z])/g, ' $1')
    //         .replace(/^./, (str) => str.toUpperCase());
    //       if (
    //         typeof value === 'string' &&
    //         (value.startsWith('https') || value.startsWith('http'))
    //       ) {
    //         contactArray.push({
    //           label,
    //           value: 'Link',
    //           link: value,
    //         });
    //       } else if (!isNaN(new Date(value).getTime())) {
    //         const formattedTime = formatTime(contact.created_at.toString());
    //         contactArray.push({
    //           label,
    //           value: formattedTime === 'Now' ? 'Now' : `${formattedTime} ago`,
    //         });
    //       } else {
    //         contactArray.push({
    //           label,
    //           value: capitalizeString(value),
    //         });
    //       }
    //     }
    //   });
    // }

    // For created
    // if (contact?.created_at) {
    //   const formattedTime = formatTime(contact.created_at.toString());
    //   contactArray.push({
    //     label: 'Created',
    //     value: formattedTime === 'Now' ? 'Now' : `${formattedTime} ago`,
    //   });
    // }

    // For updated
    // if (contact?.updated_at) {
    //   const formattedTime = formatTime(contact.updated_at.toString());
    //   contactArray.push({
    //     label: 'Updated',
    //     value: formattedTime === 'Now' ? 'Now' : `${formattedTime} ago`,
    //   });
    // }
    setDisplayContactInfo(contactArray);
  }, [contact]);

  const loadData = useCallback(async () => {
    if (!isEmpty(contact?.id)) {
      setLoading(true);
      try {
        const contactGroupInfo = await getContactGroups(contact?.id || '');
        setWorkInfo(contactGroupInfo);
        await getContactDetailById(contact_id || '');
      } catch (err: any) {
        console.error('Error fetching contact group information:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [contact_id]);

  const handleRefresh = useCallback(async () => {
    setLoading(true); // Show loading state
    // Increment rotation by 360 degrees on each click
    setRotation((prevRotation) => prevRotation + 360);
    try {
      await refreshContact(contact_id || '');
      await getContactGroups(contact_id || '');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false); // Hide loading state after the data is refreshed
    }
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      contactStore.setContactDetails(null);
    };
  }, [loadData]);

  useEffect(() => {
    if (contact) {
      createContactInfo();
    }
  }, [contact, createContactInfo]);

  return (
    <ResponsiveMainDiv>
      <AIBlock />
      <TopDiv>
        <ProfileDiv>
          <Avatar
            imgSrc={contact?.avatar || ''}
            name={contact?.name || 'Unknown'}
            size={20}
            isShowBorder={true}
          />
          <Title>{contact?.name || ''}</Title>
        </ProfileDiv>
        <Icon
          iconName='refresh-icon'
          iconSize='12'
          iconViewBox='0 0 12 12'
          size={true}
          className='refresh-icon'
          onClick={handleRefresh}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 1s linear',
          }}
        />
      </TopDiv>
      <DetailsProfileDiv>
        {loading ? (
          'Loading...'
        ) : (
          <>
            {displayContactInfo.map((item, index) => (
              <DetailsDiv key={index}>
                <LeftDiv>
                  <p>{item?.label}</p>
                </LeftDiv>
                {item.link ? (
                  <p>
                    <a href={item.link}>{item.value}</a>
                  </p>
                ) : (
                  <p>{item?.value}</p>
                )}
              </DetailsDiv>
            ))}
          </>
        )}
      </DetailsProfileDiv>
      {workInfo?.map((group) => <WorkDetails groupInfo={group} />)}
      <RecentEvent />
    </ResponsiveMainDiv>
  );
};
export default observer(ResponsiveProfileSection);
