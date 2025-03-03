export const APP_INIT_RESPONSE_TYPE = {
  SUCCESS: 'sucess',
  FAILED: 'failed',
  REDIRECT: 'redirect',
};

export const RANDOM_COLORS = [
  '#4fcb71',
  '#f5a623',
  '#7ed321',
  '#50e3c2',
  '#9B9B9B',
  '#4a90e2',
  '#ff7c73',
  '#FF2C54',
];

export const ONBOARDING_ROUTES = ['/login', '/signup', '/onboarding'];

export const USER_PREFERENCES = 'user-preference-connect';

export const NAVBAR = {
  INBOX: 1,
  UNASSIGNED: 2,
  All_TICKET: 3,
};

export const TICKETS_HEADER: {
  [key: number]: string;
} = {
  1: 'Inbox',
  2: 'Unassigned',
  3: 'All Tickets',
};

export const TASK_PRIORITY_LABELS: { [key: number]: string } = {
  0: 'None',
  1: 'Urgent',
  2: 'High',
  3: 'Medium',
  4: 'Low',
};

export const TASK_PRIORITY = {
  NONE: 0,
  URGENT: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};

export const PRIORITY_ICON_NAMES: { [key: number]: string } = {
  0: 'NONE',
  1: 'URGENT',
  2: 'HIGH',
  3: 'MEDIUM',
  4: 'LOW',
};

export const STATUS_ICON_NAMES = {
  1: 'backlog-icon',
  2: 'default-icon',
  3: 'in-progress-icon',
  4: 'in-review-icon',
  5: 'complete-icon',
  6: 'canceled-icon',
};
