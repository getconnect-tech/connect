import type { Meta, StoryObj } from '@storybook/react';
import MemberCard from '@/components/memberCard/memberCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/MemberCard',
  component: MemberCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: {
    userId: 'ABcd',
    designation: 'job',
    name: 'ABCDE',
    email: 'testing@',
    src: 'http://localhost:gytgyver.github',
    setOpenDropdown: () => {},
    loadData: () => {},
    isInvited: true,
  },
};

export const WithDrodown: Story = {
  args: {
    name: 'ABCDE',
    email: 'testing@',
    designation: 'job',
    currentOpenDropdown: 'example-key', // This matches the dropdown identifier to open it by default
    setOpenDropdown: (dropdown: string | null) => {
      console.log('Dropdown state updated:', dropdown);
    },
    dropdownIdentifier: 'example', // Make sure this matches the dropdownIdentifier for the dropdown
    userId: 'ABcd',
    loadData: () => {},
    isInvited: true,
    src: 'http://localhost:gytgyver.github',
  },
};

// userId: string;
//     designation?: string | undefined;
//     name: string;
//     email: string;
//     src: string;
//     currentOpenDropdown?: (string | null) | undefined;
//     dropdownIdentifier?: string | undefined;
//     setOpenDropdown: (dropdown: string | null) => void;
//     loadData: () => void;
//     isInvited: boolean;
