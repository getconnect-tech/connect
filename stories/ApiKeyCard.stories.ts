import type { Meta, StoryObj } from '@storybook/react';
import ApiKeyCard from '@/components/apiKeyCard/apiKeyCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ApiKeyCard',
  component: ApiKeyCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ApiKeyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    keyName: 'jbhbg',
    keyNumber: 'jnj',
    currentOpenDropdown: null,
    setCurrentOpenDropdown: () => {},
    dropdownIdentifier: '',
    apiKey: '',
  },
};
