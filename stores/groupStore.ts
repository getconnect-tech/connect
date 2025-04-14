import { action, makeObservable, observable } from 'mobx';
import { Group, Contact, Ticket } from '@/utils/dataTypes';
import { getGroupDetailById } from '@/services/clientSide/groupServices';

interface GroupDetails extends Group {
  contacts: Contact[];
  tickets: Ticket[];
}

class GroupStore {
  loading = false;
  groupDetails: GroupDetails | null = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      setLoading: action,
      groupDetails: observable,
      setGroupDetails: action,
      loadGroupDetails: action,
    });
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  setGroupDetails(value: GroupDetails | null) {
    this.groupDetails = value;
  }

  clearGroupDetails() {
    this.groupDetails = null;
  }

  async loadGroupDetails(groupId: string) {
    try {
      this.setLoading(true);
      const data = await getGroupDetailById(groupId);
      if (data) {
        this.setGroupDetails(data);
      }
    } catch (error) {
      console.error('Error loading group details:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
}

export const groupStore = new GroupStore();
