import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import { useKeyBindings } from '@/lib/hooks/use-key-bindings.tsx';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode } from 'lexical';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Label } from '@/components/shadcn-ui/label.tsx';
import { cn } from '@/lib/utils.ts';
import {
  HEADINGS,
  LOW_PRIORITY,
  TEXT_ACTIONS,
  TEXT_OPTIONS,
} from '@/lib/constants/appConstant.ts';
export const ToolbarPlugin = () => {
  // Get access to the editor
  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState<{ [id: string]: boolean }>({
    [TEXT_ACTIONS.Undo]: true,
    [TEXT_ACTIONS.Redo]: true,
  });
  const [selectionMap, setSelectionMap] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [currentHeading, setCurrentHeading] = useState<string>('paragraph');

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text formatting states
      const newSelectionMap = {
        [TEXT_ACTIONS.Bold]: selection.hasFormat('bold'),
        [TEXT_ACTIONS.Italic]: selection.hasFormat('italic'),
        [TEXT_ACTIONS.Underline]: selection.hasFormat('underline'),
        [TEXT_ACTIONS.Strikethrough]: selection.hasFormat('strikethrough'),
        [TEXT_ACTIONS.Superscript]: selection.hasFormat('superscript'),
        [TEXT_ACTIONS.Code]: selection.hasFormat('code'),
        [TEXT_ACTIONS.Highlight]: selection.hasFormat('highlight'),
      };
      setSelectionMap(newSelectionMap);

      // Detect current heading
      const anchorNode = selection.anchor.getNode();
      const headingParent = $isHeadingNode(anchorNode)
        ? anchorNode
        : anchorNode.getParent();

      if ($isHeadingNode(headingParent)) {
        setCurrentHeading(headingParent.getTag());
      } else {
        // Reset to paragraph
        setCurrentHeading('paragraph');
      }
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setDisableMap((prevDisabledMap) => ({
            ...prevDisabledMap,
            [TEXT_ACTIONS.Undo]: !payload,
          }));
          return false;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setDisableMap((prevDisabledMap) => ({
            ...prevDisabledMap,
            [TEXT_ACTIONS.Redo]: !payload,
          }));
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [editor]);

  const onAction = (id: string) => {
    switch (id) {
      case TEXT_ACTIONS.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        break;
      }
      case TEXT_ACTIONS.Italic: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        break;
      }
      case TEXT_ACTIONS.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        break;
      }
      case TEXT_ACTIONS.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        break;
      }
      case TEXT_ACTIONS.Superscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        break;
      }
      case TEXT_ACTIONS.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
        break;
      }
      case TEXT_ACTIONS.Code: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        break;
      }
      case TEXT_ACTIONS.LeftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        break;
      }
      case TEXT_ACTIONS.RightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        break;
      }
      case TEXT_ACTIONS.CenterAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        break;
      }
      case TEXT_ACTIONS.Undo: {
        editor.dispatchCommand(UNDO_COMMAND, undefined);
        break;
      }
      case TEXT_ACTIONS.Redo: {
        editor.dispatchCommand(REDO_COMMAND, undefined);
        break;
      }
    }
  };
  useKeyBindings({ onAction });

  const onHeadingChange = (tag: string) => {
    if (tag === 'paragraph') {
      // Convert heading to paragraph
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Clear block formatting to default paragraph
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    } else if (HEADINGS.includes(tag as HeadingTagType)) {
      // Set heading type
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () =>
            $createHeadingNode(tag as HeadingTagType)
          );
        }
      });
    }
    setCurrentHeading(tag);
  };

  return (
    <div className=" w-full gap-3 flex-wrap rounded-lg">
      <div className="gap-1">
        {/* Heading buttons */}
        <Label className="text-muted-foreground font-medium">HEADER</Label>

        <div className="grid grid-cols-2 col-span-2 mt-2 gap-2">
          {HEADINGS.map((option) => {
            const isSelected = currentHeading === option.tag;
            return (
              <Button
                key={option.id}
                aria-label={option.label}
                variant={isSelected ? 'default' : 'ghost'}
                className={cn(
                  'flex items-center justify-center',
                  isSelected && 'bg-primary text-primary-foreground'
                )}
                onClick={() => onHeadingChange(option.tag)}
              >
                <div className="border p-1 rounded">
                  <option.icon size={18} />
                </div>
                <span className={'text-sm font-normal'}>{option.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="">
          <Label className="text-muted-foreground font-medium my-2">TEXT</Label>

          <div className="grid grid-cols-2 col-span-2 mt-2 gap-2">
            {/* Text formatting buttons */}
            {TEXT_OPTIONS.map((option) => {
              // Determine if this button is currently active/selected
              const isSelected = selectionMap[option.id] || false;

              return (
                <Button
                  disabled={disableMap[option.id]}
                  key={option.id}
                  aria-label={option.label}
                  variant={isSelected ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'flex justify-between',
                    isSelected && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => onAction(option.id)}
                >
                  <div className="border p-1 rounded">
                    <option.icon size={18} />
                  </div>
                  <span className={'text-sm font-normal'}>{option.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
