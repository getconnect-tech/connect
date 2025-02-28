import React from 'react';
import { NAVBAR } from '@/global/constants';
import Inbox from '../inbox/inbox';

function TicketPage() {
  return <Inbox activeNav={NAVBAR.UNASSIGNED} />;
}

export default TicketPage;
