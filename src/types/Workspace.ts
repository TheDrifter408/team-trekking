import { Member } from './Member';
import { Space } from './Space';

export interface Workspace {
  id?: string;
  name: string;
  description: string;
  image?: string; // Optional workspace image
  members: Member[];
  spaces: Space[];
}
