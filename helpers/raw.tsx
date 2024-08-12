import { PriorityLevels, TeamSize } from '@prisma/client';

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
  { name: 'No priority', icon: 'priority-no-icon', value: PriorityLevels.NONE },
  {
    name: 'Urgent',
    icon: 'priority-urgent-icon',
    value: PriorityLevels.URGENT,
  },
  { name: 'High', icon: 'priority-high-icon', value: PriorityLevels.HIGH },
  {
    name: 'Medium',
    icon: 'priority-Medium-icon',
    value: PriorityLevels.MEDIUM,
  },
  { name: 'Low', icon: 'priority-low-icon', value: PriorityLevels.LOW },
];
export const labelItem = [
  { name: 'Bug', icon: 'bug-icon' },
  { name: 'Question', icon: 'question-icon' },
  { name: 'Feedback', icon: 'feedback-icon' },
];
