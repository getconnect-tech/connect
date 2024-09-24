import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './../components/button/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Button',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    title: 'Button',
    iconName: 'google-icon',
    secondary: true,
    iconSize: '16',
    iconViewBox: '0 0 16 16',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Button',
    secondary: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Button',
    isLoading: true,
  },
};

export const Link: Story = {
  args: {
    title: 'Button',
    isLink: true,
  },
};

export const Delete: Story = {
  args: {
    title: 'Button',
    isDelete: true,
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
    title: 'Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'medium',
    title: 'Button',
  },
};
