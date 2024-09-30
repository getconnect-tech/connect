import type { Meta, StoryObj } from '@storybook/react';
import InternalMessageCard from '../components/internalMessageCard/internalMessageCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/InternalMessageCard',
  component: InternalMessageCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InternalMessageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: '@Laxita Hello, Good morning',
    time: new Date('2023-09-24T12:34:56Z'),
    reactions: [],
    messageId: '1',
  },
};

export const PrimaryWithReaction: Story = {
  args: {
    title: '@Laxita Hello, Good morning',
    time: new Date('2023-09-24T12:34:56Z'),
    reactions: [
      {
        emoji: '👍',
        count: 10,
        author: [
          { id: '1', display_name: 'Pinal' },
          { id: '2', display_name: 'Laxita' },
        ],
      },
      {
        emoji: '❤️',
        count: 5,
        author: [
          { id: '1', display_name: 'Pinal' },
          { id: '2', display_name: 'Laxita' },
        ],
      },
    ],
    messageId: '2',
    showReactions: true,
  },
};

export const AttachmentOption: Story = {
  args: {
    title: '@Laxita Hello, Good morning',
    time: new Date('2023-09-24T12:34:56Z'),
    reactions: [],
    messageId: '2',
    showReactions: false,
    attachments: [
      {
        fileName: 'Testing',
        contentId: '',
        size: '10mb',
        contentType: '',
        downloadUrl: '',
      },
    ],
  },
};
