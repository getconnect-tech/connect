import { TeamSize } from '@prisma/client';

export const industryItems = [
  { name: 'Technology and Software' },
  { name: 'Data and Analytics' },
  { name: 'Healthcare IT and Medical Devices' },
  { name: 'Professional Services' },
  { name: 'Financial Technologies (FinTech)' },
];
export const teamMember = [
  { name: 'Small (1-10 members)', value: TeamSize.SMALL },
  { name: 'Medium (11-50 members)', value: TeamSize.MEDIUM },
  { name: 'Large (51-200 members)', value: TeamSize.LARGE },
  { name: 'Enterprise (201+ members)', value: TeamSize.ENTERPRISE },
];
export const priorityItem = [
  { name: 'No priority', icon: 'priority-no-icon' },
  { name: 'Urgent', icon: 'priority-urgent-icon' },
  { name: 'High', icon: 'priority-high-icon' },
  { name: 'Medium', icon: 'priority-Medium-icon' },
  { name: 'Low', icon: 'priority-low-icon' },
];
export const lableItem = [
  { name: 'Bug', icon: 'bug-icon' },
  { name: 'Question', icon: 'question-icon' },
  { name: 'Feedback', icon: 'feedback-icon' },
];
