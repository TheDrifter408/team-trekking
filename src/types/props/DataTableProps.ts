import { Header, Cell, Row } from '@tanstack/react-table';

export interface DataTableProps {
  height?: string;
  className?: string;
}

export interface TableHeaderSectionProps {
  headers: Header<any, unknown>[];
  position: 'left' | 'center' | 'right';
  centerTotalSize?: number;
}

export interface TableRowProps {
  row: Row<any>;
  depth?: number;
  virtualRow: {
    index: number;
    start: number;
    size: number;
  };
  onRowHover: (id: string | null) => void;
  activeDialogRowId: string | null;
}

export interface TableCellSectionProps {
  cells: Cell<any, unknown>[];
  position: 'left' | 'center' | 'right';
}
