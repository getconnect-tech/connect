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
import { signInWithCode } from "@/services/membership/signin";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/helpers/common";

const INITIAL_TIMER = 5 * 60;

export default function Login() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(INITIAL_TIMER);
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      setIsLoading(true);
      try {
        if (!isValidEmail(userEmail)) {
          throw new Error("Invalid email address!");
        }
        const response = await fetch("/api/auth/login", {
          body: JSON.stringify({ email: userEmail }),
          method: "POST",
          cache: "no-cache",
        });

        if (!response.ok) {
          if (response.status === 404) {
            setIsLoading(false);
            alert("User not found!");
            return;
          }
          throw new Error("Error while login in...");
        }
        startCounter();
        setShowBottomSection(true);
      } catch (err: any) {
        alert(err.message);
      }
      setIsLoading(false);
    },
    [userEmail]
  );

  const verifyAuthCode = async (e: SyntheticEvent) => {
    e.preventDefault();
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
              {showBottomSection ? "Check your email" : "Login"}
            </LoginText>
          </Heading>
          {!showBottomSection ? (
            <>
              <Form onSubmit={handleContinueClick}>
                <Input
                  type={"text"}
                  placeholder="Email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button
                  title="Login"
                  width={true}
                  className="button"
                  type="submit"
                  isLoading={isLoading}
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
            <CodeSection onSubmit={verifyAuthCode}>
              <p>
                We have sent a temporary code to <span>{userEmail}</span>
              </p>
              <Input
                placeholder={"Enter Code"}
                type={"number"}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button title="Login" width isLoading={isLoading} type="submit" />
              {Counter}
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}
