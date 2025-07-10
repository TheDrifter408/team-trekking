import React, { ReactNode, useRef, useState } from 'react';
import { Input } from '@/components/shadcn-ui/input';
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { X } from 'lucide-react';
import { LABEL } from '@/lib/constants';

interface TimeEstimateComponentProps {
  children: ReactNode;
  time?: string;
  onTimeEstimateChange?: (estimate: number) => void;
}

const parseTimeString = (input: string): string => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return '';

  // Split by spaces but keep the units with their numbers
  const parts = trimmed.split(/\s+/);
  let hours = 0;
  let minutes = 0;

  parts.forEach((part) => {
    if (part.includes('h')) {
      const num = parseInt(part.replace('h', ''), 10);
      if (!isNaN(num)) hours += num;
    } else if (part.includes('m')) {
      const num = parseInt(part.replace('m', ''), 10);
      if (!isNaN(num)) minutes += num;
    } else if (!isNaN(Number(part))) {
      // If it's just a number without suffix
      const num = Number(part);
      if (hours === 0) {
        hours = num;
      } else {
        minutes = num;
      }
    }
  });

  // If no valid time parsed, return empty
  if (hours === 0 && minutes === 0) return '';

  // Format as "Xh Ym"
  const totalMinutes = hours * 60 + minutes;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  if (m > 0) return `${m}m`;
  return '';
};

// Helper function to convert time string to minutes
const parseTimeToMinutes = (input: string): number => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return 0;

  const parts = trimmed.split(/\s+/);
  let hours = 0;
  let minutes = 0;

  parts.forEach((part) => {
    if (part.includes('h')) {
      const num = parseInt(part.replace('h', ''), 10);
      if (!isNaN(num)) hours += num;
    } else if (part.includes('m')) {
      const num = parseInt(part.replace('m', ''), 10);
      if (!isNaN(num)) minutes += num;
    } else if (!isNaN(Number(part))) {
      // If it's just a number without suffix, treat as hours if no hours set yet, otherwise minutes
      const num = Number(part);
      if (hours === 0) {
        hours = num;
      } else {
        minutes = num;
      }
    }
  });

  return hours * 60 + minutes;
};

// Helper function to suggest formatted time based on input
const suggestTimeFormat = (input: string): string => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return '';

  // If input already has proper format, don't suggest
  if (trimmed.includes('h') || trimmed.includes('m')) {
    return parseTimeString(input);
  }

  // If it's just a number, suggest both hour and minute format
  const num = Number(trimmed);
  if (!isNaN(num) && num > 0) {
    // If number is reasonable for hours (1-24), suggest hours
    if (num <= 24) {
      return `${num}h`;
    }
    // If number is large, suggest minutes
    else if (num <= 1440) {
      // 24 hours = 1440 minutes
      return `${num}m`;
    }
  }

  return parseTimeString(input);
};

export const TimeEstimateDropdown: React.FC<TimeEstimateComponentProps> = ({
  children,
  time,
  onTimeEstimateChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(time ?? '');
  const [savedTimeEstimate, setSavedTimeEstimate] = useState<string>(
    time ?? '3h'
  );
  const [suggestion, setSuggestion] = useState<string>('');
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow numbers, 'h', 'm', and spaces
    const filteredVal = val.replace(/[^0-9hm\s]/gi, '');

    setInputValue(filteredVal);

    const suggested = suggestTimeFormat(filteredVal);
    setSuggestion(suggested);

    // Show suggestion if:
    // 1. We have a suggestion
    // 2. The suggestion is different from current input
    // 3. The input is not empty
    // 4. The input doesn't already have the same format
    setShowSuggestion(
      !!suggested &&
        suggested !== filteredVal &&
        filteredVal.trim() !== '' &&
        suggested !== parseTimeString(filteredVal)
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let finalValue = inputValue;

      // If we have a suggestion showing, use it
      if (showSuggestion && suggestion) {
        finalValue = suggestion;
      } else {
        // Otherwise, try to parse the input
        const parsed = parseTimeString(inputValue);
        if (parsed) {
          finalValue = parsed;
        }
      }

      setInputValue(finalValue);
      setSavedTimeEstimate(finalValue);

      // Trigger callback with time in minutes
      const minutes = parseTimeToMinutes(finalValue);
      if (minutes > 0) {
        onTimeEstimateChange?.(minutes);
      }

      setShowSuggestion(false);
      setIsOpen(false);
      ref.current?.blur();
    }
  };

  const onClear = () => {
    setInputValue('');
    setSuggestion('');
    setShowSuggestion(false);
  };

  const onApplySuggestion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInputValue(suggestion);
    setSavedTimeEstimate(suggestion);
    setShowSuggestion(false);

    // Trigger callback with time in minutes
    const minutes = parseTimeToMinutes(suggestion);
    if (minutes > 0) {
      onTimeEstimateChange?.(minutes);
    }

    ref.current?.focus();
  };

  const onBlur = () => {
    // Small delay to allow popover click to register
    setTimeout(() => {
      let finalValue = inputValue;

      // Try to parse and format the input
      const parsed = parseTimeString(inputValue);
      if (parsed) {
        finalValue = parsed;
        setInputValue(finalValue);
      }

      setSavedTimeEstimate(finalValue);
      setShowSuggestion(false);

      // Trigger callback with time in minutes
      const minutes = parseTimeToMinutes(finalValue);
      if (minutes > 0) {
        onTimeEstimateChange?.(minutes);
      }
    }, 150);
  };

  const onFocus = () => {
    // Regenerate suggestion when focusing
    const suggested = suggestTimeFormat(inputValue);
    setSuggestion(suggested);

    // Show suggestion if we have one and it's different from input
    if (suggested && inputValue.trim() !== '' && suggested !== inputValue) {
      setShowSuggestion(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[340px] p-1 shadow-lg"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            setTimeout(() => {
              ref.current?.focus();
            }, 0);
          }}
        >
          <div className="mx-[10px] mt-[10px] flex items-center justify-between h-[45px]">
            <div className="flex items-center gap-x-2">
              <span className="text-sm font-medium text-gray-900">
                {LABEL.TIME_ESTIMATE}
              </span>
              <div className="bg-gray-300 font-bold text-white text-base rounded-full w-[20px] h-[20px] flex items-center justify-center">
                ?
              </div>
            </div>
            <div className="relative">
              <Popover open={showSuggestion}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      className="w-[135px] !h-[35px] !text-base pr-8"
                      value={inputValue}
                      onChange={onChange}
                      onKeyDown={onKeyDown}
                      onBlur={onBlur}
                      placeholder="e.g. 3h 20m or 180"
                      onFocus={onFocus}
                      ref={ref}
                    />
                    {inputValue && (
                      <X
                        className="absolute right-2 top-2.5 w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={onClear}
                      />
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[185px] flex items-center justify-between gap-2 text-base text-gray-700 p-2 shadow-md z-50 cursor-pointer hover:bg-gray-50"
                  sideOffset={4}
                  onMouseDown={onApplySuggestion}
                >
                  <span>{suggestion}</span>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DropdownMenuSeparator />
          <div className="flex mx-[10px] my-[10px] justify-between items-center">
            <div className="flex flex-col">
              <p className="text-xs  text-content-tertiary font-semibold">
                {LABEL.TOTAL_WITH_SUBTASKS}
              </p>
              <p className="font-medium text-base text-muted-foreground">
                {savedTimeEstimate}
              </p>
            </div>
            <p className="text-[8px] text-content-tertiary">
              {LABEL.CHANGES_ARE_AUTOMATICALLY_SAVED}
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TimeEstimateDropdown;
