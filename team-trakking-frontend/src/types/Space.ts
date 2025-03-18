import { Folder } from './Folder';
import { List } from './List';

interface Status {
  id: string;
  name: string;
  serialId: number;
  statusColor: string;
}
export type Space = {
  id: string;
  name: string;
  description: string;
  folders: Folder[];
  lists: List[];
  statuses: Status[];
};
