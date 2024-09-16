import { Alert } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '../icon/icon';
import { AlertmessageDiv } from './style';
import { useStores } from '@/stores';
import { Message } from '@/utils/appTypes';

function AlertMessage() {
  const { messageStore } = useStores();
  const { messages } = messageStore || {};
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleClose = useCallback((id: string) => {
    messageStore?.removeMessage(id);
  }, []);

  const renderMessage = useCallback((message: Message) => {
    switch (message?.type) {
      case 'error':
        return (
          <div className='alert-div'>
            <Alert message={message?.content} type='error' showIcon />
            <div style={{ width: 24, height: 24 }}>
              <Icon
                iconName='cross-icon'
                iconSize='12'
                iconViewBox='0 0 16 16'
                onClick={() => handleClose(message?.id)}
                className='icon-class'
                size={true}
              />
            </div>
          </div>
        );
      case 'success':
        return (
          <div className='alert-div'>
            <Alert message={message?.content} type='success' showIcon />
            <div style={{ width: 24, height: 24 }}>
              <Icon
                iconName='cross-icon'
                iconSize='12'
                iconViewBox='0 0 16 16'
                onClick={() => handleClose(message?.id)}
                className='icon-class'
                size={true}
              />
            </div>
          </div>
        );
      case 'warning':
        return (
          <div className='alert-div'>
            <Alert message={message?.content} type='warning' showIcon />
            <div style={{ width: 24, height: 24 }}>
              <Icon
                iconName='cross-icon'
                iconSize='12'
                iconViewBox='0 0 16 16'
                onClick={() => handleClose(message?.id)}
                className='icon-class'
                size={true}
              />
            </div>
          </div>
        );
      default:
        <></>;
    }
  }, []);

  return loaded ? (
    <AlertmessageDiv>
      {messages?.map((message) => renderMessage(message))}
    </AlertmessageDiv>
  ) : (
    <></>
  );
}

export default observer(AlertMessage);
