import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta = {
  title: 'components/popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Popover',
  },
};
