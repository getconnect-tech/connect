import type { Meta, StoryObj } from '@storybook/react';
import MacroCard from '@/components/macroCard/macroCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/MacroCard',
  component: MacroCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MacroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: {
    index: 0,
    name: 'Macro Card',
    description: 'Request for Feedback on Connect.',
    currentOpenDropdown: '',
    setCurrentOpenDropdown: () => {},
    dropdownIdentifier: '',
    id: '',
  },
};

export const Primary: Story = {
  args: {
    index: 0,
    name: 'Macro Card',
    description: 'Request for Feedback on Connect.',
    currentOpenDropdown: '',
    setCurrentOpenDropdown: () => {},
    dropdownIdentifier: '',
    id: '',
  },
};
