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
import SVGIcon from '@/assets/icons/SVGIcon';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { useStores } from '@/stores';
import {
  resendVerificationCode,
  verifyAuthCode,
  verifyUserEmail,
} from '@/services/clientSide/authService';
import { appInit } from '@/helpers/appInitHelper';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import { isEmpty } from '@/helpers/common';
import {
  Bottom,
  CodeSection,
  Form,
  Heading,
  LoginSection,
  LoginText,
  MainDiv,
  TimeText,
  TitleDiv,
} from './style';

const INITIAL_TIMER = 5 * 60;

function Login() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const [email, setUserEmail] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();
  const { userStore } = useStores();
  const { loading } = userStore;
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
        else if (result === true) router.push('/');
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
    router.prefetch('/');
  }, [router]);

  //Start counter for resend code enable
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

  // Login first step - validate user email
  const handleContinueClick = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await verifyUserEmail(email);
      if (result) {
        startCounter();
        setShowBottomSection(true);
      }
    },
    [email],
  );

  //Login second step - verify code
  const onVerifyAuthCode = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await verifyAuthCode(email, code);
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
        else router.push('/');
      } catch (e) {
        console.log('Error : ', e);
      } finally {
        userStore.setLoading(false);
      }
    }
  };

  // Resend code
  const onResendCode = useCallback(async () => {
    if (counter > 0) return;
    const result = await resendVerificationCode(email);
    if (result) {
      setCounter(INITIAL_TIMER);
      startCounter();
    }
  }, [counter, email]);

  // Use memo function for counter show
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
            <TitleDiv>
              <LoginText>
                {showBottomSection ? 'Check your email' : 'Login'}
              </LoginText>
              {showBottomSection && (
                <p>
                  We have sent a temporary code to <span>{email}</span>
                </p>
              )}
            </TitleDiv>
          </Heading>
          {!showBottomSection ? (
            // Login first step
            <>
              <Form onSubmit={handleContinueClick}>
                <Input
                  type={'text'}
                  placeholder='Email address'
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserEmail(e.target.value)
                  }
                />
                <Button
                  title='Login'
                  width={true}
                  className='button'
                  type='submit'
                  isLoading={loading}
                />
              </Form>
              <Bottom>
                <p>Don’t have an account?</p>
                <p>
                  <a href='/signup'>Create New Account</a>
                </p>
              </Bottom>
            </>
          ) : (
            // Login second step
            <CodeSection onSubmit={onVerifyAuthCode}>
              <Input
                placeholder={'Enter Code'}
                type={'number'}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
              />
              <Button title='Login' width isLoading={loading} type='submit' />
              {Counter}
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}

export default observer(Login);
