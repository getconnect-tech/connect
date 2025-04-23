'use client';
import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores';
import Avatar from '@/components/avtar/Avtar';
import {
  generateTimezoneOptions,
  getAPIErrorMessage,
  isEmpty,
} from '@/helpers/common';
import { TimeZone } from '@/utils/dataTypes';
import DropDown from '@/components/dropDown/dropDown';
import SVGIcon from '@/assets/icons/SVGIcon';
import { updateOfficeData } from '@/services/clientSide/workspaceServices';
import Button from '@/components/button/button';
import TimePickerSection from '../setting/workspaceprofile/timePickerSection';
import {
  CenterCard,
  Description,
  Form,
  Label,
  Bottom,
  Steps,
  NextProfile,
  Card,
  TimeZoneContentDiv,
  DropdownDiv,
  DropdownTrigger,
  TimeContentDiv,
} from './style';

interface TimezoneStepProps {
  // eslint-disable-next-line no-unused-vars
  setCurrentStep: (step: number) => void;
}

const TimezoneStep = ({ setCurrentStep }: TimezoneStepProps) => {
  // State variables
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [timeZone, setTimeZone] = useState<TimeZone | null>(null);
  const [fromTime, setFromTime] = useState<string | null>(null);
  const [toTime, setToTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  //   mobx store variables
  const {
    userStore: { user },
    messageStore,
  } = useStores();

  //   Handle the change of time
  const handleTimeChange = useCallback(
    (type: 'from' | 'to', _: any, timeString: string) => {
      const rawTime =
        typeof timeString === 'string' ? timeString : timeString[0];
      const formatted = dayjs(rawTime, ['h:mm A']).format('HH:mm');
      if (type === 'from') {
        setFromTime(formatted);
      } else {
        setToTime(formatted);
      }
    },
    [],
  );

  //   Handle the click of the next step button
  const handleNextStep = useCallback(async () => {
    if (fromTime === null || toTime === null) {
      messageStore.setErrorMessage('Please select time.');
      return;
    }
    setLoading(true);
    try {
      const result = await updateOfficeData({
        timeZone: timeZone?.id,
        startTime: fromTime,
        endTime: toTime,
      });
      if (result) {
        setCurrentStep(3);
      }
    } catch (err: any) {
      setLoading(false);
      messageStore.setErrorMessage(
        getAPIErrorMessage(err) || 'Getting error on office data!',
      );
    } finally {
      setLoading(false);
    }
  }, [fromTime, messageStore, setCurrentStep, timeZone?.id, toTime]);

  return (
    <>
      <CenterCard>
        <NextProfile>
          <Avatar
            imgSrc={user?.profile_url || ''}
            name={user?.display_name || ''}
            size={58}
          />
          <Description>
            <h2>Hello, {user?.display_name}</h2>
            <p>
              Set your office hours and easily update them anytime in settings!
            </p>
          </Description>
        </NextProfile>
        <Form>
          <Card>
            <TimeZoneContentDiv>
              <Label>Current Timezone</Label>
              <DropdownDiv className='tag-div'>
                <DropdownTrigger
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                  {!isEmpty(timeZone) ? timeZone?.name : 'Select timezone'}
                  <SVGIcon
                    name={isOpenDropdown ? 'up-arrow-icon' : 'down-arrow-icon'}
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </DropdownTrigger>
                {isOpenDropdown && (
                  <DropDown
                    items={generateTimezoneOptions()}
                    iconSize={'12'}
                    iconViewBox={'0 0 12 12'}
                    onClose={() => setIsOpenDropdown(false)}
                    className='timezone-dropdown'
                    onChange={(item) => {
                      setIsOpenDropdown(false);
                      setTimeZone(item);
                    }}
                  />
                )}
              </DropdownDiv>
            </TimeZoneContentDiv>
            <TimeContentDiv>
              <TimePickerSection
                label={'From'}
                onChange={(value, timeStr) =>
                  handleTimeChange('from', value, timeStr as string)
                }
              />
              <TimePickerSection
                label={'To'}
                onChange={(value, timeStr) =>
                  handleTimeChange('to', value, timeStr as string)
                }
              />
            </TimeContentDiv>
          </Card>
        </Form>
      </CenterCard>
      <Bottom>
        <Steps>
          <p>Step 2 of 3</p>
        </Steps>
        <Button title='Next' onClick={handleNextStep} isLoading={loading} />
      </Bottom>
    </>
  );
};

export default observer(TimezoneStep);
