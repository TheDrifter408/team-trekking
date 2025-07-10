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
  searchTerm,
  setSearchTerm,
  setIsDialogOpen,
  tags,
  selectedTags,
  onSelectTag,
  onRemoveTag,
}: {
  isOpen: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  setIsDialogOpen: (open: boolean) => void;
  tags: TagListResponse[];
  selectedTags?: TagListResponse[];
  onSelectTag: (tag: TagListResponse) => void;
  onRemoveTag: (tagId: number) => void;
}) => {
  // Filter out selected tags from available tags
  const availableTags =
    tags?.filter(
      (tag) => !selectedTags?.some((selectedTag) => selectedTag.id === tag.id)
    ) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent hideCloseButton className="w-[300px] h-[480px] p-0">
        <div className="flex flex-col px-[9px]">
          {/* Selected Tags Section */}
          <div className="min-h-[40px] max-h-[120px] overflow-y-auto flex flex-wrap items-start gap-1 py-1">
            {selectedTags &&
              selectedTags.length > 0 &&
              selectedTags.map((tag) => (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm?.(e.target.value)}
            className="h-[34px] mb-1 !text-lg text-content-default placeholder:text-lg"
            placeholder="Search or Create New"
          />
          {/* Available Tags List */}
          <div>
            {availableTags &&
              availableTags.length > 0 &&
              availableTags.map((tag) => (
                <div
                  role={'button'}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
