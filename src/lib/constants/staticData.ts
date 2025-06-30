import {
  Plus,
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
  ArrowLeftToLine,
  ArchiveIcon,
  CheckCheck,
  Pencil,
  Disc2,
  Repeat2,
  Box,
  AlarmClock,
  Inbox,
  MergeIcon,
  AlignVerticalDistributeStart,
  WandSparkles,
  CircleDotIcon,
  ListPlus,
  FolderPlus,
  LayoutDashboard,
} from 'lucide-react';
import { MenuSection } from '@/types/interfaces/ContextMenu.ts';
import { LABEL } from './appStrings';
import { ACTION } from './appConstant';
export const spacesMenuConfig: MenuSection[] = [
  {
    items: [
      {
        icon: Pencil,
        label: LABEL.RENAME,
        action: ACTION.EDIT_SPACE,
      },
      {
        icon: Link,
        label: LABEL.COPY_LINK,
        action: ACTION.COPY_LINK,
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: Plus,
        label: LABEL.CREATE_NEW,
        submenu: [
          {
            label: LABEL.LIST,
            action: ACTION.CREATE_LIST,
            icon: ListPlus,
          },
          {
            label: LABEL.FOLDER,
            action: ACTION.CREATE_FOLDER,
            icon: FolderPlus,
          },
          {
            label: LABEL.BOARD,
            action: ACTION.CREATE_DASHBOARD,
            icon: LayoutDashboard,
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        type: 'toggle',
        icon: Eye,
        label: LABEL.SHOW_ALL_SPACES,
        enabled: false,
        action: ACTION.TOGGLE_SHOW_SPACES,
      },
      {
        type: 'toggle',
        icon: Archive,
        label: LABEL.SHOW_ARCHIVED,
        enabled: false,
        action: ACTION.TOGGLE_SHOW_ARCHIVED,
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
        label: LABEL.RENAME,
        action: ACTION.RENAME,
      },
      {
        icon: Link,
        label: LABEL.COPY_LINK,
        action: ACTION.COPY_LINK,
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: Plus,
        label: LABEL.CREATE_NEW,
        submenu: [
          {
            label: LABEL.LIST,
            action: ACTION.CREATE_LIST,
            icon: ListPlus,
          },
          {
            label: LABEL.FOLDER,
            action: ACTION.CREATE_FOLDER,
            icon: FolderPlus,
          },
          {
            label: LABEL.BOARD,
            action: ACTION.CREATE_DASHBOARD,
            icon: LayoutDashboard,
          },
        ],
      },
      {
        type: 'submenu',
        icon: Settings,
        label: LABEL.FOLDER_SETTINGS,
        submenu: [
          { label: LABEL.GENERAL, action: ACTION.SETTINGS_GENERAL },
          { label: LABEL.PERMISSIONS, action: ACTION.SETTINGS_PERMISSIONS },
          { label: LABEL.EXPORT, action: ACTION.SETTINGS_EXPORT },
        ],
      },
      {
        type: 'submenu',
        icon: File,
        label: LABEL.TEMPLATES,
        submenu: [
          { label: LABEL.CREATE_TEMPLATE, action: ACTION.CREATE_TEMPLATE },
          { label: LABEL.BROWSE_TEMPLATES, action: ACTION.BROWSE_TEMPLATES },
          { label: LABEL.MY_TEMPLATES, action: ACTION.MY_TEMPLATES },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: Star,
        label: LABEL.ADD_TO_FAVORITES,
        action: ACTION.ADD_FAVORITES,
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: FolderOpen,
        label: LABEL.MOVE,
        submenu: [
          { label: LABEL.TO_WORKSPACE, action: ACTION.MOVE_WORKSPACE },
          { label: LABEL.TO_WORKSPACE, action: ACTION.MOVE_FOLDER },
        ],
      },
      {
        icon: Copy,
        label: LABEL.DUPLICATE,
        action: ACTION.DUPLICATE,
      },
      {
        icon: Archive,
        label: LABEL.ARCHIVE,
        action: ACTION.ARCHIVE,
      },
    ],
  },
  {
    items: [
      {
        type: 'destructive',
        icon: Trash2,
        label: LABEL.DELETE,
        action: ACTION.DELETE,
      },
    ],
  },
  {
    separator: false,
    items: [
      {
        type: 'button',
        label: LABEL.SHARING_AND_PERMISSIONS,
        action: ACTION.SHARING,
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
        label: LABEL.RENAME,
        action: ACTION.RENAME,
      },
      {
        icon: Link,
        label: LABEL.COPY_LINK,
        action: ACTION.COPY_LINK,
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: Plus,
        label: LABEL.CREATE_NEW,
        submenu: [
          { label: LABEL.TASK, action: ACTION.CREATE_TASK },
          { label: LABEL.SUBTASK, action: ACTION.CREATE_SUBTASK },
        ],
      },
      {
        icon: List,
        label: LABEL.CONVERT_LIST_TO_SPRINT,
        action: ACTION.CONVERT_SPRINT,
      },
      {
        type: 'submenu',
        icon: Palette,
        label: LABEL.COLOR_AND_ICON,
        submenu: [
          { label: LABEL.CHANGE_ICON, action: ACTION.CHANGE_ICON },
          { label: LABEL.CHANGE_COLOR, action: ACTION.CHANGE_COLOR },
        ],
      },
      {
        type: 'submenu',
        icon: Settings,
        label: LABEL.LIST_SETTINGS,
        submenu: [
          { label: LABEL.GENERAL, action: ACTION.SETTINGS_GENERAL },
          { label: LABEL.PERMISSIONS, action: ACTION.SETTINGS_PERMISSIONS },
        ],
      },
      {
        type: 'submenu',
        icon: File,
        label: LABEL.TEMPLATES,
        rightText: LABEL.DEFAULT_SET,
        submenu: [
          { label: LABEL.CREATE_TEMPLATE, action: ACTION.CREATE_TEMPLATE },
          { label: LABEL.BROWSE_TEMPLATES, action: ACTION.BROWSE_TEMPLATES },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: Info,
        label: LABEL.LIST_INFO,
        action: ACTION.LIST_INFO,
      },
      {
        icon: Star,
        label: LABEL.ADD_TO_FAVORITES,
        action: ACTION.ADD_FAVORITES,
      },
      {
        type: 'submenu',
        icon: Settings,
        label: LABEL.DEFAULT_TASK_TYPE,
        submenu: [
          { label: LABEL.TASK, action: ACTION.DEFAULT_TASK },
          { label: LABEL.BUG, action: ACTION.DEFAULT_BUG },
          { label: LABEL.FEATURE, action: ACTION.DEFAULT_FEATURE },
        ],
      },
      {
        icon: Mail,
        label: LABEL.EMAIL_TO_LIST,
        action: ACTION.EMAIL_LIST,
      },
    ],
  },
  {
    items: [
      {
        type: 'submenu',
        icon: FolderOpen,
        label: LABEL.MOVE,
        submenu: [
          { label: LABEL.TO_WORKSPACE, action: ACTION.MOVE_WORKSPACE },
          { label: LABEL.TO_FOLDER, action: ACTION.MOVE_FOLDER },
        ],
      },
      {
        icon: Copy,
        label: LABEL.DUPLICATE,
        action: ACTION.DUPLICATE,
      },
      {
        icon: Archive,
        label: LABEL.ARCHIVE,
        action: ACTION.ARCHIVE,
      },
    ],
  },
  {
    items: [
      {
        type: 'destructive',
        icon: Trash2,
        label: LABEL.DELETE,
        action: ACTION.DELETE,
      },
    ],
  },
  {
    separator: false,
    items: [
      {
        type: 'button',
        label: LABEL.SHARING_AND_PERMISSIONS,
        action: ACTION.SHARING,
      },
    ],
  },
];

// Board Column context menu
export const columnMenuConfig: MenuSection[] = [
  {
    items: [
      {
        icon: ArrowLeftToLine,
        label: LABEL.COLLAPSE_GROUP,
        action: ACTION.COLLAPSE_GROUP,
      },
      {
        icon: ArchiveIcon,
        label: LABEL.ARCHIVE_ALL_IN_GROUP,
        action: ACTION.ARCHIVE_GROUP,
      },
    ],
  },
  {
    items: [
      {
        icon: CheckCheck,
        label: LABEL.SELECT_ALL,
        action: ACTION.SELECT_ALL,
      },
      {
        icon: Pencil,
        label: LABEL.RENAME,
        action: ACTION.RENAME,
      },
      {
        icon: Disc2,
        label: LABEL.EDIT_STATUSES,
        action: ACTION.EDIT_STATUSES,
      },
    ],
  },
];

// Board Column Task Context menu
export const boardTaskMenuConfig: MenuSection[] = [
  {
    items: [
      {
        icon: Pencil,
        label: LABEL.RENAME,
        action: ACTION.RENAME,
      },
      {
        icon: Plus,
        label: LABEL.ADD_TO,
        action: ACTION.ADD_TO,
      },
      {
        icon: Repeat2,
        label: LABEL.CONVERT_TO,
        type: 'submenu',
        submenu: [
          {
            label: LABEL.LIST,
            action: ACTION.CONVERT_TO_LIST,
          },
          {
            label: LABEL.TASK,
            action: ACTION.CONVERT_TO_TASK,
          },
        ],
      },
      {
        icon: Box,
        label: LABEL.TASK_TYPE,
        type: 'submenu',
        submenu: [
          {
            label: LABEL.TASK,
            action: ACTION.CHANGE_TYPE_TO_TASK,
          },
          {
            label: LABEL.MILESTONE,
            action: ACTION.CHANGE_TYPE_TO_MILESTONE,
          },
          {
            label: LABEL.FORM_RESPONSE,
            action: ACTION.CHANGE_TYPE_TO_FORM_RESPONSE,
          },
          {
            label: LABEL.BUG,
            action: ACTION.CHANGE_TYPE_TO_BUG,
          },
        ],
      },
      {
        icon: Copy,
        label: LABEL.DUPLICATE,
        action: ACTION.DUPLICATE_TASK,
      },
      {
        icon: AlarmClock,
        label: LABEL.REMIND_ME,
        action: ACTION.REMIND_ME_TASK,
      },
      {
        icon: Inbox,
        label: LABEL.SEND_EMAIL_TO_TASK,
        action: ACTION.SEND_EMAIL_TO_TASK,
      },
      {
        icon: MergeIcon,
        label: LABEL.MERGE,
        action: ACTION.MERGE_TASK,
      },
    ],
  },
  {
    items: [
      {
        icon: AlignVerticalDistributeStart,
        label: LABEL.DEPENDENCIES,
        action: ACTION.TOGGLE_DEPENDENCIES_DIALOG,
      },
      {
        icon: WandSparkles,
        label: LABEL.TEMPLATES,
        type: 'submenu',
        submenu: [
          {
            label: LABEL.BROWSE_TEMPLATES,
            action: ACTION.TOGGLE_TEMPATES_DIALOG,
          },
          {
            label: LABEL.SAVE_AS_TEMPLATE,
            action: ACTION.SAVE_AS_TEMPLATE,
          },
          {
            label: LABEL.UPDATE_EXISTING_TEMPLATE,
            action: ACTION.UPDATE_EXISTING_TEMPLATE,
          },
        ],
      },
    ],
  },
];

// Task Type Configuration
export const taskTypeConfig: MenuSection[] = [
  {
    items: [
      {
        icon: CircleDotIcon,
        label: LABEL.TASK,
        action: ACTION.CHANGE_TYPE_TO_TASK,
      },
      {
        icon: Disc2,
        label: LABEL.MILESTONE,
        action: ACTION.CHANGE_TYPE_TO_MILESTONE,
      },
      {
        icon: File,
        label: LABEL.FORM_RESPONSE,
        action: ACTION.CHANGE_TYPE_TO_FORM_RESPONSE,
      },
      {
        icon: Repeat2,
        label: LABEL.BUG,
        action: ACTION.CHANGE_TYPE_TO_BUG,
      },
    ],
  },
];
