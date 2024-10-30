/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useStores } from '@/stores';
import { capitalizeString, isEmpty } from '@/helpers/common';
import {
  getContactDetailById,
  getContactGroups,
  refreshContact,
} from '@/services/clientSide/contactServices';
import { ContactGroups } from '@/utils/dataTypes';
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

interface ContactInfo {
  label: string;
  value: string;
  link?: string;
}

const ProfileSection = () => {
  const { ticketStore, contactStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact_id } = ticketDetails || {};
  const { contactDetails } = contactStore || {};
  const [displayContactInfo, setDisplayContactInfo] = useState<ContactInfo[]>(
    [],
  );
  const [workInfo, setWorkInfo] = useState<ContactGroups[]>([]);
  const [rotation, setRotation] = useState(0); // Manage rotation state
  const [loading, setLoading] = useState(false);

  const createContactInfo = useCallback(() => {
    const contactArray: ContactInfo[] = [];
    if (contactDetails?.email) {
      contactArray.push({ label: 'Email', value: contactDetails.email });
    }

    if (contactDetails?.title) {
      contactArray.push({ label: 'Title', value: contactDetails?.title });
    }

    if (contactDetails?.description) {
      contactArray.push({
        label: 'Description',
        value: contactDetails.description,
      });
    }

    if (contactDetails?.username) {
      contactArray.push({
        label: 'Username',
        value: contactDetails.username,
      });
    }

    if (contactDetails?.name) {
      contactArray.push({ label: 'Name', value: contactDetails.name });
    }

    if (contactDetails?.first_name) {
      contactArray.push({
        label: 'First Name',
        value: contactDetails.first_name,
      });
    }

    if (contactDetails?.last_name) {
      contactArray.push({
        label: 'Last Name',
        value: contactDetails.last_name,
      });
    }

    if (contactDetails?.age) {
      contactArray.push({
        label: 'Age',
        value: contactDetails.age.toString(),
      });
    }
    if (contactDetails?.birthday) {
      contactArray.push({
        label: 'Birthday',
        value: moment(contactDetails.birthday).format('DD/MM/YYYY'),
      });
    }
    if (contactDetails?.gender) {
      contactArray.push({
        label: 'Gender',
        value: capitalizeString(contactDetails.gender),
      });
    }
    if (contactDetails?.phone) {
      contactArray.push({
        label: 'Phone',
        value: contactDetails.phone,
      });
    }
    if (contactDetails?.website) {
      contactArray.push({
        label: 'Website',
        value: 'Click Here',
        link: contactDetails.website,
      });
    }

    if (contactDetails?.address) {
      Object.entries(contactDetails.address).forEach(([key, value]) => {
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
    // if (contactDetails?.custom_traits) {
    //   Object.entries(contactDetails.custom_traits).forEach(([key, value]) => {
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
    //           value: 'Click Here',
    //           link: value,
    //         });
    //       } else if (!isNaN(new Date(value).getTime())) {
    //         const formattedTime = formatTime(
    //           contactDetails.created_at.toString(),
    //         );
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
    // if (contactDetails?.created_at) {
    //   const formattedTime = formatTime(contactDetails.created_at.toString());
    //   contactArray.push({
    //     label: 'Created',
    //     value: formattedTime === 'Now' ? 'Now' : `${formattedTime} ago`,
    //   });
    // }

    // // For updated
    // if (contactDetails?.updated_at) {
    //   const formattedTime = formatTime(contactDetails.updated_at.toString());
    //   contactArray.push({
    //     label: 'Updated',
    //     value: formattedTime === 'Now' ? 'Now' : `${formattedTime} ago`,
    //   });
    // }
    setDisplayContactInfo(contactArray);
  }, [contactDetails]);

  const loadData = useCallback(async () => {
    if (!isEmpty(contact_id)) {
      setLoading(true);
      try {
        if (contact_id) {
          const contactGroupInfo = await getContactGroups(contact_id);
          setWorkInfo(contactGroupInfo);
          await getContactDetailById(contact_id);
        }
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
      if (contact_id) {
        await refreshContact(contact_id);
        const data = await getContactGroups(contact_id);
        setWorkInfo(data);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false); // Hide loading state after the data is refreshed
    }
  }, [contact_id]);

  useEffect(() => {
    loadData();
    return () => {
      contactStore.setContactDetails(null);
    };
  }, [loadData]);

  useEffect(() => {
    if (contactDetails) {
      createContactInfo();
    }
  }, [contactDetails, createContactInfo]);

  return (
    <MainDiv>
      <AIBlock />
      <TopDiv>
        <ProfileDiv>
          <Avatar
            imgSrc={contactDetails?.avatar || ''}
            name={contactDetails?.name || 'Unknown'}
            size={20}
            isShowBorder={true}
          />
          <Title>{contactDetails?.name || ''}</Title>
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
                    <Link target='_blank' href={item.link}>
                      {item.value}
                    </Link>
                  </p>
                ) : (
                  <p>{item?.value}</p>
                )}
              </DetailsDiv>
            ))}
          </>
        )}
      </DetailsProfileDiv>

      {workInfo?.map((group, index) => (
        <WorkDetails key={index} groupInfo={group} />
      ))}
      <RecentEvent />
    </MainDiv>
  );
};

export default observer(ProfileSection);
