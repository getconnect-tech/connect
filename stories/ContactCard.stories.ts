import type { Meta, StoryObj } from '@storybook/react';
import ContactCard from '../components/contactCard/contactCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ContactCard',
  component: ContactCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Person: Story = {
  args: {
    imgSrc: '',
    name: 'Pinal',
    email: 'pinal.patoliya@pixer.digital',
    openCount: '4',
    closeCount: '3',
    isCompany: true,
    companyName: 'Google',
    companyImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
  },
};

export const Company: Story = {
  args: {
    imgSrc: '',
    name: 'Google',
    email: 'Google.com',
    openCount: '4',
    closeCount: '3',
    isCompany: false,
    companyName: 'Google',
    companyImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
    peopleCount: '12',
  },
};
