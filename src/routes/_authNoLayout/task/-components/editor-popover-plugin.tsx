import { useState, useEffect, useRef } from 'react';
import { ToolbarPlugin } from './toolbar-plugin.tsx';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { Button } from '@/components/shadcn-ui/button';

export const SlashCommandPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  // Listen for text content changes
  useEffect(() => {
    return editor.registerTextContentListener((text) => {
      if (text.endsWith('/') && !isOpen) {
        setIsOpen(true);
      }
    });
  }, [editor, isOpen]);

  return (
    <div ref={triggerRef}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button className="w-1 h-1 p-0 m-0 opacity-0" />
        </PopoverTrigger>
        <PopoverContent side={'top'} className="ml-[40px] mb-[100px]">
          <ToolbarPlugin />
        </PopoverContent>
      </Popover>
    </div>
  );
};
