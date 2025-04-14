import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { Group, GroupDetails, Contact, Ticket } from '@/utils/dataTypes';
import { workspaceStore } from '@/stores/workspaceStore';

class GroupStore {
  // Loading state indicator
  loading = false;

  // Main data stores
  groups: Group[] | null = null;
  groupDetails: GroupDetails | null = null;
  groupTickets: Ticket[] = [];
  currentGroup: GroupDetails | null = null;

  // Cache implementation for performance optimization
  // Stores group details and tickets with timestamps to prevent unnecessary API calls
  groupCache: Map<
    string,
    { details: GroupDetails; tickets: Ticket[]; timestamp: number }
  > = new Map();
  // Cache duration set to 5 minutes (in milliseconds)
  cacheDuration = 5 * 60 * 1000;

  constructor() {
    makeObservable(this, {
      // Loading state management
      loading: observable,
      setLoading: action,

      // Groups list management
      groups: observable,
      setGroups: action,

      // Group details management
      groupDetails: observable,
      setGroupDetails: action,

      // Group tickets management
      groupTickets: observable,
      setGroupTickets: action,

      // Current group management
      currentGroup: observable,
      setCurrentGroup: action,
    });
  }

  // Loading state setter
  setLoading(value: boolean) {
    this.loading = value;
  }

  // Groups list setter
  setGroups(value: Group[]) {
    this.groups = value;
  }

  // Group details setter - also updates current group
  setGroupDetails(value: GroupDetails | null) {
    this.groupDetails = value;
    this.currentGroup = value;
  }

  // Group tickets setter
  setGroupTickets(value: Ticket[]) {
    this.groupTickets = value;
  }

  // Current group setter
  setCurrentGroup(value: GroupDetails | null) {
    this.currentGroup = value;
  }

  // Clears all group-related data
  clearGroupDetails() {
    this.groupDetails = null;
    this.currentGroup = null;
    this.groupTickets = [];
  }

  // Cache validation helper
  // Checks if cached data exists and is still valid based on timestamp
  private isCacheValid(groupId: string): boolean {
    const cached = this.groupCache.get(groupId);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheDuration;
  }

  // Main method to load group details with optimizations
  async loadGroupDetails(groupId: string) {
    try {
      this.setLoading(true);
      const workspaceId = workspaceStore.currentWorkspace?.id;

      // Input validation
      if (!workspaceId) {
        throw new Error('Workspace ID is required');
      }

      if (!groupId) {
        throw new Error('Group ID is required');
      }

      // Cache check - return cached data if available and valid
      if (this.isCacheValid(groupId)) {
        const cached = this.groupCache.get(groupId)!;
        this.setGroupDetails(cached.details);
        this.setGroupTickets(cached.tickets);
        return cached.details;
      }

      // Parallel data fetching - loads group details and tickets simultaneously
      const [groupResponse, ticketsResponse] = await Promise.all([
        axios.get(`/api/groups/${groupId}`, {
          headers: { workspace_id: workspaceId },
        }),
        axios.get(`/api/groups/${groupId}/tickets`, {
          headers: { workspace_id: workspaceId },
        }),
      ]);

      // Update store with new data
      this.setGroupDetails(groupResponse.data);
      this.setGroupTickets(ticketsResponse.data);

      // Cache the results for future use
      this.groupCache.set(groupId, {
        details: groupResponse.data,
        tickets: ticketsResponse.data,
        timestamp: Date.now(),
      });

      return groupResponse.data;
    } catch (error: any) {
      // Enhanced error handling with specific messages for different scenarios
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          throw new Error('Unauthorized: Please log in again');
        } else if (status === 403) {
          throw new Error(
            data.error || 'You do not have permission to access this group',
          );
        } else if (status === 404) {
          throw new Error(data.error || 'Group not found');
        }
        throw new Error(data.error || 'Failed to fetch group details');
      }
      throw error;
    } finally {
      // Always ensure loading state is reset
      this.setLoading(false);
    }
  }
}

export const groupStore = new GroupStore();
