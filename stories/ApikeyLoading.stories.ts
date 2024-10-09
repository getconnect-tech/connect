import type { Meta, StoryObj } from '@storybook/react';
import ApiKeyLoading from '@/components/apiKeyLoading/apiKeyLoading';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ApiKeyLoading',
  component: ApiKeyLoading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ApiKeyLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
