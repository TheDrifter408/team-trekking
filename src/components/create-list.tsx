import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';

interface Props {
  createListOpen?: boolean;
  setCreateListOpen: (open: boolean) => void;
  listName?: string;
  setListName: (name: string) => void;
  onCreateList: () => void;
}

export const CreateList = ({
  createListOpen,
  setCreateListOpen,
  listName,
  setListName,
  onCreateList,
}: Props) => {
  const disabledInput: boolean = !!(listName && listName.trim().length > 0);
  return (
    <Dialog open={createListOpen} onOpenChange={setCreateListOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create List</DialogTitle>
          <DialogDescription>
            Use a list to track tasks, projects, people and more.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" items-center gap-4 space-y-4">
            <div className="">
              <Label htmlFor="folderName" className="text-right mb-2">
                Name
              </Label>
              <div className="relative">
                <Input
                  id="folderName"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="My New List"
                  autoFocus
                  className="pr-10"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setCreateListOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={onCreateList}
            disabled={disabledInput}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
