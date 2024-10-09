import type { Meta, StoryObj } from '@storybook/react';
import Avtar from '../components/avtar/Avtar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Avtar',
  component: Avtar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avtar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    imgSrc:
      // eslint-disable-next-line max-len
      'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2Fshared%20image_1725020340378.jpeg?alt=media&token=798ed075-90c9-450e-86f3-c0be5212ee65',
    name: 'Pinal',
  },
};

export const Size: Story = {
  args: {
    imgSrc:
      // eslint-disable-next-line max-len
      'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2Fshared%20image_1725020340378.jpeg?alt=media&token=798ed075-90c9-450e-86f3-c0be5212ee65',
    name: 'Pinal',
    size: 50,
  },
};

export const WithBorder: Story = {
  args: {
    imgSrc:
      // eslint-disable-next-line max-len
      'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2Fshared%20image_1725020340378.jpeg?alt=media&token=798ed075-90c9-450e-86f3-c0be5212ee65',
    name: 'Pinal',
    size: 50,
    isShowBorder: true,
  },
};
