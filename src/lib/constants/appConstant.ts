import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Redo2,
  SeparatorHorizontal,
  Strikethrough,
  Superscript,
  Type,
  Underline,
  Undo2,
} from 'lucide-react';
import { io } from 'socket.io-client';

const MODE = {
  LIVE: import.meta.env.VITE_LIVE_IP,
  DEV: import.meta.env.VITE_DEV_IP, // DEV NOT WORKING FROM ENV UPON CHANGE.
};

const currentMode = import.meta.env.VITE_MODE === 'LIVE' ? MODE.LIVE : MODE.DEV;

const API_URLS = {
  AUTH_BASE_URL: `http://${currentMode}:${import.meta.env.VITE_AUTH_PORT}/`,
  SPACE_BASE_URL: `http://${currentMode}:${import.meta.env.VITE_SPACE_PORT}/`,
  WORK_SPACE_BASE_URL: `http://${currentMode}:${import.meta.env.VITE_WORK_SPACE_PORT}/`,
  FOLDER_BASE_URL: `http://${currentMode}:${import.meta.env.VITE_FOLDER_PORT}/`,
  LIST_BASE_URL: `http://${currentMode}:${import.meta.env.VITE_LIST_PORT}/`,
  TASK_BASE_URL: `http://${currentMode}:${import.meta.env.VITE_TASK_PORT}/`,
};

const SOCKET_CONNECTION = io(`${currentMode}:3011`);

const HOME_CARD_TITLE = {
  MY_WORK: 'My Work',
  ASSIGNED_COMMENTS: 'Assigned Comments',
  RECENTS: 'Recents',
};

const HARD_CARD_LIST = [
  {
    id: HOME_CARD_TITLE.RECENTS,
    description:
      'A list of all the TeamTrekking objects and locations you’ve recently viewed.',
    isAdded: true,
    imageSource: 'https://app-cdn.clickup.com/media/clock-J2RYU6UH.svg',
  },
  {
    id: HOME_CARD_TITLE.ASSIGNED_COMMENTS,
    description: 'Resolve and view any comment that has been assigned to you.',
    isAdded: true,
    imageSource: 'https://app-cdn.clickup.com/media/comment-5JSAQBZY.svg',
  },
  {
    id: HOME_CARD_TITLE.MY_WORK,
    description: 'A list for all of your assigned tasks and reminders.',
    isAdded: true,
    imageSource: 'https://app-cdn.clickup.com/media/list-6J4AELLQ.svg',
  },
];
const HEADINGS = [
  {
    id: 'paragraph',
    icon: Type,
    label: 'Paragraph',
    tag: 'paragraph',
  },
  {
    id: 'h1',
    icon: Heading1,
    label: 'Heading 1',
    tag: 'h1',
  },
  {
    id: 'h2',
    icon: Heading2,
    label: 'Heading 2',
    tag: 'h2',
  },
  {
    id: 'h3',
    icon: Heading3,
    label: 'Heading 3',
    tag: 'h3',
  },
];

const COLUMN_META = {
  ACCESSOR_KEY: {
    SELECT: 'select',
    NAME: 'name',
    DESCRIPTION: 'description',
    PROGRESS: 'progress',
    ASSIGNEES: 'assignees',
    PRIORITY: 'priority',
    START_DATE: 'start_date',
    END_DATE: 'end_date',
    ESTIMATED_TIME: 'estimated_time',
    OPTIONS: 'options',
  },
  HEADER: {
    SELECT: 'Select',
    NAME: 'Name',
    DESCRIPTION: 'Description',
    PROGRESS: 'Progress',
    ASSIGNEES: 'Assignees',
    PRIORITY: 'Priority',
    START_DATE: 'Start Date',
    END_DATE: 'End Date',
    ESTIMATED_TIME: 'Estimated Time',
    OPTIONS: 'Options',
  },
};
const TEXT_ACTIONS = {
  Bold: 'bold',
  Italic: 'italic',
  Underline: 'underline',
  Strikethrough: 'strikethrough',
  Superscript: 'superscript',
  Highlight: 'highlight',
  Code: 'code',
  LeftAlign: 'leftAlign',
  RightAlign: 'rightAlign',
  CenterAlign: 'centerAlign',
  Divider: 'divider',
  Undo: 'undo',
  Redo: 'redo',
};

const TEXT_OPTIONS = [
  {
    id: TEXT_ACTIONS.Bold,
    icon: Bold,
    label: 'Bold',
  },
  {
    id: TEXT_ACTIONS.Italic,
    icon: Italic,
    label: 'Italic',
  },
  {
    id: TEXT_ACTIONS.Underline,
    icon: Underline,
    label: 'Underline',
  },
  {
    id: TEXT_ACTIONS.Strikethrough,
    icon: Strikethrough,
    label: 'Strikethrough',
  },
  {
    id: TEXT_ACTIONS.Superscript,
    icon: Superscript,
    label: 'Superscript',
  },
  {
    id: TEXT_ACTIONS.Highlight,
    icon: Highlighter,
    label: 'Highlight',
  },
  {
    id: TEXT_ACTIONS.Code,
    icon: Code,
    label: 'Code',
  },
  {
    id: TEXT_ACTIONS.LeftAlign,
    icon: AlignLeft,
    label: 'Left Align',
  },
  {
    id: TEXT_ACTIONS.RightAlign,
    icon: AlignRight,
    label: 'Right Align',
  },
  {
    id: TEXT_ACTIONS.CenterAlign,
    icon: AlignCenter,
    label: 'Center Align',
  },
  {
    id: TEXT_ACTIONS.Divider,
    icon: SeparatorHorizontal,
    label: 'Divider',
  },
  {
    id: TEXT_ACTIONS.Undo,
    icon: Undo2,
    label: 'Undo',
  },
  {
    id: TEXT_ACTIONS.Redo,
    icon: Redo2,
    label: 'Redo',
  },
];

