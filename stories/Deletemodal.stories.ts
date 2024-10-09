import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DeleteModal from '@/components/deleteModal/deleteModal';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DeleteModal',
  component: DeleteModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClose: fn(), onDelete: fn() },
} satisfies Meta<typeof DeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Delete?',
    description: 'Are you sure?',
    headTitle: 'Delete?',
  },
};

export const Loading: Story = {
  args: {
    title: 'Delete?',
    description: 'Are you sure?',
    headTitle: 'Delete?',
    loading: true,
  },
};
