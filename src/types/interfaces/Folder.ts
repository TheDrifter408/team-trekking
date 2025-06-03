import { List } from '@/types/interfaces/List';

export interface Folder {
  id: number;
  name: string;
  lists: List[];
}
