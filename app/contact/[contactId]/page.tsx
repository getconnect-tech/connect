'use client';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import { useStores } from '@/stores';
import { getContactDetailById } from '@/services/clientSide/contactServices';
import ContactDetail from './contactDetail';

interface Props {
  params: {
    contactId: string;
  };
}

const ContactDetailPage = ({ params }: Props) => {
  const { contactId } = params;
  const { contactStore } = useStores();

  React.useEffect(() => {
    if (contactId) {
      getContactDetailById(contactId);
    }
  }, [contactId]);

  return <ContactDetail contactId={contactId} />;
};

// Create a client-side wrapper component
const ClientContactDetailPage = observer(ContactDetailPage);

// Export a default server component that renders the client component
export default function Page(props: Props) {
  return <ClientContactDetailPage {...props} />;
} 