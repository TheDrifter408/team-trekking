import { Meta, StoryObj } from '@storybook/react';
import { AssigneeAvatar } from '@/components/common/assignee-avatar';
import { Assignee } from '@/types/props/Common';

import '@/index.css';

const getSeed = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash).toString();
};

const mockAssignee: Assignee = {
  id: 123,
  name: 'Jane Doe',
  role: 'admin',
  avatar: `https://api.diMetacebear.com/6.x/avataaars/svg?seed=${getSeed('Jane Doe')}`,
  isWatching: false,
};

const meta: Meta<typeof AssigneeAvatar> = {
  title: 'Components/AssigneeAvatar',
  component: AssigneeAvatar,
  tags: ['autodocs'],
  argTypes: {
    onRemove: { action: 'remove clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof AssigneeAvatar>;

export const Default: Story = {
  args: {
    assignee: mockAssignee,
    displayName: false,
    onRemove: () => { },
  },
};

export const WithRing: Story = {
  args: {
    assignee: mockAssignee,
    displayName: true,
    showAvatarRing: true,
    onRemove: () => { },
  },
};

export const WithButtons: Story = {
  args: {
    assignee: mockAssignee,
    displayName: true,
    showAvatarRing: true,
    showButtons: true,
    onRemove: () => { },
  },
};

export const SelectedAndRemovable: Story = {
  args: {
    assignee: mockAssignee,
    displayName: true,
    enterAssignee: true,
    isSelected: true,
    showAvatarRing: true,
    onRemove: () => { },
  },
};
