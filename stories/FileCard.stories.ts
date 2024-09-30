import { Meta, StoryObj } from '@storybook/react';
import FileCard from '@/components/fileCard/fileCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/FileCard',
  component: FileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    fileName: 'Test',
    fileSize: '100kb',
    documentText: 'text',
  },
};

export const PDFFile: Story = {
  args: {
    fileName: 'Test',
    fileSize: '100kb',
    documentText: 'text',
    type: 'application/pdf',
  },
};

export const CSVFile: Story = {
  args: {
    fileName: 'Test',
    fileSize: '100kb',
    documentText: 'text',
    type: 'text/csv',
  },
};

export const DOCFile: Story = {
  args: {
    fileName: 'Test',
    fileSize: '100kb',
    documentText: 'text',
    type: 'application/msword',
  },
};

export const ExcelFile: Story = {
  args: {
    fileName: 'Test',
    fileSize: '100kb',
    documentText: 'text',
    type: 'application/vnd.ms-excel',
  },
};

export const Image: Story = {
  args: {
    fileName: 'Test',
    fileSize: '100kb',
    documentText: 'text',
    type: 'image/',
  },
};
