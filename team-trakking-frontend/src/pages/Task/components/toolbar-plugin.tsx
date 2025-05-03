import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import {
  HEADINGS,
  LOW_PRIORITY,
  TextAction,
  textOptions,
} from '@/lib/constants';
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
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { cn } from '@/lib/utils.ts';
export const ToolbarPlugin = () => {
  // Get access to the editor
  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState<{ [id: string]: boolean }>({
    [TextAction.Undo]: true,
    [TextAction.Redo]: true,
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
        [TextAction.Bold]: selection.hasFormat('bold'),
        [TextAction.Italic]: selection.hasFormat('italic'),
        [TextAction.Underline]: selection.hasFormat('underline'),
        [TextAction.Strikethrough]: selection.hasFormat('strikethrough'),
        [TextAction.Superscript]: selection.hasFormat('superscript'),
        [TextAction.Code]: selection.hasFormat('code'),
        [TextAction.Highlight]: selection.hasFormat('highlight'),
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
            [TextAction.Undo]: !payload,
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
            [TextAction.Redo]: !payload,
          }));
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [editor]);

  const onAction = (id: string) => {
    switch (id) {
      case TextAction.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        break;
      }
      case TextAction.Italic: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        break;
      }
      case TextAction.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        break;
      }
      case TextAction.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        break;
      }
      case TextAction.Superscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        break;
      }
      case TextAction.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
        break;
      }
      case TextAction.Code: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        break;
      }
      case TextAction.LeftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        break;
      }
      case TextAction.RightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        break;
      }
      case TextAction.CenterAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        break;
      }
      case TextAction.Undo: {
        editor.dispatchCommand(UNDO_COMMAND, undefined);
        break;
      }
      case TextAction.Redo: {
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
            {textOptions.map((option) => {
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
