import { action, makeObservable, observable } from 'mobx';
import { Contact, ContactDetails, Group, Ticket } from '@/utils/dataTypes';
import { workspaceStore } from '@/stores/workspaceStore';

class ContactStore {
  loading = false;
  contacts: Contact[] | null = null;
  groups: Group[] | null = null;
  contactDetails: ContactDetails | null = null;
  contactTickets: Ticket[] = [];
  currentContact: ContactDetails | null = null;

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // Contacts
      contacts: observable,
      setContacts: action,

      // Groups
      groups: observable,
      setGroups: action,

      // ContactDetails
      contactDetails: observable,
      setContactDetails: action,

      // ContactTickets
      contactTickets: observable,
      setContactTickets: action,

      // CurrentContact
      currentContact: observable,
      setCurrentContact: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // set contacts
  setContacts(value: Contact[]) {
    this.contacts = value;
  }

  // set groups
  setGroups(value: Group[]) {
    this.groups = value;
  }

  // set contact details
  setContactDetails(value: ContactDetails | null) {
    this.contactDetails = value;
    this.currentContact = value;
  }

  // set contact tickets
  setContactTickets(value: Ticket[]) {
    this.contactTickets = value;
  }

  // set current contact
  setCurrentContact(value: ContactDetails | null) {
    this.currentContact = value;
  }

  // clear contact details
  clearContactDetails() {
    this.contactDetails = null;
    this.currentContact = null;
    this.contactTickets = [];
  }

  // load contact details
  async loadContactDetails(contactId: string) {
    try {
      this.setLoading(true);
      const response = await fetch(`/api/contacts/${contactId}`, {
        headers: {
          workspace_id: workspaceStore.currentWorkspace?.id || '',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contact details');
      }
      const data = await response.json();
      this.setContactDetails(data);

      // Fetch contact tickets
      const ticketsResponse = await fetch(
        `/api/contacts/${contactId}/tickets`,
        {
          headers: {
            workspace_id: workspaceStore.currentWorkspace?.id || '',
          },
        },
      );
      if (ticketsResponse.ok) {
        const ticketsData = await ticketsResponse.json();
        this.setContactTickets(ticketsData);
      }
    } catch (error) {
      console.error('Error loading contact details:', error);
    } finally {
      this.setLoading(false);
    }
  }
}

export const contactStore = new ContactStore();
