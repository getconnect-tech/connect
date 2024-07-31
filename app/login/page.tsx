"use client";
import React from "react";
import {
  Bottom,
  BottomSection,
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

export default function LoginPage() {
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
          {/* <Form>
            <Input type={"text"} placeholder="Email address" />
            <Button title="Continue" width={true} className="button" />
          </Form>
          <Bottom>
            <p>By continuing, you are indicating that you have</p>
            <p>
              read and agree to the <a>Terms of Use</a> and
            </p>
            <p>
              <a>Privacy Policy</a>
            </p>
          </Bottom> */}

          <BottomSection>
            <p>
              We have sent a temporary code to{" "}
              <span>mohit.gajera@pixer.digital.</span>
            </p>
            <Input placeholder={"Enter Code"} />
            <Button title="Login" isWidth width />
            <TimeText>
              04:49
              <span>Resend Code</span>
            </TimeText>
          </BottomSection>
        </LoginSection>
      </MainDiv>
    </div>
  );
}
