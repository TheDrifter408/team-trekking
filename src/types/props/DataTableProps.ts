import { Header, Cell } from '@tanstack/react-table';

export interface DataTableProps {
  height?: string;
  className?: string;
}

export interface TableHeaderSectionProps {
  headers: Header<any, unknown>[];
  position: 'left' | 'center' | 'right';
  centerTotalSize?: number;
}

export interface TableCellSectionProps {
  cells: Cell<any, unknown>[];
  position: 'left' | 'center' | 'right';
}
