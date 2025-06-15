import { useDataTableStore } from '@/stores/zustand/data-table-store';
import { useState, useMemo, useCallback } from 'react';
import { COLUMN_META } from '@/lib/constants';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn-ui/sheet.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { IconX } from '@tabler/icons-react';
import { Icon } from '@/assets/icon-path.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Switch } from '@/components/shadcn-ui/switch.tsx';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}
// TODO: Set Column Type
export const ColumnDrawer = ({ open, onClose }: Props) => {
  const table = useDataTableStore((s) => s.table);
  const [searchTerm, setSearchTerm] = useState('');
  const [version, setVersion] = useState(0);

  const allColumns: any[] =
    table
      ?.getAllColumns()
      .filter((_, i, arr) => i !== 0 && i !== arr.length - 1) ?? [];

  const filteredColumns = useMemo(() => {
    if (!searchTerm) return allColumns;
    return allColumns.filter((column) => {
      const name = column.columnDef.header?.toString().toLowerCase() ?? '';
      return name.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, allColumns, version]);

  const forceUpdate = useCallback(() => setVersion((v) => v + 1), []);

  const onToggleVisibility = useCallback(
    (column: any) => {
      if (column.columnDef.header?.toString() === COLUMN_META.HEADER.NAME)
        return;
      column.toggleVisibility();
      forceUpdate();
    },
    [forceUpdate]
  );

  const onHideAll = useCallback(() => {
    for (const column of allColumns) {
      const name = column.columnDef.header?.toString();
      if (name === COLUMN_META.HEADER.NAME) continue;
      column.toggleVisibility();
    }
    forceUpdate();
  }, [allColumns, forceUpdate]);

  const onCloseDrawer = () => {
    setSearchTerm('');
    setVersion(0);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onCloseDrawer}>
      {/*       TODO: set height to CSS variables instead of 136px..       */}
      <SheetContent
        overlay={false}
        side="right"
        className="w-[300px] top-[136px] overflow-y-scroll h-[calc(100%-40px)] sm:w-[400px]"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background h-[50px] px-4">
          <div className="relative flex items-center justify-between h-full">
            <SheetTitle className="text-2xl font-semibold">Fields</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <IconX size={18} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="px-2">
          <div className="mb-2 relative">
            <Icon
              name="search"
              className="absolute size-5 text-content-tertiary left-4 top-1/2 -translate-y-1/2"
            />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[36px] px-4 relative placeholder:text-lg pl-10 !text-lg"
              placeholder="Search for new or existing fields"
            />
          </div>

          <div className="px-1">
            <div className="w-full text-base font-medium text-content-tertiary justify-between flex items-center">
              <span>Shown</span>
              <button onClick={onHideAll} className="hover:bg-accent px-[2px]">
                <span>Hide all</span>
              </button>
            </div>

            <ColumnItems
              columns={filteredColumns}
              onToggleVisibility={onToggleVisibility}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ColumnItems = ({
  columns,
  onToggleVisibility,
}: {
  columns: any[];
  onToggleVisibility: (col: any) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {columns.map((column) => {
        const name = column.columnDef.header?.toString() ?? '';
        const icon = column.columnDef.meta?.icon ?? 'progress';
        const isDisabled = name === COLUMN_META.HEADER.NAME;

        return (
          <div
            key={column.id}
            className={cn(
              'flex flex-col gap-y-4 py-2 px-2 rounded-lg',
              isDisabled ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer',
              'hover:bg-gray-100'
            )}
            onClick={() => onToggleVisibility(column)}
          >
            <div className="w-full flex justify-between items-center">
              <span className="text-lg flex gap-x-2 items-center text-content-default">
                <Icon
                  name={icon.toLowerCase() as any}
                  className="size-[18px] text-content-tertiary"
                />
                {name}
              </span>
              <Switch
                checked={column.getIsVisible()}
                onCheckedChange={() => onToggleVisibility(column)}
                disabled={isDisabled}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
