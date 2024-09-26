import { action, makeObservable, observable } from 'mobx';
import { TicketDetailsInterface } from '@/utils/appTypes';
import { MessageDetails, TicketSummary } from '@/utils/dataTypes';

class TicketStore {
  loading = false;
  ticketList: TicketDetailsInterface[] = [];
  ticketDetails: TicketDetailsInterface | null = null;
  messages: MessageDetails[] = [];
  filteredTicketList: TicketDetailsInterface[] = [];
  ticketSummary: TicketSummary | null = null;

  constructor() {
    makeObservable(this, {
      // Loading variable
      loading: observable,
      setLoading: action,

      // Ticket List
      ticketList: observable,
      setTicketList: action,
      updateTicketListItem: action,

      // Ticket Details
      ticketDetails: observable,
      setTicketDetails: action,

      // Reset Ticket Data
      resetTicketData: action,

      // Ticket Messages
      messages: observable,
      setTicketMessages: action,
      addTicketMessage: action,
      updateMessageId: action,

      // Inbox ticket List
      filteredTicketList: observable,
      setFilteredTicketList: action,

      // Ticket summary
      ticketSummary: observable,
      setTicketSummary: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // Ticket list actions
  setTicketList(value: TicketDetailsInterface[]) {
    this.ticketList = value;
  }

  // Reset Ticket list
  resetTicketData() {
    this.loading = false;
    this.ticketList = [];
    this.filteredTicketList = [];
    this.ticketDetails = null;
  }

  updateTicketListItem(index: number, value: TicketDetailsInterface) {
    this.filteredTicketList[index] = value;
    this.ticketList = this.ticketList?.map((ticket) =>
      ticket?.id === value?.id ? value : ticket,
    );
  }

  // Ticket Details actions
  setTicketDetails(value: TicketDetailsInterface | null) {
    this.ticketDetails = value;
  }

  // Ticket messages actions
  setTicketMessages(value: MessageDetails[]) {
    this.messages = value;
  }

  addTicketMessage(value: MessageDetails) {
    this.messages = [...(this.messages || []), value];
  }

  updateMessageId(newId: string, oldId: string) {
    this.messages = this.messages.map((message) =>
      message.id === oldId ? { ...message, id: newId } : message,
    );
  }

  // set filtered ticket list
  setFilteredTicketList(tab: string, ticketList: TicketDetailsInterface[]) {
    // Get the current time
    const currentTime = new Date();

    // Initialize arrays to hold filtered tickets
    const closedTickets: TicketDetailsInterface[] = [];
    const snoozeTicket: TicketDetailsInterface[] = [];
    const openTickets: TicketDetailsInterface[] = [];

    // Iterate through ticketList and categorize tickets
    ticketList.forEach((ticket: TicketDetailsInterface) => {
      if (ticket.status === 'CLOSED') {
        closedTickets.push(ticket);
      } else if (ticket.status === 'OPEN') {
        if (
          ticket.snooze_until &&
          new Date(ticket.snooze_until) > currentTime
        ) {
          snoozeTicket.push(ticket);
        } else {
          openTickets.push(ticket);
        }
      }
    });

    if (tab === 'Open') this.filteredTicketList = openTickets;
    else if (tab === 'Snoozed') this.filteredTicketList = snoozeTicket;
    else if (tab === 'Done') this.filteredTicketList = closedTickets;
  }

  // Set ticketSummary
  setTicketSummary(value: TicketSummary | null) {
    this.ticketSummary = value;
  }
}

export const ticketStore = new TicketStore();
