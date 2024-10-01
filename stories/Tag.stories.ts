import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Tag from '@/components/tag/tag';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Inbox',
    iconName: 'inbox-icon',
    isActive: false,
    isName: false,
  },
};

export const Active: Story = {
  args: {
    title: 'Inbox',
    iconName: 'inbox-icon',
    isActive: true,
    isName: false,
  },
};

export const Name: Story = {
  args: {
    title: 'Inbox',
    iconName: 'inbox-icon',
    isActive: false,
    isName: true,
  },
};
