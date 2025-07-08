import React, { useState, useMemo } from 'react';
import { Label } from '@/components/shadcn-ui/label';
import { Icon } from '@/assets/icon-path';
import { InputIcon } from '@/components/shadcn-ui/input';
import { Separator } from '@/components/shadcn-ui/separator';
import { Status, StatusItem } from '@/types/request-response/list/ApiResponse';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { cn } from '@/lib/utils/utils';

interface StatusPopupProps {
  status: Status | null;
  onStatusSelect: (statusItem: StatusItem) => void;
  children: React.ReactNode;
  currentStatus?: StatusItem | null;
}

export const StatusPopup = ({
  children,
  status,
  onStatusSelect,
  currentStatus,
}: StatusPopupProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = useMemo(() => {
    if (!status?.groups) return [];
    if (!searchTerm.trim()) return status.groups;

    return status.groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [status, searchTerm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        hideCloseButton
        className="w-64 p-2 flex flex-col space-y-2 overflow-hidden"
      >
        <InputIcon
          icon="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 placeholder:font-medium"
        />
        <Separator />

        <div className="overflow-y-auto max-h-[350px] pr-1">
          {filteredGroups.map((group) => (
            <div key={group.id} className="pb-4">
              <Label className="block text-sm text-muted-foreground mb-2">
                {group.name}
              </Label>

              {group.items.map((item) => {
                const isSelected = currentStatus?.id === item.id;

                return (
                  <div
                    key={item.id}
                    role="button"
                    onClick={() => onStatusSelect(item)}
                    className={cn(
                      'flex items-center justify-between cursor-pointer py-2 px-1 rounded-sm hover:bg-secondary'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-2 text-sm',
                        isSelected && 'font-medium'
                      )}
                    >
                      <Icon
                        name="status01"
                        className="size-4"
                        style={{ color: item.color }}
                      />
                      {item.name}
                    </div>

                    {isSelected && (
                      <Icon
                        name="okfill01"
                        className="size-4 text-theme-main"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
