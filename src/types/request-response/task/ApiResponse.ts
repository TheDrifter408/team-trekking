export interface CheckList {
  id: number;
  title: string;
  isActive: boolean;
  items: Item[];
}

export interface Item {
  id: number;
  content: string;
  isDone: boolean;
  isActive: boolean;
}
