import {
  IconDotsCircleHorizontal,
  IconFileTypeDoc,
  IconHome,
  IconMailFilled,
} from '@tabler/icons-react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import { type SidebarData } from '@/types/props/layout.ts';

export const sidebarData: SidebarData = {
  user: {
    name: 'Jawahiir Nabhan',
    email: 'jawahiirn@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Home',
          url: '/home',
          icon: IconHome,
        },
        {
          title: 'Inbox',
          url: '/inbox',
          icon: IconMailFilled,
        },
        {
          title: 'Docs',
          url: '/docs',
          icon: IconFileTypeDoc,
        },
        {
          title: 'More',
          url: '/more',
          icon: IconDotsCircleHorizontal,
        },
      ],
    },
  ],
};
