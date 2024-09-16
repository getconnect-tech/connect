import React from 'react';
import Inbox from '../inbox/inbox';
import { NAVBAR } from '@/global/constants';

function TicketPage() {
  return <Inbox activeNav={NAVBAR.UNASSIGNED} />;
}

export default TicketPage;
