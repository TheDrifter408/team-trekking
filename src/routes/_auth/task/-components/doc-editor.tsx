import { FC, useEffect, SetStateAction, Dispatch, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { $createHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from '@lexical/list';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import {
  $getSelection,
  $isRangeSelection,
  EditorState,
  EditorThemeClasses,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
} from 'lexical';
import { SlashCommandPlugin } from './editor-popover-plugin.tsx';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { cn } from '@/lib/utils/utils.ts';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { $setBlocksType } from '@lexical/selection';
import { AtSign, Ellipsis, FileUser, SmilePlus } from 'lucide-react';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';

interface Props {
  value: string;
  onChange: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void;
  onBlur?: () => void; // Add onBlur prop
  placeholder?: string;
  name: string;
  showBorder?: boolean;
  editable?: boolean;
  showToolbar?: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

// Fixed theme with proper CSS classes in TailwindCSS format
const theme: EditorThemeClasses = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    subscript: 'text-xs align-sub',
    superscript: 'text-xs align-super',
    highlight: 'bg-yellow-200',
    code: 'font-mono px-1 py-0.5 bg-gray-100 rounded border',
  },
  heading: {
    h1: 'text-2xl font-bold',
    h2: 'text-xl font-semibold',
    h3: 'text-lg font-medium',
  },
  quote: 'border-l-4 border-gray-300 pl-2 italic ml-4',
  paragraph: 'my-1',
  list: {
    ol: 'list-decimal list-inside ml-4 space-y-1',
    ul: 'list-disc list-inside ml-4 space-y-1',
    listitem: 'ml-2',
  },
  link: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
};

const LoadEditorContent = ({ value }: { value: string }) => {
  const [editor] = useLexicalComposerContext();
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!value || hasInitialized.current) return;
    hasInitialized.current = true;

    editor.update(() => {
      $convertFromMarkdownString(value, TRANSFORMERS);
    });
  }, [editor, value]);
  return null;
};

// Add BlurPlugin to handle blur events
const BlurPlugin = ({ onBlur }: { onBlur?: () => void }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onBlur) return;

    const handleBlur = () => {
      onBlur();
    };

    return editor.registerRootListener((rootElement, prevElement) => {
      if (prevElement !== null) {
        prevElement.removeEventListener('blur', handleBlur);
      }
      if (rootElement !== null) {
        rootElement.addEventListener('blur', handleBlur);
      }
    });
  }, [editor, onBlur]);

  return null;
};

const initialConfig = {
  namespace: 'editor',
  theme: theme,
  onError: (error: Error) => {
    console.error('Lexical error:', error);
  },
  nodes: [
    HeadingNode,
    CodeNode,
    CodeHighlightNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
  ],
};

export const DocEditor: FC<Props> = ({
  value,
  onChange,
  onBlur, // Add onBlur prop
  placeholder,
  name,
  showBorder = true,
  editable = true,
  showToolbar = false,
  setIsEditing,
}) => {
  return (
    <div className={''}>
      <div className={'relative mt-[5px]'}>
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                contentEditable={editable}
                className={cn(
                  'p-4 text-base leading-relaxed whitespace-pre-wrap overflow-auto outline-none rounded-lg min-h-[200px]',
                  showBorder ? 'border' : ''
                )}
              />
            }
            placeholder={
              <div className="absolute top-5 left-4 text-base text-muted-foreground">
                {placeholder || "Type '/' for commands..."}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <LoadEditorContent value={value} />
          <HistoryPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <AutoFocusPlugin />
          <ListPlugin />
          <SlashCommandPlugin />
          <BlurPlugin onBlur={onBlur} />
          <div className={cn('px-2', showToolbar ? 'block' : 'hidden')}>
            {editable && <Toolbar onClickCancel={() => setIsEditing(false)} />}
          </div>
          <OnChangePlugin onChange={onChange} />
        </LexicalComposer>
      </div>
    </div>
  );
};

interface ToolbarProps {
  onClickCancel: Dispatch<SetStateAction<boolean>>;
}

const Toolbar: FC<ToolbarProps> = ({ onClickCancel }) => {
  const [editor] = useLexicalComposerContext();
  return (
    <div className={cn('flex justify-between gap-1 py-2')}>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon_sm"
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode('h1'));
              }
            });
          }}
        >
          <AtSign />
        </Button>
        <Button
          variant="ghost"
          size="icon_sm"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
        >
          <FileUser />
        </Button>
        <Button
          variant="ghost"
          size="icon_sm"
          onClick={() => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
        >
          <SmilePlus />
        </Button>
        <Button
          variant="ghost"
          size="icon_sm"
          onClick={() => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
        >
          <Ellipsis />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Button
          onClick={() => onClickCancel(true)}
          variant={'ghost'}
          className="border bg-slate-50 hover:bg-slate-200"
        >
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};
