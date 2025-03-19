import { ReactNode } from 'react';
import { Task } from './ApiResponse';

export interface Column {
  key: string;
  header: string;
  render?: (row: Task) => ReactNode;
  sticky?: boolean;
}
