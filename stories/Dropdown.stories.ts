/* eslint-disable max-len */
import type { Meta, StoryObj } from '@storybook/react';
import DropDown from '@/components/dropDown/dropDown';
import { snoozeItem } from '@/helpers/raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Dropdown',
  component: DropDown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const PrimaryItem = [
  { name: 'Low', icon: 'priority-LOW' },
  { name: 'High', icon: 'priority-HIGH' },
];

const SecondaryItem = [
  {
    name: 'Pinal',
    icon: '',
    isName: true,
    src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2Fshared%20image_1725020340378.jpeg?alt=media&token=798ed075-90c9-450e-86f3-c0be5212ee65',
  },
  {
    name: 'Laxita',
    icon: '',
    isName: true,
    src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FImage%20(1)_1709714610197.jpg?alt=media&token=c519e809-2ead-4c42-a623-a0f53991ceeb',
  },
];

const LabelItem = [
  { name: 'Bug', icon: 'bug-icon' },
  { name: 'Question', icon: 'question-tag-icon' },
];

const SeenItem = [{ name: 'Laxita', duration: '2d' }];

const MacroItem = [{ name: 'Template' }, { name: 'Template 2' }];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { items: PrimaryItem, iconSize: '12', iconViewBox: '0 0 12 12' },
};

export const Secondary: Story = {
  args: { items: SecondaryItem, iconSize: '', iconViewBox: '' },
};

export const SearchDropdown: Story = {
  args: {
    items: SecondaryItem,
    iconSize: '',
    iconViewBox: '',
    isSearch: true,
  },
};

export const SnoozeDropdown: Story = {
  args: {
    items: snoozeItem,
    iconSize: '',
    iconViewBox: '',
    isSnooze: true,
    style: { maxWidth: 330 },
  },
};

export const CheckboxDropdown: Story = {
  args: {
    items: LabelItem,
    iconSize: '12',
    iconViewBox: '0 0 16 16',
    isCheckbox: true,
    isSearch: true,
  },
};

export const SeenDropdown: Story = {
  args: {
    items: SeenItem,
    iconSize: '',
    iconViewBox: '',
    isSeen: true,
  },
};

export const MacroDropdown: Story = {
  args: {
    items: MacroItem,
    iconSize: '',
    iconViewBox: '',
    isMacro: true,
  },
};
