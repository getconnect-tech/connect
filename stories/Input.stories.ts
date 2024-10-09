import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Input from './../components/input/input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: 'Enter name',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
    placeholder: 'Enter name',
  },
};

export const Medium: Story = {
  args: {
    variant: 'medium',
    placeholder: 'Enter name',
  },
};

export const Disable: Story = {
  args: {
    placeholder: 'Enter name',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Enter name',
    hasError: true,
    error: 'Not valid name',
  },
};
