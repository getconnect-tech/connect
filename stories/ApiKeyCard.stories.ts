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

export const WithDrodown: Story = {
  args: {
    keyName: 'Sample Key',
    keyNumber: '12345',
    currentOpenDropdown: 'example-key', // This matches the dropdown identifier to open it by default
    setCurrentOpenDropdown: (dropdown: string | null) => {
      console.log('Dropdown state updated:', dropdown);
    },
    dropdownIdentifier: 'example', // Make sure this matches the dropdownIdentifier for the dropdown
    apiKey: 'abcd1234',
  },
};
