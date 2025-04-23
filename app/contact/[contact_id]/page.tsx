import React from 'react';
import ContactDetail from './contactDetail';

function ContactDetailPage({
  params: { contact_id },
}: {
  params: { contact_id: string };
}) {
  return <ContactDetail contact_id={contact_id} />;
}

export default ContactDetailPage;
