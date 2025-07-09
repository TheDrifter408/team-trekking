import { Tag } from '@/types/request-response/task/ApiResponse';

export interface TagDropdownContextType {
  tags: Tag[];
  selectedTags: Tag[];
  onTagsChange?: (selectedTags: Tag[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  maxTags?: number;
  allowCreate?: boolean;
}
