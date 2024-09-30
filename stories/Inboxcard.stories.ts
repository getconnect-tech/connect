import type { Meta, StoryObj } from '@storybook/react';
import InboxCard from '@/components/inboxCard/inboxCard';
import { TicketDetailsInterface } from '@/utils/appTypes';

const mockTicketDetail: TicketDetailsInterface = {
  id: '123',
  title: 'Sample Ticket',
  has_read: false,
  last_message: {
    author: {
      id: 'author-123',
      email: 'author@example.com',
      display_name: null,
      profile_url: null,
      is_verified: false,
      created_at: new Date('2023-09-24T12:34:56Z'),
      updated_at: new Date('2023-09-25T12:34:56Z'),
    },
    content: 'This is the last message content.',
    created_at: '2023-09-24T12:34:56Z',
    type: 'text',
  },
  labels: [
    {
      id: 'label-1',
      name: 'Urgent',
      icon: 'icon.png',
      color: 'red',
      created_at: new Date('2023-09-20T10:00:00Z'),
      updated_at: new Date('2023-09-21T10:00:00Z'),
      workspace_id: 'workspace-1',
    },
  ],
  assigned_user: {
    id: 'user-123',
    email: 'user@example.com',
    display_name: 'User Example',
    profile_url: null,
    created_at: new Date('2023-09-22T10:00:00Z'),
    is_verified: true,
    updated_at: new Date('2023-09-23T10:00:00Z'),
  },
  contact: {
    id: 'contact-123',
    name: 'Contact Name',
    email: 'contact@example.com',
    company_id: null,
    workspace_id: '',
    created_at: new Date('2023-09-22T10:00:00Z'),
    updated_at: new Date('2023-09-22T10:00:00Z'),
  },
  workspace_id: 'workspace-123',
  status: 'OPEN',
  priority: 'HIGH',
  created_at: new Date('2023-09-24T12:00:00Z'),
  updated_at: new Date('2023-09-25T12:00:00Z'),
  snooze_until: null,
  subject: 'Ticket Subject',
  contact_id: 'contact-123',
  assigned_to: 'user-123',
  source: 'MAIL',
  mail_id: 'mail-456',
};

const mockSetCurrentOpenDropdown = (dropdown: string | null) => {
  console.log(`Dropdown set to: ${dropdown}`);
};

const meta = {
  title: 'Example/InboxCard',
  component: InboxCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InboxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    ticketDetail: mockTicketDetail,
    description: 'Inbox card description goes here.',
    showDotIcon: true,
    src: 'https://via.placeholder.com/150',
    currentOpenDropdown: null,
    setCurrentOpenDropdown: mockSetCurrentOpenDropdown,
    dropdownIdentifier: 'dropdown1',
    loadData: () => console.log('Load data triggered'),
    ticketIndex: 0,
  },
};

export const WithoutDot: Story = {
  args: {
    ticketDetail: mockTicketDetail,
    description: 'Inbox card description goes here.',
    showDotIcon: false,
    src: 'https://via.placeholder.com/150',
    currentOpenDropdown: null,
    setCurrentOpenDropdown: mockSetCurrentOpenDropdown,
    dropdownIdentifier: 'dropdown1',
    loadData: () => console.log('Load data triggered'),
    ticketIndex: 0,
  },
};
