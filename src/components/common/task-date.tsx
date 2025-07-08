'use client';

import { X } from 'lucide-react';
import { LABEL } from '@/lib/constants/appStrings';
import { Calendar } from '@/components/shadcn-ui/calendar.tsx';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/shadcn-ui/dialog.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { useState } from 'react';

interface TaskDateDialogProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  children?: React.ReactNode;
}

export function TaskDate({
  date,
  onDateChange,
  children,
}: TaskDateDialogProps) {
  const [open, setOpen] = useState(false);

  const onSelect = (d: Date | undefined) => {
    onDateChange?.(d);
    setOpen(false);
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        overlay={false}
        className="w-auto p-0 max-w-fit"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          defaultMonth={date ?? new Date()}
        />
        {date && (
          <div className="flex justify-end px-2 pb-2 pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-red-600"
              onClick={() => onSelect(undefined)}
            >
              <X className="w-3 h-3 mr-1" />
              {LABEL.CLEAR}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
