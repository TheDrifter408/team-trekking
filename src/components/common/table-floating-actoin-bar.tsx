import { useDataTableStore } from '@/stores/zustand/data-table-store.ts';
import { FloatingBar } from '@/components/data-table/floating-bar.tsx';

export const TabActionBar = () => {
  const selectedRows = useDataTableStore((s) => s.selectedRowIds);
  const selectedCount = selectedRows.size;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {selectedCount > 0 && <FloatingBar selectedCount={selectedCount} />}
      </div>
    </div>
  );
};
