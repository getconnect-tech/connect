import React from 'react';
import { NAVBAR } from '@/global/constants';
import Inbox from './inbox';

function InboxPage() {
  return <Inbox activeNav={NAVBAR.INBOX} />;
}

export default InboxPage;
