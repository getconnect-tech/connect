import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { Contact, ContactDetails, Group, Ticket } from '@/utils/dataTypes';
import { workspaceStore } from '@/stores/workspaceStore';

class ContactStore {
  // Loading state indicator
  loading = false;

  // Main data stores
  contacts: Contact[] | null = null;
  groups: Group[] | null = null;
  contactDetails: ContactDetails | null = null;
  contactTickets: Ticket[] = [];
  currentContact: ContactDetails | null = null;

  // Cache implementation for performance optimization
  // Stores contact details and tickets with timestamps to prevent unnecessary API calls
  contactCache: Map<
    string,
    { details: ContactDetails; tickets: Ticket[]; timestamp: number }
  > = new Map();
  // Cache duration set to 5 minutes (in milliseconds)
  cacheDuration = 5 * 60 * 1000;

  constructor() {
    makeObservable(this, {
      // Loading state management
      loading: observable,
      setLoading: action,

      // Contacts list management
      contacts: observable,
      setContacts: action,

      // Groups list management
      groups: observable,
      setGroups: action,

      // Contact details management
      contactDetails: observable,
      setContactDetails: action,

      // Contact tickets management
      contactTickets: observable,
      setContactTickets: action,

      // Current contact management
      currentContact: observable,
      setCurrentContact: action,
    });
  }

  // Loading state setter
  setLoading(value: boolean) {
    this.loading = value;
  }

  // Contacts list setter
  setContacts(value: Contact[]) {
    this.contacts = value;
  }

  // Groups list setter
  setGroups(value: Group[]) {
    this.groups = value;
  }

  // Contact details setter - also updates current contact
  setContactDetails(value: ContactDetails | null) {
    this.contactDetails = value;
    this.currentContact = value;
  }

  // Contact tickets setter
  setContactTickets(value: Ticket[]) {
    this.contactTickets = value;
  }

  // Current contact setter
  setCurrentContact(value: ContactDetails | null) {
    this.currentContact = value;
  }

  // Clears all contact-related data
  clearContactDetails() {
    this.contactDetails = null;
    this.currentContact = null;
    this.contactTickets = [];
  }

  // Cache validation helper
  // Checks if cached data exists and is still valid based on timestamp
  private isCacheValid(contactId: string): boolean {
    const cached = this.contactCache.get(contactId);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheDuration;
  }

  // Main method to load contact details with optimizations
  async loadContactDetails(contactId: string) {
    try {
      this.setLoading(true);
      const workspaceId = workspaceStore.currentWorkspace?.id;

      // Input validation
      if (!workspaceId) {
        throw new Error('Workspace ID is required');
      }

      if (!contactId) {
        throw new Error('Contact ID is required');
      }

      // Cache check - return cached data if available and valid
      if (this.isCacheValid(contactId)) {
        const cached = this.contactCache.get(contactId)!;
        this.setContactDetails(cached.details);
        this.setContactTickets(cached.tickets);
        return cached.details;
      }

      // Parallel data fetching - loads contact details and tickets simultaneously
      const [contactResponse, ticketsResponse] = await Promise.all([
        axios.get(`/api/contacts/${contactId}`, {
          headers: { workspace_id: workspaceId },
        }),
        axios.get(`/api/contacts/${contactId}/tickets`, {
          headers: { workspace_id: workspaceId },
        }),
      ]);

      // Update store with new data
      this.setContactDetails(contactResponse.data);
      this.setContactTickets(ticketsResponse.data);

      // Cache the results for future use
      this.contactCache.set(contactId, {
        details: contactResponse.data,
        tickets: ticketsResponse.data,
        timestamp: Date.now(),
      });

      return contactResponse.data;
    } catch (error: any) {
      // Enhanced error handling with specific messages for different scenarios
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
    } finally {
      // Always ensure loading state is reset
      this.setLoading(false);
    }
  }
}

export const contactStore = new ContactStore();
