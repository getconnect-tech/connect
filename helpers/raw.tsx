import { PriorityLevels, TeamSize } from '@prisma/client';
import moment from 'moment';

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
export const snoozeItem = [
  {
    name: 'Later today',
    value: moment().set({ hour: 15, minute: 0, second: 0 }).toISOString(),
  },
  {
    name: 'This evening',
    value: moment().set({ hour: 18, minute: 0, second: 0 }).toISOString(),
  },
  {
    name: 'Tomorrow',
    value: moment()
      .add(1, 'days')
      .set({ hour: 9, minute: 0, second: 0 })
      .toISOString(),
  },
  {
    name: 'Next week',
    value: moment()
      .clone()
      .day(8)
      .set({ hour: 9, minute: 0, second: 0 })
      .toISOString(),
  },
];

export const chartDemoData = [
  {
    date: '2024-02-26',
    queueSize: 78,
    firstResponseTime: 45,
    medianResolutionTime: 180,
  },
  {
    date: '2024-02-25',
    queueSize: 9,
    firstResponseTime: 30,
    medianResolutionTime: 160,
  },
  {
    date: '2024-02-24',
    queueSize: 15,
    firstResponseTime: 50,
    medianResolutionTime: 200,
  },
  {
    date: '2024-02-23',
    queueSize: 8,
    firstResponseTime: 25,
    medianResolutionTime: 140,
  },
  {
    date: '2024-02-22',
    queueSize: 10,
    firstResponseTime: 40,
    medianResolutionTime: 175,
  },
  {
    date: '2024-02-21',
    queueSize: 14,
    firstResponseTime: 60,
    medianResolutionTime: 220,
  },
  {
    date: '2024-02-20',
    queueSize: 6,
    firstResponseTime: 20,
    medianResolutionTime: 130,
  },
  {
    date: '2024-02-19',
    queueSize: 11,
    firstResponseTime: 35,
    medianResolutionTime: 165,
  },
  {
    date: '2024-02-18',
    queueSize: 7,
    firstResponseTime: 28,
    medianResolutionTime: 150,
  },
  {
    date: '2024-02-17',
    queueSize: 13,
    firstResponseTime: 55,
    medianResolutionTime: 210,
  },
  {
    date: '2024-02-16',
    queueSize: 5,
    firstResponseTime: 18,
    medianResolutionTime: 120,
  },
  {
    date: '2024-02-15',
    queueSize: 9,
    firstResponseTime: 32,
    medianResolutionTime: 170,
  },
  {
    date: '2024-02-14',
    queueSize: 12,
    firstResponseTime: 45,
    medianResolutionTime: 190,
  },
  {
    date: '2024-02-13',
    queueSize: 10,
    firstResponseTime: 40,
    medianResolutionTime: 180,
  },
  {
    date: '2024-02-12',
    queueSize: 8,
    firstResponseTime: 30,
    medianResolutionTime: 160,
  },
  {
    date: '2024-02-11',
    queueSize: 14,
    firstResponseTime: 58,
    medianResolutionTime: 230,
  },
  {
    date: '2024-02-10',
    queueSize: 6,
    firstResponseTime: 22,
    medianResolutionTime: 140,
  },
  {
    date: '2024-02-09',
    queueSize: 11,
    firstResponseTime: 36,
    medianResolutionTime: 170,
  },
  {
    date: '2024-02-08',
    queueSize: 7,
    firstResponseTime: 28,
    medianResolutionTime: 150,
  },
  {
    date: '2024-02-07',
    queueSize: 13,
    firstResponseTime: 54,
    medianResolutionTime: 210,
  },
  {
    date: '2024-02-06',
    queueSize: 5,
    firstResponseTime: 18,
    medianResolutionTime: 120,
  },
  {
    date: '2024-02-05',
    queueSize: 9,
    firstResponseTime: 32,
    medianResolutionTime: 170,
  },
  {
    date: '2024-02-04',
    queueSize: 12,
    firstResponseTime: 45,
    medianResolutionTime: 190,
  },
  {
    date: '2024-02-03',
    queueSize: 10,
    firstResponseTime: 40,
    medianResolutionTime: 180,
  },
  {
    date: '2024-02-02',
    queueSize: 8,
    firstResponseTime: 30,
    medianResolutionTime: 160,
  },
  {
    date: '2024-02-01',
    queueSize: 14,
    firstResponseTime: 58,
    medianResolutionTime: 230,
  },
];
