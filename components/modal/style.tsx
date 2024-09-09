import styled from 'styled-components';
interface Props {
  isOpen?: boolean;
}

const ModalOverlay = styled.div<Props>`
  display: ${(isOpen: Props) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-overlay);
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div<Props>`
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transition: transform 0.3s;
  transition-delay: 0.1s;
  z-index: 999;
`;

export { ModalOverlay, ModalContent };
