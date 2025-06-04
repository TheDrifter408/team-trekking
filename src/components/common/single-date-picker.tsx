'use client';

import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  isThisYear,
  differenceInDays,
} from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils.ts';
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

interface SingleDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  className?: string;
}

export function SingleDatePicker({
  date,
  onDateChange,
  className,
}: SingleDatePickerProps) {
  // Function to smartly format dates based on proximity and context
  const formatSmartDate = (date: Date): string => {
    const now = new Date();
    const daysDiff = differenceInDays(now, date);

    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else if (daysDiff > 0) {
      // Past dates - show "X days ago"
      return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
    } else if (daysDiff < 0) {
      // Future dates - show "in X days" or just the date
      const futureDays = Math.abs(daysDiff);
      if (futureDays <= 7) {
        return `in ${futureDays} day${futureDays === 1 ? '' : 's'}`;
      }
    }

    // For other dates, show month and day
    if (isThisYear(date)) {
      return format(date, 'MMM d'); // Apr 27, May 26, etc.
    } else {
      return format(date, 'MMM d, yyyy');
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
            className={cn(
              'w-full justify-start text-left  flex cursor-pointer h-8 items-center px-2 hover:bg-accent/50 rounded-md transition-colors',
              !date && 'text-content-foreground'
            )}
          >
            {date ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-lg',
                          differenceInDays(new Date(), date) > 0
                            ? 'text-red-600' // Past dates in red
                            : 'text-content-default' // Future/current dates in normal color
                        )}
                      >
                        {formatSmartDate(date)}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={'font-medium '}>{formatFullDate(date)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <CalendarIcon size={14} className="text-muted-foreground" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
