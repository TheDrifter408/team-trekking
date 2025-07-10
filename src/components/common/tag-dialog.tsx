import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Badge } from '@/components/shadcn-ui/badge.tsx';
import { X } from 'lucide-react';
import { TagListResponse } from '@/types/request-response/space/ApiResponse';
import { getContrastTextColor } from '@/lib/utils/utils.ts';

export const TagDialog = ({
  isOpen,
  setIsDialogOpen,
  tags,
  selectedTags = [],
  onSelectTag,
  onRemoveTag,
  onCreateTag,
}: {
  isOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  tags: TagListResponse[];
  selectedTags?: TagListResponse[];
  onSelectTag: (tag: TagListResponse) => void;
  onRemoveTag: (tagId: number) => void;
  onCreateTag: (name: string) => void;
}) => {
  const [searchTag, setSearchTag] = useState('');

  const availableTags = useMemo(() => {
    const allTags = tags ?? [];
    const selected = selectedTags ?? [];

    return allTags.filter(
      (tag) =>
        !selected.some((selectedTag) => selectedTag.id === tag.id) &&
        tag.name.toLowerCase().includes(searchTag.toLowerCase())
    );
  }, [tags, selectedTags, searchTag]);

  const hasExactMatch = useMemo(() => {
    if (!tags || !tags.length) return;
    return tags.some(
      (tag) => tag.name.toLowerCase() === searchTag.trim().toLowerCase()
    );
  }, [tags, searchTag]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTag.trim() !== '' && !hasExactMatch) {
      onCreateTag(searchTag.trim());
      setSearchTag('');
    }
  };

  const canCreate = searchTag.trim() !== '' && !hasExactMatch;

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTitle />
      <DialogContent hideCloseButton className="w-[300px] h-[480px] p-0">
        <div className="flex flex-col px-[9px]">
          {/* Selected Tags */}
          <div className="min-h-[40px] max-h-[120px] overflow-y-auto flex flex-wrap items-start gap-1 py-1">
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                className="relative group items-center flex flex-shrink-0"
              >
                <Badge
                  variant="secondary"
                  className="text-xs pr-6"
                  style={{
                    backgroundColor: tag.color,
                    color: getContrastTextColor(tag.color),
                  }}
                >
                  {tag.name}
                </Badge>
                <button
                  onClick={() => onRemoveTag(tag.id)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/20 rounded-full p-0.5"
                  style={{
                    color: getContrastTextColor(tag.color),
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Search Input */}
          <Input
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            onKeyDown={onKeyDown}
            className="h-[34px] mb-1 !text-lg text-content-default placeholder:text-lg"
            placeholder="Search or Create New"
          />

          {/* Available Tags */}
          <div>
            {availableTags.map((tag) => (
              <div
                role="button"
                onClick={() => onSelectTag(tag)}
                key={tag.id}
                className="text-base hover:bg-secondary border-b font-medium text-content-default px-[7px] py-[5px] flex items-center"
              >
                <Badge
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor: tag.color,
                    color: getContrastTextColor(tag.color),
                  }}
                >
                  {tag.name}
                </Badge>
              </div>
            ))}
            {/* Create New Tag Prompt */}
            {canCreate && (
              <div className="text-muted-foreground text-sm px-[7px] py-[6px] italic">
                Press <kbd className="font-bold">Enter</kbd> to create new tag "
                <span className="text-content-strong">{searchTag.trim()}</span>"
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
