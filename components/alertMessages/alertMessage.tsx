import { Alert } from 'antd';
import React, { useState } from 'react';
import Icon from '../icon/icon';
import { AlertmessageDiv } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onClose: (type: 'error' | 'success' | 'warning') => void;
  isError?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
}

function AlertMessage({
  onClose,
  isError = false,
  isSuccess = false,
  isWarning = false,
}: Props) {
  const [visible, setVisible] = useState({
    error: isError,
    success: isSuccess,
    warning: isWarning,
  });

  const handleClose = (type: 'error' | 'success' | 'warning') => {
    setVisible((prev) => ({
      ...prev,
      [type]: false,
    }));
    onClose(type);
  };

  return (
    <AlertmessageDiv>
      {visible.error && (
        <div className='alert-div'>
          <Alert message='Error message' type='error' showIcon />
          <Icon
            iconName='cross-icon'
            iconSize='12'
            iconViewBox='0 0 16 16'
            onClick={() => handleClose('error')}
            className='icon-class'
          />
        </div>
      )}
      <br />
      {visible.success && (
        <div className='alert-div'>
          <Alert message='Success message' type='success' showIcon />
          <Icon
            iconName='cross-icon'
            iconSize='12'
            iconViewBox='0 0 16 16'
            onClick={() => handleClose('success')}
            className='icon-class'
          />
        </div>
      )}
      <br />
      {visible.warning && (
        <div className='alert-div'>
          <Alert message='Warning message' type='warning' showIcon />
          <Icon
            iconName='cross-icon'
            iconSize='12'
            iconViewBox='0 0 16 16'
            onClick={() => handleClose('warning')}
            className='icon-class'
          />
        </div>
      )}
      <br />
    </AlertmessageDiv>
  );
}

export default AlertMessage;
