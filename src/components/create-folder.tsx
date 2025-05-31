import { useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Droplet, Ban } from 'lucide-react';
import { Separator } from '@/components/ui/separator.tsx';
import { StatusView } from '@/components/status-view';
import { taskStatuses } from '@/mock';

interface Props {
  createFolderOpen?: boolean;
  setCreateFolderOpen: (open: boolean) => void;
  folderName?: string;
  setFolderName: (name: string) => void;
  onCreateFolder: () => void;
}

export const CreateFolder = ({
  createFolderOpen,
  setCreateFolderOpen,
  folderName,
  setFolderName,
  onCreateFolder,
}: Props) => {
  const [open, setOpen] = useState(false);

  const disabledInput = !!(folderName && folderName.trim().length > 0);

  return (
    <Dialog open={createFolderOpen} onOpenChange={setCreateFolderOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
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
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="My New Folder"
                  autoFocus
                  className="pr-10"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    >
                      <Droplet className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Color Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => console.log('Blue selected')}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 mr-2"></div>
                        Blue
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log('Green selected')}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-green-500 border-2 mr-2"></div>
                        Green
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log('Red selected')}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-red-500 mr-2"></div>
                        Red
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log('Purple selected')}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-purple-500 mr-2"></div>
                        Purple
                      </div>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem>
                      <div className="flex items-center">
                        <Ban className={'h-4 w-4 mr-2'} />
                        Clear
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="">
              <StatusView
                open={open}
                setOpen={setOpen}
                statuses={taskStatuses}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setCreateFolderOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={onCreateFolder}
            disabled={disabledInput}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
