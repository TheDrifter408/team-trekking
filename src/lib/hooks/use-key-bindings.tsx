import { LOW_PRIORITY, TextAction } from '@/lib/constants';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { KEY_ENTER_COMMAND } from 'lexical';

export const useKeyBindings = ({
  onAction,
}: {
  onAction: (id: string) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event?.key === 'B' && event?.ctrlKey) {
          onAction(TextAction.Bold);
        }
        if (event?.key === 'I' && event?.ctrlKey) {
          onAction(TextAction.Italic);
        }
        if (event?.key === 'U' && event?.ctrlKey) {
          onAction(TextAction.Underline);
        }
        if (event?.key === 'Z' && event?.ctrlKey) {
          onAction(TextAction.Undo);
        }
        if (event?.key === 'Y' && event?.ctrlKey) {
          onAction(TextAction.Redo);
        }
        return false;
      },
      LOW_PRIORITY
    );
  }, [onAction, editor]);
};
