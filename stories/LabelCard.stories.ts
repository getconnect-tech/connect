import type { Meta, StoryObj } from '@storybook/react';
import LabelCard from '../components/labelCard/labelCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/LabelCard',
  component: LabelCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: {
    setOpenDropdown: () => {},
    labelDetails: {
      id: '1',
      name: 'Bug',
      icon: 'bug-icon',
      color: '',
      created_at: new Date('2023-09-24T12:34:56Z'),
      updated_at: new Date('2023-09-24T12:34:56Z'),
      workspace_id: '',
    },
  },
};

export const WithDropdown: Story = {
  args: {
    currentOpenDropdown: 'example-label',
    dropdownIdentifier: 'example',
    setOpenDropdown: () => {},
    labelDetails: {
      id: '1',
      name: 'Bug',
      icon: 'bug-icon',
      color: '',
      created_at: new Date('2023-09-24T12:34:56Z'),
      updated_at: new Date('2023-09-24T12:34:56Z'),
      workspace_id: '',
    },
  },
};
