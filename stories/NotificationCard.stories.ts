import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NotificationCard from '@/components/notificationCard/notificationCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isShowNavbar: { control: 'boolean' },
  },
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: {
    isShowNavbar: true, // Default value for isShowNavbar prop
    onClose: action('close-button-click'), // Action logging on close event
  },
};
