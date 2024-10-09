import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OverdueCard from '@/components/overdueCard/overdueCard';

const meta = {
  title: 'Example/OverdueCard',
  component: OverdueCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OverdueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    countAssign: 4,
    isShowNavbar: false,
    onClickDismiss: action('onClickDismiss'), // Logs the onClickDismiss event
  },
};
