import { NavGroup as Nav } from '@/types/props/Layout';
import { LABEL } from '@/lib/constants/appStrings';
import {
  UsersIcon,
  UserCogIcon,
  BellIcon,
  Share2Icon,
  FolderKanbanIcon,
  SettingsIcon,
} from 'lucide-react';

const workspaceSettingsNav: Nav = {
  title: 'Workspace Settings',
  items: [
    {
      title: LABEL.PEOPLE,
      url: '/settings/people',
      icon: UsersIcon,
    },
    {
      title: LABEL.SETTINGS,
      url: '/settings/general',
      icon: SettingsIcon,
    },
  ],
};

const personalSettingsNav: Nav = {
  title: 'Personal Settings',
  items: [
    {
      title: LABEL.MY_SETTINGS,
      url: '/settings/profile',
      icon: UserCogIcon,
    },
    {
      title: LABEL.WORKSPACES,
      url: '/settings/workspaces',
      icon: FolderKanbanIcon,
    },
    {
      title: LABEL.NOTIFICATIONS,
      url: '/settings/notifications',
      icon: BellIcon,
    },
    {
      title: LABEL.REFERALS,
      url: '/settings/referrals',
      icon: Share2Icon,
    },
  ],
};

export { workspaceSettingsNav, personalSettingsNav };
