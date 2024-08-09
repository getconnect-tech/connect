/* eslint-disable max-len */
import React from 'react';
import TicketDetails from './ticketDetails';

export default function Details({
  params: { ticket_id },
}: {
  params: { ticket_id: string };
}) {
  return <TicketDetails ticket_id={ticket_id} />;
}
