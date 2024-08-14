'use client';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ModalContent, ModalOverlay } from './style';

interface Props {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  width?: number;
  position?: 'center' | 'right';
}

const defaultProps = {
  position: 'center',
  open: false,
};

const ModalCustom = ({
  children,
  open,
  onClose,
}: Props & typeof defaultProps) => {
  const close = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <>
      {open && (
        <>
          <ModalOverlay isOpen={open} onClick={close}></ModalOverlay>
          <ModalContent
            style={{
              transform: `translate(-50%,-50%) scale(1)`,
            }}
          >
            {children}
          </ModalContent>
        </>
      )}
    </>
  );
};

ModalCustom.propTypes = {
  position: PropTypes.oneOf(['center', 'right']),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.number,
};

ModalCustom.defaultProps = defaultProps;

export default ModalCustom;
