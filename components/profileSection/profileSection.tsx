/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import {
  DetailsDiv,
  DetailsProfileDiv,
  LeftDiv,
  MainDiv,
  ProfileDiv,
  Title,
  TopDiv,
} from './styles';
import WorkDetails from './workDetails';
import RecentEvent from './recentEvent';
import AIBlock from './aiBlock';
import { useStores } from '@/stores';
import { capitalizeString, formatTime, isEmpty } from '@/helpers/common';
import { getContactGroups } from '@/services/clientSide/contactServices';
import { ContactGroups } from '@/utils/dataTypes';

interface ContactInfo {
  label: string;
  value: string;
}

export default function ProfileSection() {
  const { ticketStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact } = ticketDetails || {};
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
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
        value: contact.website,
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

    if (contact?.custom_traits) {
      Object.entries(contact.custom_traits).forEach(([key, value]) => {
        if (value) {
          // Convert the key to a human-readable label
          const label = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
          contactArray.push({
            label,
            value: capitalizeString(value),
          });
        }
      });
    }

    if (contact?.created_at) {
      contactArray.push({
        label: 'Created',
        value: `${formatTime(contact.created_at.toString())} ago`,
      });
    }
    if (contact?.updated_at) {
      contactArray.push({
        label: 'Updated',
        value: `${formatTime(contact.updated_at.toString())} ago`,
      });
    }
    setContactInfo(contactArray);
  }, [contact]);

  const loadData = useCallback(async () => {
    if (!isEmpty(contact?.id)) {
      setLoading(true);
      try {
        const contactGroupInfo = await getContactGroups(contact?.id || '');
        setWorkInfo(contactGroupInfo);
      } catch (err: any) {
        console.error('Error fetching contact group information:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [contact?.id]);

  const handleRefresh = async () => {
    setLoading(true); // Show loading state
    // Increment rotation by 360 degrees on each click
    setRotation((prevRotation) => prevRotation + 360);
    try {
      await loadData(); // Reload the data
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false); // Hide loading state after the data is refreshed
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    createContactInfo();
  }, [contact]);

  return (
    <MainDiv>
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
            {contactInfo.map((item, index) => (
              <DetailsDiv key={index}>
                <LeftDiv>
                  <p>{item?.label}</p>
                </LeftDiv>
                <p>{item?.value}</p>
              </DetailsDiv>
            ))}
          </>
        )}
      </DetailsProfileDiv>

      {workInfo?.map((group) => <WorkDetails groupInfo={group} />)}
      <RecentEvent />
    </MainDiv>
  );
}
