import {
  IconDotsCircleHorizontal,
  IconFileTypeDoc,
  IconHome,
  IconMailFilled,
} from '@tabler/icons-react';
import { type SidebarData } from '@/types/props/Layout.ts';
import { ColorOption, IconOption } from '@/types/props/Common';
import { Bell, Book, Briefcase, Calendar, Camera, Cloud, Coffee, Database, FileText, Gift, Globe, Heart, Home, Layers, Lightbulb, Mail, Map, Music, Palette, Rocket, Settings, Star, Target, Trophy, Users, Zap } from 'lucide-react';

export const sidebarData: SidebarData = {
  user: {
    name: 'Jawahiir Nabhan',
    email: 'jawahiirn@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  workspaces: [
    {
      id: 1,
      name: 'Shadcn Admin',
      logo: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/327434512_709417487257244_864802573066785027_n.png?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jolv3w71ROIQ7kNvwGe_9oW&_nc_oc=AdktKYhC4G7Ri93wvIxAUabd1OZ7tbQ9DEooMXNXIeHi-0rX7OZQyTB6IygXHUEKtoQ&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=2b-rbIQJoKTYPECHdiOO8A&oh=00_AfI8yPe3bp-psLOn_bdtsL3NznNddgMqkNjQ6dfGEyWpEg&oe=68433C91',
      plan: 'Vite + ShadcnUI',
      color: '#0e9888',
      member: 2,
    },
    {
      id: 2,
      name: "Samrat Biswas's Workspace 2 samrat",
      logo: undefined,
      plan: 'Enterprise',
      color: '#0e9888',
      member: 5,
    },
    {
      id: 3,
      name: 'Facebook',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfbcYeYgf0wQJ-LSPm3CPbyB7T1p0f5bnaA&s',
      plan: 'Meta',
      color: '#0e9888',
      member: 35,
    },
    {
      id: 4,
      name: 'Dcastalia',
      logo: undefined,
      plan: 'Vite + ShadcnUI',
      color: '#0e9888',
      member: 34,
    },
    {
      id: 5,
      name: "Test Workspace 1",
      logo: undefined,
      plan: 'Enterprise',
      color: '#0e9888',
      member: 1,
    },
    {
      id: 6,
      name: "Test Workspace 2",
      logo: undefined,
      plan: 'Enterprise',
      color: '#0e9888',
      member: 3,
    },
    {
      id: 7,
      name: "Test Workspace 3",
      logo: undefined,
      plan: 'Enterprise',
      color: '#0e9888',
      member: 1,
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

// Available icons with their names
export const iconOptions: IconOption[] = [
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Users', icon: Users },
  { name: 'Globe', icon: Globe },
  { name: 'Star', icon: Star },
  { name: 'Home', icon: Home },
  { name: 'Book', icon: Book },
  { name: 'Rocket', icon: Rocket },
  { name: 'Heart', icon: Heart },
  { name: 'Calendar', icon: Calendar },
  { name: 'Settings', icon: Settings },
  { name: 'Map', icon: Map },
  { name: 'Mail', icon: Mail },
  { name: 'Zap', icon: Zap },
  { name: 'Coffee', icon: Coffee },
  { name: 'Cloud', icon: Cloud },
  { name: 'Music', icon: Music },
  { name: 'Camera', icon: Camera },
  { name: 'Palette', icon: Palette },
  { name: 'Gift', icon: Gift },
  { name: 'Trophy', icon: Trophy },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Bell', icon: Bell },
  { name: 'Layers', icon: Layers },
  { name: 'FileText', icon: FileText },
  { name: 'Database', icon: Database },
  { name: 'Target', icon: Target },
];

// Available color options with Tailwind classes
export const colorOptions: ColorOption[] = [
  {
    name: 'Gray',
    bgClass: 'bg-gray-500',
    textClass: 'text-white',
    color: 'gray-500',
  },
  {
    name: 'Blue',
    bgClass: 'bg-blue-500',
    textClass: 'text-white',
    color: 'blue-500',
  },
  {
    name: 'Green',
    bgClass: 'bg-green-500',
    textClass: 'text-white',
    color: 'green-500',
  },
  {
    name: 'Yellow',
    bgClass: 'bg-yellow-500',
    textClass: 'text-black',
    color: 'yellow-500',
  },
  {
    name: 'Purple',
    bgClass: 'bg-purple-500',
    textClass: 'text-white',
    color: 'purple-500',
  },
  {
    name: 'Pink',
    bgClass: 'bg-pink-500',
    textClass: 'text-white',
    color: 'pink-500',
  },
  {
    name: 'Indigo',
    bgClass: 'bg-indigo-500',
    textClass: 'text-white',
    color: 'indigo-500',
  },
  {
    name: 'Red',
    bgClass: 'bg-red-500',
    textClass: 'text-white',
    color: 'red-500',
  },
  {
    name: 'Teal',
    bgClass: 'bg-teal-500',
    textClass: 'text-white',
    color: 'teal-500',
  },
  {
    name: 'Orange',
    bgClass: 'bg-orange-500',
    textClass: 'text-white',
    color: 'orange-500',
  },
];
