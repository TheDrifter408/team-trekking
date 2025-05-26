import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Highlighter,
  Code,
  AlignLeft,
  AlignRight,
  AlignCenter,
  SeparatorHorizontal,
  Undo2,
  Redo2,
  Type,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
export const TextAction = {
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
export const textOptions = [
  {
    id: TextAction.Bold,
    icon: Bold,
    label: 'Bold',
  },
  {
    id: TextAction.Italic,
    icon: Italic,
    label: 'Italic',
  },
  {
    id: TextAction.Underline,
    icon: Underline,
    label: 'Underline',
  },
  {
    id: TextAction.Strikethrough,
    icon: Strikethrough,
    label: 'Strikethrough',
  },
  {
    id: TextAction.Superscript,
    icon: Superscript,
    label: 'Superscript',
  },
  {
    id: TextAction.Highlight,
    icon: Highlighter,
    label: 'Highlight',
  },
  {
    id: TextAction.Code,
    icon: Code,
    label: 'Code',
  },
  {
    id: TextAction.LeftAlign,
    icon: AlignLeft,
    label: 'Left Align',
  },
  {
    id: TextAction.RightAlign,
    icon: AlignRight,
    label: 'Right Align',
  },
  {
    id: TextAction.CenterAlign,
    icon: AlignCenter,
    label: 'Center Align',
  },
  {
    id: TextAction.Divider,
    icon: SeparatorHorizontal,
    label: 'Divider',
  },
  {
    id: TextAction.Undo,
    icon: Undo2,
    label: 'Undo',
  },
  {
    id: TextAction.Redo,
    icon: Redo2,
    label: 'Redo',
  },
];
export const LOW_PRIORITY = 1;
export const HEADINGS = [
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

const getWelcomeMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const WELCOME_MESSAGE = getWelcomeMessage();

export const HOME_CARD_TITLE = {
  MY_WORK: 'My Work',
  ASSIGNED_COMMENTS: 'Assigned Comments',
  RECENTS: 'Recents',
};
