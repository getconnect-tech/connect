import { action, makeObservable, observable } from 'mobx';
import { Contact } from '@/utils/dataTypes';

class ContactStore {
  loading = false;
  contacts: Contact[] | null = null;

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // Contacts
      contacts: observable,
      setContacts: action,
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
}

export const contactStore = new ContactStore();
