import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--bg-surface);
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
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 24px;
  .button {
    width: 100%;
  }
  .input-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
    text-align: center;
  }
  a {
    ${Typography.body_md_medium}
    color:var(--text-link);
    cursor: pointer;
  }
`;
export const CodeSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
  text-align: center;
  p {
    margin-top: -24px;
    color: var(--text-text-secondary);
    ${Typography.body_md_regular};
  }
  span {
    ${Typography.body_md_medium};
  }
  .button {
    width: 100%;
  }
`;
export const TimeText = styled.div<{ isActive?: boolean }>`
  display: flex;
  ${Typography.body_md_medium};
  color: var(--text);
  gap: 8px;

  a {
    color: var(${({ isActive }) => (isActive ? '--text' : '--text-disabled')});
    cursor: pointer;
  }
`;
