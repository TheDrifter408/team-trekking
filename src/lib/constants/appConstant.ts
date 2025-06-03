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

const API_URLS = {
  AUTH_BASE_URL: 'http://192.168.0.102:3001/',
  SPACE_BASE_URL: 'http://192.168.0.102:3006/',
};
const HOME_CARD_TITLE = {
  MY_WORK: 'My Work',
  ASSIGNED_COMMENTS: 'Assigned Comments',
  RECENTS: 'Recents',
};

const HARD_CARD_LIST = [
  {
    id: HOME_CARD_TITLE.RECENTS,
    description:
      'A list of all the ClickUp objects and locations you’ve recently viewed.',
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
  },
  HEADER: {
    SELECT: 'Select',
    NAME: 'Name',
    DESCRIPTION: 'Description',
    PROGRESS: 'Progress',
    ASSIGNEES: 'Assignees',
    PRIORITY: 'Priority',
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
};
