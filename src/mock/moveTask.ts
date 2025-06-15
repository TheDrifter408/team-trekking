// Sample data - this would typically come from props or API
import { Users, List, Folder } from 'lucide-react';
import React from 'react';
interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  onClick?: () => void;
}

interface SpaceItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  avatar?: string;
  backgroundColor?: string;
  isExpanded?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}

interface MoveTaskData {
  personalList: MenuItem;
  recents: MenuItem[];
  spaces: SpaceItem[];
}
export const navigationData: MoveTaskData = {
  personalList: {
    id: 'personal-list',
    label: 'Personal List',
    icon: Users,
    onClick: () => {},
  },
  recents: [
    {
      id: 'recent-architecture',
      label: 'Architecture',
      icon: List,
      isActive: true,
      onClick: () => {},
    },
    {
      id: 'recent-onboarding',
      label: 'Onboarding',
      icon: List,
      onClick: () => {},
    },
    {
      id: 'recent-settings',
      label: 'My Settings',
      icon: List,
      onClick: () => {},
    },
  ],
  spaces: [
    {
      id: 'team-trekking',
      label: 'Team Trekking',
      avatar: 'T',
      backgroundColor: 'bg-purple-600',
      onClick: () => {},
    },
    {
      id: 'engineering',
      label: 'Engineering',
      icon: Folder,
      isExpanded: true,
      children: [
        {
          id: 'eng-architecture',
          label: 'Architecture',
          icon: List,
          isActive: true,
          onClick: () => {},
        },
        {
          id: 'eng-onboarding',
          label: 'Onboarding',
          icon: List,
          onClick: () => console.log('Engineering Onboarding clicked'),
        },
        {
          id: 'eng-workspace-overview',
          label: 'Workspace overview',
          icon: List,
          onClick: () => {},
        },
        {
          id: 'eng-workspace-setting',
          label: 'Workspace Setting',
          icon: List,
          onClick: () => {},
        },
        {
          id: 'eng-space-folder-list',
          label: 'Space, Folder & List',
          icon: List,
          onClick: () => {},
        },
      ],
      onClick: () => {},
    },
  ],
};
