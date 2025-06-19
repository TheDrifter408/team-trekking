import React, { ReactNode, useRef, useState, useEffect } from 'react';
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
}

const formatDuration = (ms: number): string => {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  return parts.join(' ');
};
const parseTimeString = (input: string): string => {
  const parts = input.trim().toLowerCase().split(/[\s]+/);
  let hours = 0;
  let minutes = 0;
  parts.forEach((part) => {
    if (part.includes('h')) hours += parseInt(part.replace('h', ''), 10) || 0;
    else if (part.includes('m'))
      minutes += parseInt(part.replace('m', ''), 10) || 0;
    else if (!isNaN(Number(part)))
      hours === 0 ? (hours = Number(part)) : (minutes = Number(part));
  });
  const ms = (hours * 60 + minutes) * 60 * 1000;
  if (ms === 0) return '';
  return formatDuration(ms);
};

export const TimeEstimateDropdown: React.FC<TimeEstimateComponentProps> = ({
  children,
  time,
}) => {
  const [inputValue, setInputValue] = useState<string>(time ?? '');
  const [savedTimeEstimate, setSavedTimeEstimate] = useState<string>(
    time ?? ''
  );
  const [suggestion, setSuggestion] = useState<string>('');
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const parsed = parseTimeString(val);
    setSuggestion(parsed);
    setShowSuggestion(!!parsed && parsed !== val);
  };

  const onClear = () => {
    setInputValue('');
    setSuggestion('');
    setShowSuggestion(false);
  };

  const onApplySuggestion = () => {
    setInputValue(suggestion);
    setSavedTimeEstimate(suggestion);
    setShowSuggestion(false);
  };

  const onBlur = () => {
    const parsed = parseTimeString(inputValue);
    if (parsed && parsed !== inputValue) {
      setInputValue(parsed); // update visible input
      setSavedTimeEstimate(parsed); // update saved
    } else {
      setSavedTimeEstimate(inputValue); // fallback to raw value
    }
    setShowSuggestion(false);
  };

  return (
    <div className="w-full max-w-md mx-auto py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[340px] p-0" align="start">
          <div className="mx-[10px] mt-[10px] flex items-center justify-between h-[45px]">
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-medium text-gray-900">
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
                      onBlur={onBlur}
                      placeholder="e.g. 3h 20"
                      onFocus={() => setShowSuggestion(!!suggestion)}
                      onKeyDown={(e) => {
                        if (
                          e.key === 'Enter' &&
                          suggestion &&
                          suggestion !== inputValue
                        ) {
                          e.preventDefault(); // Prevent form submission if inside a form
                          onApplySuggestion();
                        }
                      }}
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
                  onClick={onApplySuggestion}
                  className="w-[185px] flex items-center justify-between gap-2 text-base text-gray-700 p-2 shadow-md z-50"
                  sideOffset={4}
                >
                  <span>{suggestion}</span>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DropdownMenuSeparator />
          <div className="flex mx-[10px] my-[10px] justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm text-content-tertiary font-semibold">
                {LABEL.TOTAL_WITH_SUBTASKS}
              </p>
              <p className="font-medium text-base text-muted-foreground">
                {savedTimeEstimate}
              </p>
            </div>
            <p className="text-xs text-content-tertiary">
              {LABEL.CHANGES_ARE_AUTOMATICALLY_SAVED}
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TimeEstimateDropdown;
