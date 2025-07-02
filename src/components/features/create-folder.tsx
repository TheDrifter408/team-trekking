import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createFolderSchema } from '@/lib/validation/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFolderMutation } from '@/service/rtkQueries/folderQuery';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import { Input } from '@/components/shadcn-ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/button';
import { Ban, ChevronRight, Circle, Disc2, Droplet } from 'lucide-react';
import { Separator } from '@/components/shadcn-ui/separator';
import { LABEL } from '@/lib/constants';
import { StatusTemplate } from '@/components/features/status-template';
import { Switch } from '../shadcn-ui/switch';
import { SelectUsers } from '@/components/common/select-users';
import { Space } from '@/types/props/Common';
import { toast } from 'sonner';
import { taskNotificationUsers, taskStatuses } from '@/mock';

interface Props {
  createFolderOpen?: boolean;
  setCreateFolderOpen: (open: boolean) => void;
  space: Space;
  onCreatedFolder: () => void;
}

type FormValues = z.infer<typeof createFolderSchema>;

export const CreateFolder = ({
  createFolderOpen,
  setCreateFolderOpen,
  space,
  onCreatedFolder,
}: Props) => {
  const [open, setOpen] = useState(false);

  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      iconURL: 'https://example.com/icon.png',
      avatarKey: 'avatar123',
      visibility: 'public',
      color: '#FF5733',
      spaceId: space.id,
    },
  });

  const selectedColor = watch('color');
  const isPrivateMode = watch('visibility');

  const onSubmit = async (data: z.infer<typeof createFolderSchema>) => {
    const folderFormValues = {
      ...data,
      spaceId: space.id,
    };
    try {
      await createFolder(folderFormValues).unwrap();
      onCreatedFolder(); // Call space api again on successfully creating folder
      toast.success(`Successfully created Folder ${folderFormValues.name}`);
      setCreateFolderOpen(false);
    } catch (error: unknown) {
      console.error(error);
      toast.error('Could not create Folder');
    }
  };

  return (
    <Dialog open={createFolderOpen} onOpenChange={setCreateFolderOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className=" items-center gap-4 space-y-4">
            <div className="">
              <Label htmlFor="name" className="text-right mb-2">
                Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  {...register('name')}
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
                      {selectedColor && selectedColor.length > 0 ? (
                        <Circle
                          className={`h-4 w-4 text-${selectedColor}-500`}
                        />
                      ) : (
                        <Droplet className={`h-4 w-4 `} />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Color Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {['blue', 'green', 'red', 'purple'].map((value) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => setValue('color', value)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-${value}-500 mr-2`}
                          ></div>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <Separator />
                    <DropdownMenuItem onClick={() => setValue('color', '')}>
                      <div className="flex items-center">
                        <Ban className={'h-4 w-4 mr-2'} />
                        Clear
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="">
              <Label className="text-right mb-2">Settings</Label>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="py-4 bg-background w-full border rounded-xl flex items-center px-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-md border border-1 p-2">
                          <Disc2 />
                        </div>
                        <div>
                          <p className="text-base">{LABEL.EDIT_STATUSES}</p>
                          <p className="text-xs text-muted-foreground">
                            {LABEL.USE_SPACE_STATUSES}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-muted px-2 py-1 text-xs">
                          ?
                        </div>
                        <ChevronRight />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
              </Dialog>
              <StatusTemplate
                isOpen={open}
                setIsOpen={setOpen}
                data={taskStatuses}
              />
            </div>
            <Separator />
            <div className="relative">
              <Label
                htmlFor="isPrivateMode"
                className="text-muted-foreground text-right mb-1"
              >
                Make Private
              </Label>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-base font-normal">
                  {LABEL.ONLY_YOU_AND_INVITED_HAVE_ACCESS}
                </span>
                <Controller
                  control={control}
                  name="visibility"
                  render={({ field }) => (
                    <Switch
                      checked={field.value === 'private'}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? 'private' : 'public');
                      }}
                      className={
                        field.value === 'private' ? '!bg-theme-main' : ''
                      }
                      id=""
                    />
                  )}
                />
              </div>
            </div>
            {isPrivateMode === 'private' && (
              <Controller
                control={control}
                name="invitees"
                render={({ field }) => (
                  <SelectUsers
                    multipleSelect={true}
                    displayName={false}
                    onRemove={() => {}}
                    displayOnly={true}
                    isSelected={true}
                    value={field.value ?? []}
                    users={taskNotificationUsers}
                    onChange={field.onChange}
                    placeholder={LABEL.NO_INVITED_USERS}
                    userListTitle={LABEL.SELECT_USERS}
                  />
                )}
              />
            )}
          </div>
          <DialogFooter className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateFolderOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={!isValid || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
