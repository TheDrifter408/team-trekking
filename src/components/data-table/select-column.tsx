import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { useDataTableStore } from '@/stores/zustand/data-table-store.ts';

export const SelectColumn = ({ rowId }: { rowId: string }) => {
  const hoveredRowId = useDataTableStore((s) => s.hoveredRowId);
  const toggleSelectedRow = useDataTableStore((s) => s.toggleSelectedRow);
  const isAllRowSelected = useDataTableStore((s) => s.isAllRowSelected);
  const isSelected =
    useDataTableStore((s) => s.selectedRowIds.has(rowId)) || isAllRowSelected;

  const isVisible = hoveredRowId === rowId || isSelected || isAllRowSelected;

  if (!isVisible) return null;

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={() => toggleSelectedRow(rowId)}
    />
  );
};
