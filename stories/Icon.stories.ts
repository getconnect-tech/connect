import type { Meta, StoryObj } from '@storybook/react';
import Icon from '@/components/icon/icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    iconName: 'inbox-icon',
    iconSize: '14',
    iconViewBox: '0 0 12 12',
  },
};

export const Size: Story = {
  args: {
    iconName: 'inbox-icon',
    iconSize: '12',
    iconViewBox: '0 0 12 12',
    size: true,
  },
};

export const Secondary: Story = {
  args: {
    iconName: 'inbox-icon',
    iconSize: '14',
    iconViewBox: '0 0 12 12',
    secondaryIcon: true,
  },
};

export const Active: Story = {
  args: {
    iconName: 'inbox-icon',
    iconSize: '14',
    iconViewBox: '0 0 12 12',
    isActive: true,
  },
};
