'use client';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useSession } from 'next-auth/react';
import {
  Bottom,
  CodeSection,
  Form,
  Heading,
  LoginSection,
  LoginText,
  MainDiv,
  TimeText,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import {
  registerUser,
  resendVerificationCode,
  verifyAuthCode,
} from '@/services/clientSide/authService';
import { useStores } from '@/stores';
import { appInit } from '@/helpers/appInitHelper';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import { isEmpty } from '@/helpers/common';
const INITIAL_TIMER = 5 * 60;

function Signup() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const { userStore } = useStores();
  const { loading } = userStore;
  const router = useRouter();

  const { status } = useSession();

  // Check for session status if it's authenticated will check appInit
  const checkUserSession = useCallback(async () => {
    try {
      userStore.setLoading(true);
      if (status === 'authenticated') {
        const result = await appInit();
        if (
          result.type === APP_INIT_RESPONSE_TYPE.REDIRECT &&
          !isEmpty(result.path)
        )
          router.push(result.path);
      }
    } catch (e) {
      console.log('Error : ', e);
    } finally {
      userStore.setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    //Check session status
    checkUserSession();
    // Prefetch navigation routes
    router.prefetch('/onboarding');
    router.prefetch('/');
  }, [router]);

  //Start couter for resend code enable
  const startCounter = () => {
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 0) {
          clearInterval(counterInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // First step for signup process - add name and email of user
  const handleContinue = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await registerUser(userEmail, userName);
      if (result) {
        startCounter();
        setShowBottomSection(true);
      }
    },
    [userEmail, userName],
  );

  // Second step for signup process - Verify code send in email
  const handleSignUpClick = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const response = await verifyAuthCode(userEmail, code);
      if (response) {
        // Check App Init function and navigate to appropriate route
        try {
          userStore.setLoading(true);
          const result = await appInit();
          if (
            result.type === APP_INIT_RESPONSE_TYPE.REDIRECT &&
            !isEmpty(result.path)
          )
            router.push(result.path);
        } catch (e) {
          console.log('Error : ', e);
        } finally {
          userStore.setLoading(false);
        }
      }
    },
    [code, router, userEmail],
  );

  // Resend code in user's email
  const onResendCode = useCallback(async () => {
    if (counter > 0) return;
    const result = await resendVerificationCode(userEmail);
    if (result) {
      setCounter(INITIAL_TIMER);
      startCounter();
    }
  }, [counter, userEmail]);

  // Use memo function for counter
  const Counter = useMemo(() => {
    const minutes = `${Math.floor(counter / 60)}`.padStart(2, '0');
    const seconds = `${counter % 60}`.padStart(2, '0');
    return (
      <TimeText isActive={counter <= 0}>
        {minutes}:{seconds}
        {<a onClick={onResendCode}>Resend Code</a>}
      </TimeText>
    );
  }, [counter, onResendCode]);

  // Show loading state when session state is loading
  if (status === 'loading') {
    // TODO: return loading component
    return <></>;
  }

  return (
    <div>
      <MainDiv>
        <LoginSection>
          <Heading>
            <SVGIcon
              name='logo-icon'
              width='60px'
              height='60px'
              viewBox='0 0 20 20'
            />
            <LoginText>
              {showBottomSection ? 'Check your email' : 'Create an account'}
            </LoginText>
          </Heading>
          {!showBottomSection ? (
            // Second Step for signup process
            <>
              <Form onSubmit={handleContinue}>
                <div className='input-div'>
                  <Input
                    type={'text'}
                    placeholder='Name'
                    value={userName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUserName(e.target.value)
                    }
                  />
                  <Input
                    type={'text'}
                    placeholder='Email address'
                    value={userEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUserEmail(e.target.value)
                    }
                  />
                </div>
                <Button
                  title='Sign up'
                  width={true}
                  className='button'
                  isLoading={loading}
                  type='submit'
                />
              </Form>
              <Bottom>
                <p>
                  <a href='/login'>Back to Login</a>
                </p>
              </Bottom>
              <Bottom>
                <p>By continuing, you are indicating that you have</p>
                <p>
                  read and agree to the <a>Terms of Use</a> and
                </p>
                <p>
                  <a>Privacy Policy</a>
                </p>
              </Bottom>
            </>
          ) : (
            // Second Step for signup process
            <CodeSection onSubmit={handleSignUpClick}>
              <p>
                We have sent a temporary code to <span>{userEmail}</span>
              </p>
              <Input
                placeholder={'Enter Code'}
                type={'number'}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
              />
              <Button title='Sign up' type='submit' width isLoading={loading} />
              {Counter}
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}

export default observer(Signup);
