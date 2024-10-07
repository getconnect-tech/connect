import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import WorkspaceCard from '@/components/workspaceCard/workspaceCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/WorkspaceCard',
  component: WorkspaceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { handleClick: fn() },
} satisfies Meta<typeof WorkspaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: { organizationName: 'Storybook', workSpaceId: '' },
};

export const WithImage: Story = {
  args: {
    organizationName: 'Storybook',
    workSpaceId: '',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
  },
};
