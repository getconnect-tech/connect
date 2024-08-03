"use client";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Bottom,
  CodeSection,
  Form,
  Heading,
  LoginSection,
  LoginText,
  MainDiv,
  TimeText,
} from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import { useStores } from "@/stores";
import { observer } from "mobx-react-lite";
import {
  resendVerificationCode,
  verifyAuthCode,
  verifyUserEmail,
} from "@/services/clientSide/authService";

const INITIAL_TIMER = 5 * 60;

function Login() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const [email, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const { userStore } = useStores();
  const { loading } = userStore;

  useEffect(() => {
    router.prefetch("/");
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

  const handleContinueClick = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await verifyUserEmail(email);
      if (result) {
        startCounter();
        setShowBottomSection(true);
      }
    },
    [email]
  );

  const onVerifyAuthCode = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await verifyAuthCode(email, code);
    if (result) {
      router.push("/");
    }
  };

  const onResendCode = useCallback(async () => {
    if (counter > 0) return;
    const result = await resendVerificationCode(email);
    if (result) {
      setCounter(INITIAL_TIMER);
      startCounter();
    }
  }, [counter, email]);

  const Counter = useMemo(() => {
    const minutes = `${Math.floor(counter / 60)}`.padStart(2, "0");
    const seconds = `${counter % 60}`.padStart(2, "0");
    return (
      <TimeText isActive={counter <= 0}>
        {minutes}:{seconds}
        {<a onClick={onResendCode}>Resend Code</a>}
      </TimeText>
    );
  }, [counter, onResendCode]);

  return (
    <div>
      <MainDiv>
        <LoginSection>
          <Heading>
            <SVGIcon
              name="secondary-logo"
              width="60px"
              height="60px"
              viewBox="0 0 60 60"
            />
            <LoginText>
              {showBottomSection ? "Check your email" : "Login"}
            </LoginText>
          </Heading>
          {!showBottomSection ? (
            <>
              <Form onSubmit={handleContinueClick}>
                <Input
                  type={"text"}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button
                  title="Login"
                  width={true}
                  className="button"
                  type="submit"
                  isLoading={loading}
                />
              </Form>
              <Bottom>
                <p>Don’t have an account?</p>
                <p>
                  <a href="/signup">Create New Account</a>
                </p>
              </Bottom>
            </>
          ) : (
            <CodeSection onSubmit={onVerifyAuthCode}>
              <p>
                We have sent a temporary code to <span>{email}</span>
              </p>
              <Input
                placeholder={"Enter Code"}
                type={"number"}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button title="Login" width isLoading={loading} type="submit" />
              {Counter}
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}

export default observer(Login);
