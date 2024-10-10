import { action, makeObservable, observable } from 'mobx';
import { Contact, Group } from '@/utils/dataTypes';

class ContactStore {
  loading = false;
  contacts: Contact[] | null = null;
  groups: Group[] | null = null;

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
}

export const contactStore = new ContactStore();
