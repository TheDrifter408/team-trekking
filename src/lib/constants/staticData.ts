import {
  Plus,
  Grid3X3,
  ChevronDown,
  Eye,
  Archive,
  Edit,
  Link,
  Settings,
  Star,
  FolderOpen,
  Copy,
  Trash2,
  File,
  List,
  Palette,
  Info,
  Mail,
} from 'lucide-react';
import { MenuSection } from '@/types/interfaces/ContextMenu.ts';

export const spacesMenuConfig: MenuSection[] = [
  {
    items: [
      {
        icon: Plus,
        label: 'Create Space',
        action: 'create_space',
      },
      {
        icon: Grid3X3,
        label: 'Manage Spaces',
        action: 'manage_spaces',
      },
    ],
  },
  {
    items: [
      {
        icon: ChevronDown,
        label: 'Expand all Folders',
        action: 'expand_folders',
      },
    ],
  },
  {
    items: [
      {
        type: 'toggle',
        icon: Eye,
        label: 'Show all Spaces',
        enabled: false,
        action: 'toggle_show_spaces',
      },
      {
        type: 'toggle',
        icon: Archive,
        label: 'Show archived',
        enabled: false,
        action: 'toggle_show_archived',
      },
    ],
  },
];

// Second menu (Image 2) - Folder context menu
export const folderMenuConfig: MenuSection[] = [
  {
    items: [
      {
        icon: Edit,
        label: 'Rename',
        action: 'rename',
      },
      {
        icon: Link,
        label: 'Copy link',
        action: 'copy_link',
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: Plus,
        label: 'Create new',
        submenu: [
          { label: 'Page', action: 'create_page' },
          { label: 'Database', action: 'create_database' },
          { label: 'Board', action: 'create_board' },
        ],
      },
      {
        type: 'submenu',
        icon: Settings,
        label: 'Folder settings',
        submenu: [
          { label: 'General', action: 'settings_general' },
          { label: 'Permissions', action: 'settings_permissions' },
          { label: 'Export', action: 'settings_export' },
        ],
      },
      {
        type: 'submenu',
        icon: File,
        label: 'Templates',
        submenu: [
          { label: 'Create Template', action: 'create_template' },
          { label: 'Browse Templates', action: 'browse_templates' },
          { label: 'My Templates', action: 'my_templates' },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: Star,
        label: 'Add to Favorites',
        action: 'add_favorites',
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: FolderOpen,
        label: 'Move',
        submenu: [
          { label: 'To Workspace', action: 'move_workspace' },
          { label: 'To Folder', action: 'move_folder' },
        ],
      },
      {
        icon: Copy,
        label: 'Duplicate',
        action: 'duplicate',
      },
      {
        icon: Archive,
        label: 'Archive',
        action: 'archive',
      },
    ],
  },
  {
    items: [
      {
        type: 'destructive',
        icon: Trash2,
        label: 'Delete',
        action: 'delete',
      },
    ],
  },
  {
    separator: false,
    items: [
      {
        type: 'button',
        label: 'Sharing & Permissions',
        action: 'sharing',
      },
    ],
  },
];

// Third menu (Image 3) - List context menu
export const listMenuConfig: MenuSection[] = [
  {
    items: [
      {
        icon: Edit,
        label: 'Rename',
        action: 'rename',
      },
      {
        icon: Link,
        label: 'Copy link',
        action: 'copy_link',
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: Plus,
        label: 'Create new',
        submenu: [
          { label: 'Task', action: 'create_task' },
          { label: 'Subtask', action: 'create_subtask' },
        ],
      },
      {
        icon: List,
        label: 'Convert List to Sprint',
        action: 'convert_sprint',
      },
      {
        type: 'submenu',
        icon: Palette,
        label: 'Color & Icon',
        submenu: [
          { label: 'Change Icon', action: 'change_icon' },
          { label: 'Change Color', action: 'change_color' },
        ],
      },
      {
        type: 'submenu',
        icon: Settings,
        label: 'List settings',
        submenu: [
          { label: 'General', action: 'settings_general' },
          { label: 'Permissions', action: 'settings_permissions' },
        ],
      },
      {
        type: 'submenu',
        icon: File,
        label: 'Templates',
        rightText: 'Default set',
        submenu: [
          { label: 'Create Template', action: 'create_template' },
          { label: 'Browse Templates', action: 'browse_templates' },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: Info,
        label: 'List Info',
        action: 'list_info',
      },
      {
        icon: Star,
        label: 'Add to Favorites',
        action: 'add_favorites',
      },
      {
        type: 'submenu',
        icon: Settings,
        label: 'Default task type',
        submenu: [
          { label: 'Task', action: 'default_task' },
          { label: 'Bug', action: 'default_bug' },
          { label: 'Feature', action: 'default_feature' },
        ],
      },
      {
        icon: Mail,
        label: 'Email to List',
        action: 'email_list',
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: FolderOpen,
        label: 'Move',
        submenu: [
          { label: 'To Workspace', action: 'move_workspace' },
          { label: 'To Folder', action: 'move_folder' },
        ],
      },
      {
        icon: Copy,
        label: 'Duplicate',
        action: 'duplicate',
      },
      {
        icon: Archive,
        label: 'Archive',
        action: 'archive',
      },
    ],
  },
  {
    items: [
      {
        type: 'destructive',
        icon: Trash2,
        label: 'Delete',
        action: 'delete',
      },
    ],
  },
  {
    separator: false,
    items: [
      {
        type: 'button',
        label: 'Sharing & Permissions',
        action: 'sharing',
      },
    ],
  },
];
