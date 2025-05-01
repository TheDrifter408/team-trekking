import { useState, useEffect, useRef } from 'react';
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Code,
  Quote,
  Link2,
  ListOrdered,
  Underline,
  Image,
  Table,
} from 'lucide-react';

// Import shadcn UI components
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

export const DocEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(value || '');
  const editorRef = useRef(null);
  const anchorRef = useRef(null);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [slashIndex, setSlashIndex] = useState(-1);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });

  // Update external state when editor state changes
  useEffect(() => {
    if (onChange) {
      onChange(editorState);
    }
  }, [editorState, onChange]);

  // Update editor state when external value changes
  useEffect(() => {
    if (value !== undefined && value !== editorState) {
      setEditorState(value);
    }
  }, [value]);

  // Available commands
  const commands = [
    {
      id: 'heading1',
      name: 'Heading 1',
      icon: <Heading1 className="mr-2 h-4 w-4" />,
      format: 'h1',
    },
    {
      id: 'heading2',
      name: 'Heading 2',
      icon: <Heading2 className="mr-2 h-4 w-4" />,
      format: 'h2',
    },
    {
      id: 'bold',
      name: 'Bold',
      icon: <Bold className="mr-2 h-4 w-4" />,
      format: 'bold',
    },
    {
      id: 'italic',
      name: 'Italic',
      icon: <Italic className="mr-2 h-4 w-4" />,
      format: 'italic',
    },
    {
      id: 'underline',
      name: 'Underline',
      icon: <Underline className="mr-2 h-4 w-4" />,
      format: 'underline',
    },
    {
      id: 'bulletList',
      name: 'Bullet List',
      icon: <List className="mr-2 h-4 w-4" />,
      format: 'bulletList',
    },
    {
      id: 'numberedList',
      name: 'Numbered List',
      icon: <ListOrdered className="mr-2 h-4 w-4" />,
      format: 'orderedList',
    },
    {
      id: 'quote',
      name: 'Quote',
      icon: <Quote className="mr-2 h-4 w-4" />,
      format: 'quote',
    },
    {
      id: 'code',
      name: 'Code',
      icon: <Code className="mr-2 h-4 w-4" />,
      format: 'code',
    },
    {
      id: 'codeBlock',
      name: 'Code Block',
      icon: <Code className="mr-2 h-4 w-4" />,
      format: 'codeBlock',
    },
    {
      id: 'link',
      name: 'Link',
      icon: <Link2 className="mr-2 h-4 w-4" />,
      format: 'link',
    },
    {
      id: 'image',
      name: 'Image',
      icon: <Image className="mr-2 h-4 w-4" />,
      format: 'image',
    },
    {
      id: 'table',
      name: 'Table',
      icon: <Table className="mr-2 h-4 w-4" />,
      format: 'table',
    },
  ];

  // Calculate cursor position and check for slash commands
  const handleChange = (e) => {
    const content = e.target.value;
    setEditorState(content);

    const cursorPosition = e.target.selectionStart;

    // Check if we're in the middle of typing a slash command
    let slashPos = -1;
    for (let i = cursorPosition - 1; i >= 0; i--) {
      if (content[i] === ' ' || content[i] === '\n') {
        break;
      }
      if (content[i] === '/') {
        slashPos = i;
        break;
      }
    }

    if (slashPos !== -1) {
      setSlashIndex(slashPos);
      // Extract the command text after the slash
      const commandText = content.substring(slashPos + 1, cursorPosition);
      setCommandInput(commandText);

      // Calculate and set caret position for the popover
      updateCaretPosition(e.target, cursorPosition);

      if (!showCommandMenu) {
        setShowCommandMenu(true);
      }
    } else {
      setShowCommandMenu(false);
      setCommandInput('');
      setSlashIndex(-1);
    }
  };

  // Function to calculate caret coordinates
  const updateCaretPosition = (textarea, position) => {
    const { left, top } = getCaretCoordinates(textarea, position);

    setCaretPosition({
      top: top + 20, // Offset to position below caret
      left: left,
    });

    // Update the position of the anchor
    if (anchorRef.current) {
      anchorRef.current.style.top = `${top}px`;
      anchorRef.current.style.left = `${left}px`;
    }
  };

  // Helper function to get caret position
  const getCaretCoordinates = (element, position) => {
    // Create a temporary span to measure where the caret is
    const tempSpan = document.createElement('span');
    tempSpan.innerHTML = '.';

    // Create a div with the same styling as the textarea
    const computedStyle = window.getComputedStyle(element);
    const div = document.createElement('div');

    // Copy styles from textarea to div
    const stylesToCopy = [
      'font-family',
      'font-size',
      'font-weight',
      'letter-spacing',
      'line-height',
      'text-indent',
      'padding-left',
      'padding-top',
      'width',
      'height',
      'border',
      'box-sizing',
      'white-space',
      'word-wrap',
      'overflow-wrap',
    ];

    stylesToCopy.forEach((style) => {
      div.style[style] = computedStyle[style];
    });

    // Set positioning styles for accurate measurement
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.visibility = 'hidden';

    // Split content by position and add temp span at caret position
    const content = element.value;
    div.textContent = content.substring(0, position);
    div.appendChild(tempSpan);

    // Add to document, measure, then remove
    document.body.appendChild(div);
    const { left, top } = tempSpan.getBoundingClientRect();
    const textareaRect = element.getBoundingClientRect();
    document.body.removeChild(div);

    // Return coordinates relative to textarea
    return {
      left: left - textareaRect.left,
      top: top - textareaRect.top,
    };
  };

  // Handle command selection
  const handleCommandSelect = (format) => {
    applyFormat(format);
    setShowCommandMenu(false);
  };

  // Apply formatting based on the command
  const applyFormat = (format) => {
    // Get current selection
    const textarea = editorRef.current;
    const cursorPosition = textarea.selectionStart;
    const selectedText = editorState.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    // Remove the slash command text
    let newText =
      editorState.substring(0, slashIndex) +
      editorState.substring(cursorPosition);
    let newCursorPos = slashIndex;

    // Apply the format
    switch (format) {
      case 'bold':
        newText =
          newText.substring(0, slashIndex) +
          `**${selectedText || 'bold text'}**` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 4 : 9);
        break;
      case 'italic':
        newText =
          newText.substring(0, slashIndex) +
          `*${selectedText || 'italic text'}*` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 2 : 11);
        break;
      case 'underline':
        newText =
          newText.substring(0, slashIndex) +
          `__${selectedText || 'underlined text'}__` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 4 : 15);
        break;
      case 'h1':
        newText =
          newText.substring(0, slashIndex) +
          `# ${selectedText || 'Heading 1'}` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 2 : 10);
        break;
      case 'h2':
        newText =
          newText.substring(0, slashIndex) +
          `## ${selectedText || 'Heading 2'}` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 3 : 11);
        break;
      case 'bulletList':
        newText =
          newText.substring(0, slashIndex) +
          `- ${selectedText || 'List item'}` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 2 : 10);
        break;
      case 'orderedList':
        newText =
          newText.substring(0, slashIndex) +
          `1. ${selectedText || 'List item'}` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 3 : 11);
        break;
      case 'quote':
        newText =
          newText.substring(0, slashIndex) +
          `> ${selectedText || 'Blockquote'}` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 2 : 12);
        break;
      case 'code':
        newText =
          newText.substring(0, slashIndex) +
          `\`${selectedText || 'code'}\`` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 2 : 6);
        break;
      case 'codeBlock':
        newText =
          newText.substring(0, slashIndex) +
          `\`\`\`\n${selectedText || 'code block'}\n\`\`\`` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 5 : 14);
        break;
      case 'link':
        newText =
          newText.substring(0, slashIndex) +
          `[${selectedText || 'link text'}](https://)` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 12 : 19);
        break;
      case 'image':
        newText =
          newText.substring(0, slashIndex) +
          `![${selectedText || 'image alt'}](https://)` +
          newText.substring(slashIndex);
        newCursorPos =
          slashIndex + (selectedText ? selectedText.length + 13 : 21);
        break;
      case 'table':
        newText =
          newText.substring(0, slashIndex) +
          `| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |` +
          newText.substring(slashIndex);
        newCursorPos = slashIndex + 104;
        break;
      default:
        break;
    }

    setEditorState(newText);

    // Set cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Convert markdown to HTML for preview
  const renderHTML = (markdown) => {
    let html = markdown;

    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert headers
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');

    // Convert bold, italic, underline
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/__(.+?)__/g, '<u>$1</u>');

    // Convert lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>)+/g, '<ul>$&</ul>');

    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>)+/g, '<ol>$&</ol>');

    // Convert blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Convert links
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    // Convert images
    html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />');

    // Convert tables (basic)
    html = html.replace(/\|(.+)\|/g, '<tr><td>$1</td></tr>');
    html = html.replace(/(<tr>.+<\/tr>)+/g, '<table>$&</table>');

    // Convert line breaks
    html = html.replace(/\n/g, '<br/>');

    return html;
  };

  // Toggle between edit and preview modes
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="w-full relative">
      <div className="relative">
        {/* Hidden anchor for popover positioning */}
        <div
          ref={anchorRef}
          className="absolute"
          style={{
            position: 'absolute',
            top: caretPosition.top,
            left: caretPosition.left,
            width: '1px',
            height: '1px',
          }}
        />

        {/* Editor / Preview Area */}
        {!isPreview ? (
          <>
            <Textarea
              ref={editorRef}
              value={editorState}
              onChange={handleChange}
              className="min-h-64 resize-y font-sans"
              placeholder="Write something or type '/' for commands"
            />

            {/* Command Menu using shadcn Popover and Command components */}
            <Popover open={showCommandMenu} onOpenChange={setShowCommandMenu}>
              <PopoverAnchor asChild>
                <div
                  ref={anchorRef}
                  style={{
                    position: 'absolute',
                    top: caretPosition.top,
                    left: caretPosition.left,
                    width: '1px',
                    height: '1px',
                  }}
                />
              </PopoverAnchor>
              <PopoverContent className="w-64 p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search formatting..."
                    value={commandInput}
                    onValueChange={setCommandInput}
                  />
                  <CommandList>
                    <CommandEmpty>No commands found.</CommandEmpty>
                    <CommandGroup heading="Formatting">
                      <ScrollArea className="h-64">
                        {commands
                          .filter(
                            (command) =>
                              command.name
                                .toLowerCase()
                                .includes(commandInput.toLowerCase()) ||
                              command.id.includes(commandInput.toLowerCase())
                          )
                          .map((command) => (
                            <CommandItem
                              key={command.id}
                              onSelect={() =>
                                handleCommandSelect(command.format)
                              }
                              className="flex items-center"
                            >
                              {command.icon}
                              <span>{command.name}</span>
                            </CommandItem>
                          ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div
            className="w-full min-h-64 p-4 border rounded-md bg-white overflow-auto prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderHTML(editorState) }}
          />
        )}
      </div>

      {/* Preview toggle button using shadcn Button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute bottom-2 right-2"
        onClick={() => setIsPreview(!isPreview)}
      >
        {isPreview ? 'Edit' : 'Preview'}
      </Button>
    </div>
  );
};
