import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled, { css } from "styled-components";
interface Props {
  isNext: boolean;
}
export const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: ${colors.bg_surface};
`;
export const OnBoardScreen = styled.div<Props>`
  display: flex;
  flex-direction: column;
  max-width: 372px;
  width: 100%;
  gap: 32px;
  justify-content: center;
  ${(props) =>
    props.isNext &&
    css`
      max-width: 500px;
    `}
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const Title = styled.div<Props>`
  ${Typography.heading_heading_semibold};
  color: ${colors.text};
  ${(props) =>
    props.isNext &&
    css`
      padding: 0 92px;
    `}
`;
export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const CenterCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  background-color: ${colors.bg_white};
  box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.1),
    0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  width: 100%;
`;
export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 12px;
`;
export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  h2 {
    ${Typography.body_md_semibold}
    color: ${colors.text};
  }
  p {
    ${Typography.body_md_regular}
    color: ${colors.text_text_secondary};
  }
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const TextField = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  ${(props) =>
    props.isNext &&
    css`
      flex-direction: row;
      align-items: center;
      gap: 12px;
    `}
`;
export const Label = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
  width: 100%;
`;
export const DropBox = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid ${colors.border_input_border};
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  ${Typography.body_md_medium}
  color: ${colors.text_text_secondary};
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const Steps = styled.div`
  padding: 8px 0;
  ${Typography.body_md_regular}
  color: ${colors.text_text_secondary};
`;
export const CenterCardNext = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.bg_white};
  box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.1),
    0px 2px 4px 0px rgba(0, 0, 0, 0.05);
`;
export const NextProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const Icon = styled.div`
  max-width: 24px;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: ${colors.bg_surface_hover};
    border-radius: 50px;
  }
`;
export const LabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 20px;
`;
export const BottomFrame = styled.div`
  display: flex;
  ${Typography.body_md_medium}
  color: ${colors.text_link};
  align-items: center;
  gap: 4px;
  span {
    color: ${colors.text_text_secondary};
  }
`;
export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -8px;
  gap: 12px;
`;
