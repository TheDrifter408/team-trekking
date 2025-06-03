import { useState, useCallback } from 'react';
import { ExpandedState } from '@tanstack/react-table';

export interface UseExpandableRowsReturn {
  expanded: ExpandedState;
  toggleRow: (rowId: string) => void;
  expandRow: (rowId: string) => void;
  collapseRow: (rowId: string) => void;
  expandAll: (data: { id: string; subTasks?: any[] }[]) => void;
  collapseAll: () => void;
  isExpanded: (rowId: string) => boolean;
}

export function useExpandableRows(): UseExpandableRowsReturn {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const toggleRow = useCallback((rowId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }, []);

  const expandRow = useCallback((rowId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [rowId]: true,
    }));
  }, []);

  const collapseRow = useCallback((rowId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [rowId]: false,
    }));
  }, []);

  const expandAll = useCallback((data: { id: string; subTasks?: any[] }[]) => {
    const getAllIds = (items: { id: string; subTasks?: any[] }[]): string[] => {
      const ids: string[] = [];
      items.forEach((item) => {
        if (item.subTasks && item.subTasks.length > 0) {
          ids.push(item.id);
          ids.push(...getAllIds(item.subTasks));
        }
      });
      return ids;
    };

    const allIds = getAllIds(data);
    const newExpanded = allIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as ExpandedState);

    setExpanded(newExpanded);
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded({});
  }, []);

  const isExpanded = useCallback(
    (rowId: string) => {
      return !!expanded[rowId];
    },
    [expanded]
  );

  return {
    expanded,
    toggleRow,
    expandRow,
    collapseRow,
    expandAll,
    collapseAll,
    isExpanded,
  };
}
