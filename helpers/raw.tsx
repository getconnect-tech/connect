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
  { name: 'No priority', icon: 'priority-NONE', value: PriorityLevels.NONE },
  {
    name: 'Urgent',
    icon: 'priority-URGENT',
    value: PriorityLevels.URGENT,
  },
  { name: 'High', icon: 'priority-HIGH', value: PriorityLevels.HIGH },
  {
    name: 'Medium',
    icon: 'priority-MEDIUM',
    value: PriorityLevels.MEDIUM,
  },
  { name: 'Low', icon: 'priority-LOW', value: PriorityLevels.LOW },
];
export const labelItem = [
  { name: 'Bug', icon: 'bug-icon' },
  { name: 'Question', icon: 'question-icon' },
  { name: 'Feedback', icon: 'feedback-icon' },
];
export const modeItem = [
  { name: 'Email', icon: 'email-icon' },
  { name: 'Internal', icon: 'internal-icon' },
];
export const supportItem = [
  { name: 'Contact us', icon: 'internal-icon' },
  { name: 'Documents', icon: 'document-icon' },
];
export const labelIcons = [
  { iconName: 'tag-icon' },
  { iconName: 'bug-icon' },
  { iconName: 'question-tag-icon' },
  { iconName: 'like-icon' },
  { iconName: 'vector-icon' },
  { iconName: 'pie-chart-icon' },
  { iconName: 'users-icon' },
  { iconName: 'life-ring-icon' },
  { iconName: 'sign-direction-right-icon' },
  { iconName: 'user-circle-icon' },
  { iconName: 'home-dash-user-icon' },
  { iconName: 'exclamation-icon' },
  { iconName: 'building-icon' },
  { iconName: 'clock-icon' },
  { iconName: 'setting-icon' },
  { iconName: 'comment-text-icon' },
  { iconName: 'paper-clip-icon' },
  { iconName: 'true-icon' },
  { iconName: 'envelope-icon' },
  { iconName: 'phone-icon' },
  { iconName: 'calender-icon' },
  { iconName: 'trash-icon' },
  { iconName: 'edit-icon' },
  { iconName: 'document-icon' },
  { iconName: 'eye-icon' },
  { iconName: 'vector-icon' },
  { iconName: 'brief-case-icon' },
  { iconName: 'vector-icon' },
  { iconName: 'bell-icon' },
  { iconName: 'home-icon' },
  { iconName: 'shopping-bag-icon' },
  { iconName: 'shopping-cart-icon' },
  { iconName: 'star-icon' },
  { iconName: 'globe-icon' },
  { iconName: 'folder-icon' },
  { iconName: 'flag-icon' },
  { iconName: 'location-pin-icon' },
  { iconName: 'grid-square-circle-icon' },
  { iconName: 'laptop-icon' },
  { iconName: 'shield-icon' },
];
