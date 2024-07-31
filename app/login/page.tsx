"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Bottom, CodeSection, Form, Heading, LoginSection, LoginText, MainDiv, TimeText } from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import Input from "@/components/input/input";
import Button from "@/components/button/button";

let hasInterval = false;
export default function LoginPage() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(10);

  const handleContinueClick = useCallback(() => {
    setShowBottomSection(true);
  }, []);

  const startCounter = () => {
    if (hasInterval) return;
    hasInterval = true;
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 0) {
          clearInterval(counterInterval);
          hasInterval = false;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCounter();
  }, []);

  const Counter = useMemo(() => {
    const minutes = Math.floor(counter / 60).toString();
    const seconds = (counter % 60).toString();
    return `${minutes.length <= 1 ? "0" + minutes : minutes}:${seconds.length <= 1 ? "0" + seconds : seconds}`;
  }, [counter]);

  const resendCode = () => {
    setCounter(5 * 60);
    startCounter();
  };

  return (
    <div>
      <MainDiv>
        <LoginSection>
          <Heading>
            <SVGIcon name="secondary-logo" width="60px" height="60px" viewBox="0 0 60 60" />
            <LoginText>Welcome to Connect</LoginText>
          </Heading>
          {!showBottomSection ? (
            <>
              <Form>
                <Input type={"text"} placeholder="Email address" />
                <Button title="Continue" width={true} className="button" onClick={handleContinueClick} />
              </Form>
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
            <CodeSection>
              <p>
                We have sent a temporary code to <span>mohit.gajera@pixer.digital.</span>
              </p>
              <Input placeholder={"Enter Code"} type={"number"} />
              <Button title="Login" isWidth width />
              <TimeText>
                {Counter}
                <span onClick={resendCode}>Resend Code</span>
              </TimeText>
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}
