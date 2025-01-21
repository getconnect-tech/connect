import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import { contactStore } from '@/stores/contactStore';
import { isEmpty } from '@/helpers/common';
import { ticketStore } from '@/stores/ticketStore';
import { getUserActivity } from '@/services/clientSide/ticketServices';
import {
  DetailsItemMainDiv,
  EventDetailDiv,
  EventNameDiv,
  NameDiv,
  SeeAllLink,
  Title,
  TitleDiv,
  WorkDetailMainDiv,
} from './styles';

function EventStats() {
  // Store data
  const { contactDetails } = contactStore || {};
  const { loading } = ticketStore;

  // State variables
  const [showDetails, setShowDetails] = useState(true);
  const [activityLoading, setActivityLoading] = useState(loading);
  const [showAll, setShowAll] = useState(false);
  const [eventInformation, setEventInformation] = useState<
    { name: string; value: number }[]
  >([]);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const eventsToShow = useMemo(() => {
    return showAll ? eventInformation : eventInformation.slice(0, 5);
  }, [eventInformation, showAll]);

  const handleShowAllToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const loadData = useCallback(async () => {
    if (contactDetails && !isEmpty(contactDetails?.id)) {
      try {
        setActivityLoading(true);
        const data = await getUserActivity(contactDetails?.id);
        if (data && data.length > 0) {
          const eventCountMap = new Map();

          for (const event of data) {
            const eventType = event.event_type;
            eventCountMap.set(
              eventType,
              (eventCountMap.get(eventType) || 0) + 1,
            );
          }

          const formattedData = Array.from(eventCountMap, ([name, value]) => ({
            name,
            value,
          })).sort((a, b) => b.value - a.value);

          setEventInformation(formattedData || []);
        }
      } catch (error) {
        console.error('Error loading ticket summary:', error);
      } finally {
        setActivityLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactDetails?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <WorkDetailMainDiv>
      <TitleDiv onClick={toggleDetails}>
        <NameDiv>
          <Title>Events Stats</Title>
        </NameDiv>
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
              <DetailsItemMainDiv>
                {eventsToShow?.map((event, index) => (
                  <EventNameDiv key={index}>
                    {event?.name} <span> ({event?.value})</span>
                  </EventNameDiv>
                ))}
              </DetailsItemMainDiv>
              {!showAll && eventInformation.length > 5 && (
                <SeeAllLink onClick={handleShowAllToggle}>Show all</SeeAllLink>
              )}
              {showAll && (
                <SeeAllLink onClick={handleShowAllToggle}>Show Less</SeeAllLink>
              )}
            </>
          )}
        </EventDetailDiv>
      )}
    </WorkDetailMainDiv>
  );
}

export default EventStats;
