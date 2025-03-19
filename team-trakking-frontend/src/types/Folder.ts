import { List } from './List';

export type Folder = {
  id: string;
  name: string;
  description?: string;
  lists: List[];
};
