import styled from 'styled-components';

export const FileCardDiv = styled.div`
  width: 155px;
  height: 125px;
  box-shadow: var(--shadow-card);
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  .overlay {
    background: linear-gradient(
      0deg,
      var(--brand) 23.65%,
      var(--overlay-color) 85%
    );
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    border-radius: 6px;
  }
  &:hover {
    background: var(--bg-overlay-color);
    box-shadow: var(--shadow-card-hover);
    .overlay {
      display: none;
    }
  }
`;
