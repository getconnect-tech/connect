import type { Meta, StoryObj } from '@storybook/react';
import MessageCard from '../components/messageCard/messageCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/EmailMessageCard',
  component: MessageCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MessageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Sanjay send email',
    time: new Date('2024-09-24T12:34:56Z'),
    subTitle: 'To Teamcamp Support',
    message: 'Hello, Testing storybook',
  },
};

export const ReadOption: Story = {
  args: {
    title: 'Sanjay send email',
    time: new Date('2024-09-24T12:34:56Z'),
    subTitle: 'To Teamcamp Support',
    message: 'Hello, Testing storybook',
    readBy: [
      {
        name: 'Pinal',
        email: '',
        seen_at: new Date('2024-09-24T12:34:56Z'),
        id: '',
      },
    ],
  },
};

export const AttachmentOption: Story = {
  args: {
    title: 'Sanjay send email',
    time: new Date('2024-09-24T12:34:56Z'),
    subTitle: 'To Teamcamp Support',
    message: 'Hello, Testing storybook',
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
