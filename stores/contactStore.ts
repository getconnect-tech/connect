import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
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
      const workspaceId = workspaceStore.currentWorkspace?.id;

      if (!workspaceId) {
        throw new Error('Workspace ID is required');
      }

      if (!contactId) {
        throw new Error('Contact ID is required');
      }

      // First fetch contact details
      try {
        const { data } = await axios.get(`/api/contacts/${contactId}`);
        this.setContactDetails(data);
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            throw new Error('Unauthorized: Please log in again');
          } else if (status === 403) {
            throw new Error(
              data.error || 'You do not have permission to access this contact',
            );
          } else if (status === 404) {
            throw new Error(data.error || 'Contact not found');
          }
          throw new Error(data.error || 'Failed to fetch contact details');
        }
        throw error;
      }

      // Then fetch contact tickets
      try {
        const { data } = await axios.get(`/api/contacts/${contactId}/tickets`);
        this.setContactTickets(data);
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            throw new Error('Unauthorized: Please log in again');
          } else if (status === 403) {
            throw new Error(
              data.error ||
                'You do not have permission to access these tickets',
            );
          } else if (status === 404) {
            throw new Error(data.error || 'Contact not found');
          }
          throw new Error(data.error || 'Failed to fetch contact tickets');
        }
        throw error;
      }
    } catch (error) {
      console.error('Error loading contact details:', error);
      throw error; // Re-throw the error to be handled by the component
    } finally {
      this.setLoading(false);
    }
  }
}

export const contactStore = new ContactStore();
