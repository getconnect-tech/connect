import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from '@/components/emptyState/emptyState';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Your inbox is empty now.',
    iconName: 'inbox-icon',
    iconSize: '20',
    iconViewBox: '0 0 12 12',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Your inbox is empty now.',
    iconName: 'inbox-icon',
    iconSize: '20',
    iconViewBox: '0 0 12 12',
    description:
      'This is where you will receive notifications for all types of tickets. Enjoy your clutter-free inbox!',
  },
};

export const WithButton: Story = {
  args: {
    title: 'Your inbox is empty now.',
    iconName: 'inbox-icon',
    iconSize: '20',
    iconViewBox: '0 0 12 12',
    description:
      'This is where you will receive notifications for all types of tickets. Enjoy your clutter-free inbox!',
    buttonTitle: 'Add Item',
  },
};

export const NoDescriptionAndButtonIsThere: Story = {
  args: {
    title: 'Your inbox is empty now.',
    iconName: 'inbox-icon',
    iconSize: '20',
    iconViewBox: '0 0 12 12',
    buttonTitle: 'Add Item',
  },
};
