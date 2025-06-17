// Types
export interface TagOption {
  id: string;
  label: string;
  color?: string;
  category?: string;
  disabled?: boolean;
}

export interface TagDropdownContextType {
  tags: TagOption[];
  selectedTags: string[];
  onTagsChange?: (selectedTags: string[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  maxTags?: number;
  allowCreate?: boolean;
}
