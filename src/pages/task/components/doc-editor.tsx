import React, { useMemo } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { EditorThemeClasses } from 'lexical';
import { SlashCommandPlugin } from './editor-popover-plugin.tsx';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
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

export const DocEditor: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  name,
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
      ],
    }),
    [name]
  );
  return (
    <div className={''}>
      <div className={'relative mt-[5px]'}>
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="h-[120px] px-[8px] pt-[3px] text-base leading-relaxed overflow-auto outline-none border rounded-lg" />
            }
            placeholder={
              <span className="absolute top-1 left-[12px] text-base leading-relaxed text-muted-foreground">
                {placeholder || "Type '/' for commands..."}
              </span>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <HistoryPlugin />
          <SlashCommandPlugin />
        </LexicalComposer>
      </div>
    </div>
  );
};
