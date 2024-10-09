/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import Avatar from '../avtar/Avtar';
import {
  DetailsDiv,
  DetailsProfileDiv,
  LeftDiv,
  ProfileDiv,
  ResponsiveMainDiv,
  Title,
} from './styles';
import WorkDetails from './workDetails';
import RecentEvent from './recentEvent';
import AIBlock from './aiBlock';
import { useStores } from '@/stores';
import { capitalizeString, formatTime } from '@/helpers/common';

interface ContactInfo {
  label: string;
  value: string;
}

export default function ResponsiveProfileSection() {
  const { ticketStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact } = ticketDetails || {};
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);

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

  useEffect(() => {
    createContactInfo();
  }, [contact]);

  return (
    <ResponsiveMainDiv>
      <AIBlock />
      <ProfileDiv>
        <Avatar
          imgSrc={contact?.avatar || ''}
          name={contact?.name || 'Unknown'}
          size={20}
          isShowBorder={true}
        />
        <Title>{contact?.name || ''}</Title>
      </ProfileDiv>
      <DetailsProfileDiv>
        {contactInfo.map((item, index) => (
          <DetailsDiv key={index}>
            <LeftDiv>
              <p>{item?.label}</p>
            </LeftDiv>
            <p>{item?.value}</p>
          </DetailsDiv>
        ))}
      </DetailsProfileDiv>
      <WorkDetails />
      <RecentEvent />
    </ResponsiveMainDiv>
  );
}
