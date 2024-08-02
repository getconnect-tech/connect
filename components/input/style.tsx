import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled, { css } from "styled-components";
interface Props {
  hasError?: boolean;
  login?: boolean;
  onChange?: Function;
  disabled?: boolean;
}
const InputDiv = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InputSection = styled.div`
  position: relative;
`;

const InputBox = styled.input<Props>`
  width: 100%;
  border-radius: 20px;
  padding: 10px 14px;
  border: 1px solid ${colors.border_input_border};
  background: transparent;
  color: ${colors.text};
  ${Typography.body_md_medium}

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: ${colors.text_text_secondary};
  }
  &:focus {
    border: 1px solid ${colors.border_brand};
  }
  ${(props) =>
    props.hasError &&
    css`
      &:focus {
        border: 1px solid ${colors.fill_danger};
      }
      border: 1px solid ${colors.fill_danger};
      color: ${colors.text};
      &::placeholder {
        color: ${colors.text_text_secondary};
      }
    `}
  ${(props) =>
    props.disabled &&
    css`
      &::placeholder {
        color: ${colors.text_disabled};
      }
      border: 1px solid ${colors.border_disabled};
    `}
`;
const Errormessage = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  p {
    margin: 0;
    color: ${colors.fill_danger};
    ${Typography.body_md_regular};
  }
`;
const Maindiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;
export { InputDiv, InputBox, Errormessage, Maindiv, InputSection };
