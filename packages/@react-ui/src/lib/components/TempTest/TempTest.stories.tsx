import type { Meta, StoryObj } from '@storybook/react';
import { TempTest } from './TempTest';

const meta: Meta<typeof TempTest> = {
  title: 'Dev/TempTest',
  component: TempTest,
};

export default meta;

type Story = StoryObj<typeof TempTest>;

export const Default: Story = {
  args: { label: 'TempTest: default' },
};

export const CustomText: Story = {
  args: { label: 'Hello from TempTest' },
};
