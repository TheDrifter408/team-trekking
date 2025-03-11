export interface Workspace {
  id: string;
  name: string;
  description: string;
  image?: string; // Optional workspace image
  members: {
    id: string;
    name: string;
    avatar?: string; // Optional member avatar
  }[];
}
