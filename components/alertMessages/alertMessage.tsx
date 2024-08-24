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

function AlertMessage({ onClose, isError, isSuccess, isWarning }: Props) {
  const [showError, setShowError] = useState(isError);
  const [showSuccess, setShowSuccess] = useState(isSuccess);
  const [showWarning, setShowWarning] = useState(isWarning);

  const handleClose = (type: 'error' | 'success' | 'warning') => {
    onClose(type);
    if (type === 'error') setShowError(false);
    if (type === 'success') setShowSuccess(false);
    if (type === 'warning') setShowWarning(false);
  };

  return (
    <AlertmessageDiv>
      {showError && (
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
      {showSuccess && (
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
      {showWarning && (
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
    </AlertmessageDiv>
  );
}

export default AlertMessage;
