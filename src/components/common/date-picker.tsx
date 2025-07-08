'use client';

import * as React from 'react';
import { format, isThisYear, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { CalendarIcon, MoveRight } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils/utils.ts';
import { Calendar } from '@/components/shadcn-ui/calendar.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip.tsx';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: DateRange;
  onChange?: (dateRange: DateRange | undefined) => void;
  placeholder?: string;
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
  placeholder = 'Pick a date',
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);

  // Update local state when value prop changes
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Handle date selection
  const onHandleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  // Function to smartly format dates based on proximity
  const formatSmartDate = (date: Date): string => {
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else if (isThisWeek(date)) {
      return format(date, 'EEE'); // Day name (Mon, Tue, etc.)
    } else if (isThisYear(date)) {
      return format(date, 'd MMM'); // 14 Apr
    } else {
      return format(date, 'd/M/yy'); // 14 Apr 2026
    }
  };

  // Function to format full date for tooltip
  const formatFullDate = (date: Date): string => {
    return format(date, 'EEEE, MMMM d, yyyy'); // Monday, April 14, 2025
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div
            id="date"
            className={cn(
              'w-[300px] justify-start text-left font-normal text-base flex cursor-pointer h-7 items-center',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon size={12} className={'mr-2'} />
            {date?.from ? (
              date.to ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{formatSmartDate(date.from)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatFullDate(date.from)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  &nbsp;
                  <MoveRight size={12} />
                  &nbsp;
                  <CalendarIcon className={'mx-2'} size={12} />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{formatSmartDate(date.to)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatFullDate(date.to)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        {formatSmartDate(date.from)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{formatFullDate(date.from)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onHandleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
