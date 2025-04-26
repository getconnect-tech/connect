import styled from 'styled-components';

export const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text);
  white-space: nowrap;
  border-radius: 8px;
  &:hover {
    background-color: var(--bg-white-hover);
    cursor: pointer;
  }
  &.is-selected {
    background-color: var(--bg-white-hover);
    cursor: pointer;
  }
`;

export const DropdownDiv = styled.div`
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  position: absolute;
  z-index: 10;
  max-height: 185px;
  max-width: 180px;
  overflow-y: auto;
  padding: 4px;
  bottom: 26px;
`;
