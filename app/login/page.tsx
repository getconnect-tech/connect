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
  TimeText
} from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import { signInWithCode } from "@/services/membership/signin";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/helpers/common";

export default function LoginPage() {
  const [showBottomSection, setShowBottomSection] = useState(false);
  const [counter, setCounter] = useState(5 * 60);
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

  const handleContinueClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!isValidEmail(userEmail)) {
        throw new Error("Invalid email address!");
      }
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify({ email: userEmail }),
        method: "POST",
        cache: "no-cache"
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
  }, [userEmail]);

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

  const resendCode = useCallback(() => {
    if (counter > 0) return;
    setCounter(5 * 60);
    startCounter();
  }, [counter]);

  const Counter = useMemo(() => {
    const minutes = Math.floor(counter / 60).toString();
    const seconds = (counter % 60).toString();
    return (
      <>
        {minutes.length <= 1 ? "0" + minutes : minutes}:
        {seconds.length <= 1 ? "0" + seconds : seconds}
        {<a onClick={resendCode}>Resend Code</a>}
      </>
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
            <LoginText>Welcome to Connect</LoginText>
          </Heading>
          {!showBottomSection ? (
            <>
              <Form>
                <Input
                  type={"text"}
                  placeholder="Email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button
                  title="Continue"
                  width={true}
                  className="button"
                  onClick={handleContinueClick}
                  isLoading={isLoading}
                />
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
                We have sent a temporary code to <span>{userEmail}.</span>
              </p>
              <Input
                placeholder={"Enter Code"}
                type={"number"}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                title="Login"
                width
                onClick={handleLoginClick}
                isLoading={isLoading}
              />
              <TimeText>{Counter}</TimeText>
            </CodeSection>
          )}
        </LoginSection>
      </MainDiv>
    </div>
  );
}
