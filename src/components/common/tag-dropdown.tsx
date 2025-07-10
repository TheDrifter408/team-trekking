import {
  useState,
  createContext,
  useContext,
  useEffect,
  FC,
  cloneElement,
  ReactNode,
  ReactElement,
} from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Tag } from '@/types/request-response/task/ApiResponse';
import { TagDropdownContextType } from '@/types/interfaces/TagDropDown';
// Context
const TagDropdownContext = createContext<TagDropdownContextType | null>(null);

const useTagDropdown = () => {
  const context = useContext(TagDropdownContext);
  if (!context) {
    throw new Error('Tag dropdown components must be used within TagDropdown');
  }
  return context;
};

// Predefined tag colors
const tagColors = {
  backend: 'bg-purple-100 text-purple-800 border-purple-200',
  frontend: 'bg-green-100 text-green-800 border-green-200',
  docs: 'bg-blue-100 text-blue-800 border-blue-200',
  complex: 'bg-red-100 text-red-800 border-red-200',
  fail: 'bg-orange-100 text-orange-800 border-orange-200',
  default: 'bg-gray-100 text-gray-800 border-gray-200',
};

// Tag component
const TagChip: FC<{
  tag: Tag;
  onRemove?: () => void;
  removable?: boolean;
  size?: 'sm' | 'md';
}> = ({ tag, onRemove, removable = true, size = 'md' }) => {
  const getTagColor = (label: string) => {
    if (label?.includes('backend')) return tagColors.backend;
    if (label?.includes('frontend')) return tagColors.frontend;
    if (label?.includes('docs')) return tagColors.docs;
    if (label?.includes('complex')) return tagColors.complex;
    if (label?.includes('fail')) return tagColors.fail;
    return tagColors.default;
  };

  const sizeClasses =
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2 py-0.5 text-sm';

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-[4px] border font-medium !text-black flex-shrink-0
        ${getTagColor(tag.label)} ${sizeClasses}
      `}
    >
      <span className="truncate max-w-[100px]">{tag.label}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 hover:bg-black hover:bg-opacity-10 rounded-full flex-shrink-0"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

// Main Tag Dropdown Component
interface TagDropdownProps {
  tags: Tag[];
  selectedTags?: Tag[];
  onTagsChange?: (selectedTags: Tag[]) => void;
  maxTags?: number;
  allowCreate?: boolean;
  children: React.ReactNode;
}

const TagDropdown: FC<TagDropdownProps> = ({
  tags,
  selectedTags = [],
  onTagsChange,
  maxTags,
  allowCreate = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedTags, setInternalSelectedTags] =
    useState<Tag[]>(selectedTags);

  const currentSelectedTags =
    selectedTags.length > 0 ? selectedTags : internalSelectedTags;

  const contextValue: TagDropdownContextType = {
    tags,
    selectedTags: currentSelectedTags,
    onTagsChange: (newTags) => {
      setInternalSelectedTags(newTags);
      onTagsChange?.(newTags);
    },
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    maxTags,
    allowCreate,
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onHandleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-tag-dropdown]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', onHandleClickOutside);
      return () =>
        document.removeEventListener('mousedown', onHandleClickOutside);
    }
  }, [isOpen]);

  return (
    <TagDropdownContext.Provider value={contextValue}>
      <div className="relative" data-tag-dropdown>
        {children}
      </div>
    </TagDropdownContext.Provider>
  );
};

// Trigger Component
interface TagDropdownTriggerProps {
  asChild?: boolean;
  children?: ReactNode;
  placeholder?: string;
  className?: string;
}

const TagDropdownTrigger: FC<TagDropdownTriggerProps> = ({
  asChild = false,
  children,
  placeholder = 'Select tags',
  className = '',
}) => {
  const { selectedTags, tags, isOpen, setIsOpen, onTagsChange } =
    useTagDropdown();

  const selectedTagObjects = tags.filter((tag) => selectedTags.includes(tag));

  const onHandleRemoveTag = (tagId: number) => {
    const newSelectedTags = selectedTags.filter((tag) => tag.id !== tagId);
    onTagsChange?.(newSelectedTags);
  };

  if (asChild && children) {
    return (
      <div onClick={() => setIsOpen(!isOpen)}>
        {cloneElement(children as ReactElement<HTMLButtonElement>, {
          onclick: () => setIsOpen(!isOpen),
        })}
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center min-w-0 w-full ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        {/* Selected Tags Container with fixed width constraints */}
        <div className="flex items-center gap-1 min-w-0 flex-1">
          {/* Show only tags that fit, with intelligent truncation */}
          {selectedTags.length === 0 ? (
            <span className="text-gray-500 text-base truncate">
              {placeholder}
            </span>
          ) : (
            <>
              {/* Show first tag(s) that fit */}
              <div className="flex items-center gap-1 min-w-0 flex-1">
                {selectedTagObjects
                  .slice(0, Math.min(3, selectedTagObjects.length))
                  .map((tag, index) => {
                    // Show fewer tags if we need to show the +X indicator
                    const showCount = selectedTags.length > 3 ? 2 : 3;
                    if (index >= showCount) return null;

                    return (
                      <TagChip
                        key={tag.id}
                        tag={tag}
                        onRemove={() => onHandleRemoveTag(tag.id)}
                        size="sm"
                      />
                    );
                  })}

                {/* Show +X indicator ONLY if more than 3 tags */}
                {selectedTags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 rounded-[4px] flex-shrink-0">
                    +{selectedTags.length - 2}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Content Component
interface TagDropdownContentProps {
  className?: string;
  searchable?: boolean;
}

const TagDropdownContent: React.FC<TagDropdownContentProps> = ({
  className = '',
  searchable = true,
}) => {
  const {
    tags,
    selectedTags,
    onTagsChange,
    isOpen,
    searchQuery,
    setSearchQuery,
    maxTags,
    allowCreate,
  } = useTagDropdown();

  if (!isOpen) return null;

  const onHandleTagToggle = (tag: Tag) => {
    let newSelectedTags: Tag[];

    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter((t) => t.id !== tag.id);
    } else {
      if (maxTags && selectedTags.length >= maxTags) return;
      newSelectedTags = [...selectedTags, tag];
    }

    onTagsChange?.(newSelectedTags);
  };

  // Filter out selected tags from the dropdown list
  const availableTags = tags.filter((tag) => !selectedTags.includes(tag));

  const filteredTags = searchable
    ? availableTags.filter((tag) =>
        tag?.name.toLowerCase().includes(searchQuery?.toLowerCase())
      )
    : availableTags;

  const onHandleCreateTag = () => {
    if (!allowCreate || !searchQuery.trim()) return;

    const newTagName = searchQuery?.toLowerCase().replace(/\s+/g, '-');

    // Don't create if tag already exists (including selected ones)
    if (tags.some((tag) => tag?.name === newTagName)) return;

    const newTag: Tag = {
      id: 0,
      name: searchQuery.trim(),
      isActive: true,
    };

    // Add the new tag to the available tags (this would normally be handled by parent component)
    const newSelectedTags = [...selectedTags, newTag];
    onTagsChange?.(newSelectedTags);
    setSearchQuery('');
  };

  const selectedTagObjects = tags.filter((tag) => selectedTags.includes(tag));

  const onHandleRemoveTag = (tagId: number) => {
    const newSelectedTags = selectedTags.filter((t) => t.id !== tagId);
    onTagsChange?.(newSelectedTags);
  };

  return (
    <div
      className={`
      absolute z-50 mt-1 left-0 w-80 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden
      ${className}
    `}
    >
      {/* Selected Tags Section */}
      {selectedTags.length > 0 && (
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {selectedTagObjects.map((tag) => (
              <TagChip
                key={tag.id}
                tag={tag}
                onRemove={() => onHandleRemoveTag(tag.id)}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Input */}
      {searchable && (
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or Create New"
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Tags List */}
      <div className="max-h-48 overflow-y-auto">
        {filteredTags.length === 0 && !allowCreate ? (
          <div className="px-3 py-4 text-sm text-gray-500 text-center">
            No tags found
          </div>
        ) : (
          <>
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => !tag.disabled && onHandleTagToggle(tag)}
                disabled={tag.disabled}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm text-left
                  hover:bg-gray-50 focus:outline-none focus:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <div className="flex items-center gap-2">
                  <TagChip tag={tag} removable={false} size="sm" />
                </div>
              </button>
            ))}

            {/* Create New Tag Option */}
            {allowCreate &&
              searchQuery &&
              !tags.some(
                (tag) =>
                  tag?.label?.toLowerCase() === searchQuery?.toLowerCase()
              ) && (
                <button
                  type="button"
                  onClick={onHandleCreateTag}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-t border-gray-100"
                >
                  <Plus className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Create "{searchQuery}"</span>
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
};

interface TagDropdownWrapperProps {
  placeholder?: string;
  availableTags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
}

const TagDropdownWithSelection: FC<TagDropdownWrapperProps> = ({
  placeholder = 'Empty',
  availableTags,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <TagDropdown
      tags={availableTags}
      selectedTags={selectedTags}
      onTagsChange={setSelectedTags}
      maxTags={10}
      allowCreate={true}
    >
      <TagDropdownTrigger placeholder={placeholder} />
      <TagDropdownContent searchable={true} />
    </TagDropdown>
  );
};

export default TagDropdownWithSelection;
