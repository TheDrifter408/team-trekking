import type { Meta, StoryObj } from '@storybook/react';
import { TimeTracker } from '@/components/common/time-tracker';
import "@/index.css";
const meta: Meta<typeof TimeTracker> = {
  title: 'Components/TimeTracker',
  component: TimeTracker,
  tags: ['autodocs'],
  argTypes: {
    onTimeUpdate: { action: 'onTime Clicked' },
  }
};

export default meta;
type Story = StoryObj<typeof TimeTracker>;

export const Default: Story = {
  args: {
    initialTime: '0s',
  },
};

