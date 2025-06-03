import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { KEY_ENTER_COMMAND } from 'lexical';
import { LOW_PRIORITY, TEXT_ACTIONS } from '../constants/appConstant';

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
          onAction(TEXT_ACTIONS.Bold);
        }
        if (event?.key === 'I' && event?.ctrlKey) {
          onAction(TEXT_ACTIONS.Italic);
        }
        if (event?.key === 'U' && event?.ctrlKey) {
          onAction(TEXT_ACTIONS.Underline);
        }
        if (event?.key === 'Z' && event?.ctrlKey) {
          onAction(TEXT_ACTIONS.Undo);
        }
        if (event?.key === 'Y' && event?.ctrlKey) {
          onAction(TEXT_ACTIONS.Redo);
        }
        return false;
      },
      LOW_PRIORITY
    );
  }, [onAction, editor]);
};
