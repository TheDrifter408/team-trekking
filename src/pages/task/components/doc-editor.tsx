import { useMemo, FC, useEffect, SetStateAction, Dispatch } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { $createHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode } from '@lexical/list';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { LinkNode } from '@lexical/link';
import { $createParagraphNode, $createTextNode, $getRoot, $getSelection, $isRangeSelection, EditorState, EditorThemeClasses, FORMAT_TEXT_COMMAND, LexicalEditor } from 'lexical';
import { SlashCommandPlugin } from './editor-popover-plugin.tsx';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { $setBlocksType } from '@lexical/selection';
import { AtSign, Ellipsis, FileUser, SmilePlus } from 'lucide-react';
interface Props {
  value: string;
  onChange: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;
  placeholder?: string;
  name: string;
  showBorder?: boolean,
  editable?: boolean,
  showToolbar?: boolean,
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
};

const LoadEditorContent = ({ value }: { value: string }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!value) {
      return;
    }
    try {
      const editorState = editor.parseEditorState(value);
      editor.setEditorState(editorState);
    } catch (e) {
      console.warn("Doc loading failed, falling to plain text: ", e);
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(value));
        root.append(paragraph);
      });
    }

  }, [editor, value]);

  return null;
}

export const DocEditor: FC<Props> = ({
  value,
  onChange,
  placeholder,
  name,
  showBorder = true,
  editable = true,
  showToolbar = false,
  setIsEditing,
}) => {
  const initialConfig = useMemo(
    () => ({
      namespace: name,
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
      ],
    }),
    [name]
  );
  return (
    <div className={''}>
      <div className={'relative mt-[5px]'}>
        <LexicalComposer initialConfig={initialConfig}>
          <LoadEditorContent value={value} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                contentEditable={editable}
                className={cn("px-4 py-2 text-base leading-relaxed overflow-auto outline-none rounded-lg", showBorder ? "border" : "")} />
            }
            placeholder={
              <div className="absolute top-2 left-3 text-base leading-relaxed text-muted-foreground">
                {placeholder || "Type '/' for commands..."}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <AutoFocusPlugin />
          <ListPlugin />
          <HistoryPlugin />
          <SlashCommandPlugin />
          <OnChangePlugin onChange={onChange} />
          <div className={cn("px-2", showToolbar ? 'block' : 'hidden')}>
            {editable && <Toolbar onClickCancel={() => setIsEditing(false)} />}
          </div>
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
    <div className={cn("flex justify-between gap-1 py-2")}>
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
        <Button onClick={() => onClickCancel(true)} variant={'ghost'} className="border bg-slate-50 hover:bg-slate-200">
            Cancel
        </Button>
        <Button>
            Save
        </Button>
      </div>
    </div>
  )
}