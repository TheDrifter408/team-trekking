'use client';

import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  isThisYear,
  differenceInDays,
  isSameWeek,
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
  const formatSmartDate = (date: Date): string => {
    const now = new Date();

    if (isSameWeek(now, date, { weekStartsOn: 1 })) {
      if (isToday(date)) return 'Today';
      if (isTomorrow(date)) return 'Tomorrow';
      if (isYesterday(date)) return 'Yesterday';
    }

    if (isThisYear(date)) {
      return format(date, 'MMM d');
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  const formatFullDate = (date: Date): string => {
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'w-full justify-start text-left flex cursor-pointer h-8 items-center px-2 hover:bg-accent/50 rounded-md transition-colors',
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
                          'text-base text-content-default leading-4',
                          differenceInDays(new Date(), date) > 0
                            ? 'text-red-600'
                            : 'text-content-default'
                        )}
                      >
                        {formatSmartDate(date)}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{formatFullDate(date)}</p>
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
            defaultMonth={date ?? new Date()} // ensures selected date is shown on open
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
