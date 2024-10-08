'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dot,
  EventDetailDiv,
  EventDiv,
  EventMainDiv,
  Line,
  LineDiv,
  Title,
  TitleDiv,
} from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';
import { ticketStore } from '@/stores/ticketStore';
import { getUserActivity } from '@/services/clientSide/ticketServices';
import { formatTime, isEmpty } from '@/helpers/common';
import { UserActivity } from '@/utils/dataTypes';

export default function RecentEvent() {
  const [showDetails, setShowDetails] = useState(true);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const { ticketDetails, loading } = ticketStore;
  const [activityLoading, setActivityLoading] = useState(loading);
  const { contact } = ticketDetails || {};

  const formateEventName = (eventType: string) => {
    const prefix = '[Amplitude]';
    if (eventType.startsWith(prefix)) {
      return eventType.slice(prefix.length).trim();
    }
    return eventType;
  };

  const loadData = useCallback(async () => {
    if (contact && !isEmpty(contact?.id)) {
      try {
        setActivityLoading(true);
        const data = await getUserActivity(contact?.id);
        setUserActivity(data);
      } catch (error) {
        console.error('Error loading ticket summary:', error);
      } finally {
        setActivityLoading(false);
      }
    }
  }, [contact?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };
  return (
    <EventMainDiv>
      <TitleDiv onClick={toggleDetails}>
        <Title>Recent events</Title>
        <div className='icon'>
          <SVGIcon
            name={showDetails ? 'up-arrow-icon' : 'down-arrow-icon'}
            width='12'
            height='12'
            fill='none'
            viewBox='0 0 12 12'
          />
        </div>
      </TitleDiv>
      {showDetails && (
        <EventDetailDiv>
          {activityLoading ? (
            'Loading...'
          ) : (
            <>
              {userActivity.length > 0 &&
                userActivity.map((event: UserActivity, index) => (
                  <React.Fragment key={index}>
                    <EventDiv>
                      <h6>{formatTime(event.event_time)}</h6>
                      <div>
                        <Dot />
                        <Line />
                      </div>
                      <p>{formateEventName(event.event_type)}</p>
                    </EventDiv>
                    {index < userActivity.length - 1 && <LineDiv />}
                  </React.Fragment>
                ))}
            </>
          )}
        </EventDetailDiv>
      )}
    </EventMainDiv>
  );
}