const TUTORIAL_TIMER = 3600000; // Equates to 1 Hour ( 60 * 60 * 100 ms )
const LOW_PRIORITY = 1;

const ACTION = {
  CREATE_SPACE: 'create_space',
  MANAGE_SPACES: 'manage_spaces',
  EXPAND_FOLDERS: 'expand_folders',
  TOGGLE_SHOW_SPACES: 'toggle_show_spaces',
  TOGGLE_SHOW_ARCHIVED: 'toggle_show_archived',
  RENAME: 'rename',
  COPY_LINK: 'copy_link',
  CREATE_PAGE: 'create_page',
  CREATE_DATABASE: 'create_database',
  CREATE_BOARD: 'create_board',
  SETTINGS_GENERAL: 'settings_general',
  SETTINGS_PERMISSIONS: 'settings_permissions',
  SETTINGS_EXPORT: 'settings_export',
  CREATE_TEMPLATE: 'create_template',
  BROWSE_TEMPLATES: 'browse_templates',
  MY_TEMPLATES: 'my_templates',
  ADD_FAVORITES: 'add_favorites',
  MOVE_WORKSPACE: 'move_workspace',
  MOVE_FOLDER: 'move_folder',
  DUPLICATE: 'duplicate',
  ARCHIVE: 'archive',
  DELETE: 'delete',
  SHARING: 'sharing',
  CREATE_TASK: 'create_task',
  CREATE_SUBTASK: 'create_subtask',
  CONVERT_SPRINT: 'convert_sprint',
  CHANGE_ICON: 'change_icon',
  CHANGE_COLOR: 'change_color',
  LIST_INFO: 'list_info',
  DEFAULT_TASK: 'default_task',
  DEFAULT_BUG: 'default_bug',
  DEFAULT_FEATURE: 'default_feature',
  EMAIL_LIST: 'email_list',
  COLLAPSE_GROUP: 'collapse_group',
  ARCHIVE_GROUP: 'archive_group',
  SELECT_ALL: 'select_all',
  EDIT_STATUSES: 'edit_statuses',
  ADD_TO: 'add_to',
  CONVERT_TO_LIST: 'convert_to_list',
  CONVERT_TO_TASK: 'convert_to_task',
  CHANGE_TYPE_TO_TASK: 'change_type_to_task',
  CHANGE_TYPE_TO_MILESTONE: 'change_type_to_milestone',
  CHANGE_TYPE_TO_FORM_RESPONSE: 'change_type_to_form_response',
  CHANGE_TYPE_TO_BUG: 'change_type_to_bug',
  DUPLICATE_TASK: 'duplicate_task',
  REMIND_ME_TASK: 'remind_me_task',
  SEND_EMAIL_TO_TASK: 'send_email_to_task',
  MERGE_TASK: 'merge_task',
  TOGGLE_DEPENDENCIES_DIALOG: 'toggle_dependencies_dialog',
  TOGGLE_TEMPATES_DIALOG: 'toggle_tempates_dialog',
  SAVE_AS_TEMPLATE: 'save_as_template',
  UPDATE_EXISTING_TEMPLATE: 'update_existing_template',
  CREATE_LIST: 'create_list',
  CREATE_FOLDER: 'create_folder',
  CREATE_DASHBOARD: 'create_dashboard',
  EDIT_SPACE: 'edit_space',
};
// Define a constant array of Material Design 200 colors
const MATERIAL_LIGHT_COLORS: readonly string[] = [
  '#EF9A9A', // Red 200
  '#F48FB1', // Pink 200
  '#CE93D8', // Purple 200
  '#B39DDB', // Deep Purple 200
  '#9FA8DA', // Indigo 200
  '#90CAF9', // Blue 200
  '#81D4FA', // Light Blue 200
  '#80DEEA', // Cyan 200
  '#80CBC4', // Teal 200
  '#A5D6A7', // Green 200
  '#C5E1A5', // Light Green 200
  '#E6EE9C', // Lime 200
  '#FFF59D', // Yellow 200
  '#FFE082', // Amber 200
  '#FFCC80', // Orange 200
  '#FFAB91', // Deep Orange 200
  '#BCAAA4', // Brown 200
  '#E0E0E0', // Grey 300
  '#B0BEC5', // Blue Grey 200
] as const;

const SOCKET_ROOM_ACTION = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
};

export {
  API_URLS,
  HARD_CARD_LIST,
  HEADINGS,
  COLUMN_META,
  TEXT_OPTIONS,
  TEXT_ACTIONS,
  HOME_CARD_TITLE,
  TUTORIAL_TIMER,
  LOW_PRIORITY,
  ACTION,
  SOCKET_CONNECTION,
  MATERIAL_LIGHT_COLORS,
  SOCKET_ROOM_ACTION,
};
