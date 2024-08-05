'use client';
import React, {
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
import { isEmpty } from '@/helpers/common';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
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

  useEffect(() => {
    router.prefetch('/onboarding');
    router.prefetch('/');
  }, [router]);

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

  const handleSignUpClick = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await verifyAuthCode(userEmail, code);
      if (result) {
        router.push('/onboarding');
      }
    },
    [code, router, userEmail],
  );

  const onResendCode = useCallback(async () => {
    if (counter > 0) return;
    const result = await resendVerificationCode(userEmail);
    if (result) {
      setCounter(INITIAL_TIMER);
      startCounter();
    }
  }, [counter, userEmail]);

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

  if (status === 'authenticated') {
    router.replace('/');
    return <></>;
  }

  return (
    <div>
      <MainDiv>
        <LoginSection>
          <Heading>
            <SVGIcon
              name='secondary-logo'
              width='60px'
              height='60px'
              viewBox='0 0 60 60'
            />
            <LoginText>
              {showBottomSection ? 'Check your email' : 'Create an account'}
            </LoginText>
          </Heading>
          {!showBottomSection ? (
            <>
              <Form onSubmit={handleContinue}>
                <div className='input-div'>
                  <Input
                    type={'text'}
                    placeholder='Name'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Input
                    type={'text'}
                    placeholder='Email address'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
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
            <CodeSection onSubmit={handleSignUpClick}>
              <p>
                We have sent a temporary code to <span>{userEmail}</span>
              </p>
              <Input
                placeholder={'Enter Code'}
                type={'number'}
                onChange={(e) => setCode(e.target.value)}
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
