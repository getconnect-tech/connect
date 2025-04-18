import { action, makeObservable, observable } from 'mobx';
import {
  Contact,
  ContactDetails,
  ContactRecord,
  ContactTicket,
  Group,
} from '@/utils/dataTypes';

class ContactStore {
  loading = false;
  contacts: Contact[] | null = null;
  groups: Group[] | null = null;
  contactDetails: ContactDetails | null = null;
  contactRecord: ContactRecord | null = null;
  contactTicket: ContactTicket[] | null = null;

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

      // ContactRecord for contact page
      contactRecord: observable,
      setContactRecord: action,

      // ContactTickets for contact page
      contactTicket: observable,
      setContactTicket: action,
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
  }

  // set contact record for contact page
  setContactRecord(value: ContactRecord | null) {
    this.contactRecord = value;
  }

  // set contact tickets for contact page
  setContactTicket(value: ContactTicket[] | null) {
    this.contactTicket = value;
  }
}

export const contactStore = new ContactStore();
