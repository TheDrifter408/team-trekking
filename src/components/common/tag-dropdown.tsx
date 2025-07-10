import {
  useState,
  createContext,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from 'react';
import { X, Plus, Search } from 'lucide-react';
import {
  useDeleteTaskTagMutation,
  useUpdateTaskTagMutation,
} from '@/service/rtkQueries/taskQuery.ts';
import {
  getRandomMaterial100Color,
  handleMutation,
} from '@/lib/utils/utils.ts';
import {
  useCreateTagMutation,
  useLazyGetTagsQuery,
} from '@/service/rtkQueries/spaceQuery.ts';

interface Tag {
  id: number;
  name: string;
  color?: string;
  isActive: boolean;
}

interface TagContextType {
  tags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  taskId: number;
  spaceId: number;
}

const TagContext = createContext<TagContextType | null>(null);

const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) throw new Error('Must be used within TagDropdown');
  return context;
};

const TagChip: FC<{
  tag: Tag;
  onRemove?: () => void;
  removable?: boolean;
  size?: 'sm' | 'md';
}> = ({ tag, onRemove, removable = true, size = 'md' }) => (
  <span
    className={`inline-flex items-center gap-1 rounded border font-medium text-black flex-shrink-0 ${
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2 py-0.5 text-sm'
    }`}
    style={{ backgroundColor: tag.color || '#e5e7eb' }}
  >
    <span className="truncate max-w-[100px]">{tag.name}</span>
    {removable && onRemove && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-0.5 hover:bg-black hover:bg-opacity-10 rounded-full"
      >
        <X className="h-3 w-3" />
      </button>
    )}
  </span>
);

const TagTrigger: FC<{ placeholder?: string; className?: string }> = ({
  placeholder = 'Select tags',
  className = '',
}) => {
  const { selectedTags, tags, isOpen, setIsOpen, onTagsChange, taskId } =
    useTagContext();
  const [deleteTag] = useDeleteTaskTagMutation();

  const selectedTagObjects = tags.filter((tag) =>
    selectedTags.some((selectedTag) => selectedTag.id === tag.id)
  );

  const handleRemoveTag = async (tagId: number) => {
    const { data } = await handleMutation(deleteTag, {
      id: taskId,
      tagIds: [tagId],
    });
    if (data) {
      onTagsChange(selectedTags.filter((tag) => tag.id !== tagId));
    }
  };

  const renderTags = () => {
    if (selectedTags.length === 0) {
      return (
        <span className="text-gray-500 text-base truncate">{placeholder}</span>
      );
    }

    const visibleCount = selectedTags.length > 3 ? 2 : 3;
    const visibleTags = selectedTagObjects.slice(0, visibleCount);

    return (
      <div className="flex items-center gap-1 min-w-0 flex-1">
        {visibleTags.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            onRemove={() => handleRemoveTag(tag.id)}
            size="sm"
          />
        ))}
        {selectedTags.length > 3 && (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 rounded">
            +{selectedTags.length - 2}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center min-w-0 w-full cursor-pointer py-2 bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        {renderTags()}
      </div>
    </div>
  );
};

const TagContent: FC<{ className?: string; searchable?: boolean }> = ({
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
    taskId,
    spaceId,
  } = useTagContext();

  const [createTag] = useCreateTagMutation();
  const [updateTag] = useUpdateTaskTagMutation();
  const [deleteTag] = useDeleteTaskTagMutation();

  if (!isOpen) return null;

  const handleTagToggle = async (tag: Tag) => {
    const isSelected = selectedTags.some(
      (selectedTag) => selectedTag.id === tag.id
    );

    if (!isSelected && selectedTags.length >= 10) return;

    const { data } = await handleMutation(updateTag, {
      id: taskId,
      tagIds: [tag.id],
    });

    if (data) {
      const newSelectedTags = isSelected
        ? selectedTags.filter((t) => t.id !== tag.id)
        : [...selectedTags, tag];

      onTagsChange(newSelectedTags);
    }
  };

  const handleCreateTag = async () => {
    if (!searchQuery.trim()) return;

    const newTagName = searchQuery.trim();
    const tagExists = tags.some(
      (tag) => tag?.name.toLowerCase() === newTagName.toLowerCase()
    );

    if (tagExists) return;

    const { data } = await handleMutation(createTag, {
      spaceId,
      name: newTagName,
      color: getRandomMaterial100Color(),
    });

    if (data) {
      const newTag: Tag = {
        id: Date.now(),
        name: newTagName,
        color: getRandomMaterial100Color(),
        isActive: true,
      };

      onTagsChange([...selectedTags, newTag]);
      setSearchQuery('');
    }
  };

  const handleRemoveTag = async (tagId: number) => {
    const { data } = await handleMutation(deleteTag, {
      id: taskId,
      tagIds: [tagId],
    });
    if (data) {
      onTagsChange(selectedTags.filter((t) => t.id !== tagId));
    }
  };

  const availableTags = tags.filter(
    (tag) => !selectedTags.some((selectedTag) => selectedTag.id === tag.id)
  );

  const filteredTags = searchable
    ? availableTags.filter((tag) =>
        tag?.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
      )
    : availableTags;

  const selectedTagObjects = tags.filter((tag) =>
    selectedTags.some((selectedTag) => selectedTag.id === tag.id)
  );

  const canCreateTag =
    searchQuery &&
    !tags.some(
      (tag) => tag?.name?.toLowerCase() === searchQuery?.toLowerCase()
    );

  return (
    <div
      className={`absolute z-50 mt-1 left-0 w-80 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden ${className}`}
    >
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {selectedTagObjects.map((tag) => (
              <TagChip
                key={tag.id}
                tag={tag}
                onRemove={() => handleRemoveTag(tag.id)}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      {/* Search */}
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
        {filteredTags.length === 0 && !canCreateTag ? (
          <div className="px-3 py-4 text-sm text-gray-500 text-center">
            No tags found
          </div>
        ) : (
          <>
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                <TagChip tag={tag} removable={false} size="sm" />
              </button>
            ))}

            {canCreateTag && (
              <button
                type="button"
                onClick={handleCreateTag}
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

const TagDropdown: FC<{
  taskId: number;
  spaceId?: number;
  children: ReactNode;
}> = ({ taskId, spaceId, children }) => {
  const [getTags, { data: tagsData }] = useLazyGetTagsQuery();
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTags(spaceId, {
      skip: !spaceId,
    });
  }, [spaceId, getTags]);

  useEffect(() => {
    if (tagsData) setAllTags(tagsData);
  }, [tagsData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-tag-dropdown]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleTagsChange = (newTags: Tag[]) => {
    setSelectedTags(newTags);

    const newTagsToAdd = newTags.filter(
      (newTag) => !allTags.some((existingTag) => existingTag.id === newTag.id)
    );

    if (newTagsToAdd.length > 0) {
      setAllTags((prev) => [...prev, ...newTagsToAdd]);
    }
  };

  const contextValue: TagContextType = {
    tags: allTags,
    selectedTags,
    onTagsChange: handleTagsChange,
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    taskId,
    spaceId,
  };

  return (
    <TagContext.Provider value={contextValue}>
      <div className="relative" data-tag-dropdown>
        {children}
      </div>
    </TagContext.Provider>
  );
};

const TagDropdownWithSelection: FC<{
  taskId: number;
  spaceId?: number;
}> = ({ taskId, spaceId }) => (
  <TagDropdown taskId={taskId} spaceId={spaceId}>
    <TagTrigger placeholder="Empty" />
    <TagContent searchable={true} />
  </TagDropdown>
);

export default TagDropdownWithSelection;
