import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.bg_surface};
  height: 100vh;
  align-items: center;
`;
export const LoginSection = styled.div`
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
export const LoginText = styled.div`
  ${Typography.heading_heading_semibold}
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 24px;
  .button {
    width: 100%;
  }
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    ${Typography.body_md_regular}
    color: ${colors.text_text_secondary};
    text-align: center;
  }
  a {
    ${Typography.body_md_medium}
    color: ${colors.text_link};
  }
`;
export const CodeSection = styled.div``;
// export const Text = styled.div``;
export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
 text-align: center;
  p{
    margin-top: -24px;
    color: ${colors.text_text_secondary};
    ${Typography.body_md_regular};
  }
  span{
    ${Typography.body_md_medium};
  }
  .button {
    width: 100%;
  }
`;
export const TimeText = styled.div`
  display: flex;
  ${Typography.body_md_medium};
  color: ${colors.text};
  gap: 8px;
  
  span{
    color: ${colors.text_text_secondary};
  }
`;
