import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { AvailableTagsData } from '@/mock';

export const TagDialog = ({
  isOpen,
  searchTerm,
  setSearchTerm,
  setIsDialogOpen,
}: {
  isOpen: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsDialogOpen: (open: boolean) => void;
}) => {
  const filteredTags = AvailableTagsData.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[300px] h-[480px] p-0">
        <div className="flex flex-col px-[9px]">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-[50px] h-[40px] mb-1 !text-lg text-content-default placeholder:text-lg"
            placeholder="Search or Create New"
          />
          <div>
            {filteredTags.map((tag) => (
              <div
                key={tag.id}
                className="text-base border-b font-medium text-content-default px-[7px] py-[9px] flex items-center"
              >
                <p
                  className="px-1 h-[20px] flex items-center rounded"
                  style={{ background: tag.color }}
                >
                  {tag.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
