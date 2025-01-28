import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const ItemsMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const RightIcon = styled.div`
  display: none;
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    ${RightIcon} {
      display: flex;
    }
  }
`;

const LeftSection = styled.div`
  display: flex;
  gap: 8px;
  max-width: 255px;
`;

const BottomLeftSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .button {
    padding: 3px 11px;
  }
`;

const IconDiv = styled.div`
  padding: 2px;
  height: 20px;
`;

const MainDiv = styled.div`
  max-width: 680px;
  min-width: 680px;
  width: 100%;
  border-radius: 12px;
  background-color: var(--bg-white);
  @media screen and (max-width: 449px) {
    min-width: 361px;
  }
  @media screen and (max-width: 320px) {
    min-width: 300px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 12px 16px;
`;

const Title = styled.p`
  ${Typography.body_md_regular}
  color: var(--text);
`;

const Input = styled.input`
  border: none;
  background-color: unset;
  outline: none;
  ${Typography.heading_lg_regular}
  color: var(--text);
  &::placeholder {
    color: var(--text);
  }
`;

const CenterDiv = styled.div`
  padding: 0 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .prosemirror-commentbox {
    max-height: 300px;
    overflow: auto;
    min-height: 90px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px 16px;
  align-items: center;
`;

const SeeAllLink = styled.div`
  cursor: pointer;
  color: var(--text-link);
  ${Typography.body_md_medium}
`;

export {
  ItemsMainDiv,
  ItemDiv,
  LeftSection,
  IconDiv,
  RightIcon,
  MainDiv,
  Header,
  Title,
  Input,
  CenterDiv,
  BottomSection,
  BottomLeftSection,
  SeeAllLink,
};
