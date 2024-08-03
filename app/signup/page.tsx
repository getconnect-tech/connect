"use client";
import React, { useCallback, useMemo, useState } from "react";
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
import { signInWithCode } from "@/services/serverSide/membership/signin";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/helpers/common";

const INITIAL_TIMER = 5 * 60;

export default function SignupPage() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleSignupClick = useCallback(async () => {
    setIsLoading(true);
    try {
      startCounter();
      setShowBottomSection(true);
    } catch (err: any) {
      alert(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      await signInWithCode(userEmail, code);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert("Incorrect code!");
    }
    setIsLoading(false);
  };

  const resendCode = useCallback(async () => {
    if (counter > 0) return;
    try {
      fetch("/api/auth/sendVerificationCode", {
        method: "POST",
        body: JSON.stringify({ email: userEmail }),
      }).then(() => {
        alert("New code sent!");
      });

      setCounter(INITIAL_TIMER);
      startCounter();
    } catch (err: any) {
      alert(err.message);
    }
  }, [counter, userEmail]);

  const Counter = useMemo(() => {
    const minutes = `${Math.floor(counter / 60)}`.padStart(2, "0");
    const seconds = `${counter % 60}`.padStart(2, "0");
    return (
      <TimeText isActive={counter <= 0}>
        {minutes}:{seconds}
        {<a onClick={resendCode}>Resend Code</a>}
      </TimeText>
    );
  }, [counter, resendCode]);

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
              {showBottomSection ? "Check your email" : "Create an account"}
            </LoginText>
          </Heading>
          {!showBottomSection ? (
            <>
              <Form>
                <div className="input-div">
                  <Input
                    type={"text"}
                    placeholder="Name"
                    //   value={userEmail}
                    //   onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <Input
                    type={"text"}
                    placeholder="Email address"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <Button
                  title="Sign up"
                  width={true}
                  className="button"
                  isLoading={isLoading}
                  onClick={handleSignupClick}
                />
              </Form>
              <Bottom>
                <p>
                  <a href="/login">Back to Login</a>
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
            <CodeSection>
              <p>
                We have sent a temporary code to <span>{userEmail}</span>
              </p>
              <Input
                placeholder={"Enter Code"}
                type={"number"}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                title="Sign up"
                width
                onClick={handleLoginClick}
                isLoading={isLoading}
              />
              {Counter}
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}
