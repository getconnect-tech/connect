import React from 'react';
import Inbox from './inbox';
import { NAVBAR } from '@/global/constants';

function InboxPage() {
  return <Inbox activeNav={NAVBAR.INBOX} />;
}

export default InboxPage;
